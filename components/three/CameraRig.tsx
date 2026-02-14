"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ mouse }) => {
    if (!group.current) return;

    group.current.rotation.y = mouse.x * 0.2;
    group.current.rotation.x = mouse.y * 0.1;
  });

  return <group ref={group}>{children}</group>;
}
