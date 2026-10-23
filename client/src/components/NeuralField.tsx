/* 3D neural lattice behind the hero: perspective projection, slow orbit, pausable, static under reduced motion. */
import { useEffect, useRef } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";
type Node3 = { x: number; y: number; z: number; phase: number; drift: number };
type Projected = { x: number; y: number; z: number; scale: number; influence: number; excitation: number };
type Edge = { from: number; to: number; distance: number };
type Pulse = { from: number; to: number; progress: number; speed: number; strength: number; hops: number };
type Pointer = { tx: number; ty: number; x: number; y: number; active: boolean };

const settings = {
  mobile: { nodes: 36, neighbors: 2, fps: 30, dpr: 1, pull: 0.04 },
  tablet: { nodes: 72, neighbors: 3, fps: 48, dpr: 1.5, pull: 0.07 },
  desktop: { nodes: 110, neighbors: 3, fps: 60, dpr: 1.75, pull: 0.1 },
} satisfies Record<Breakpoint, { nodes: number; neighbors: number; fps: number; dpr: number; pull: number }>;

const MAX_HOPS = 4;
const MAX_PULSES = 28;
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

export default function NeuralField({ paused = false }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ctx = context;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const pointer: Pointer = { tx: -900, ty: -900, x: -900, y: -900, active: false };
    const pulses: Pulse[] = [];
    const excitation = new Map<number, number>();
    let nodes: Node3[] = [];
    let projected: Projected[] = [];
    let edges: Edge[] = [];
    let adjacency: Edge[][] = [];
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
          if (distance < 0.78) candidates.push({ from: i, to: j, distance });
        }
        candidates.sort((a, b) => a.distance - b.distance).slice(0, maxNeighbors).forEach((edge) => {
          const key = edge.from < edge.to ? `${edge.from}-${edge.to}` : `${edge.to}-${edge.from}`;
          if (seen.has(key)) return;
          seen.add(key);
          nextEdges.push(edge.from < edge.to ? edge : { from: edge.to, to: edge.from, distance: edge.distance });
        });
      }
      edges = nextEdges.slice(0, breakpoint === "desktop" ? 220 : breakpoint === "tablet" ? 120 : 58);
      adjacency = Array.from({ length: nodes.length }, () => []);
      edges.forEach((edge) => { adjacency[edge.from].push(edge); adjacency[edge.to].push(edge); });
    };

    const seedNodes = (count: number) => Array.from({ length: count }, (_, index) => {
      const layer = index % 5;
      const ring = 0.28 + (index % 7) * 0.09;
      const theta = index * 2.399;
      const y = (hash01(index, 2) - 0.5) * 1.35;
      return {
        x: Math.cos(theta) * ring + (layer - 2) * 0.22 + (hash01(index, 3) - 0.5) * 0.12,
        y,
        z: Math.sin(theta) * ring * 0.95 + (hash01(index, 4) - 0.5) * 0.35,
        phase: index * 0.73,
        drift: 0.55 + hash01(index, 5) * 0.7,
      };
    });

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
      const count = reducedMotion ? Math.round(cfg.nodes * 0.7) : cfg.nodes;
      nodes = seedNodes(count);
      projected = nodes.map(() => ({ x: 0, y: 0, z: 0, scale: 1, influence: 0, excitation: 0 }));
      buildEdges(); pulses.length = 0; excitation.clear();
    };

    const projectNode = (node: Node3, time: number, motion: number) => {
      const orbit = reducedMotion ? 0.55 : time * 0.11;
      const nod = reducedMotion ? 0 : Math.sin(time * 0.42 * node.drift + node.phase) * 0.035 * motion;
      const x = node.x + nod;
      const y = node.y + Math.cos(time * 0.31 * node.drift + node.phase) * 0.028 * motion;
      const z = node.z + Math.sin(time * 0.24 * node.drift + node.phase) * 0.03 * motion;
      const cosY = Math.cos(orbit);
      const sinY = Math.sin(orbit);
      const tilt = 0.38 + Math.sin(time * 0.07) * 0.05 * motion;
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);
      const rx = x * cosY - z * sinY;
      const rz0 = x * sinY + z * cosY;
      const ry = y * cosX - rz0 * sinX;
      const rz = y * sinX + rz0 * cosX;
      const size = Math.min(width, height);
      const focal = size * 1.15;
      const depth = focal / (focal + rz * size * 0.42 + size * 0.55);
      return {
        x: width * (breakpoint === "desktop" ? 0.72 : 0.6) + rx * depth * size * 0.52,
        y: height * (breakpoint === "mobile" ? 0.3 : 0.46) + ry * depth * size * 0.42,
        z: rz,
        scale: depth,
      };
    };

    const queueResize = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(() => { resize(); draw(); }); };

    const updatePointer = () => {
      const ease = pointer.active ? 0.18 : 0.08;
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
    };

    const updateProjected = (time: number) => {
      const cfg = settings[breakpoint];
      const motion = reducedMotion ? 0 : 1;
      nodes.forEach((node, index) => {
        const point = projectNode(node, time, motion);
        const distance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
        const influence = pointer.active && !reducedMotion && !coarsePointerQuery.matches ? Math.max(0, 1 - distance / (180 * point.scale)) : 0;
        projected[index] = {
          x: point.x + (pointer.x - point.x) * influence * cfg.pull,
          y: point.y + (pointer.y - point.y) * influence * cfg.pull,
          z: point.z,
          scale: point.scale,
          influence,
          excitation: excitation.get(index) ?? 0,
        };
      });
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
      if (pulses.length > MAX_PULSES) pulses.splice(0, pulses.length - MAX_PULSES);
    };

    const drawSortedNodes = (order: number[], near: boolean) => {
      order.forEach((index) => {
        const point = projected[index];
        const isNear = point.scale > 0.72;
        if (near !== isNear) return;
        const glow = point.excitation * 0.45 + point.influence * 0.25;
        const radius = (1.35 + point.scale * 4.4 + glow * 3.2) * (near ? 1 : 0.82);
        const alpha = Math.min(1, 0.16 + point.scale * 0.62 + glow * 0.4);
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isNear ? `rgba(66,183,255,${alpha})` : `rgba(145,168,187,${alpha * 0.7})`;
        ctx.fill();
        if (glow > 0.2) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(66,183,255,${glow * 0.16})`;
          ctx.fill();
        }
      });
    };

    function draw(now = performance.now()) {
      const cfg = settings[breakpoint];
      if (canAnimate() && now - lastFrameTime < 1000 / cfg.fps) { animationId = requestAnimationFrame(draw); return; }
      lastFrameTime = now;
      ctx.clearRect(0, 0, width, height);
      updatePointer();
      excitation.forEach((value, index) => {
        const next = value * 0.94;
        if (next < 0.03) excitation.delete(index);
        else excitation.set(index, next);
      });
      const time = frame * 0.016;
      updateProjected(time);
      const order = projected.map((_, index) => index).sort((a, b) => projected[a].z - projected[b].z);

      edges.forEach((edge) => {
        const a = projected[edge.from];
        const b = projected[edge.to];
        const depth = (a.scale + b.scale) * 0.5;
        const boost = Math.max(a.influence, b.influence, a.excitation, b.excitation);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(66,183,255,${0.04 + depth * 0.18 + boost * 0.35})`;
        ctx.lineWidth = 0.55 + depth * 1.45 + boost * 0.85;
        ctx.stroke();
      });

      drawSortedNodes(order, false);

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
        ctx.arc(x, y, 2.2 + scale * 2.6 + pulse.strength * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237,247,255,${0.4 + pulse.strength * 0.45})`;
        ctx.fill();
      });
      for (let index = pulses.length - 1; index >= 0; index -= 1) if (pulses[index].progress >= 1) pulses.splice(index, 1);

      drawSortedNodes(order, true);

      if (!reducedMotion && !paused && pulses.length <= 9 && edges.length && Math.random() <= (breakpoint === "desktop" ? 0.02 : 0.01)) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ from: edge.from, to: edge.to, progress: 0, speed: 0.012, strength: 0.6, hops: 0 });
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
    resize(); draw();
    visibilityObserver.observe(canvas);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("pointerdown", sendSignal);
    window.addEventListener("blur", clearPointer);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);
    return () => {
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
  }, [paused]);

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-field" />;
}
