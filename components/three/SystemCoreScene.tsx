"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Line, Sphere } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CORE_NODES } from "@/lib/data";

type OrbitalNodeProps = {
  index: number;
  total: number;
  color: string;
  isActive: boolean;
  radius?: number;
};

function OrbitalNode({
  index,
  total,
  color,
  isActive,
  radius = 2.8,
}: OrbitalNodeProps) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.15 + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * 0.4;

    const scale = isActive ? 1.6 : 1;
    ref.current.scale.setScalar(scale);
  });

  return (
    <Float speed={isActive ? 2.2 : 1.5} rotationIntensity={0.2} floatIntensity={isActive ? 0.7 : 0.4}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 1.4 : 0.7}
          toneMapped={false}
        />
      </mesh>
      {isActive && (
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} />
        </mesh>
      )}
    </Float>
  );
}

function ConnectionLines({ activeIndex }: { activeIndex: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const count = CORE_NODES.length;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const b = (((i + 2) % count) / count) * Math.PI * 2;
      const involvesActive = i === activeIndex || (i + 2) % count === activeIndex;
      if (involvesActive || activeIndex < 0) {
        pts.push(
          new THREE.Vector3(Math.cos(a) * 2.8, 0, Math.sin(a) * 2.8),
          new THREE.Vector3(Math.cos(b) * 2.8, 0, Math.sin(b) * 2.8)
        );
      }
    }
    return pts;
  }, [activeIndex]);

  return (
    <Line
      points={points}
      color={activeIndex >= 0 ? "#9b7bff" : "#6e8bff"}
      opacity={activeIndex >= 0 ? 0.45 : 0.2}
      transparent
      lineWidth={1.5}
    />
  );
}

function ParticleField() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + (((i * 17) % 40) / 10);
      const theta = ((i * 31) % 360) * (Math.PI / 180);
      const phi = Math.acos(2 * (((i * 13) % 100) / 100) - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#6e8bff"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function CoreSphere({ pulse }: { pulse: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      const base = pulse ? 1.08 : 1;
      const scale = base + Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.7, 40, 40]} />
      <meshStandardMaterial
        color="#6e8bff"
        emissive={pulse ? "#9b7bff" : "#6e8bff"}
        emissiveIntensity={pulse ? 0.9 : 0.55}
        roughness={0.15}
        metalness={0.85}
        toneMapped={false}
      />
    </mesh>
  );
}

function InnerGlow({ intensity }: { intensity: number }) {
  return (
    <Sphere args={[1.35, 32, 32]}>
      <meshBasicMaterial
        color="#6e8bff"
        transparent
        opacity={0.04 + intensity * 0.06}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

export type SystemCoreSceneProps = {
  activeNodeId: string;
};

export default function SystemCoreScene({ activeNodeId }: SystemCoreSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const activeIndex = CORE_NODES.findIndex((n) => n.id === activeNodeId);

  useFrame((state) => {
    if (groupRef.current) {
      const target = activeIndex >= 0 ? activeIndex * 0.08 : 0;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.clock.elapsedTime * 0.05 + target,
        0.02
      );
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#6e8bff" />
      <pointLight position={[-4, -2, -4]} intensity={0.7} color="#9b7bff" />
      <InnerGlow intensity={activeIndex >= 0 ? 1 : 0} />
      <CoreSphere pulse={activeIndex >= 0} />
      <ConnectionLines activeIndex={activeIndex} />
      {CORE_NODES.map((node, i) => (
        <OrbitalNode
          key={node.id}
          index={i}
          total={CORE_NODES.length}
          color={node.color}
          isActive={node.id === activeNodeId}
        />
      ))}
      <ParticleField />
    </group>
  );
}
