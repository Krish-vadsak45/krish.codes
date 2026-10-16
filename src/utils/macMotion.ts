import gsap from "gsap";

/**
 * Authentic Apple macOS Motion Curves & Physics Constants
 */
export const APPLE_CURVES = {
  // macOS Sonoma / Sequoia standard window opening curve
  windowOpen: "cubic-bezier(0.16, 1, 0.3, 1)",
  // macOS QuickLook & Modal zoom curve
  modalZoom: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  // macOS Dock swoop minimize
  minimizeSwoop: "cubic-bezier(0.32, 0, 0.24, 1)",
  // Standard UI responsive ease
  fluidEase: "power3.out",
  // Sharp exit ease
  snapExit: "power2.in",
};

/**
 * Multi-stage macOS Dock Icon Bounce using GSAP Timeline
 * Emulates the exact gravitational decay of macOS app launch bounce.
 */
export const triggerMacDockBounce = (element: HTMLElement, onComplete?: () => void) => {
  if (!element) return;

  // Kill any running bounce animations on this element
  gsap.killTweensOf(element);

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(element, { clearProps: "y" });
      onComplete?.();
    },
  });

  tl.to(element, {
    y: -24,
    duration: 0.18,
    ease: "power2.out",
  })
    .to(element, {
      y: 0,
      duration: 0.18,
      ease: "power2.in",
    })
    .to(element, {
      y: -12,
      duration: 0.14,
      ease: "power2.out",
    })
    .to(element, {
      y: 0,
      duration: 0.14,
      ease: "power2.in",
    })
    .to(element, {
      y: -4,
      duration: 0.1,
      ease: "power2.out",
    })
    .to(element, {
      y: 0,
      duration: 0.1,
      ease: "power2.in",
    });

  return tl;
};

/**
 * Hardware-Accelerated Window Minimize Swoop (Dock trajectory)
 */
export const animateMacWindowMinimize = (
  element: HTMLElement,
  dockTargetX: number,
  onComplete?: () => void
) => {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const deltaX = dockTargetX - (rect.left + rect.width / 2);
  const deltaY = window.innerHeight - rect.top;

  return gsap.to(element, {
    x: `+=${deltaX * 0.45}`,
    y: `+=${deltaY * 0.85}`,
    scaleX: 0.12,
    scaleY: 0.04,
    opacity: 0,
    duration: 0.26,
    ease: "power2.in",
    force3D: true,
    transformOrigin: "center bottom",
    onComplete,
  });
};

/**
 * Hardware-Accelerated Window Launch / Restore
 */
export const animateMacWindowRestore = (
  element: HTMLElement,
  onComplete?: () => void
) => {
  if (!element) return;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.85,
      y: 30,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.24,
      ease: "power3.out",
      force3D: true,
      onComplete,
    }
  );
};
