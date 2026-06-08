"use client";

import { Canvas } from "@react-three/fiber";
import SystemCoreScene from "./SystemCoreScene";

export default function CoreCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 45 }}
      dpr={[1, 1.5]}
      className="!h-full !w-full rounded-2xl"
      gl={{ antialias: true, alpha: true }}
    >
      <fog attach="fog" args={["#050505", 4, 14]} />
      <SystemCoreScene />
    </Canvas>
  );
}
