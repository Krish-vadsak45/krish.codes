import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const EarthGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
      ringRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Main globe */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#1d1836"
          attach="material"
          distort={0.25}
          speed={1.5}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <mesh ref={ringRef}>
        <sphereGeometry args={[2.05, 24, 24]} />
        <meshStandardMaterial
          color="#915eff"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Glow atmosphere */}
      <mesh>
        <sphereGeometry args={[2.35, 32, 32]} />
        <meshStandardMaterial
          color="#915eff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 8, 120]} />
        <meshStandardMaterial color="#915eff" transparent opacity={0.35} />
      </mesh>

      {/* Orbit dot */}
      <mesh position={[3.2, 0, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      shadows
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.8}
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
        <ambientLight intensity={0.4} />
        <directionalLight position={[-5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[5, -3, -5]} intensity={0.6} color="#915eff" />
        <EarthGlobe />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
