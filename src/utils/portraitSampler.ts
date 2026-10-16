export interface ParticleData {
  buffer: Float32Array;
  count: number;
  sampleW: number;
  sampleH: number;
}

/**
 * Loads an image async
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Builds the authentic high-tech texture atlas matching the demo:
 * rich electric blues, cyans, silver, and purples with crisp code/UI lines.
 */
export async function createProjectTextureAtlas(): Promise<HTMLCanvasElement> {
  const atlas = document.createElement("canvas");
  const size = 512;
  atlas.width = size;
  atlas.height = size;
  const ctx = atlas.getContext("2d");
  if (!ctx) return atlas;

  ctx.fillStyle = "#060914";
  ctx.fillRect(0, 0, size, size);

  const certPaths = [
    "/certs/1-ZZQM761dOMtcKL-uOanod6VCI-Lz7n6_Leetcode.png",
    "/certs/1-HZa0a39p_gYMgnrnGxoTFbjJzbVQXb8_screencapture-freecodecamp-org-certification-fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-responsive-web-design-2026-07-16-15_44_32.png",
    "/certs/1MesoabwCfEiP8whsAoiPfZbdvIkstE3u_Hack2skill-Certificate.png",
    "/certs/1-jMoNLqAdsuDr8dCEZbbGYQI3puSaADS_screencapture-freecodecamp-org-certification-fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-python-v9-2026-07-03-10_48_47.png"
  ];

  const half = size / 2;
  const loadedImages = await Promise.allSettled(certPaths.map((p) => loadImage(p)));

  const quadrants = [
    { x: 0, y: 0, theme: "#38bdf8" },       // Sky / Cyan
    { x: half, y: 0, theme: "#818cf8" },    // Indigo / Violet
    { x: 0, y: half, theme: "#60a5fa" },    // Electric Blue
    { x: half, y: half, theme: "#c084fc" }  // Purple / White
  ];

  quadrants.forEach((q, i) => {
    const result = loadedImages[i];
    if (result.status === "fulfilled" && result.value) {
      const img = result.value;
      const sx = img.naturalWidth * 0.12;
      const sy = img.naturalHeight * 0.12;
      const sw = img.naturalWidth * 0.76;
      const sh = img.naturalHeight * 0.76;
      ctx.drawImage(img, sx, sy, sw, sh, q.x, q.y, half, half);

      // Add high-tech glass overlay with vibrant cyan/blue tint
      const grad = ctx.createLinearGradient(q.x, q.y, q.x + half, q.y + half);
      grad.addColorStop(0, "rgba(56, 189, 248, 0.2)");
      grad.addColorStop(1, "rgba(129, 140, 248, 0.2)");
      ctx.fillStyle = grad;
      ctx.fillRect(q.x, q.y, half, half);
    } else {
      ctx.fillStyle = "#0c1329";
      ctx.fillRect(q.x, q.y, half, half);

      ctx.strokeStyle = q.theme;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(q.x + 6, q.y + 6, half - 12, half - 12);

      // Procedural syntax lines
      for (let line = 0; line < 7; line++) {
        ctx.fillStyle = line % 2 === 0 ? "rgba(56, 189, 248, 0.85)" : "rgba(167, 139, 250, 0.85)";
        ctx.fillRect(q.x + 16, q.y + 25 + line * 22, (half - 40) * (0.45 + 0.45 * Math.sin(line * 1.3)), 10);
      }
    }
  });

  return atlas;
}

/**
 * Samples Krish's exact photo with high-contrast luminance mapping.
 * Matches the reference portfolio:
 * - Shadows (hair, beard, eye pupils, suit jacket) fall into deep black / void.
 * - Highlights (cheeks, forehead, smile, white teeth, eye whites, white shirt)
 *   form brilliant, glowing mosaic tiles.
 *
 * Each vertex has 12 floats (48 bytes):
 * [
 *   aHome.x, aHome.y,        // 2 floats
 *   aAir.x, aAir.y, aAir.z,  // 3 floats
 *   aDelay.x, y, z, w,       // 4 floats (delay, dur, phase, bright)
 *   aCell.x, y, z            // 3 floats (cellU, cellV, isDust)
 * ]
 */
export function samplePortraitParticles(
  image: HTMLImageElement,
  targetDensity: number = 190 // High-density grid for clear facial features
): ParticleData {
  const sampleW = Math.max(80, targetDensity);
  const sampleH = Math.round((sampleW * image.naturalHeight) / image.naturalWidth);

  const offscreen = document.createElement("canvas");
  offscreen.width = sampleW;
  offscreen.height = sampleH;
  const ctx = offscreen.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    return { buffer: new Float32Array(0), count: 0, sampleW, sampleH };
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, 0, 0, sampleW, sampleH);
  const imgData = ctx.getImageData(0, 0, sampleW, sampleH).data;

  const floatsPerVertex = 12;
  const records: number[] = [];

  for (let y = 0; y < sampleH; y++) {
    for (let x = 0; x < sampleW; x++) {
      const idx = (y * sampleW + x) * 4;
      const alpha = imgData[idx + 3];

      // Discard background/transparent pixels
      if (alpha < 35) continue;

      const r = imgData[idx];
      const g = imgData[idx + 1];
      const b = imgData[idx + 2];

      // Perceptual luminance calculation (Rec. 709)
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0;

      // High-contrast S-curve mapping matching the reference demo:
      // - Deepens dark hair, beard, suit, pupils into deep black shadows (low bright)
      // - Accentuates face highlights, nose, smile, teeth, eyes, and shirt (high bright)
      let bright: number;
      if (lum < 0.28) {
        // Deep shadows: hair, beard, suit lapels, pupils
        bright = Math.pow(lum / 0.28, 1.8) * 0.18;
      } else {
        // Facial midtones and bright highlights: teeth, eyes, cheeks, forehead, shirt
        bright = 0.18 + Math.pow((lum - 0.28) / 0.72, 0.85) * 0.82;
      }

      const homeX = x / sampleW;
      const homeY = y / sampleH;

      // Random starting coordinates scattered in cosmic space
      const airX = Math.random() * 1.5 - 0.25;
      const airY = Math.random() * 1.5 - 0.25;
      const depth = Math.random();

      // Curved assembly flight timing
      const delay = 0.15 + Math.random() * 0.9 + (1.0 - homeY) * 0.4;
      const duration = 1.25 + Math.random() * 0.55;
      const phase = Math.random();

      // Atlas UV coordinates (4 quadrants)
      const quadX = Math.random() > 0.5 ? 0.5 : 0.0;
      const quadY = Math.random() > 0.5 ? 0.5 : 0.0;
      const cellU = quadX + Math.random() * 0.35;
      const cellV = quadY + Math.random() * 0.35;
      const isDust = 0.0;

      records.push(
        homeX, homeY,
        airX, airY, depth,
        delay, duration, phase, bright,
        cellU, cellV, isDust
      );
    }
  }

  // Atmospheric cosmic dust particles
  const dustCount = Math.round((records.length / floatsPerVertex) * 0.14);
  for (let i = 0; i < dustCount; i++) {
    const homeX = Math.random();
    const homeY = Math.random();
    const airX = Math.random() * 1.4 - 0.2;
    const airY = Math.random() * 1.4 - 0.2;
    const depth = Math.random();

    const delay = Math.random() * 1.2;
    const duration = 1.4;
    const phase = Math.random();
    const bright = 0.2 + Math.random() * 0.4;

    const cellU = Math.random() * 0.4;
    const cellV = Math.random() * 0.4;
    const isDust = 1.0;

    records.push(
      homeX, homeY,
      airX, airY, depth,
      delay, duration, phase, bright,
      cellU, cellV, isDust
    );
  }

  const count = records.length / floatsPerVertex;
  const buffer = new Float32Array(records);

  return { buffer, count, sampleW, sampleH };
}
