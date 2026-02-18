import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <group rotation={[0.05, -0.6, 0]}>
      <mesh position={[0, 0, 0]}>
         <boxGeometry args={isMobile ? [2, 1.4, 0.1] : [3, 2, 0.1]} />
         <meshStandardMaterial color='#111' roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.1, 0.1]}>
         <planeGeometry args={isMobile ? [1.8, 1.2] : [2.8, 1.8]} />
         <meshStandardMaterial color='#222' emissive="#5e2ca5" emissiveIntensity={0.5} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, isMobile? -1.2 : -1.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, isMobile ? 1 : 1, 32]} />
          <meshStandardMaterial color='#333' />
      </mesh>
      <mesh position={[0, isMobile? -1.7 : -2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
          <meshStandardMaterial color='#333' />
      </mesh>
      
       <hemisphereLight intensity={0.15} groundColor='black' />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
