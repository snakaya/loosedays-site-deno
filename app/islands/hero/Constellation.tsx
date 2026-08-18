import { useEffect, useRef } from "preact/hooks";
import {
  createLoop,
  damp,
  observeSize,
  pixelRatio,
  prefersReducedMotion,
  supportsWebGL,
} from "../../lib/three-runtime.ts";

interface Props {
  /** Number of nodes. Lowered automatically on small screens. */
  count?: number;
}

/**
 * Proposal A hero: a drifting constellation of nodes that links neighbours
 * with fading edges, tilted by the pointer. Reads as "connected systems".
 */
export default function Constellation({ count = 150 }: Props) {
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
      const nodes = globalThis.innerWidth < 640
        ? Math.round(count * 0.55)
        : count;
      const spread = new THREE.Vector3(34, 20, 16);
      const linkDistance = 6.4;
      const maxLinks = nodes * 8;

      const canvas = document.createElement("canvas");
      canvas.style.cssText = "width:100%;height:100%;display:block";
      el.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(pixelRatio());
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x05070f, 0.026);

      const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 200);
      camera.position.set(0, 0, 30);

      const group = new THREE.Group();
      scene.add(group);

      // --- nodes -------------------------------------------------------
      const positions = new Float32Array(nodes * 3);
      const velocities = new Float32Array(nodes * 3);
      const sizes = new Float32Array(nodes);
      const tints = new Float32Array(nodes * 3);

      const cool = new THREE.Color("#7dd3fc");
      const warm = new THREE.Color("#818cf8");
      const tmp = new THREE.Color();

      for (let i = 0; i < nodes; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread.x;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread.z;
        velocities[i * 3] = (Math.random() - 0.5) * 0.55;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.45;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
        sizes[i] = 6 + Math.random() * 16;
        tmp.copy(cool).lerp(warm, Math.random());
        tints[i * 3] = tmp.r;
        tints[i * 3 + 1] = tmp.g;
        tints[i * 3 + 2] = tmp.b;
      }

      // Round sprite so points are dots, not squares.
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 64;
      const sctx = sprite.getContext("2d")!;
      const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.35, "rgba(255,255,255,0.75)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 64, 64);
      const spriteTexture = new THREE.CanvasTexture(sprite);

      const pointGeometry = new THREE.BufferGeometry();
      pointGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      pointGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      pointGeometry.setAttribute("aTint", new THREE.BufferAttribute(tints, 3));

      const pointMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: spriteTexture },
          uScale: { value: 1 },
        },
        vertexShader: `
          attribute float aSize;
          attribute vec3 aTint;
          uniform float uScale;
          varying vec3 vTint;
          varying float vDepth;
          void main() {
            vTint = aTint;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vDepth = clamp(1.0 - (-mv.z - 14.0) / 34.0, 0.15, 1.0);
            gl_PointSize = aSize * uScale / max(-mv.z, 1.0) * 24.0;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          varying vec3 vTint;
          varying float vDepth;
          void main() {
            float a = texture2D(uTexture, gl_PointCoord).a;
            if (a < 0.01) discard;
            gl_FragColor = vec4(vTint, a * vDepth);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(pointGeometry, pointMaterial);
      group.add(points);

      // --- links -------------------------------------------------------
      const linkPositions = new Float32Array(maxLinks * 6);
      const linkColors = new Float32Array(maxLinks * 6);
      const linkGeometry = new THREE.BufferGeometry();
      linkGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(linkPositions, 3).setUsage(
          THREE.DynamicDrawUsage,
        ),
      );
      linkGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(linkColors, 3).setUsage(
          THREE.DynamicDrawUsage,
        ),
      );
      const links = new THREE.LineSegments(
        linkGeometry,
        new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      group.add(links);

      // --- interaction --------------------------------------------------
      const pointer = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };
      const onPointerMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / globalThis.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / globalThis.innerHeight) * 2 - 1;
      };
      globalThis.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
      cleanups.push(() =>
        globalThis.removeEventListener("pointermove", onPointerMove)
      );

      cleanups.push(observeSize(el, (w, h) => {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        pointMaterial.uniforms.uScale.value = Math.min(h / 700, 1.4);
      }));

      const half = { x: spread.x / 2, y: spread.y / 2, z: spread.z / 2 };

      cleanups.push(createLoop(el, (delta, elapsed) => {
        const step = reduced ? 0 : delta;

        for (let i = 0; i < nodes; i++) {
          const i3 = i * 3;
          positions[i3] += velocities[i3] * step;
          positions[i3 + 1] += velocities[i3 + 1] * step;
          positions[i3 + 2] += velocities[i3 + 2] * step;
          // Bounce inside the box so the field never thins out.
          if (Math.abs(positions[i3]) > half.x) velocities[i3] *= -1;
          if (Math.abs(positions[i3 + 1]) > half.y) velocities[i3 + 1] *= -1;
          if (Math.abs(positions[i3 + 2]) > half.z) velocities[i3 + 2] *= -1;
        }
        pointGeometry.attributes.position.needsUpdate = true;

        let n = 0;
        for (let i = 0; i < nodes && n < maxLinks; i++) {
          const i3 = i * 3;
          for (let j = i + 1; j < nodes && n < maxLinks; j++) {
            const j3 = j * 3;
            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            const d2 = dx * dx + dy * dy + dz * dz;
            if (d2 > linkDistance * linkDistance) continue;
            const strength = 1 - Math.sqrt(d2) / linkDistance;
            const o = n * 6;
            linkPositions[o] = positions[i3];
            linkPositions[o + 1] = positions[i3 + 1];
            linkPositions[o + 2] = positions[i3 + 2];
            linkPositions[o + 3] = positions[j3];
            linkPositions[o + 4] = positions[j3 + 1];
            linkPositions[o + 5] = positions[j3 + 2];
            for (let k = 0; k < 2; k++) {
              const c = o + k * 3;
              const src = k === 0 ? i3 : j3;
              linkColors[c] = tints[src] * strength;
              linkColors[c + 1] = tints[src + 1] * strength;
              linkColors[c + 2] = tints[src + 2] * strength;
            }
            n++;
          }
        }
        linkGeometry.setDrawRange(0, n * 2);
        linkGeometry.attributes.position.needsUpdate = true;
        linkGeometry.attributes.color.needsUpdate = true;

        eased.x = damp(eased.x, pointer.x, 2.2, delta);
        eased.y = damp(eased.y, pointer.y, 2.2, delta);
        group.rotation.y = eased.x * 0.32 + (reduced ? 0 : elapsed * 0.035);
        group.rotation.x = -eased.y * 0.2;
        camera.position.x = eased.x * 2.2;
        camera.position.y = -eased.y * 1.4;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }));

      cleanups.push(() => {
        canvas.remove();
        renderer.dispose();
        pointGeometry.dispose();
        linkGeometry.dispose();
        pointMaterial.dispose();
        (links.material as { dispose(): void }).dispose();
        spriteTexture.dispose();
      });
    })();

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, [count]);

  return (
    <div
      ref={host}
      aria-hidden="true"
      class="absolute inset-0 pointer-events-none"
    />
  );
}
