interface Env {
  AI: Ai;
  MOYDUZ_BUCKET: R2Bucket;
  AUTH_SECRET?: string;
}

const CDN_BASE = "https://cdn.moyduz.com";

function checkAuth(request: Request, env: Env): boolean {
  if (!env.AUTH_SECRET) return true;
  return request.headers.get("Authorization") === `Bearer ${env.AUTH_SECRET}`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      if (request.method === "GET") {
        return Response.json({ status: "ok", service: "moyduz-content-ai", routes: ["/content", "/image", "/embed", "/social", "/translate", "/transcribe"] });
      }

      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      if (!checkAuth(request, env)) {
        return new Response("Unauthorized", { status: 401 });
      }

      let body: Record<string, unknown>;
      try {
        body = await request.json();
      } catch {
        return Response.json({ error: "Invalid JSON" }, { status: 400 });
      }

      const url = new URL(request.url);
      const route = url.pathname.replace(/^\/+/, "") || "content";

      if (route === "content")    return handleContent(body, env);
      if (route === "image")      return handleImage(body, env);
      if (route === "embed")      return handleEmbed(body, env);
      if (route === "social")     return handleSocial(body, env);
      if (route === "translate")  return handleTranslate(body, env);
      if (route === "transcribe") return handleTranscribe(body, env);

      return Response.json({ error: `Unknown route: /${route}` }, { status: 404 });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return Response.json({ error: msg }, { status: 503 });
    }
  },
};

// ─── /content — LLM ──────────────────────────────────────────────────────────

async function handleContent(body: Record<string, unknown>, env: Env): Promise<Response> {
  const prompt     = body.prompt as string;
  const system     = body.system as string | undefined;
  const max_tokens = (body.max_tokens as number) ?? 1500;

  if (!prompt) return Response.json({ error: "prompt required" }, { status: 400 });

  const messages: { role: string; content: string }[] = [];
  if (system) messages.push({ role: "system", content: system });
  messages.push({ role: "user", content: prompt });

  try {
    // @ts-expect-error — CF AI types may lag
    const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", { messages, max_tokens });
    return Response.json({ text: (result as { response: string }).response });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 503 });
  }
}

// ─── /image — Flux → R2 ──────────────────────────────────────────────────────
// Supported models:
//   "blog"    → @cf/black-forest-labs/flux-2-klein-9b  (fast, high quality)
//   "landing" → @cf/black-forest-labs/flux-2-dev       (best quality)
//   "fast"    → @cf/black-forest-labs/flux-1-schnell   (legacy fallback)

const IMAGE_MODELS: Record<string, string> = {
  blog:    "@cf/black-forest-labs/flux-2-klein-9b",
  landing: "@cf/black-forest-labs/flux-2-dev",
  fast:    "@cf/black-forest-labs/flux-1-schnell",
};

async function runFlux2(env: Env, model: string, prompt: string, width = 1200, height = 630): Promise<string> {
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("width", String(width));
  form.append("height", String(height));

  const formResponse = new Response(form);
  const formStream   = formResponse.body!;
  const formCT       = formResponse.headers.get("content-type")!;

  // @ts-expect-error — CF AI types may lag behind new models
  const result = await env.AI.run(model, { multipart: { body: formStream, contentType: formCT } });
  return (result as { image: string }).image;
}

async function runFlux1Schnell(env: Env, prompt: string): Promise<string> {
  // @ts-expect-error
  const result = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", { prompt, num_steps: 8 });
  return (result as { image: string }).image;
}

async function handleImage(body: Record<string, unknown>, env: Env): Promise<Response> {
  const prompt    = body.prompt as string;
  const slug      = body.slug as string;
  const type      = (body.type as string) ?? "hero";
  const quality   = (body.quality as string) ?? "blog"; // blog | landing | fast

  if (!prompt || !slug) {
    return Response.json({ error: "prompt and slug required" }, { status: 400 });
  }

  try {
    let base64: string;
    const model = IMAGE_MODELS[quality] ?? IMAGE_MODELS.blog;

    if (quality === "fast") {
      base64 = await runFlux1Schnell(env, prompt);
    } else {
      base64 = await runFlux2(env, model, prompt);
    }

    const binary = atob(base64);
    const bytes  = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    const key = `images/blog/${slug}-${type}.jpg`;
    await env.MOYDUZ_BUCKET.put(key, bytes, { httpMetadata: { contentType: "image/jpeg" } });

    return Response.json({ success: true, url: `${CDN_BASE}/${key}`, model });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 503 });
  }
}

// ─── /embed — BGE text embeddings ────────────────────────────────────────────
// Model: @cf/baai/bge-base-en-v1.5 (768-dim)
// Input:  { text: string | string[] }
// Output: { embeddings: number[][] }

async function handleEmbed(body: Record<string, unknown>, env: Env): Promise<Response> {
  const raw = body.text;
  if (!raw) return Response.json({ error: "text required" }, { status: 400 });

  const texts = Array.isArray(raw) ? (raw as string[]) : [raw as string];
  // BGE accepts up to ~20 texts per batch; chunk if needed
  const BATCH = 20;
  const allEmbeddings: number[][] = [];

  try {
    for (let i = 0; i < texts.length; i += BATCH) {
      const chunk = texts.slice(i, i + BATCH);
      // @ts-expect-error
      const result = await env.AI.run("@cf/baai/bge-base-en-v1.5", { text: chunk });
      const data = (result as { data: number[][] }).data;
      allEmbeddings.push(...data);
    }
    return Response.json({ embeddings: allEmbeddings });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 503 });
  }
}

// ─── /social — Llama 3 social content generator ───────────────────────────────
// Input:  { title: string, content: string, lang?: string }
// Output: { tweet: string, linkedin: string, newsletter: string }

async function handleSocial(body: Record<string, unknown>, env: Env): Promise<Response> {
  const title   = body.title as string;
  const content = body.content as string;

  if (!title || !content) {
    return Response.json({ error: "title and content required" }, { status: 400 });
  }

  const excerpt = content.slice(0, 600);

  const prompt = `Aşağıdaki Türkçe e-ticaret makalesi için 3 sosyal medya içeriği oluştur.

Başlık: "${title}"
İçerik özeti: "${excerpt}"

Yanıtı SADECE aşağıdaki JSON formatında döndür (başka hiçbir metin ekleme):
{
  "tweet": "Twitter/X için max 240 karakter, güçlü bir hook, 1-2 emoji, soru veya şaşırtıcı bir gerçek ile başla, Türkçe",
  "linkedin": "LinkedIn için 400-600 karakter, profesyonel ton, konunun en kritik 3 noktasını madde olarak sun, Türkçe",
  "newsletter": "E-posta bülteni için 80-120 kelime, kişisel ve samimi ton, okuyucuya değer vaat eden CTA ile bitir, Türkçe"
}`;

  try {
    // @ts-expect-error
    const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [{ role: "user", content: prompt }],
      max_tokens: 700,
    });

    const text = (result as { response: string }).response.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: "Model did not return valid JSON", raw: text.slice(0, 200) }, { status: 503 });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return Response.json({ success: true, tweet: parsed.tweet, linkedin: parsed.linkedin, newsletter: parsed.newsletter });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 503 });
  }
}

// ─── /translate — M2M-100 multilingual translation ────────────────────────────
// Input:  { text: string, source_lang?: string, target_lang: string }
// Output: { translated_text: string }
// Notes:
//   - M2M-100 1.2B has ~512 token window; longer texts are truncated to 1000 chars
//   - Supported lang codes: tr, en, es, de, fr, ar, zh, pt, ...

async function handleTranslate(body: Record<string, unknown>, env: Env): Promise<Response> {
  const text        = body.text as string;
  const source_lang = (body.source_lang as string) ?? "tr";
  const target_lang = (body.target_lang as string) ?? "en";

  if (!text) return Response.json({ error: "text required" }, { status: 400 });

  // M2M-100 works best with shorter inputs; chunk long texts
  const MAX_CHARS = 800;
  const truncated = text.slice(0, MAX_CHARS);

  try {
    // @ts-expect-error
    const result = await env.AI.run("@cf/meta/m2m100-1.2b", {
      text: truncated,
      source_lang,
      target_lang,
    });
    return Response.json({ translated_text: (result as { translated_text: string }).translated_text });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 503 });
  }
}

// ─── /transcribe — Whisper ASR ────────────────────────────────────────────────
// Input:  { audio_url: string }   — fetches audio from URL and transcribes
// Output: { text: string, word_count?: number }
// Notes:
//   - Fetches audio file from CDN, passes raw bytes to Whisper
//   - Works with MP3 / WAV / OGG (CF Whisper handles decoding)
//   - Large files (>20MB) may time out; 3-minute audio is typically fine

async function handleTranscribe(body: Record<string, unknown>, env: Env): Promise<Response> {
  const audioUrl = body.audio_url as string;
  if (!audioUrl) return Response.json({ error: "audio_url required" }, { status: 400 });

  try {
    const audioResp = await fetch(audioUrl, { headers: { "Accept": "audio/*" } });
    if (!audioResp.ok) {
      return Response.json({ error: `Failed to fetch audio: HTTP ${audioResp.status}` }, { status: 502 });
    }

    const audioBuffer = await audioResp.arrayBuffer();
    const audioArray  = [...new Uint8Array(audioBuffer)];

    // @ts-expect-error
    const result = await env.AI.run("@cf/openai/whisper", { audio: audioArray });
    const r = result as { text: string; word_count?: number };

    return Response.json({ success: true, text: r.text, word_count: r.word_count });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 503 });
  }
}
