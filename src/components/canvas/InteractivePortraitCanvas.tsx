import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  loadImage,
  createProjectTextureAtlas,
  samplePortraitParticles,
  ParticleData
} from "../../utils/portraitSampler";

interface InteractivePortraitCanvasProps {
  className?: string;
  portraitSrc?: string;
  onLoaded?: () => void;
  scrollProgress?: number; // 0.0 -> 1.0 for Stage 4 scroll scatter
}

// GLSL 300 es Vertex Shader
const VS_SOURCE = `#version 300 es
precision highp float;

layout(location = 0) in vec2 aHome;
layout(location = 1) in vec3 aAir;
layout(location = 2) in vec4 aDelay; // [delay, dur, phase, bright]
layout(location = 3) in vec3 aCell;  // [cellU, cellV, isDust]

uniform vec2 uRes;
uniform vec4 uRect;      // [x, y, w, h] in canvas CSS pixels
uniform vec2 uMouse;     // [mouseX, mouseY] in canvas CSS pixels
uniform float uTime;
uniform float uReveal;   // 0.0 -> 4.0
uniform float uScatter;  // 0.0 -> 1.0
uniform float uCell;
uniform float uDpr;

out vec2 vCell;
out float vBright;
out float vLand;
out float vAlpha;
out float vPhase;

float inOut(float t) {
  return t * t * (3.0 - 2.0 * t);
}

void main() {
  float depth  = aAir.z;
  float delay  = aDelay.x;
  float dur    = aDelay.y;
  float phase  = aDelay.z;
  float bright = aDelay.w;
  bool dust    = aCell.z > 0.5;

  // Stage 1: Interstellar ambient drift (calm, subtle)
  vec2 drift = vec2(sin(uTime * 0.18 + phase * 6.283), cos(uTime * 0.14 + phase * 8.9))
             * (3.0 + 9.0 * (1.0 - depth));
  vec2 air  = aAir.xy * uRes + drift;
  vec2 home = uRect.xy + aHome * uRect.zw;

  // Stage 2: Curved trajectory flight assembly (smooth, gentle curve)
  float appear = smoothstep(0.0, 0.75, uReveal - delay * 0.35);
  float fly    = dust ? 0.0 : clamp((uReveal - delay) / dur, 0.0, 1.0);
  float e      = inOut(fly);

  // Stage 4: Scroll scatter
  float q = clamp(uScatter * 1.85 - phase * 0.85, 0.0, 1.0);
  q = q * q;

  float k = e * (1.0 - q); // 0 = floating in air, 1 = firmly assembled in face
  vec2 pos = mix(air, home, k);

  // Gentle, smooth trajectory during assembly
  vec2 d = home - air;
  pos += vec2(-d.y, d.x) * 0.08 * sin(3.14159 * k) * (phase - 0.5);

  // Stage 3: Gentle real-time mouse repulsion (subtle 65px radius, gentle 7px push)
  vec2 m = pos - uMouse;
  float ml = length(m);
  pos += (ml > 0.001 ? m / ml : vec2(0.0)) * smoothstep(65.0, 0.0, ml) * 7.0 * k;

  float land  = smoothstep(0.55, 1.0, k);
  float speck = mix(2.2, 0.9, depth);
  // Tile size dynamically scaled by brightness:
  // Dark areas (hair, beard, suit) stay tiny points against black space,
  // while bright features (teeth, eyes, cheeks, forehead, white shirt) expand into full tiles
  float tile  = uCell * (0.18 + 0.82 * bright);
  float size  = mix(speck, tile, land);

  float dustA = dust ? mix(0.5, 0.18, smoothstep(1.5, 4.0, uReveal)) : 1.0;
  vAlpha  = appear * mix(0.25 + 0.55 * (1.0 - depth), 1.0, land) * dustA;
  vBright = bright;
  vLand   = land;
  vCell   = aCell.xy;
  vPhase  = phase;

  vec2 clip = (pos / uRes) * 2.0 - 1.0;
  gl_Position  = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = max(size * uDpr, 1.0);
}
`;

// GLSL 300 es Fragment Shader - Matching the exact demo shader formula
const FS_SOURCE = `#version 300 es
precision highp float;

uniform sampler2D uAtlas;
uniform vec2 uWin;
uniform float uTime;

in vec2 vCell;
in float vBright;
in float vLand;
in float vAlpha;
in float vPhase;

out vec4 outColor;

void main() {
  vec3 c = texture(uAtlas, vCell + gl_PointCoord * uWin).rgb;

  // Hue from screenshot, value from portrait luminance (exact formula from demo)
  float peak = max(max(c.r, c.g), max(c.b, 0.06));
  vec3 hue = c / peak;
  vec3 tile = mix(hue, min(c * 1.8, 1.0), 0.35);
  tile = mix(tile, vec3(1.0), 0.15);

  // Very calm, gentle ambient shimmer instead of rapid flickering
  float twinkle = 0.97 + 0.03 * sin(uTime * 0.7 + vPhase * 47.0);

  // Shadows (hair, beard, suit) become pure black / dark void!
  // Highlights (teeth, eyes, cheeks, forehead, shirt) blaze with glowing silver/cyan tech tiles!
  tile *= (0.05 + 0.95 * vBright) * twinkle;

  // Metallic white shimmer in air -> glowing cyber-mosaic when assembled
  vec3 speck = vec3(0.85, 0.92, 1.0);
  vec3 rgb = mix(speck, tile, vLand);

  outColor = vec4(rgb * vAlpha, vAlpha);
}
`;

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

export const InteractivePortraitCanvas: React.FC<InteractivePortraitCanvasProps> = ({
  className = "",
  portraitSrc = "/krish-portrait.png",
  onLoaded,
  scrollProgress = 0
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Animation uniforms state
  const stateRef = useRef({
    reveal: 0.0,
    scatter: 0.0,
    mouse: { x: -2000, y: -2000 },
    targetMouse: { x: -2000, y: -2000 },
    startTime: performance.now()
  });

  // Keep scatter in sync with scroll
  useEffect(() => {
    stateRef.current.scatter = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });
    if (!gl) {
      console.warn("WebGL 2.0 not supported on this device/browser.");
      return;
    }

    // Enable additive blending for glowing mosaic particles
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let program: WebGLProgram;
    try {
      const vs = createShader(gl, gl.VERTEX_SHADER, VS_SOURCE);
      const fs = createShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE);
      program = gl.createProgram()!;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
      }
    } catch (err) {
      console.error(err);
      return;
    }

    gl.useProgram(program);

    // Uniform locations
    const uResLoc = gl.getUniformLocation(program, "uRes");
    const uRectLoc = gl.getUniformLocation(program, "uRect");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uRevealLoc = gl.getUniformLocation(program, "uReveal");
    const uScatterLoc = gl.getUniformLocation(program, "uScatter");
    const uCellLoc = gl.getUniformLocation(program, "uCell");
    const uDprLoc = gl.getUniformLocation(program, "uDpr");
    const uAtlasLoc = gl.getUniformLocation(program, "uAtlas");
    const uWinLoc = gl.getUniformLocation(program, "uWin");

    let vao = gl.createVertexArray();
    let vbo = gl.createBuffer();
    let particleCount = 0;
    let texture: WebGLTexture | null = null;

    let destroyed = false;

    // Load assets and build particles
    async function init() {
      try {
        const [portraitImg, atlasCanvas] = await Promise.all([
          loadImage(portraitSrc),
          createProjectTextureAtlas()
        ]);

        if (destroyed) return;

        // Texture setup
        texture = gl!.createTexture();
        gl!.bindTexture(gl!.TEXTURE_2D, texture);
        gl!.texImage2D(
          gl!.TEXTURE_2D,
          0,
          gl!.RGBA,
          gl!.RGBA,
          gl!.UNSIGNED_BYTE,
          atlasCanvas
        );
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR_MIPMAP_LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
        gl!.generateMipmap(gl!.TEXTURE_2D);

        // High-density sampling for crystal clear facial features
        const density = window.innerWidth < 768 ? 125 : 190;
        const particles: ParticleData = samplePortraitParticles(portraitImg, density);
        particleCount = particles.count;

        // Setup VAO and VBO (12 floats = 48 bytes stride)
        gl!.bindVertexArray(vao);
        gl!.bindBuffer(gl!.ARRAY_BUFFER, vbo);
        gl!.bufferData(gl!.ARRAY_BUFFER, particles.buffer, gl!.STATIC_DRAW);

        const stride = 12 * 4; // 12 floats * 4 bytes = 48 bytes
        // 0: aHome (vec2)
        gl!.enableVertexAttribArray(0);
        gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, stride, 0);

        // 1: aAir (vec3)
        gl!.enableVertexAttribArray(1);
        gl!.vertexAttribPointer(1, 3, gl!.FLOAT, false, stride, 2 * 4);

        // 2: aDelay (vec4)
        gl!.enableVertexAttribArray(2);
        gl!.vertexAttribPointer(2, 4, gl!.FLOAT, false, stride, 5 * 4);

        // 3: aCell (vec3)
        gl!.enableVertexAttribArray(3);
        gl!.vertexAttribPointer(3, 3, gl!.FLOAT, false, stride, 9 * 4);

        gl!.bindVertexArray(null);

        if (onLoaded) onLoaded();

        // Launch Stage 2 Entrance Assembly using GSAP
        gsap.to(stateRef.current, {
          reveal: 3.8,
          duration: 2.8,
          ease: "power2.out",
          delay: 0.1
        });
      } catch (e) {
        console.error("Failed to initialize portrait canvas:", e);
      }
    }

    init();

    // Render loop
    const render = () => {
      if (destroyed || !gl || !canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (particleCount > 0 && vao) {
        gl.useProgram(program);

        // Smooth mouse lerp
        const state = stateRef.current;
        state.mouse.x += (state.targetMouse.x - state.mouse.x) * 0.16;
        state.mouse.y += (state.targetMouse.y - state.mouse.y) * 0.16;

        const elapsedSec = (performance.now() - state.startTime) / 1000;

        // Large, prominent portrait sizing matching reference demo
        const isMobile = width < 768;
        const portraitSize = isMobile
          ? Math.min(width * 0.88, height * 0.72)
          : Math.min(height * 0.94, width * 0.72, 920);

        const rectX = (width - portraitSize) / 2;
        // Position head gracefully beneath top bar
        const rectY = isMobile
          ? 36
          : Math.max(46, (height - portraitSize) * 0.35);

        // Uniform values
        gl.uniform2f(uResLoc, width, height);
        gl.uniform4f(uRectLoc, rectX, rectY, portraitSize, portraitSize);
        gl.uniform2f(uMouseLoc, state.mouse.x, state.mouse.y);
        gl.uniform1f(uTimeLoc, elapsedSec);
        gl.uniform1f(uRevealLoc, state.reveal);
        gl.uniform1f(uScatterLoc, state.scatter);

        // Tile base size scaled to high-density grid
        const baseCellSize = isMobile ? 4.8 : 5.8;
        gl.uniform1f(uCellLoc, baseCellSize);
        gl.uniform1f(uDprLoc, dpr);

        gl.uniform2f(uWinLoc, 0.15, 0.15);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(uAtlasLoc, 0);

        gl.bindVertexArray(vao);
        gl.drawArrays(gl.POINTS, 0, particleCount);
        gl.bindVertexArray(null);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.targetMouse.x = e.clientX - rect.left;
      stateRef.current.targetMouse.y = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      stateRef.current.targetMouse.x = -2000;
      stateRef.current.targetMouse.y = -2000;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      destroyed = true;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (gl) {
        if (vao) gl.deleteVertexArray(vao);
        if (vbo) gl.deleteBuffer(vbo);
        if (texture) gl.deleteTexture(texture);
        gl.deleteProgram(program);
      }
    };
  }, [portraitSrc, onLoaded]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none pointer-events-auto ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair touch-none"
      />
    </div>
  );
};
