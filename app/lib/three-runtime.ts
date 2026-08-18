/**
 * Small helpers shared by the WebGL hero islands.
 *
 * Every hero follows the same contract: only run in the browser, bail out to
 * the CSS background when WebGL or motion is unavailable, cap the pixel ratio,
 * and stop the animation loop while the canvas is off-screen or the tab is
 * hidden.
 */

export function prefersReducedMotion(): boolean {
  return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
    false;
}

export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function pixelRatio(max = 1.75): number {
  return Math.min(globalThis.devicePixelRatio || 1, max);
}

/**
 * Runs `frame` on requestAnimationFrame while `el` is visible and the document
 * is in the foreground. Returns a disposer.
 */
export function createLoop(
  el: Element,
  frame: (deltaSeconds: number, elapsedSeconds: number) => void,
): () => void {
  let raf = 0;
  let last = performance.now();
  let elapsed = 0;
  let onScreen = true;
  let running = false;

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    const delta = Math.min((now - last) / 1000, 1 / 20);
    last = now;
    elapsed += delta;
    frame(delta, elapsed);
  };

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
  };

  const sync = () => {
    if (onScreen && !document.hidden) start();
    else stop();
  };

  const observer = new IntersectionObserver((entries) => {
    onScreen = entries.some((e) => e.isIntersecting);
    sync();
  }, { threshold: 0 });
  observer.observe(el);

  document.addEventListener("visibilitychange", sync);

  // Always paint one frame so a paused/hidden tab never shows a blank canvas.
  frame(0, 0);
  sync();

  return () => {
    stop();
    observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
  };
}

/** Calls `onResize` with CSS pixel dimensions whenever the element changes size. */
export function observeSize(
  el: Element,
  onResize: (width: number, height: number) => void,
): () => void {
  const observer = new ResizeObserver(() => {
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) onResize(rect.width, rect.height);
  });
  observer.observe(el);
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) onResize(rect.width, rect.height);
  return () => observer.disconnect();
}

/** Smoothly eases `current` toward `target`, frame-rate independent. */
export function damp(
  current: number,
  target: number,
  lambda: number,
  delta: number,
): number {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}
