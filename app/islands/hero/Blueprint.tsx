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
 * Proposal C hero: glowing wireframe solids over a receding grid plane —
 * an engineering schematic that happens to move.
 */
export default function Blueprint() {
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
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(pixelRatio());
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x03060c, 14, 46);

      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
      camera.position.set(0, 1.6, 15);

      const cyan = 0x22d3ee;
      const amber = 0xfbbf24;

      const rig = new THREE.Group();
      scene.add(rig);

      const wire = (
        geometry: InstanceType<typeof THREE.BufferGeometry>,
        color: number,
        opacity: number,
      ) => {
        const edges = new THREE.EdgesGeometry(geometry, 1);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity,
            depthWrite: false,
          }),
        );
        geometry.dispose();
        return line;
      };

      // Central knot — the "system".
      const knot = wire(
        new THREE.TorusKnotGeometry(3.1, 0.9, 150, 8, 2, 3),
        cyan,
        0.5,
      );
      rig.add(knot);

      // Containing shell.
      const shell = wire(new THREE.IcosahedronGeometry(6.2, 1), cyan, 0.12);
      rig.add(shell);

      // Amber accent octahedron.
      const accent = wire(new THREE.OctahedronGeometry(1.5, 0), amber, 0.6);
      accent.position.set(7.6, 3.2, -3);
      rig.add(accent);

      const accent2 = wire(new THREE.OctahedronGeometry(1.05, 0), amber, 0.45);
      accent2.position.set(-8.2, -3.4, -2);
      rig.add(accent2);

      // Ground grid receding into the fog.
      const grid = new THREE.GridHelper(90, 45, cyan, 0x0e7490);
      const gridMaterial = grid.material as
        & InstanceType<
          typeof THREE.Material
        >
        & { opacity: number; transparent: boolean };
      gridMaterial.transparent = true;
      gridMaterial.opacity = 0.16;
      grid.position.y = -7.5;
      scene.add(grid);

      // Fibonacci-sphere markers riding the shell.
      const markerGeometry = new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 42 }, (_, i) => {
          const phi = Math.acos(1 - 2 * (i + 0.5) / 42);
          const theta = Math.PI * (1 + Math.sqrt(5)) * i;
          return new THREE.Vector3(
            Math.cos(theta) * Math.sin(phi),
            Math.cos(phi),
            Math.sin(theta) * Math.sin(phi),
          ).multiplyScalar(6.2);
        }),
      );
      const markers = new THREE.Points(
        markerGeometry,
        new THREE.PointsMaterial({
          color: amber,
          size: 0.14,
          transparent: true,
          opacity: 0.85,
        }),
      );
      rig.add(markers);

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
        // Pull back on narrow viewports; on wide ones slide the solid to the
        // right so the headline column keeps a quiet background.
        const wide = w >= 1024;
        camera.position.z = w < 720 ? 22 : 16;
        rig.position.x = wide ? 5.8 : 0;
        rig.scale.setScalar(wide ? 0.85 : 0.7);
        camera.updateProjectionMatrix();
      }));

      cleanups.push(createLoop(el, (delta, elapsed) => {
        const t = reduced ? 0 : elapsed;
        knot.rotation.x = t * 0.14;
        knot.rotation.y = t * 0.21;
        shell.rotation.y = -t * 0.06;
        shell.rotation.z = t * 0.03;
        markers.rotation.y = -t * 0.06;
        accent.rotation.x = t * 0.5;
        accent.rotation.y = t * 0.35;
        accent.position.y = 3.2 + Math.sin(t * 0.7) * 0.6;
        accent2.rotation.y = -t * 0.45;
        accent2.position.y = -3.4 + Math.cos(t * 0.55) * 0.5;

        eased.x = damp(eased.x, pointer.x, 2, delta);
        eased.y = damp(eased.y, pointer.y, 2, delta);
        rig.rotation.y = eased.x * 0.25;
        rig.rotation.x = -eased.y * 0.15;
        camera.position.y = 1.6 - eased.y * 1.2;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }));

      cleanups.push(() => {
        canvas.remove();
        renderer.dispose();
        scene.traverse((obj: unknown) => {
          const node = obj as {
            geometry?: { dispose(): void };
            material?: { dispose(): void };
          };
          node.geometry?.dispose();
          node.material?.dispose();
        });
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
