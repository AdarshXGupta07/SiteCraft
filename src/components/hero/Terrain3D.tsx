"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingObject({ position, scale, speed, distort }: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15 * speed;
      groupRef.current.rotation.z += delta * 0.05 * speed;
    }
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 12), []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Float speed={speed * 1.5} rotationIntensity={0.4} floatIntensity={1}>
        <mesh geometry={geometry}>
          <MeshDistortMaterial
            color="#1d2e1d"
            roughness={1}
            metalness={0.1}
            distort={distort}
            speed={speed * 1.2}
          />
        </mesh>
        <mesh geometry={geometry} scale={1.01}>
          <meshBasicMaterial
            color="#B3F090"
            wireframe
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Terrain3D() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <spotLight position={[-10, 0, -5]} intensity={3} color="#B3F090" />

        {/* Main large center object */}
        <FloatingObject position={[0, -0.5, 0]} scale={2.8} speed={1} distort={0.2} />

        {/* Smaller floating objects */}
        <FloatingObject position={[-4, 2, -2]} scale={0.7} speed={1.5} distort={0.4} />
        <FloatingObject position={[4.5, -2.5, -1]} scale={1.2} speed={0.8} distort={0.3} />
        <FloatingObject position={[3, 3, -4]} scale={0.5} speed={2} distort={0.5} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
