"use client";

import { Canvas } from "@react-three/fiber";
import SystemCoreScene from "./SystemCoreScene";

type CoreCanvasProps = {
  activeNodeId: string;
};

export default function CoreCanvas({ activeNodeId }: CoreCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 6.2], fov: 42 }}
      dpr={[1, 1]}
      frameloop="demand"
      className="!h-full !w-full rounded-2xl"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#070708", 4, 14]} />
      <SystemCoreScene activeNodeId={activeNodeId} />
    </Canvas>
  );
}
