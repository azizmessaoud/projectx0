/* Neural field behind the hero: a point-cloud brain inside a network sphere whose labelled nodes are
 * Aziz's skills. Signals travel along the sphere; clicking sends one and lights the brain.
 * Pausable, static under reduced motion, lighter on small screens, stops when off-screen. */
import { useEffect, useRef } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";
type ShellNode = { x: number; y: number; z: number; phase: number; drift: number; label?: string; bright: boolean };
type Projected = { x: number; y: number; z: number; scale: number; influence: number; excitation: number };
type Edge = { from: number; to: number; distance: number };
type Pulse = { from: number; to: number; progress: number; speed: number; strength: number; hops: number };
type Pointer = { tx: number; ty: number; x: number; y: number; active: boolean };

const settings = {
  mobile: { shell: 34, brain: 420, neighbors: 2, fps: 30, dpr: 1, pull: 0.04, labels: false },
  tablet: { shell: 48, brain: 800, neighbors: 3, fps: 45, dpr: 1.5, pull: 0.07, labels: false },
  desktop: { shell: 64, brain: 1400, neighbors: 3, fps: 60, dpr: 1.75, pull: 0.1, labels: true },
} satisfies Record<Breakpoint, { shell: number; brain: number; neighbors: number; fps: number; dpr: number; pull: number; labels: boolean }>;

const MAX_HOPS = 4;
const MAX_PULSES = 28;
const BRAIN_SCALE = 1.4;
const INTERACTIVE_SELECTOR = "a, button, input, select, textarea, summary, [role='button'], [contenteditable='true']";

function breakpointFor(width: number): Breakpoint {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function hash01(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

/* Points on a brain-like surface: two hemispheres split by a fissure, a cerebellum, and a stem.
 * Screen y grows downward, z grows toward the viewer before rotation. */
function seedBrain(count: number) {
  const points = new Float32Array(count * 3);
  let filled = 0;
  for (let k = 0; filled < count && k < count * 30; k += 1) {
    const u = hash01(k, 11);
    const v = hash01(k, 12);
    const w = hash01(k, 13);
    let x: number;
    let y: number;
    let z: number;
    if (w < 0.95) {
      const hemisphere = w < 0.86;
      const side = w < 0.43 ? -1 : 1;
      const [cx, cy, cz, rx, ry, rz] = hemisphere ? [side * 0.13, -0.04, 0.02, 0.27, 0.3, 0.46] : [0, 0.24, -0.3, 0.26, 0.11, 0.15];
      const theta = u * Math.PI * 2;
      const cosPhi = v * 2 - 1;
      const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
      const dx = sinPhi * Math.cos(theta);
      const dy = cosPhi;
      const dz = sinPhi * Math.sin(theta);
      const ripple = hemisphere ? 1 + 0.07 * Math.sin(dz * 18 + dy * 7) * Math.sin(dy * 16 - dx * 5) : 1 + 0.04 * Math.sin(dx * 30);
      x = cx + dx * rx * ripple;
      y = cy + dy * ry * ripple;
      z = cz + dz * rz * ripple;
      if (hemisphere && (side * x < 0.025 || y > cy + ry * 0.78)) continue;
    } else {
      const t = u;
      x = (v - 0.5) * 0.08;
      y = 0.16 + t * 0.34;
      z = -0.1 - t * 0.1 + (hash01(k, 14) - 0.5) * 0.06;
    }
    points[filled * 3] = x * BRAIN_SCALE;
    points[filled * 3 + 1] = y * BRAIN_SCALE;
    points[filled * 3 + 2] = z * BRAIN_SCALE;
    filled += 1;
  }
  return points.subarray(0, filled * 3);
}

/* Even nodes on a sphere (Fibonacci lattice) with a little jitter; labels spread across it. */
function seedShell(count: number, labels: readonly string[]) {
  const nodes: ShellNode[] = Array.from({ length: count }, (_, index) => {
    const y = 1 - ((index + 0.5) / count) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = index * 2.399963;
    const radius = 0.92 + hash01(index, 21) * 0.12;
    return {
      x: Math.cos(theta) * ring * radius,
      y: y * radius,
      z: Math.sin(theta) * ring * radius,
      phase: index * 0.73,
      drift: 0.55 + hash01(index, 5) * 0.7,
      bright: hash01(index, 22) > 0.8,
    };
  });
  if (labels.length) {
    const step = count / labels.length;
    labels.forEach((label, i) => {
      nodes[Math.floor(i * step + step / 2) % count].label = label;
    });
  }
  return nodes;
}

export default function NeuralField({ paused = false, labels = [] }: { paused?: boolean; labels?: readonly string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelKey = labels.join("|");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ctx = context;
    const skillLabels = labelKey ? labelKey.split("|") : [];

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const pointer: Pointer = { tx: -900, ty: -900, x: -900, y: -900, active: false };
    const pulses: Pulse[] = [];
    const excitation = new Map<number, number>();
    let nodes: ShellNode[] = [];
    let projected: Projected[] = [];
    let edges: Edge[] = [];
    let adjacency: Edge[][] = [];
    let brain = new Float32Array(0);
    let brainScreen = new Float32Array(0);
    let brainFlash = 0;
    let width = 0;
    let height = 0;
    let breakpoint: Breakpoint = "desktop";
    let frame = 0;
    let animationId = 0;
    let resizeFrame = 0;
    let lastFrameTime = 0;
    let reducedMotion = motionQuery.matches;
    let documentVisible = document.visibilityState === "visible";
    let inViewport = true;

    const canAnimate = () => !paused && !reducedMotion && documentVisible && inViewport;
    const canvasPoint = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top, inside: event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom };
    };
    const excite = (index: number, strength: number) => excitation.set(index, Math.min(1, (excitation.get(index) ?? 0) + strength));
    const neighborsOf = (index: number) => adjacency[index] ?? [];

    const buildEdges = () => {
      const nextEdges: Edge[] = [];
      const seen = new Set<string>();
      const maxNeighbors = settings[breakpoint].neighbors;
      for (let i = 0; i < nodes.length; i += 1) {
        const candidates: Edge[] = [];
        for (let j = 0; j < nodes.length; j += 1) {
          if (i === j) continue;
          const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y, nodes[i].z - nodes[j].z);
          if (distance < 0.75) candidates.push({ from: i, to: j, distance });
        }
        candidates.sort((a, b) => a.distance - b.distance).slice(0, maxNeighbors).forEach((edge) => {
          const key = edge.from < edge.to ? `${edge.from}-${edge.to}` : `${edge.to}-${edge.from}`;
          if (seen.has(key)) return;
          seen.add(key);
          nextEdges.push(edge.from < edge.to ? edge : { from: edge.to, to: edge.from, distance: edge.distance });
        });
      }
      edges = nextEdges;
      adjacency = Array.from({ length: nodes.length }, () => []);
      edges.forEach((edge) => { adjacency[edge.from].push(edge); adjacency[edge.to].push(edge); });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      breakpoint = breakpointFor(width);
      const cfg = settings[breakpoint];
      const dpr = Math.min(window.devicePixelRatio || 1, cfg.dpr);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = seedShell(cfg.shell, cfg.labels ? skillLabels : []);
      projected = nodes.map(() => ({ x: 0, y: 0, z: 0, scale: 1, influence: 0, excitation: 0 }));
      brain = seedBrain(reducedMotion ? Math.round(cfg.brain * 0.8) : cfg.brain);
      brainScreen = new Float32Array(brain.length);
      buildEdges(); pulses.length = 0; excitation.clear();
    };

    // Rotation and perspective shared by the sphere and the brain; `project` writes into `out`.
    const view = { cosY: 1, sinY: 0, brainCosY: 0, brainSinY: 1, cosX: 1, sinX: 0, cx: 0, cy: 0, size: 0, focal: 0 };
    const updateView = (time: number, motion: number) => {
      const orbit = reducedMotion ? 0.55 : time * 0.11;
      const tilt = 0.32 + Math.sin(time * 0.07) * 0.05 * motion;
      view.cosY = Math.cos(orbit); view.sinY = Math.sin(orbit);
      // The brain stays mostly side-on (its long axis across the screen) and sways instead of spinning.
      const brainYaw = Math.PI / 2 + (reducedMotion ? 0.35 : Math.sin(time * 0.18) * 0.45);
      view.brainCosY = Math.cos(brainYaw); view.brainSinY = Math.sin(brainYaw);
      view.cosX = Math.cos(tilt); view.sinX = Math.sin(tilt);
      view.size = Math.min(width, height);
      view.focal = view.size * 1.15;
      view.cx = width * (breakpoint === "desktop" ? 0.76 : 0.6);
      view.cy = height * (breakpoint === "mobile" ? 0.3 : 0.43);
    };
    const out = { x: 0, y: 0, z: 0, scale: 1 };
    const project = (x: number, y: number, z: number, cosY = view.cosY, sinY = view.sinY) => {
      const rx = x * cosY - z * sinY;
      const rz0 = x * sinY + z * cosY;
      const ry = y * view.cosX - rz0 * view.sinX;
      const rz = y * view.sinX + rz0 * view.cosX;
      const depth = view.focal / (view.focal + rz * view.size * 0.42 + view.size * 0.55);
      out.x = view.cx + rx * depth * view.size * 0.46;
      out.y = view.cy + ry * depth * view.size * 0.46;
      out.z = rz;
      out.scale = depth;
    };

    const queueResize = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(() => { resize(); draw(); }); };

    const updatePointer = () => {
      const ease = pointer.active ? 0.18 : 0.08;
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
    };

    const pointerLive = () => pointer.active && !reducedMotion && !coarsePointerQuery.matches;

    const updateProjected = (time: number) => {
      const cfg = settings[breakpoint];
      const wobble = reducedMotion ? 0 : 0.03;
      const live = pointerLive();
      nodes.forEach((node, index) => {
        project(
          node.x + Math.sin(time * 0.42 * node.drift + node.phase) * wobble,
          node.y + Math.cos(time * 0.31 * node.drift + node.phase) * wobble,
          node.z + Math.sin(time * 0.24 * node.drift + node.phase) * wobble,
        );
        const distance = Math.hypot(out.x - pointer.x, out.y - pointer.y);
        const influence = live ? Math.max(0, 1 - distance / (180 * out.scale)) : 0;
        const p = projected[index];
        p.x = out.x + (pointer.x - out.x) * influence * cfg.pull;
        p.y = out.y + (pointer.y - out.y) * influence * cfg.pull;
        p.z = out.z; p.scale = out.scale; p.influence = influence;
        p.excitation = excitation.get(index) ?? 0;
      });
      for (let i = 0; i < brain.length; i += 3) {
        project(brain[i], brain[i + 1], brain[i + 2], view.brainCosY, view.brainSinY);
        brainScreen[i] = out.x; brainScreen[i + 1] = out.y; brainScreen[i + 2] = out.scale;
      }
    };

    const closestNode = (x: number, y: number) => projected.reduce((closest, point, index) => {
      const distance = Math.hypot(point.x - x, point.y - y);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });

    const propagate = (pulse: Pulse) => {
      excite(pulse.to, pulse.strength);
      if (pulse.hops >= MAX_HOPS || pulses.length >= MAX_PULSES) return;
      const onward = neighborsOf(pulse.to).filter((edge) => edge.from !== pulse.from && edge.to !== pulse.from);
      if (!onward.length) return;
      const edge = onward[Math.floor(Math.random() * onward.length)];
      const target = edge.from === pulse.to ? edge.to : edge.from;
      pulses.push({ from: pulse.to, to: target, progress: 0, speed: pulse.speed * 1.08, strength: pulse.strength * 0.58, hops: pulse.hops + 1 });
    };

    const sendSignal = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)) return;
      const { x, y, inside } = canvasPoint(event);
      if (paused || reducedMotion || nodes.length < 2 || !inside) return;
      const start = closestNode(x, y).index;
      const fanOut = breakpoint === "desktop" ? 4 : 2;
      neighborsOf(start).slice().sort((a, b) => a.distance - b.distance).slice(0, fanOut).forEach((edge, index) => {
        pulses.push({ from: start, to: edge.from === start ? edge.to : edge.from, progress: index * -0.04, speed: 0.016 + index * 0.002, strength: 1, hops: 0 });
      });
      excite(start, 1);
      brainFlash = 1;
      if (pulses.length > MAX_PULSES) pulses.splice(0, pulses.length - MAX_PULSES);
    };

    // Brain dots grouped into a few depth bands so each band is one fill call.
    const BANDS = 4;
    const drawBrain = () => {
      const live = pointerLive();
      for (let band = 0; band < BANDS; band += 1) {
        const alpha = Math.min(1, 0.32 + band * 0.2 + brainFlash * 0.3);
        ctx.fillStyle = `rgba(66,183,255,${alpha})`;
        ctx.beginPath();
        for (let i = 0; i < brainScreen.length; i += 3) {
          const scale = brainScreen[i + 2];
          const b = Math.max(0, Math.min(BANDS - 1, Math.floor((scale - 0.52) * 14)));
          if (b !== band) continue;
          let size = 1 + scale * 1.7;
          if (live && Math.abs(brainScreen[i] - pointer.x) < 90 && Math.abs(brainScreen[i + 1] - pointer.y) < 90) size += 0.6;
          ctx.rect(brainScreen[i] - size / 2, brainScreen[i + 1] - size / 2, size, size);
        }
        ctx.fill();
      }
    };

    const drawNodes = (order: number[], near: boolean) => {
      order.forEach((index) => {
        const point = projected[index];
        if (near !== point.z < 0) return;
        const node = nodes[index];
        const glow = point.excitation * 0.5 + point.influence * 0.3;
        const radius = (1.2 + point.scale * 3.2 + glow * 3) * (near ? 1 : 0.8);
        const alpha = Math.min(1, 0.2 + point.scale * 0.6 + glow * 0.4);
        if (node.bright || node.label || glow > 0.2) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius * (node.bright ? 3.2 : 2.4), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,215,255,${(0.06 + glow * 0.14) * (near ? 1 : 0.6)})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.bright || node.label ? `rgba(225,242,255,${alpha})` : `rgba(66,183,255,${alpha})`;
        ctx.fill();
      });
    };

    const drawLabels = () => {
      ctx.font = "500 12px 'JetBrains Mono', ui-monospace, monospace";
      ctx.textBaseline = "middle";
      const placed: { x0: number; x1: number; y: number }[] = [];
      // Front-most labels claim space first; a label that would overlap one already drawn is skipped.
      const candidates = nodes
        .map((node, index) => ({ node, point: projected[index] }))
        .filter(({ node }) => node.label)
        .sort((a, b) => b.point.scale - a.point.scale);
      candidates.forEach(({ node, point }) => {
        const label = node.label as string;
        const facing = Math.max(0, Math.min(1, (point.scale - 0.62) * 9));
        // Fade labels before they reach the hero text (left) or the proof strip (bottom).
        // Labels sit on the outer side of their node so they never cross the brain.
        const outward = point.x < view.cx ? -1 : 1;
        const textWidth = ctx.measureText(label).width;
        const tx = point.x + outward * 10;
        const x0 = outward > 0 ? tx : tx - textWidth;
        const x1 = outward > 0 ? tx + textWidth : tx;
        const clearX = Math.max(0, Math.min(1, (x0 - width * 0.55) / 40));
        const clearY = Math.max(0, Math.min(1, (height * 0.74 - point.y) / 40));
        const lit = point.excitation;
        const alpha = Math.min(1, facing * 0.75 + lit * 0.6) * clearX * clearY;
        if (alpha < 0.05) return;
        if (x0 < 0 || x1 > width) return;
        if (placed.some((box) => Math.abs(box.y - point.y) < 16 && x0 < box.x1 + 8 && x1 > box.x0 - 8)) return;
        placed.push({ x0, x1, y: point.y });
        ctx.textAlign = outward > 0 ? "left" : "right";
        ctx.strokeStyle = `rgba(66,183,255,${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(point.x + outward * 4, point.y);
        ctx.lineTo(tx - outward * 2, point.y);
        ctx.stroke();
        ctx.fillStyle = lit > 0.25 ? `rgba(66,183,255,${alpha})` : `rgba(237,247,255,${alpha})`;
        ctx.fillText(label, tx, point.y);
      });
    };

    function draw(now = performance.now()) {
      const cfg = settings[breakpoint];
      if (canAnimate() && now - lastFrameTime < 1000 / cfg.fps) { animationId = requestAnimationFrame(draw); return; }
      lastFrameTime = now;
      ctx.clearRect(0, 0, width, height);
      updatePointer();
      excitation.forEach((value, index) => {
        const next = value * 0.95;
        if (next < 0.03) excitation.delete(index);
        else excitation.set(index, next);
      });
      brainFlash *= 0.93;
      const time = frame * 0.016;
      updateView(time, reducedMotion ? 0 : 1);
      updateProjected(time);
      // Larger z is farther away after rotation, so draw far to near.
      const order = projected.map((_, index) => index).sort((a, b) => projected[b].z - projected[a].z);

      edges.forEach((edge) => {
        const a = projected[edge.from];
        const b = projected[edge.to];
        const depth = (a.scale + b.scale) * 0.5;
        const boost = Math.max(a.influence, b.influence, a.excitation, b.excitation);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(66,183,255,${0.05 + depth * 0.2 + boost * 0.35})`;
        ctx.lineWidth = 0.5 + depth * 1.1 + boost * 0.8;
        ctx.stroke();
      });

      drawNodes(order, false);
      drawBrain();

      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) { propagate(pulse); return; }
        if (pulse.progress < 0) return;
        const start = projected[pulse.from];
        const target = projected[pulse.to];
        const x = start.x + (target.x - start.x) * pulse.progress;
        const y = start.y + (target.y - start.y) * pulse.progress;
        const scale = start.scale + (target.scale - start.scale) * pulse.progress;
        ctx.beginPath();
        ctx.arc(x, y, 2 + scale * 2.4 + pulse.strength * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237,247,255,${0.4 + pulse.strength * 0.45})`;
        ctx.fill();
      });
      for (let index = pulses.length - 1; index >= 0; index -= 1) if (pulses[index].progress >= 1) pulses.splice(index, 1);

      drawNodes(order, true);
      if (cfg.labels) drawLabels();

      if (!reducedMotion && !paused && pulses.length <= 9 && edges.length && Math.random() <= (breakpoint === "desktop" ? 0.025 : 0.012)) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ from: edge.from, to: edge.to, progress: 0, speed: 0.012, strength: 0.7, hops: 0 });
      }
      if (canAnimate()) { frame += 1; animationId = requestAnimationFrame(draw); }
    }

    const handlePointer = (event: PointerEvent) => {
      if (coarsePointerQuery.matches) return;
      const point = canvasPoint(event);
      pointer.tx = point.x;
      pointer.ty = point.y;
      pointer.active = point.inside;
    };
    const clearPointer = () => { pointer.active = false; pointer.tx = -1000; pointer.ty = -1000; };
    const resumeOrDraw = () => { cancelAnimationFrame(animationId); lastFrameTime = 0; draw(); };
    const handleVisibilityChange = () => { documentVisible = document.visibilityState === "visible"; resumeOrDraw(); };
    const handleMotionChange = () => { reducedMotion = motionQuery.matches; resize(); resumeOrDraw(); };
    const visibilityObserver = new IntersectionObserver(([entry]) => { inViewport = entry.isIntersecting; resumeOrDraw(); }, { threshold: 0.01 });
    const resizeObserver = new ResizeObserver(queueResize);
    let disposed = false;
    resize(); draw();
    // Redraw a static frame once the mono font has loaded so canvas labels use it.
    document.fonts?.ready.then(() => { if (!disposed && !canAnimate()) resumeOrDraw(); });
    visibilityObserver.observe(canvas);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("pointerdown", sendSignal);
    window.addEventListener("blur", clearPointer);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);
    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(resizeFrame);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerdown", sendSignal);
      window.removeEventListener("blur", clearPointer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [paused, labelKey]);

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-field" />;
}
