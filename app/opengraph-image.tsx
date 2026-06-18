import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vinay Vasamsetty — AI Operational Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0 (compatible; OG-Image/1.0)" } }
  ).then((r) => r.text());

  const url = css.match(/src: url\(([^)]+)\) format\('woff2'\)/)?.[1];
  if (!url) return null;
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OpenGraphImage() {
  const lobsterData = await loadGoogleFont("Lobster", 400);

  const fonts: { name: string; data: ArrayBuffer; weight: 400; style: "normal" }[] = [];
  if (lobsterData) fonts.push({ name: "Lobster", data: lobsterData, weight: 400, style: "normal" });

  const sans = lobsterData ? "Lobster" : "cursive";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(145deg, #070708 0%, #12121a 50%, #070708 100%)",
          color: "#f3f4f6",
          fontFamily: sans,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f8f8fa, #e8e8ee)",
              border: "2px solid #070708",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "12px",
                borderRadius: "4px",
                background: "#121218",
              }}
            />
          </div>
          <span style={{ fontSize: "28px", color: "#a1a1aa" }}>vinay.systems</span>
        </div>
        <div style={{ fontSize: "72px", fontWeight: 400, lineHeight: 1.1, maxWidth: "900px" }}>
          Vinay Vasamsetty
        </div>
        <div style={{ fontSize: "40px", color: "#6e8bff", marginTop: "20px" }}>
          AI Operational Systems
        </div>
        <div style={{ fontSize: "26px", color: "#a1a1aa", marginTop: "28px", maxWidth: "760px" }}>
          Agentic platforms, async backends, and production SaaS — built to ship.
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
