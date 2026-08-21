import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  src: string;
  poster: string;
  /** Described for screen readers. */
  label: string;
  /**
   * Offer a sound toggle. Playback always starts muted — browsers require it —
   * but clips with a soundtrack worth hearing get a control.
   */
  sound?: boolean;
  class?: string;
}

/**
 * A product loop that only downloads and plays while it is on screen, and
 * never starts at all when the visitor asked for reduced motion.
 */
export default function AutoVideo(
  { src, poster, label, sound = false, class: className }: Props,
) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

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
          // Never let sound follow the visitor off the section.
          if (!el.muted) {
            el.muted = true;
            setMuted(true);
          }
        }
      }
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted) el.play().catch(() => {});
  };

  return (
    <div class="relative">
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
      {sound && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Unmute" : "Mute"}
          aria-pressed={!muted}
          class="absolute bottom-2.5 right-2.5 rounded-full bg-black/55 p-2 text-white/85 ring-1 ring-white/20 backdrop-blur-sm transition-colors duration-200 hover:bg-black/75 hover:text-white"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M11 5 6 9H3v6h3l5 4z" />
            {muted
              ? <path d="m16 9 5 6m0-6-5 6" />
              : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" />}
          </svg>
        </button>
      )}
    </div>
  );
}
