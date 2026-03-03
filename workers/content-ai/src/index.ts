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
        return Response.json({ status: "ok", service: "moyduz-content-ai", routes: ["/content", "/image", "/embed", "/social", "/translate", "/transcribe", "/summarize"] });
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
      if (route === "summarize")  return handleSummarize(body, env);

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
    // @ts-ignore — CF AI types may lag
    const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", { messages, max_tokens });
    return Response.json({ text: (result as { response: string }).response });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 503 });
  }
}

// ─── /image — LLM-enhanced Flux cascade → R2 ─────────────────────────────────
//
// Pipeline:
//   1. getSceneHint()         — topic keywords → cinematic base scene
//   2. buildCinematicPrompt() — Llama enhances prompt + adds camera style
//   3. generateWithCascade()  — flux-2-klein-9b → flux-1-schnell → SDXL fallback
//   4. Upload to R2, return CDN URL

// Turkish e-commerce topic → cinematic scene hint
const SCENE_HINTS: Array<[string[], string]> = [
  [["e-ticaret sitesi", "online mağaza", "e-commerce store", "kendi siteni"], "a Turkish entrepreneur's modern home office with a laptop showing a beautiful ecommerce dashboard, product boxes stacked neatly on the desk, warm studio lighting, clean minimalist workspace"],
  [["pazaryeri", "marketplace", "trendyol", "hepsiburada", "çok satıcı", "multi-vendor"], "a vibrant Turkish bazaar transformed into a modern digital marketplace — products arranged on illuminated white display shelves with digital price tags, cinematic wide-angle shot"],
  [["seo", "teknik seo", "arama motoru", "keyword", "search ranking", "backlink"], "a digital strategist's command center at night, multiple curved monitors showing real-time Turkish search ranking dashboards and analytics charts, moody blue ambient lighting"],
  [["dropshipping", "stoksuz satış"], "a clean minimal home office with product samples, shipping boxes, and a laptop showing an order management system, soft warm golden lighting"],
  [["ödeme", "sanal pos", "iyzico", "paytr", "ödeme sistemi", "kargo"], "a secure digital payment terminal with credit cards and smartphone tap-to-pay, clean white minimalist background, professional banking aesthetic, macro photography"],
  [["b2b", "toptan", "bayi", "tedarik", "wholesale"], "two Turkish business professionals shaking hands across a conference table with laptops and product catalogs, modern glass office with Bosphorus view, corporate photography"],
  [["dropshipping", "komisyon", "kâr hesaplama", "gelir", "maliyet"], "a financial dashboard on a laptop screen with colorful profit charts and KPI widgets, clean office desk with coffee and notebook, golden hour side lighting"],
  [["ai", "yapay zeka", "llm", "chatgpt", "automation"], "a neural network data flow visualization in holographic blue and orange light against a dark background, server racks with LED strips, futuristic data center aesthetic"],
  [["e-ihracat", "ihracat", "global", "uluslararası"], "cargo containers at Istanbul port at sunset with container ships and Turkish landmarks, cinematic golden hour photography, wide aerial perspective"],
  [["iş kurma", "startup", "girişim", "business"], "a young Turkish entrepreneur working on a laptop in a bright modern co-working space, whiteboard with growth charts in background, natural daylight"],
  [["abonelik", "subscription", "saas", "platform"], "a SaaS product interface displayed on a MacBook Pro in a bright minimalist Scandinavian-style office, succulent plants and coffee cup on desk, golden hour light"],
  [["sosyal medya", "instagram", "reklam", "dijital pazarlama"], "a content creator's workstation with ring light, multiple screens showing social media campaigns and ad metrics, colorful product flat lays, warm orange accent lighting"],
];

const DEFAULT_SCENE = "a premium Turkish e-commerce workspace with laptop showing an online store, product boxes, smartphone, and coffee cup on a clean modern desk, warm natural lighting, professional editorial photography";

function getSceneHint(topic: string): string {
  const lower = topic.toLowerCase();
  for (const [keywords, hint] of SCENE_HINTS) {
    if (keywords.some((k) => lower.includes(k))) return hint;
  }
  return DEFAULT_SCENE;
}

async function buildCinematicPrompt(topic: string, type: string, env: Env): Promise<string> {
  const sceneHint = getSceneHint(topic);
  const isPremium = ["landing", "pages", "services"].includes(type);

  // Use Llama to transform the topic into a vivid cinematic scene
  let llamaScene = "";
  try {
    // @ts-ignore
    const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [
        {
          role: "system",
          content: "You write cinematic image generation prompts. Output ONLY a 1-2 sentence scene description. No extra text. Photorealistic, specific, moody. No brand logos. No text in image. No distorted faces.",
        },
        {
          role: "user",
          content: `Topic: "${topic}"\nBase scene: ${sceneHint}\nWrite a specific cinematic scene for this topic. Include environment, lighting, mood.`,
        },
      ],
      max_tokens: 80,
    });
    llamaScene = ((result as { response: string }).response ?? "").trim();
  } catch { /* fall through to base scene */ }

  const scene = llamaScene || `${sceneHint}, professional photography`;

  const cameraStyle = isPremium
    ? "shot on Sony A7R IV, 85mm lens, f/1.8 bokeh, cinematic color grading"
    : "shot on Canon R5, 35mm lens, editorial photography style";

  return `${scene}, ${cameraStyle}, ultra-detailed, photorealistic, 16:9 aspect ratio, no text overlays, no watermarks, no logos`;
}

function decodeImageBytes(result: unknown): Uint8Array | null {
  if (result instanceof ArrayBuffer) return new Uint8Array(result);
  const r = result as { image?: string };
  if (r?.image) {
    const base64 = r.image.replace(/^data:image\/\w+;base64,/, "");
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }
  return null;
}

const NEG_PROMPT = "blurry, low quality, stock photo, flat lighting, bad anatomy, extra fingers, distorted hands, oversaturated, watermark, text overlay, logo, banner, pixelated, cartoonish";

async function generateWithCascade(fullPrompt: string, type: string, env: Env): Promise<Uint8Array | null> {
  const isPremium = ["landing", "pages", "services"].includes(type);

  // 1️⃣ flux-2-klein-9b (best quality, multipart FormData)
  try {
    const fd = new FormData();
    fd.append("prompt", fullPrompt);
    fd.append("negative_prompt", NEG_PROMPT);
    fd.append("num_steps", isPremium ? "42" : "32");
    fd.append("guidance", "7");
    const formResp = new Response(fd);
    const formStream = formResp.body!;
    const formCT = formResp.headers.get("content-type")!;
    // @ts-ignore
    const raw = await env.AI.run("@cf/black-forest-labs/flux-2-klein-9b", { multipart: { body: formStream, contentType: formCT } });
    const bytes = decodeImageBytes(raw);
    if (bytes && bytes.byteLength > 150_000) return bytes; // quality gate: >150KB
  } catch { /* fall through */ }

  // 2️⃣ flux-1-schnell (higher steps)
  try {
    // @ts-ignore
    const raw = await env.AI.run("@cf/black-forest-labs/flux-1-schnell", {
      prompt: fullPrompt,
      num_steps: isPremium ? 28 : 20,
    });
    const bytes = decodeImageBytes(raw);
    if (bytes && bytes.byteLength > 100_000) return bytes;
  } catch { /* fall through */ }

  // 3️⃣ SDXL-Lightning (fast fallback)
  try {
    // @ts-ignore
    const raw = await env.AI.run("@cf/bytedance/stable-diffusion-xl-lightning", {
      prompt: fullPrompt,
      negative_prompt: NEG_PROMPT,
      num_steps: 6,
      guidance: 2.0,
    });
    const bytes = decodeImageBytes(raw);
    if (bytes) return bytes;
  } catch { /* all models failed */ }

  return null;
}

async function handleImage(body: Record<string, unknown>, env: Env): Promise<Response> {
  const prompt  = body.prompt as string;
  const slug    = body.slug as string;
  const type    = (body.type as string) ?? "hero";
  const quality = (body.quality as string) ?? "blog"; // blog | landing | fast

  if (!prompt || !slug) {
    return Response.json({ error: "prompt and slug required" }, { status: 400 });
  }

  try {
    // Step 1: LLM builds cinematic scene from topic
    const fullPrompt = await buildCinematicPrompt(prompt, quality, env);

    // Step 2: Multi-model cascade with quality gate
    const imageBytes = await generateWithCascade(fullPrompt, quality, env);
    if (!imageBytes) {
      return Response.json({ error: "All image models failed" }, { status: 502 });
    }

    // Step 3: Upload to R2
    const key = `images/blog/${slug}-${type}.jpg`;
    await env.MOYDUZ_BUCKET.put(key, imageBytes, {
      httpMetadata: {
        contentType: "image/jpeg",
        cacheControl: "public, max-age=31536000, immutable",
      },
    });

    return Response.json({ success: true, url: `${CDN_BASE}/${key}` });
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
      // @ts-ignore
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
    // @ts-ignore
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
    // @ts-ignore
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

    // @ts-ignore
    const result = await env.AI.run("@cf/openai/whisper", { audio: audioArray });
    const r = result as { text: string; word_count?: number };

    return Response.json({ success: true, text: r.text, word_count: r.word_count });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 503 });
  }
}

// ─── /summarize — Llama 3 Türkçe özetleme ────────────────────────────────────
// Input:  { text: string, mode?: "short" | "bullets" | "long", lang?: string }
// Output: { summary: string, mode: string }
// Modes:
//   "short"   → 2-3 cümle, 80-120 kelime
//   "bullets" → 5 madde, her biri 1 cümle (default)
//   "long"    → 4-6 paragraf, 300-400 kelime

async function handleSummarize(body: Record<string, unknown>, env: Env): Promise<Response> {
  const text = body.text as string;
  const mode = (body.mode as string) ?? "bullets";
  const lang = (body.lang as string) ?? "tr";

  if (!text) return Response.json({ error: "text required" }, { status: 400 });

  // Llama token penceresi; çok uzun içerikleri kırp
  const MAX_CHARS = 4000;
  const truncated = text.slice(0, MAX_CHARS);

  const modeInstructions: Record<string, string> = {
    short:   "2-3 cümlelik kısa bir özet yaz (80-120 kelime). Sadece özeti döndür, başka hiçbir şey yazma.",
    bullets: "En önemli 5 noktayı madde listesi olarak yaz. Her madde 1 cümle olsun. Format: '• Madde metni'. Başka hiçbir şey yazma.",
    long:    "4-6 paragraftan oluşan kapsamlı bir özet yaz (300-400 kelime). Sadece özeti döndür, başka hiçbir şey yazma.",
  };

  const instruction = modeInstructions[mode] ?? modeInstructions.bullets;
  const langNote = lang === "tr" ? "Türkçe yaz." : `Write in ${lang}.`;

  const prompt = `Aşağıdaki metni özetle. ${langNote}\n\n${instruction}\n\nMetin:\n${truncated}`;

  try {
    // @ts-ignore
    const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [{ role: "user", content: prompt }],
      max_tokens: mode === "long" ? 600 : mode === "short" ? 200 : 350,
    });

    const summary = (result as { response: string }).response.trim();
    return Response.json({ success: true, summary, mode });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 503 });
  }
}
