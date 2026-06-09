"use client";

import { Canvas } from "@react-three/fiber";
import AnimatedBackgroundScene from "./AnimatedBackgroundScene";

export default function AnimatedBackgroundCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 55, near: 0.1, far: 40 }}
      dpr={[1, 1.25]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      className="!h-full !w-full"
      style={{ background: "transparent" }}
    >
      <AnimatedBackgroundScene />
    </Canvas>
  );
}
