interface Env {
  AI: Ai;
  MOYDUZ_BUCKET: R2Bucket;
  AUTH_SECRET?: string;
  ELEVENLABS_API_KEY?: string;
}

const CDN_BASE = "https://cdn.moyduz.com";
const ELEVENLABS_VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // Adam — multilingual v2

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
  if (request.method === "GET") {
    return Response.json({ status: "ok", service: "moyduz-audio-tts" });
  }

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (env.AUTH_SECRET) {
    const auth = request.headers.get("Authorization") ?? "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    if (token !== env.AUTH_SECRET.trim()) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  let body: { text?: string; slug?: string; lang?: string; provider?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { text, slug, provider = "elevenlabs" } = body;

  if (!text || !slug) {
    return Response.json({ error: "text and slug are required" }, { status: 400 });
  }

  const trimmed = text.slice(0, 5000);
  const key = `audio/${slug}.mp3`;

  try {
    let bytes: Uint8Array;

    if (provider === "elevenlabs" && env.ELEVENLABS_API_KEY) {
      // ElevenLabs — eleven_multilingual_v2 (Türkçe destekliyor)
      const resp = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": env.ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
          },
          body: JSON.stringify({
            text: trimmed,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.45,
              similarity_boost: 0.75,
              style: 0.0,
              use_speaker_boost: true,
            },
          }),
        }
      );
      if (!resp.ok) {
        const err = await resp.text();
        throw new Error(`ElevenLabs ${resp.status}: ${err.slice(0, 200)}`);
      }
      bytes = new Uint8Array(await resp.arrayBuffer());
    } else {
      // Fallback: MeloTTS (İngilizce çıkar — sadece yedek)
      const trimmedShort = trimmed.slice(0, 3000);
      // @ts-expect-error — CF AI types may lag
      const result = await env.AI.run("@cf/myshell-ai/melotts", {
        prompt: trimmedShort,
        lang: "EN",
      });
      const base64 = result.audio as string;
      const binary = atob(base64);
      bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    }

    await env.MOYDUZ_BUCKET.put(key, bytes, {
      httpMetadata: { contentType: "audio/mpeg" },
    });

    const url = `${CDN_BASE}/${key}`;
    return Response.json({ success: true, url, chars: trimmed.length, provider });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("TTS error:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
