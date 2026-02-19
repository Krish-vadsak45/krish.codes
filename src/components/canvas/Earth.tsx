import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const Satellite = ({ radius, speed, color, offset = 0, yFreq = 0.5 }: any) => {
  const ref = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.sin(t) * radius;
      ref.current.position.z = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t * yFreq) * (radius * 0.3);
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={3} 
          roughness={0}
          metalness={1}
        />
      </mesh>
      <pointLight distance={3} intensity={1.5} color={color} />
    </group>
  );
};

const EarthGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const cloudRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);

  // High-quality Earth textures
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
  ]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y = t * 0.12;
    if (cloudRef.current) cloudRef.current.rotation.y = t * 0.15;
    if (ringRef1.current) ringRef1.current.rotation.z = t * 0.08;
    if (ringRef2.current) ringRef2.current.rotation.z = -t * 0.05;
  });

  return (
    <group>
      {/* 1. Atmosphere Fresnel-like Glow */}
      <mesh scale={1.25}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#915eff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 2. Clouds Layer with slight depth */}
      <mesh ref={cloudRef} scale={1.018}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          alphaMap={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="white"
        />
      </mesh>

      {/* 3. Main Earth Globe with Specular Highlights */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          specularMap={specularMap}
          specular={new THREE.Color("grey")}
          shininess={15}
        />
      </mesh>

      {/* 4. Layered Tech Orbital Rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2.8, 0, 0]}>
        <torusGeometry args={[3.4, 0.006, 16, 100]} />
        <meshStandardMaterial color="#915eff" transparent opacity={0.3} emissive="#915eff" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ringRef2} rotation={[-Math.PI / 4, 0.5, 0]}>
        <torusGeometry args={[3.7, 0.003, 16, 120]} />
        <meshStandardMaterial color="#c084fc" transparent opacity={0.1} emissive="#c084fc" emissiveIntensity={0.5} />
      </mesh>

      {/* 5. Mobile Satellites (Tech nodes) */}
      <Satellite radius={4.1} speed={0.25} color="#915eff" offset={0} yFreq={0.4} />
      <Satellite radius={4.4} speed={-0.18} color="#c084fc" offset={Math.PI} yFreq={0.6} />
      <Satellite radius={3.6} speed={0.4} color="#6b3fcf" offset={Math.PI / 2} yFreq={0.3} />

      <Stars radius={15} depth={50} count={350} factor={3} saturation={0} fade speed={1.2} />
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-5, 3, 7] }}
      gl={{ 
        preserveDrawingBuffer: true, 
        antialias: true,
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.3}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Cinematic Sunlight Setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[-12, 10, 5]} intensity={3.5} color="#ffffff" castShadow />
        <pointLight position={[8, -5, -8]} intensity={0.8} color="#915eff" />
        <pointLight position={[0, 10, 0]} intensity={0.2} color="white" />
        
        <EarthGlobe />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
