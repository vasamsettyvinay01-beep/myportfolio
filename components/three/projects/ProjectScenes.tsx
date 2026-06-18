"use client";

import type { ComponentType } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = {
  active: boolean;
};

function EmissiveMat({
  color,
  intensity = 0.6,
  metalness = 0.7,
}: {
  color: string;
  intensity?: number;
  metalness?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={intensity}
      metalness={metalness}
      roughness={0.2}
      toneMapped={false}
    />
  );
}

/** SNIPR — precision target ring + scoring focal point */
export function SniprScene({ active }: SceneProps) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z = state.clock.elapsedTime * (active ? 0.5 : 0.25);
    }
  });

  return (
    <group rotation={[0, 0.4, 0]}>
      <Float speed={active ? 2 : 1.2} floatIntensity={0.35}>
        <group position={[-0.35, 0, 0]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[i * 0.08, i * 0.06, -i * 0.05]} rotation={[0, -0.3, 0]}>
              <boxGeometry args={[0.55, 0.75, 0.03]} />
              <EmissiveMat color={i === 2 ? "#74d3ae" : "#6e8bff"} intensity={i === 2 ? 0.9 : 0.45} />
            </mesh>
          ))}
        </group>
      </Float>

      <mesh ref={ringRef} position={[0.55, 0.15, 0]}>
        <torusGeometry args={[0.38, 0.045, 16, 48]} />
        <EmissiveMat color="#74d3ae" intensity={active ? 1.1 : 0.65} />
      </mesh>

      <mesh position={[0.55, 0.15, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <EmissiveMat color="#f3f4f6" intensity={0.8} />
      </mesh>

      {[-0.2, 0, 0.2].map((x, i) => (
        <mesh key={i} position={[x - 0.2, -0.55, 0.1]}>
          <boxGeometry args={[0.12, 0.08 + i * 0.14, 0.12]} />
          <EmissiveMat color="#9b7bff" intensity={0.5 + i * 0.15} />
        </mesh>
      ))}
    </group>
  );
}

/** CandidateMatch — paired profiles with match link */
export function CandidateMatchScene({ active }: SceneProps) {
  const linkRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (linkRef.current) {
      linkRef.current.rotation.z = Math.sin(state.clock.elapsedTime * (active ? 1.2 : 0.6)) * 0.08;
    }
  });

  return (
    <group rotation={[0, 0.35, 0]}>
      <Float speed={active ? 2 : 1.2} floatIntensity={0.35}>
        <mesh position={[-0.55, 0.05, 0]}>
          <boxGeometry args={[0.42, 0.58, 0.04]} />
          <EmissiveMat color="#6e8bff" intensity={active ? 0.85 : 0.5} />
        </mesh>
        <mesh position={[0.55, -0.05, 0]}>
          <boxGeometry args={[0.42, 0.58, 0.04]} />
          <EmissiveMat color="#74d3ae" intensity={active ? 0.95 : 0.55} />
        </mesh>
      </Float>

      <mesh ref={linkRef} position={[0, 0, 0.08]}>
        <torusGeometry args={[0.62, 0.035, 12, 48, Math.PI * 0.72]} />
        <EmissiveMat color="#9b7bff" intensity={active ? 1 : 0.6} />
      </mesh>

      <Line
        points={[new THREE.Vector3(-0.55, 0.05, 0.06), new THREE.Vector3(0.55, -0.05, 0.06)]}
        color="#74d3ae"
        opacity={active ? 0.7 : 0.35}
        transparent
        lineWidth={1}
      />
    </group>
  );
}

/** Agentrix — orchestration hub with orbiting agent nodes */
export function AgentrixScene({ active }: SceneProps) {
  const agentsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (agentsRef.current) {
      agentsRef.current.rotation.y = state.clock.elapsedTime * (active ? 0.55 : 0.3);
    }
  });

  const lines = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      pts.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * 1.1, 0.15, Math.sin(a) * 1.1));
    }
    return pts;
  }, []);

  return (
    <group>
      <Float speed={active ? 2.5 : 1.5} floatIntensity={0.4}>
        <mesh>
          <icosahedronGeometry args={[0.45, 0]} />
          <EmissiveMat color="#9b7bff" intensity={active ? 1.2 : 0.75} />
        </mesh>
      </Float>

      <Line points={lines} color="#6e8bff" opacity={active ? 0.55 : 0.3} transparent lineWidth={1} />

      <group ref={agentsRef}>
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.1, 0.15, Math.sin(angle) * 1.1]}>
              <boxGeometry args={[0.22, 0.22, 0.22]} />
              <EmissiveMat color={i % 2 === 0 ? "#6e8bff" : "#74d3ae"} intensity={0.85} />
            </mesh>
          );
        })}
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.015, 8, 64]} />
        <meshBasicMaterial color="#6e8bff" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/** Orion OS — core planet with ops ring and moons */
export function OrionScene({ active }: SceneProps) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * (active ? 0.4 : 0.2);
    }
  });

  return (
    <group rotation={[0.15, 0.5, 0]}>
      <Float speed={1.8} floatIntensity={0.3}>
        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <EmissiveMat color="#6e8bff" intensity={active ? 1 : 0.6} metalness={0.85} />
        </mesh>
      </Float>

      <group ref={ringRef} rotation={[Math.PI / 2.8, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.85, 0.04, 12, 64]} />
          <EmissiveMat color="#b8c0cc" intensity={0.55} metalness={0.9} />
        </mesh>
        {["#74d3ae", "#9b7bff", "#c4a574"].map((color, i) => {
          const angle = (i / 3) * Math.PI * 2;
          return (
            <mesh key={color} position={[Math.cos(angle) * 0.85, 0, Math.sin(angle) * 0.85]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <EmissiveMat color={color} intensity={0.9} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/** D8 Copilot — copilot console + blueprint roll + data block */
export function D8CopilotScene({ active }: SceneProps) {
  return (
    <group rotation={[0, -0.35, 0]} position={[0, -0.1, 0]}>
      <mesh position={[-0.42, 0, 0]}>
        <boxGeometry args={[0.1, 1.1, 0.1]} />
        <EmissiveMat color="#c4a574" intensity={0.5} />
      </mesh>
      <mesh position={[0.42, 0, 0]}>
        <boxGeometry args={[0.1, 1.1, 0.1]} />
        <EmissiveMat color="#c4a574" intensity={0.5} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[0.94, 0.1, 0.12]} />
        <EmissiveMat color="#c4a574" intensity={0.5} />
      </mesh>

      <Float speed={active ? 2 : 1} floatIntensity={0.25}>
        <mesh position={[0.05, 0, 0.02]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.65, 0.95, 0.05]} />
          <EmissiveMat color="#6e8bff" intensity={0.35} metalness={0.4} />
        </mesh>
      </Float>

      <mesh position={[0.75, -0.15, 0.2]} rotation={[0, 0.6, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.14, 0.55, 24]} />
        <EmissiveMat color="#74d3ae" intensity={0.65} metalness={0.3} />
      </mesh>

      <mesh position={[-0.7, -0.45, 0.15]}>
        <boxGeometry args={[0.35, 0.25, 0.35]} />
        <EmissiveMat color="#9b7bff" intensity={0.45} />
      </mesh>
    </group>
  );
}

/** BillB POS — terminal screen + card slot + receipt */
export function BillBScene({ active }: SceneProps) {
  const receiptRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (receiptRef.current) {
      receiptRef.current.position.y = -0.05 + Math.sin(state.clock.elapsedTime * 2) * (active ? 0.04 : 0.02);
    }
  });

  return (
    <group rotation={[0, 0.45, 0]} position={[0, -0.05, 0]}>
      <RoundedBox args={[0.9, 0.65, 0.12]} radius={0.04} position={[0, 0.15, 0]} rotation={[-0.35, 0, 0]}>
        <EmissiveMat color="#1a1a22" intensity={0.2} metalness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0.42, 0.08]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[0.72, 0.42, 0.02]} />
        <EmissiveMat color="#9b7bff" intensity={active ? 1 : 0.65} />
      </mesh>

      <mesh position={[0.35, -0.05, 0.15]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.35, 0.04, 0.18]} />
        <EmissiveMat color="#b8c0cc" intensity={0.4} metalness={0.9} />
      </mesh>

      <mesh ref={receiptRef} position={[-0.25, -0.05, 0.2]} rotation={[-0.1, 0.3, 0]}>
        <boxGeometry args={[0.22, 0.55, 0.01]} />
        <EmissiveMat color="#f3f4f6" intensity={0.25} metalness={0.1} />
      </mesh>

      <mesh position={[0, -0.42, 0]}>
        <boxGeometry args={[0.75, 0.08, 0.45]} />
        <EmissiveMat color="#6e8bff" intensity={0.35} />
      </mesh>
    </group>
  );
}

/** Chrome Automation — browser window + extension puzzle tab */
export function ChromeScene({ active }: SceneProps) {
  const tabRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (tabRef.current) {
      tabRef.current.position.y = 0.55 + Math.sin(state.clock.elapsedTime * 1.5) * (active ? 0.05 : 0.02);
    }
  });

  return (
    <group rotation={[0, -0.25, 0]}>
      <RoundedBox args={[1.1, 0.75, 0.08]} radius={0.05} position={[0, 0, 0]}>
        <EmissiveMat color="#b8c0cc" intensity={0.35} metalness={0.75} />
      </RoundedBox>

      <mesh position={[0, 0.05, 0.05]}>
        <boxGeometry args={[0.95, 0.55, 0.02]} />
        <EmissiveMat color="#6e8bff" intensity={active ? 0.85 : 0.5} />
      </mesh>

      <group ref={tabRef} position={[0.3, 0.55, 0.06]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.28, 0.1, 0.04]} />
          <EmissiveMat color="#f3f4f6" intensity={0.3} />
        </mesh>
        <mesh position={[0.18, -0.18, 0.08]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.32, 0.38, 0.06]} />
          <EmissiveMat color="#74d3ae" intensity={active ? 1 : 0.6} />
        </mesh>
        <mesh position={[0.18, -0.02, 0.1]}>
          <boxGeometry args={[0.14, 0.14, 0.04]} />
          <EmissiveMat color="#9b7bff" intensity={0.9} />
        </mesh>
      </group>

      <mesh position={[-0.42, 0.36, 0.06]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <EmissiveMat color="#c4a574" intensity={0.8} />
      </mesh>
      <mesh position={[-0.34, 0.36, 0.06]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <EmissiveMat color="#74d3ae" intensity={0.8} />
      </mesh>
    </group>
  );
}

export const PROJECT_SCENES: Record<string, ComponentType<SceneProps>> = {
  snipr: SniprScene,
  candidatematch: CandidateMatchScene,
  agentrix: AgentrixScene,
  orion: OrionScene,
  d8copilot: D8CopilotScene,
  billb: BillBScene,
  chrome: ChromeScene,
};
