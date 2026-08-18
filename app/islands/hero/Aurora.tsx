import { useEffect, useRef } from "preact/hooks";
import {
  createLoop,
  damp,
  observeSize,
  pixelRatio,
  prefersReducedMotion,
  supportsWebGL,
} from "../../lib/three-runtime.ts";

/**
 * Proposal B hero: a single full-bleed plane running a flowing simplex-noise
 * gradient. Soft, editorial, and cheap — one draw call, no geometry.
 */
export default function Aurora() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || !supportsWebGL()) return;

    let disposed = false;
    const cleanups: (() => void)[] = [];

    (async () => {
      const THREE = await import("three");
      if (disposed || !host.current) return;

      const reduced = prefersReducedMotion();

      const canvas = document.createElement("canvas");
      canvas.style.cssText = "width:100%;height:100%;display:block";
      el.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
      });
      renderer.setPixelRatio(pixelRatio(1.5));

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        uTime: { value: 0 },
        uAspect: { value: 1 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uDark: { value: 0 },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform float uAspect;
          uniform float uDark;
          uniform vec2 uPointer;

          // Ashima simplex noise (public domain / MIT).
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                               -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                                    dot(x12.zw, x12.zw)), 0.0);
            m = m * m; m = m * m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          float fbm(vec2 p) {
            float v = 0.0;
            float amp = 0.5;
            for (int i = 0; i < 3; i++) {
              v += amp * snoise(p);
              p *= 2.02;
              amp *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = vec2((uv.x - 0.5) * uAspect, uv.y - 0.5);
            p += uPointer * 0.12;

            float t = uTime * 0.045;
            float warp = fbm(p * 0.75 + vec2(t, -t * 0.7));
            float field = fbm(p * 1.05 + warp * 0.55 + vec2(-t * 0.5, t * 0.35));
            float band = fbm(p * 1.6 - warp * 0.35 + vec2(t * 0.9, t * 0.2));

            // Light palette: porcelain -> sky -> indigo -> violet mist.
            vec3 lBase   = vec3(0.976, 0.980, 0.992);
            vec3 lSky    = vec3(0.639, 0.800, 0.988);
            vec3 lIndigo = vec3(0.404, 0.435, 0.945);
            vec3 lViolet = vec3(0.855, 0.760, 0.996);

            vec3 light = mix(lBase, lSky, smoothstep(-0.7, 0.8, field));
            light = mix(light, lIndigo, smoothstep(0.1, 1.2, field + band * 0.3) * 0.55);
            light = mix(light, lViolet, smoothstep(0.15, 1.1, band) * 0.4);

            // Dark palette: ink -> deep indigo -> teal glow.
            vec3 dBase   = vec3(0.043, 0.047, 0.086);
            vec3 dIndigo = vec3(0.153, 0.157, 0.427);
            vec3 dTeal   = vec3(0.204, 0.647, 0.741);
            vec3 dViolet = vec3(0.478, 0.310, 0.792);

            vec3 dark = mix(dBase, dIndigo, smoothstep(-0.75, 0.85, field));
            dark = mix(dark, dViolet, smoothstep(0.15, 1.2, field + band * 0.28) * 0.5);
            dark = mix(dark, dTeal, smoothstep(0.3, 1.25, band) * 0.32);

            vec3 color = mix(light, dark, uDark);

            // Vignette keeps the type readable near the edges.
            float vig = smoothstep(1.15, 0.25, length(p));
            color *= mix(0.86, 1.0, vig);

            // Dither away banding in the wide gradients.
            float grain = fract(sin(dot(uv * 1024.0, vec2(12.9898, 78.233))) * 43758.5453);
            color += (grain - 0.5) * 0.012;

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });

      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      quad.frustumCulled = false;
      scene.add(quad);

      const pointer = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };
      const onPointerMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / globalThis.innerWidth) * 2 - 1;
        pointer.y = 1 - (e.clientY / globalThis.innerHeight) * 2;
      };
      globalThis.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
      cleanups.push(() =>
        globalThis.removeEventListener("pointermove", onPointerMove)
      );

      // Follow the site-wide dark-mode class.
      const syncTheme = () => {
        uniforms.uDark.value =
          document.documentElement.classList.contains("dark") ? 1 : 0;
      };
      syncTheme();
      const themeObserver = new MutationObserver(syncTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      cleanups.push(() => themeObserver.disconnect());

      cleanups.push(observeSize(el, (w, h) => {
        renderer.setSize(w, h, false);
        uniforms.uAspect.value = w / h;
      }));

      cleanups.push(createLoop(el, (delta, elapsed) => {
        uniforms.uTime.value = reduced ? 0 : elapsed * 0.65;
        eased.x = damp(eased.x, pointer.x, 1.6, delta);
        eased.y = damp(eased.y, pointer.y, 1.6, delta);
        uniforms.uPointer.value.set(eased.x, eased.y);
        renderer.render(scene, camera);
      }));

      cleanups.push(() => {
        canvas.remove();
        renderer.dispose();
        quad.geometry.dispose();
        material.dispose();
      });
    })();

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div
      ref={host}
      aria-hidden="true"
      class="absolute inset-0 pointer-events-none"
    />
  );
}
