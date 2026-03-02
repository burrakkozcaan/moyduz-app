interface Env {
  AI: Ai;
  MOYDUZ_BUCKET: R2Bucket;
  AUTH_SECRET?: string;
}

const CDN_BASE = "https://cdn.moyduz.com";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      return await handleRequest(request, env);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Unhandled error:", msg);
      return Response.json({ error: msg }, { status: 500 });
    }
  },
};

async function handleRequest(request: Request, env: Env): Promise<Response> {
  // Health check
  if (request.method === "GET") {
    return Response.json({ status: "ok", service: "moyduz-audio-tts" });
  }

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Optional bearer auth
  if (env.AUTH_SECRET) {
    const auth = request.headers.get("Authorization") ?? "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    if (token !== env.AUTH_SECRET.trim()) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  let body: { text?: string; slug?: string; lang?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { text, slug, lang = "TR" } = body;

  if (!text || !slug) {
    return Response.json({ error: "text and slug are required" }, { status: 400 });
  }

  // MeloTTS has a character limit — trim to be safe
  const trimmed = text.slice(0, 3000);

  try {
    // @ts-expect-error — CF AI types may lag behind available models
    const result = await env.AI.run("@cf/myshell-ai/melotts", {
      prompt: trimmed,
      lang,
    });

    // result.audio is base64-encoded MP3
    const base64 = result.audio as string;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const key = `audio/${slug}.mp3`;
    await env.MOYDUZ_BUCKET.put(key, bytes, {
      httpMetadata: { contentType: "audio/mpeg" },
    });

    const url = `${CDN_BASE}/${key}`;
    return Response.json({ success: true, url, chars: trimmed.length });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("AI/R2 error:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
