import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            display: "flex",
            background:
              "linear-gradient(100deg, #7c5cff, #5b7cff 52%, #22c8ee)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              background:
                "linear-gradient(100deg, #7c5cff, #5b7cff 52%, #22c8ee)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              fontWeight: 600,
              color: "#fafafa",
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "64px",
            fontWeight: 600,
            color: "#fafafa",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: "920px",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: "28px",
            color: "#a1a1a1",
            maxWidth: "820px",
          }}
        >
          {site.domain}
        </div>
      </div>
    ),
    { ...size }
  );
}
