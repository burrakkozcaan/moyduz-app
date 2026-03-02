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
        return Response.json({ status: "ok", service: "moyduz-content-ai" });
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

      if (route === "content") return handleContent(body, env);
      if (route === "image") return handleImage(body, env);

      return Response.json({ error: `Unknown route: /${route}` }, { status: 404 });
    } catch (err) {
      // Top-level catch — worker never crashes with 5xx from CF infra
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
