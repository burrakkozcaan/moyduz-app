import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://moyduz.com";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = process.env.INDEXNOW_AUTH_TOKEN;

  if (token && authHeader !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const urls: string[] = Array.isArray(body.urls)
      ? body.urls
      : body.url
        ? [body.url]
        : [];

    if (urls.length === 0) {
      return NextResponse.json(
        { error: "No URLs provided" },
        { status: 400 }
      );
    }

    const fullUrls = urls.map((u) =>
      u.startsWith("http") ? u : `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`
    );

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: new URL(SITE_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: fullUrls,
      }),
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      submitted: fullUrls.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit to IndexNow" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "IndexNow",
    status: "ready",
    configured: !!INDEXNOW_KEY,
  });
}
