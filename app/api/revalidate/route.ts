import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = process.env.REVALIDATE_TOKEN;

  if (token && authHeader !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const results: string[] = [];

    if (body.tag) {
      const tags = Array.isArray(body.tag) ? body.tag : [body.tag];
      for (const tag of tags) {
        revalidateTag(tag);
        results.push(`tag:${tag}`);
      }
    }

    if (body.path) {
      const paths = Array.isArray(body.path) ? body.path : [body.path];
      for (const path of paths) {
        revalidatePath(path);
        results.push(`path:${path}`);
      }
    }

    if (results.length === 0) {
      return NextResponse.json(
        { error: "No tag or path provided" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      revalidated: results,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "Revalidation",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
}
