"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 1100;
const STREAM_COUNT = 28;

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const speeds = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      s[i] = 0.12 + ((i * 7) % 50) / 100;
    }
    return s;
  }, []);

  const { positions, base } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const b = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const spread = i % 3;
      const r = spread === 0 ? 6 + ((i * 11) % 40) / 4 : spread === 1 ? 10 + ((i * 9) % 50) / 4 : 14 + ((i * 13) % 60) / 4;
      const theta = ((i * 31) % 360) * (Math.PI / 180);
      const phi = Math.acos(2 * (((i * 17) % 100) / 100) - 1);
      const x = r * Math.sin(phi) * Math.cos(theta) * 1.35;
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.75;
      const z = r * Math.cos(phi) * 0.6 - 5;
      b[i * 3] = x;
      b[i * 3 + 1] = y;
      b[i * 3 + 2] = z;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return { positions: pos, base: b };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const spd = speeds[i];
      arr[i3] = base[i3] + Math.sin(t * spd + i) * 0.18;
      arr[i3 + 1] = base[i3 + 1] + Math.cos(t * spd * 0.8 + i * 0.5) * 0.14;
      arr[i3 + 2] = base[i3 + 2] + Math.sin(t * spd * 0.5 + i * 0.3) * 0.1;
    }
    attr.needsUpdate = true;
    ref.current.rotation.y = t * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6e8bff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DataStreams() {
  const groupRef = useRef<THREE.Group>(null);

  const streams = useMemo(() => {
    const items: {
      axis: "h" | "v";
      pos: number;
      z: number;
      len: number;
      speed: number;
      offset: number;
    }[] = [];

    for (let i = 0; i < STREAM_COUNT; i++) {
      const isVertical = i % 4 === 0;
      items.push({
        axis: isVertical ? "v" : "h",
        pos: (i - STREAM_COUNT / 2) * (isVertical ? 1.1 : 0.75),
        z: -3 - (i % 7) * 0.9,
        len: 14 + (i % 5) * 2.5,
        speed: 0.35 + (i % 8) * 0.1,
        offset: i * 1.4,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const stream = streams[i];
      const t = state.clock.elapsedTime * stream.speed + stream.offset;
      if (stream.axis === "h") {
        child.position.x = ((t * 2.2) % (stream.len * 2)) - stream.len;
        child.position.y = stream.pos;
      } else {
        child.position.y = ((t * 1.8) % (stream.len * 2)) - stream.len;
        child.position.x = stream.pos * 1.4;
      }
      child.position.z = stream.z;
    });
  });

  return (
    <group ref={groupRef}>
      {streams.map((stream, i) => {
        const points =
          stream.axis === "h"
            ? [
                new THREE.Vector3(-stream.len / 2, 0, 0),
                new THREE.Vector3(stream.len / 2, 0, 0),
              ]
            : [
                new THREE.Vector3(0, -stream.len / 2, 0),
                new THREE.Vector3(0, stream.len / 2, 0),
              ];
        return (
          <Line
            key={i}
            points={points}
            color={i % 3 === 0 ? "#9b7bff" : "#6e8bff"}
            opacity={0.16 + (i % 4) * 0.03}
            transparent
            lineWidth={0.9}
          />
        );
      })}
    </group>
  );
}

function OrbitalRings() {
  const rings = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rings.current) return;
    const t = state.clock.elapsedTime;
    rings.current.children.forEach((child, i) => {
      child.rotation.z = t * (0.04 + i * 0.015);
      child.rotation.x = Math.PI / (2.2 + i * 0.4) + Math.sin(t * 0.12 + i) * 0.1;
    });
  });

  return (
    <group ref={rings} position={[0, 0, -7]}>
      {[4.2, 6.5, 9, 12].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / (2.5 + i * 0.3), i * 0.5, 0]}>
          <torusGeometry args={[r, 0.014, 8, 96]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#6e8bff" : "#9b7bff"}
            transparent
            opacity={0.12 - i * 0.015}
          />
        </mesh>
      ))}
    </group>
  );
}

function NodeLattice() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let x = -8; x <= 8; x += 4) {
      for (let y = -5; y <= 5; y += 2.5) {
        pts.push(new THREE.Vector3(x, y, -6 - ((x + y) % 3) * 1.5));
      }
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (group.current) group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.03;
  });

  return (
    <group ref={group}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#6e8bff" transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export default function AnimatedBackgroundScene() {
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const { x, y } = state.pointer;
    mouse.current.x += (x * 0.5 - mouse.current.x) * 0.025;
    mouse.current.y += (y * 0.35 - mouse.current.y) * 0.025;
    state.camera.position.x = mouse.current.x * 2;
    state.camera.position.y = mouse.current.y * 1.2;
    state.camera.lookAt(0, 0, -4);
  });

  return (
    <>
      <fog attach="fog" args={["#070708", 10, 32]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 4, 2]} intensity={0.5} color="#6e8bff" />
      <pointLight position={[-8, -3, -2]} intensity={0.35} color="#9b7bff" />
      <pointLight position={[8, 2, -4]} intensity={0.3} color="#6e8bff" />
      <OrbitalRings />
      <NodeLattice />
      <DataStreams />
      <ParticleField />
    </>
  );
}
