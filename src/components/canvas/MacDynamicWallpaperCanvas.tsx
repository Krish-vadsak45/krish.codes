import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

// Custom GLSL Fragment Shader for macOS Sequoia Dynamic Aurora Wave
const auroraVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const auroraFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Pseudo-random & simplex-style smooth noise for organic liquid ribbon
  vec3 hash33(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yxx) * p3.zyx);
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
    vec2 mouseOffset = (uMouse - 0.5) * 0.35;

    // Fluid time progression
    float t = uTime * 0.18;

    // Organic domain warping
    vec2 q = vec2(
      sin(st.x * 2.2 + t * 0.7 + mouseOffset.x),
      cos(st.y * 1.8 - t * 0.5 + mouseOffset.y)
    );

    vec2 r = vec2(
      sin(q.x * 3.0 + st.y * 1.5 + t * 0.6),
      cos(q.y * 3.0 + st.x * 1.5 - t * 0.4)
    );

    float f = 0.5 + 0.5 * sin(st.x * 1.2 + r.y * 2.5 + t * 0.5);
    float ribbon = 0.5 + 0.5 * cos(st.y * 2.0 + r.x * 2.8 - t * 0.4);

    // Deep Apple Sequoia Cosmic Palette
    vec3 cDeep = vec3(0.012, 0.020, 0.051);       // #03050d
    vec3 cIndigo = vec3(0.075, 0.043, 0.220);     // #130b38
    vec3 cViolet = vec3(0.240, 0.075, 0.450);     // #3d1373
    vec3 cCobalt = vec3(0.086, 0.212, 0.584);     // #163695
    vec3 cCyan = vec3(0.024, 0.514, 0.682);       // #0683ae
    vec3 cMagenta = vec3(0.482, 0.082, 0.271);    // #7b1545

    // Blend ribbons with smooth interpolation
    vec3 color = mix(cDeep, cIndigo, smoothstep(0.0, 0.8, length(st) * 0.7));
    color = mix(color, cCobalt, f * 0.65);
    color = mix(color, cViolet, ribbon * 0.55);
    color = mix(color, cCyan, pow(f * ribbon, 2.2) * 0.45);
    color = mix(color, cMagenta, pow(ribbon, 3.0) * 0.25);

    // Subtle natural vignette
    float vignette = clamp(1.0 - length(st * 0.65), 0.0, 1.0);
    color *= mix(0.72, 1.0, vignette);

    // Fine dither to prevent 8-bit banding on dark gradients
    float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.012;
    color += dither;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const AuroraMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const mouseRef = useRef<[number, number]>([0.5, 0.5]);
  const targetMouseRef = useRef<[number, number]>([0.5, 0.5]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      targetMouseRef.current = [
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight,
      ];
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    []
  );

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size]);

  useFrame((_state, delta) => {
    if (materialRef.current) {
      // Smoothly advance time
      materialRef.current.uniforms.uTime.value += Math.min(delta, 0.05);

      // Smooth lerp mouse coordinates for fluid inertia
      mouseRef.current[0] += (targetMouseRef.current[0] - mouseRef.current[0]) * 0.05;
      mouseRef.current[1] += (targetMouseRef.current[1] - mouseRef.current[1]) * 0.05;
      materialRef.current.uniforms.uMouse.value.set(mouseRef.current[0], mouseRef.current[1]);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={auroraVertexShader}
        fragmentShader={auroraFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

// Subtle 3D Stardust Overlay
const CosmicDust: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = React.useState(() =>
    random.inSphere(new Float32Array(1800), { radius: 1.5 })
  );

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      const clampedDelta = Math.min(delta, 0.05);
      pointsRef.current.rotation.x -= clampedDelta * 0.02;
      pointsRef.current.rotation.y -= clampedDelta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.0032}
        color="#c7d2fe"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const MacDynamicWallpaperCanvas: React.FC = React.memo(() => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
      <Canvas
        frameloop="always"
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 1] }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          depth: false,
          stencil: false,
        }}
      >
        <AuroraMesh />
        <CosmicDust />
      </Canvas>
    </div>
  );
});

export default MacDynamicWallpaperCanvas;
