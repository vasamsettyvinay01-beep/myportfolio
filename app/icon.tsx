import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070708",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            width: "22px",
            height: "24px",
            borderRadius: "6px",
            background: "linear-gradient(180deg, #f8f8fa, #e0e0e8)",
            border: "2px solid #070708",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "8px",
              borderRadius: "2px",
              background: "#121218",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-5px",
              width: "2px",
              height: "5px",
              background: "#a1a1aa",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-7px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#6e8bff",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
