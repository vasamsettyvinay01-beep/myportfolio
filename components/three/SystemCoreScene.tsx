"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Line, Sphere } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CORE_NODES } from "@/lib/data";

function OrbitalNode({
  index,
  total,
  color,
  radius = 2.8,
}: {
  index: number;
  total: number;
  color: string;
  radius?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.15 + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * 0.4;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

function ConnectionLines() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const count = CORE_NODES.length;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const b = ((i + 2) % count) / count * Math.PI * 2;
      pts.push(
        new THREE.Vector3(Math.cos(a) * 2.8, 0, Math.sin(a) * 2.8),
        new THREE.Vector3(Math.cos(b) * 2.8, 0, Math.sin(b) * 2.8)
      );
    }
    return pts;
  }, []);

  return (
    <Line
      points={points}
      color="#4F8CFF"
      opacity={0.25}
      transparent
      lineWidth={1}
    />
  );
}

function ParticleField() {
  const count = 400;
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
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4F8CFF"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.65, 32, 32]} />
      <meshStandardMaterial
        color="#4F8CFF"
        emissive="#7B61FF"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
        toneMapped={false}
      />
    </mesh>
  );
}

function InnerGlow() {
  return (
    <Sphere args={[1.2, 32, 32]}>
      <meshBasicMaterial
        color="#4F8CFF"
        transparent
        opacity={0.06}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

export default function SystemCoreScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#4F8CFF" />
      <pointLight position={[-4, -2, -4]} intensity={0.6} color="#7B61FF" />
      <InnerGlow />
      <CoreSphere />
      <ConnectionLines />
      {CORE_NODES.map((node, i) => (
        <OrbitalNode
          key={node.id}
          index={i}
          total={CORE_NODES.length}
          color={node.color}
        />
      ))}
      <ParticleField />
    </group>
  );
}
