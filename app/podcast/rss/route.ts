import { getAllBlogPosts } from "@/lib/mdx";
import { getAllRehberPosts } from "@/lib/rehber";

export const dynamic = "force-static";

const SITE_URL = "https://www.moyduz.com";
const CDN_BASE = "https://cdn.moyduz.com";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

function audioUrl(slug: string, audioSrc?: string): string {
  if (audioSrc?.startsWith("http")) return audioSrc;
  return `${CDN_BASE}/audio/${slug}.mp3`;
}

export async function GET() {
  const [blogPosts, rehberPosts] = await Promise.all([
    getAllBlogPosts(),
    getAllRehberPosts(),
  ]);

  // Only include posts that have audio generated
  const audioBlogPosts = blogPosts.filter((p) => p.frontmatter.audio_src);
  const audioRehberPosts = rehberPosts.filter((p) => p.frontmatter.audio_src);

  const allPosts = [
    ...audioBlogPosts.map((p) => ({ ...p, urlPrefix: "/blog" })),
    ...audioRehberPosts.map((p) => ({ ...p, urlPrefix: "/rehber" })),
  ].sort((a, b) => {
    const da = a.frontmatter.published_at ?? "";
    const db = b.frontmatter.published_at ?? "";
    return db.localeCompare(da);
  });

  const items = allPosts
    .map((p) => {
      const fm = p.frontmatter;
      const slug = String(fm.slug);
      const title = escapeXml(String(fm.title ?? slug));
      const desc = escapeXml(String(fm.meta_description ?? fm.snippet ?? ""));
      const link = `${SITE_URL}${p.urlPrefix}/${slug}`;
      const pubDate = fm.published_at ? toRfc822(String(fm.published_at)) : "";
      const audio = audioUrl(slug, fm.audio_src ? String(fm.audio_src) : undefined);

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${desc}</description>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
      <enclosure url="${audio}" type="audio/mpeg" length="0"/>
      <itunes:title>${title}</itunes:title>
      <itunes:summary>${desc}</itunes:summary>
      <itunes:duration>0</itunes:duration>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Moyduz Podcast</title>
    <link>${SITE_URL}/blog</link>
    <description>E-ticaret, yazılım ve dijital büyüme üzerine uzman içerikler. Moyduz Blog Podcast.</description>
    <language>tr</language>
    <copyright>© 2026 Moyduz</copyright>
    <itunes:author>Moyduz Ekibi</itunes:author>
    <itunes:owner>
      <itunes:name>Moyduz</itunes:name>
      <itunes:email>info@moyduz.com</itunes:email>
    </itunes:owner>
    <itunes:image href="${SITE_URL}/images/podcast-cover.jpg"/>
    <itunes:category text="Technology">
      <itunes:category text="Software How-To"/>
    </itunes:category>
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
