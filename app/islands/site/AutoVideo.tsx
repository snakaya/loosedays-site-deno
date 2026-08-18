import { useEffect, useRef } from "preact/hooks";

interface Props {
  src: string;
  poster: string;
  /** Described for screen readers — these clips carry no audio. */
  label: string;
  class?: string;
}

/**
 * A silent product loop that only downloads and plays while it is on screen,
 * and never starts at all when the visitor asked for reduced motion.
 */
export default function AutoVideo(
  { src, poster, label, class: className }: Props,
) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return; // the poster frame stands in for the clip
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!el.src) el.src = src;
          el.play().catch(() => {
            // Autoplay can still be refused; the poster remains.
          });
        } else {
          el.pause();
        }
      }
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      class={className}
    />
  );
}
