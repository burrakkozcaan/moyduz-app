import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/mdx";

const SITE_URL = "https://moyduz.com";
const SITE_TITLE = "Moyduz Blog";
const SITE_DESCRIPTION =
  "Latest insights on web design, software development, e-commerce, and digital marketing from Moyduz.";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(date: string | Date): string {
  return new Date(date).toUTCString();
}

export async function GET() {
  try {
    const posts = await getAllBlogPosts();

    const items = posts
      .map((post) => {
        const slug = post.frontmatter.slug;
        const url = `${SITE_URL}/blog/${slug}`;
        const title = escapeXml(post.frontmatter.title || "Untitled");
        const description = escapeXml(
          post.frontmatter.meta_description || post.frontmatter.title || ""
        );
        const pubDate = formatDate(
          post.frontmatter.published_at || new Date()
        );
        const author = post.frontmatter.author_name || "Moyduz Team";
        const categoryName =
          typeof post.frontmatter.category === "object"
            ? post.frontmatter.category?.name
            : post.frontmatter.category;

        return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>info@moyduz.com (${escapeXml(author)})</author>
      ${categoryName ? `<category>${escapeXml(categoryName)}</category>` : ""}
    </item>`;
      })
      .join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-US</language>
    <lastBuildDate>${formatDate(new Date())}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>${SITE_TITLE}</title>
      <link>${SITE_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} Moyduz. All rights reserved.</copyright>
    <managingEditor>info@moyduz.com (Moyduz Team)</managingEditor>
    <webMaster>info@moyduz.com (Moyduz Team)</webMaster>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    const emptyRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <lastBuildDate>${formatDate(new Date())}</lastBuildDate>
  </channel>
</rss>`;

    return new NextResponse(emptyRss, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=300",
      },
    });
  }
}
