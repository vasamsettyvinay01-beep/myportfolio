"use client";

import { Canvas } from "@react-three/fiber";
import { PROJECT_SCENES } from "./projects/ProjectScenes";

type ProjectObjectCanvasProps = {
  systemId: string;
  active?: boolean;
  size?: "sm" | "lg";
  className?: string;
};

const CAMERAS = {
  sm: { position: [0, 0.35, 3.4] as [number, number, number], fov: 36 },
  lg: { position: [0, 0.5, 4.8] as [number, number, number], fov: 40 },
};

export default function ProjectObjectCanvas({
  systemId,
  active = false,
  size = "sm",
  className,
}: ProjectObjectCanvasProps) {
  const Scene = PROJECT_SCENES[systemId];
  if (!Scene) return null;

  const camera = CAMERAS[size];

  return (
    <div className={className}>
      <Canvas
        camera={{ position: camera.position, fov: camera.fov }}
        dpr={size === "sm" ? [1, 1.25] : [1, 1.5]}
        className="!h-full !w-full"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#070708", 2.5, 9]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[2.5, 2, 2]} intensity={1.3} color="#6e8bff" />
        <pointLight position={[-2, -1, -1]} intensity={0.6} color="#9b7bff" />
        <Scene active={active} />
      </Canvas>
    </div>
  );
}
