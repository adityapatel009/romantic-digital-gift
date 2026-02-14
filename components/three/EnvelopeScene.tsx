"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function EnvelopeScene() {
  const envelope = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!envelope.current) return;
    envelope.current.position.y =
      Math.sin(clock.getElapsedTime()) * 0.05;
  });

  return (
    <mesh ref={envelope}>
      {/* Envelope body */}
      <boxGeometry args={[1.6, 1, 0.15]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.4}
        metalness={0.05}
        emissive="#fbcfe8"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}
