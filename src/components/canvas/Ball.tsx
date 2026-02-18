import { Suspense, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

// ─── Error Boundary ──────────────────────────────────────────────────────────
// Prevents a failed texture load from crashing the whole page.
interface EBState { hasError: boolean }
class TextureErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ─── Ball mesh ────────────────────────────────────────────────────────────────
// useTexture MUST be called at the top level of a component — never inside JSX.
const Ball = ({ imgUrl }: { imgUrl: string }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/* flatShading is a material prop — it belongs on meshStandardMaterial, NOT on Decal */}
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

// ─── Fallback orb (shown when texture URL is invalid / missing) ───────────────
const FallbackOrb = () => (
  <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
    <ambientLight intensity={0.25} />
    <directionalLight position={[0, 0, 0.05]} />
    <mesh castShadow receiveShadow scale={2.75}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#915eff" flatShading />
    </mesh>
  </Float>
);

// ─── Canvas wrapper ───────────────────────────────────────────────────────────
const BallCanvas = ({ icon }: { icon: string }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <TextureErrorBoundary fallback={<FallbackOrb />}>
          <Ball imgUrl={icon} />
        </TextureErrorBoundary>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
