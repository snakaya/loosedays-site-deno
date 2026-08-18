import { useEffect, useRef, useState } from "preact/hooks";
import {
  filterForCategory,
  filterSkills,
  groupOfSkill,
  sharedCategories,
  Skill,
  skillCategories,
  skillGroups,
  skills,
} from "../../content.tsx";

/** Larger values flatten the perspective so far chips stay readable. */
const FOV = 4.2;
const GOLDEN = Math.PI * (1 + Math.sqrt(5));

interface Vec {
  x: number;
  y: number;
  z: number;
}

const add = (a: Vec, b: Vec): Vec => ({
  x: a.x + b.x,
  y: a.y + b.y,
  z: a.z + b.z,
});
const mul = (a: Vec, k: number): Vec => ({
  x: a.x * k,
  y: a.y * k,
  z: a.z * k,
});
const cross = (a: Vec, b: Vec): Vec => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});
const norm = (a: Vec): Vec => {
  const l = Math.hypot(a.x, a.y, a.z) || 1;
  return { x: a.x / l, y: a.y / l, z: a.z / l };
};

/** Evenly spaced directions on a unit sphere (Fibonacci lattice). */
function spherePoints(n: number): Vec[] {
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i + 0.5) / n * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN * i;
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });
}

/**
 * One spherical cap per filter group, keywords scattered inside their own cap.
 * Position therefore carries meaning: neighbours really are related.
 */
function clusteredLayout(): { positions: Vec[]; centers: Vec[] } {
  const centers = spherePoints(skillGroups.length);
  const positions: Vec[] = new Array(skills.length);

  skillGroups.forEach((group, gi) => {
    const members = skills
      .map((skill, index) => ({ skill, index }))
      .filter(({ skill }) => groupOfSkill(skill) === group);
    if (!members.length) return;

    const c = centers[gi];
    // Any axis not parallel to the cap centre gives us a tangent basis.
    const seed: Vec = Math.abs(c.y) < 0.9
      ? { x: 0, y: 1, z: 0 }
      : { x: 1, y: 0, z: 0 };
    const u = norm(cross(seed, c));
    const v = cross(c, u);
    const spread = Math.min(0.78, 0.34 + members.length * 0.05);

    members.forEach(({ index }, k) => {
      const theta = GOLDEN * k;
      const r = members.length === 1
        ? 0
        : spread * Math.sqrt((k + 0.5) / members.length);
      const tangent = add(mul(u, Math.cos(theta)), mul(v, Math.sin(theta)));
      positions[index] = norm(
        add(mul(c, Math.cos(r)), mul(tangent, Math.sin(r))),
      );
    });
  });

  return { positions, centers };
}

/** Every pair of keywords that share at least one category. */
function buildEdges() {
  const edges: { a: number; b: number; weight: number }[] = [];
  for (let i = 0; i < skills.length; i++) {
    for (let j = i + 1; j < skills.length; j++) {
      const weight = sharedCategories(skills[i], skills[j]);
      if (weight > 0) edges.push({ a: i, b: j, weight });
    }
  }
  return edges;
}

const { positions: LAYOUT, centers: GROUP_CENTERS } = clusteredLayout();
const EDGES = buildEdges();

/**
 * Proposal A's keyword section: the hero's constellation, zoomed in.
 *
 * Keywords sit in the cap of the group they belong to and are wired to every
 * other keyword they share a category with, so the picture is a real map of
 * the skill set rather than decoration. Drag to spin; pick a category and that
 * cluster wires itself into a hub. Falls back to a grid on narrow screens.
 */
export default function KeywordSphere() {
  const wrap = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const chips = useRef<(HTMLButtonElement | null)[]>([]);
  const hub = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);

  const [filter, setFilter] = useState("All");
  const [reading, setReading] = useState<Skill | null>(null);
  const [compact, setCompact] = useState(false);

  // The animation loop reads these without re-subscribing every render.
  const matchRef = useRef<boolean[]>(skills.map(() => true));
  const filterRef = useRef(filter);
  const hoverRef = useRef(-1);

  const visible = filterSkills(filter);
  filterRef.current = filter;
  {
    const names = new Set(visible.map((s) => s.name));
    matchRef.current = skills.map((s) => names.has(s.name));
  }

  const pick = (skill: Skill) => {
    setReading(skill);
    hoverRef.current = skills.indexOf(skill);
  };

  // Measured on the wrapper, which is always laid out — the sphere host is
  // display:none in compact mode and would report a zero-width box.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setCompact(w < 620);
    });
    ro.observe(el);
    setCompact(el.getBoundingClientRect().width < 620);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = host.current;
    const cv = canvas.current;
    if (!el || !cv || compact) return;

    const reduced =
      globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
        false;

    let width = 0;
    let height = 0;
    let radius = 0;

    const projected = LAYOUT.map(() => ({ x: 0, y: 0, z: 0, scale: 1 }));

    let yaw = 0.4;
    let pitch = -0.18;
    let yawVel = 0;
    let pitchVel = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const ctx = cv.getContext("2d");

    const resize = () => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      radius = Math.min(width * 0.40, height * 0.44);
      const dpr = Math.min(globalThis.devicePixelRatio || 1, 2);
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // --- drag to spin ------------------------------------------------
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      yawVel = (e.clientX - lastX) * 0.006;
      pitchVel = (e.clientY - lastY) * 0.004;
      yaw += yawVel;
      pitch = Math.max(-0.7, Math.min(0.7, pitch + pitchVel));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onUp);

    let raf = 0;
    let last = performance.now();
    let running = false;

    const frame = (now: number) => {
      const delta = Math.min((now - last) / 1000, 1 / 20);
      last = now;

      if (!dragging) {
        // Coast, then settle back into the idle drift.
        yawVel *= 0.94;
        pitchVel *= 0.9;
        yaw += yawVel + (reduced ? 0 : delta * 0.11);
        pitch = Math.max(-0.7, Math.min(0.7, pitch + pitchVel));
      }

      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const ox = width / 2;
      const oy = height / 2;
      const hover = hoverRef.current;

      for (let i = 0; i < LAYOUT.length; i++) {
        const p = LAYOUT[i];
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cp - z1 * sp;
        const z2 = p.y * sp + z1 * cp;

        const scale = FOV / (FOV + z2);
        projected[i] = {
          x: ox + x1 * radius * scale,
          y: oy + y2 * radius * scale,
          z: z2,
          scale,
        };

        const chip = chips.current[i];
        if (!chip) continue;
        const matched = matchRef.current[i];
        const depth = (z2 + 1) / 2; // 0 = closest, 1 = furthest
        const lifted = hover === i;
        chip.style.transform = `translate(calc(-50% + ${
          projected[i].x
        }px), calc(-50% + ${projected[i].y}px)) scale(${
          (scale * (lifted ? 1.12 : 1)).toFixed(3)
        })`;
        // Steep falloff: the back hemisphere recedes instead of competing
        // with the labels facing the reader.
        const fade = Math.pow(depth, 1.5);
        chip.style.opacity = String(
          matched
            ? (1 - fade * 0.85).toFixed(3)
            : (0.1 - depth * 0.05).toFixed(3),
        );
        chip.style.zIndex = String(Math.round(1000 - z2 * 500));
        chip.style.pointerEvents = matched && depth < 0.72 ? "auto" : "none";
      }

      // --- group watermarks ------------------------------------------
      for (let g = 0; g < GROUP_CENTERS.length; g++) {
        const label = labels.current[g];
        if (!label) continue;
        const c = GROUP_CENTERS[g];
        const x1 = c.x * cy + c.z * sy;
        const z1 = -c.x * sy + c.z * cy;
        const y2 = c.y * cp - z1 * sp;
        const z2 = c.y * sp + z1 * cp;
        const scale = FOV / (FOV + z2);
        label.style.transform = `translate(calc(-50% + ${
          ox + x1 * radius * scale
        }px), calc(-50% + ${oy + y2 * radius * scale}px)) scale(${
          scale.toFixed(3)
        })`;
        const front = 1 - (z2 + 1) / 2;
        const selected = filterRef.current === skillGroups[g];
        const dimmed = filterRef.current !== "All" && !selected;
        label.style.opacity = String(
          (front * front * (selected ? 0.42 : dimmed ? 0.05 : 0.16)).toFixed(3),
        );
      }

      // --- links -----------------------------------------------------
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        const filtered = filterRef.current !== "All";

        for (const { a, b, weight } of EDGES) {
          const inScope = matchRef.current[a] && matchRef.current[b];
          if (filtered && !inScope) continue;

          const touchesHover = hover === a || hover === b;
          const pa = projected[a];
          const pb = projected[b];
          const depth = 1 - (pa.z + pb.z + 2) / 4; // 1 = both in front
          const strength = Math.min(weight / 2, 1);

          if (touchesHover) {
            ctx.strokeStyle = `rgba(125, 211, 252, ${
              (0.35 + depth * 0.55).toFixed(3)
            })`;
            ctx.lineWidth = 1.4;
          } else {
            const alpha = (hover >= 0 ? 0.1 : 0.3) * depth *
              (0.55 + strength * 0.45);
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
          }
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }

        // Wire the selected cluster into the hub in the middle.
        if (filtered) {
          for (let i = 0; i < LAYOUT.length; i++) {
            if (!matchRef.current[i]) continue;
            const p = projected[i];
            const alpha = 0.7 - (p.z + 1) / 2 * 0.45;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ox, oy);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      if (hub.current) {
        hub.current.style.opacity = filterRef.current === "All" ? "0" : "1";
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let onScreen = true;
    const sync = () => (onScreen && !document.hidden ? start() : stop());
    const io = new IntersectionObserver((entries) => {
      onScreen = entries.some((e) => e.isIntersecting);
      sync();
    }, { threshold: 0 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    // Paint one frame up front so a paused tab never shows an empty box.
    frame(performance.now());
    stop();
    sync();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, [compact]);

  const chipClass = (matched: boolean) =>
    `absolute left-0 top-0 flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm transition-colors duration-200 ${
      matched
        ? "bg-white/[0.06] text-slate-100 ring-1 ring-white/15 hover:bg-sky-400/20 hover:ring-sky-300/70 hover:text-white"
        : "bg-transparent text-slate-600 ring-1 ring-white/5"
    }`;

  return (
    <div ref={wrap}>
      <div class="mb-8 flex flex-wrap justify-center gap-2">
        {skillCategories.map((cat) => (
          <button
            type="button"
            onClick={() => {
              setFilter(cat);
              setReading(null);
              hoverRef.current = -1;
            }}
            class={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
              filter === cat
                ? "bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/25"
                : "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- the sphere ------------------------------------------------ */}
      <div
        ref={host}
        class={`relative mx-auto h-[clamp(460px,66vh,680px)] w-full max-w-4xl touch-none select-none ${
          compact ? "hidden" : ""
        }`}
      >
        <canvas ref={canvas} class="absolute inset-0 h-full w-full" />

        {/* Group watermarks — the caps each cluster sits in. */}
        {skillGroups.map((group, g) => (
          <div
            key={group}
            ref={(node) => {
              labels.current[g] = node;
            }}
            aria-hidden="true"
            class="pointer-events-none absolute left-0 top-0 whitespace-nowrap text-base font-semibold uppercase tracking-[0.36em] text-slate-300 opacity-0 sm:text-lg"
            style="transform: translate(-50%, -50%);"
          >
            {group}
          </div>
        ))}

        {/* Hub that the selected cluster wires into. */}
        <div
          ref={hub}
          class="pointer-events-none absolute left-1/2 top-1/2 z-[1200] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-200 opacity-0 ring-1 ring-sky-400/50 backdrop-blur-sm transition-opacity duration-300"
        >
          {filter}
        </div>

        {skills.map((skill, i) => (
          <button
            type="button"
            key={skill.name}
            ref={(node) => {
              chips.current[i] = node;
            }}
            class={chipClass(matchRef.current[i])}
            style="transform: translate(-50%, -50%); opacity: 0;"
            onPointerEnter={() => pick(skill)}
            onPointerLeave={() => {
              hoverRef.current = -1;
            }}
            onClick={() => pick(skill)}
          >
            {skill.icon}
            {skill.name}
          </button>
        ))}
      </div>

      {/* --- compact fallback ------------------------------------------ */}
      {compact && (
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {visible.map((skill) => (
            <button
              type="button"
              key={skill.name}
              onClick={() => setReading(skill)}
              class="flex items-center rounded-lg bg-white/[0.03] px-3 py-2.5 text-left text-sm text-slate-200 ring-1 ring-white/10 transition-colors duration-200 hover:bg-sky-400/10 hover:ring-sky-400/60"
            >
              {skill.icon}
              <span class="truncate">{skill.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* --- readout ---------------------------------------------------- */}
      <div class="mt-6 flex min-h-14 flex-col items-center justify-center gap-2 text-center">
        {reading
          ? (
            <>
              <p class="text-sm font-medium text-white">{reading.name}</p>
              <div class="flex flex-wrap justify-center gap-1.5">
                {reading.category.map((c) => {
                  const target = filterForCategory(c);
                  return target
                    ? (
                      <button
                        type="button"
                        onClick={() => {
                          setFilter(target);
                          hoverRef.current = -1;
                        }}
                        title={`Filter by ${target}`}
                        class="rounded-full bg-sky-400/15 px-2.5 py-0.5 text-[11px] font-medium text-sky-200 ring-1 ring-transparent transition-colors duration-200 hover:bg-sky-400 hover:text-slate-950"
                      >
                        {c}
                      </button>
                    )
                    : (
                      <span class="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
                        {c}
                      </span>
                    );
                })}
              </div>
            </>
          )
          : (
            <p class="text-xs text-slate-500">
              {visible.length} keywords{filter !== "All" ? ` in ${filter}` : ""}
              {compact
                ? " · tap one for its categories"
                : " · drag to spin · lines join keywords that share a category"}
            </p>
          )}
      </div>
    </div>
  );
}
