import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vinay Vasamsetty — AI Operational Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          fontFamily: "system-ui, sans-serif",
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
          <span style={{ fontSize: "22px", color: "#a1a1aa", letterSpacing: "0.08em" }}>
            vinay.systems
          </span>
        </div>
        <div style={{ fontSize: "64px", fontWeight: 600, lineHeight: 1.1, maxWidth: "900px" }}>
          Vinay Vasamsetty
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#6e8bff",
            marginTop: "20px",
            fontWeight: 500,
          }}
        >
          AI Operational Systems
        </div>
        <div style={{ fontSize: "22px", color: "#a1a1aa", marginTop: "28px", maxWidth: "760px" }}>
          Agentic platforms, async backends, and production SaaS — built to ship.
        </div>
      </div>
    ),
    { ...size }
  );
}
