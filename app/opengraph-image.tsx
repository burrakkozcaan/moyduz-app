import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Moyduz — E-Ticaret & Dijital Altyapı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ORANGE = "#f94316";
const mode = "dark" as const;


// Vercel'de logo aynı deployment'tan yüklensin (preview/production fark etmez)
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  (process.env.NODE_ENV === "production" ? "https://www.moyduz.com" : "http://localhost:3000");

export default async function Image() {

  return new ImageResponse(
    <div
      style={{
        fontFamily: "Inter",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 80,
        overflow: "hidden",
        backgroundColor: mode === "dark" ? "#0a0a0a" : "#ffffff",
        color: mode === "dark" ? "#fff" : "#000",
      }}
    >
      {/* ORANGE GLOW */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          background: `radial-gradient(circle, ${ORANGE}25 0%, ${ORANGE}15 40%, transparent 70%)`,
          filter: "blur(120px)",
        }}
      />

      {/* GRID PATTERN */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, ${
              mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)"
            } 1px, transparent 1px),
            linear-gradient(to bottom, ${
              mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)"
            } 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 60%, transparent 100%)",
        }}
        tw="absolute inset-0"
      />

      {/* Badge */}
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'flex',
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            color: 'white',
            fontSize: 24,
            fontWeight: 700,
            background: ORANGE,
            boxShadow: `0 0 30px ${ORANGE}66`,
          }}
        >
          <img
            src={`${baseUrl}/favicon.svg`}
            width={42}
            height={42}
            alt="Moyduz Logo"
          />
        </div>
        <span style={{ marginLeft: 16, fontSize: 20, fontWeight: 500, letterSpacing: '-0.025em' }}>
          Moyduz®
        </span>
      </div>

      {/* Title - iki satır, "güçlü" üstte */}
      <h1
        tw="mt-10 text-center leading-[1.15] tracking-tighter max-w-3xl mx-auto font-medium relative z-10"
        style={{ fontSize: 56, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>E-Ticaret & <span style={{ color: ORANGE }}>güçlü</span></div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>Dijital Altyapı Çözümleri</div>
      </h1>

      {/* Description */}
      <p
        style={{
          marginTop: 24,
          textAlign: "center",
          fontSize: 24,
          maxWidth: 672,
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: 1.625,
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color:
            mode === "dark"
              ? "rgba(255,255,255,0.7)"
              : "rgba(0,0,0,0.65)",
        }}
      >
        <span>E-Ticaret & Dijital Altyapı Çözümleri ile projelerinizi</span>
        <span style={{ marginTop: 4 }}>daha hızlı ve daha güçlü şekilde hayata geçirin.</span>
      </p>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}