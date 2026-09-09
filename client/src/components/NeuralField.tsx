/* Decorative signal field: interaction is deliberately local, pausable, and economical on touch devices. */
import { useEffect, useRef } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";
type NodePoint = { x: number; y: number; depth: number; phase: number; drift: number; baseX: number; baseY: number };
type NodePosition = { x: number; y: number; influence: number; activation: number; excitation: number };
type Edge = { from: number; to: number; distance: number };
type Pulse = { from: number; to: number; progress: number; speed: number; strength: number; hops: number };
type Ripple = { x: number; y: number; radius: number; strength: number };
type Pointer = { tx: number; ty: number; x: number; y: number; active: boolean; speed: number };

const settings = {
  mobile: { nodes: 22, reach: 120, maxEdges: 2, influence: 150, pull: 0.08, pulseChance: 0, fps: 30, dpr: 1 },
  tablet: { nodes: 50, reach: 145, maxEdges: 3, influence: 230, pull: 0.12, pulseChance: 0.006, fps: 60, dpr: 1.5 },
  desktop: { nodes: 80, reach: 180, maxEdges: 4, influence: 300, pull: 0.15, pulseChance: 0.01, fps: 60, dpr: 1.75 },
} satisfies Record<Breakpoint, { nodes: number; reach: number; maxEdges: number; influence: number; pull: number; pulseChance: number; fps: number; dpr: number }>;

const MAX_HOPS = 5;
const MAX_PULSES = 32;
const INTERACTIVE_SELECTOR = "a, button, input, select, textarea, summary, [role='button'], [contenteditable='true']";

function breakpointFor(width: number): Breakpoint {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
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
    const pointer: Pointer = { tx: -900, ty: -900, x: -900, y: -900, active: false, speed: 0 };
    const pulses: Pulse[] = [];
    const ripples: Ripple[] = [];
    const excitation = new Map<number, number>();
    let nodes: NodePoint[] = [];
    let positions: NodePosition[] = [];
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
      const cfg = settings[breakpoint];
      for (let i = 0; i < nodes.length; i += 1) {
        const candidates: Edge[] = [];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (distance <= cfg.reach * 1.2) candidates.push({ from: i, to: j, distance });
        }
        candidates.sort((a, b) => a.distance - b.distance).slice(0, cfg.maxEdges).forEach((edge) => {
          if (!nextEdges.some((item) => item.from === edge.from && item.to === edge.to)) nextEdges.push(edge);
        });
      }
      edges = nextEdges.slice(0, breakpoint === "desktop" ? 160 : breakpoint === "tablet" ? 90 : 42);
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
      const count = reducedMotion ? Math.round(cfg.nodes * 0.65) : cfg.nodes;
      nodes = Array.from({ length: count }, (_, index) => {
        const x = (index * 89.17 + 23 + Math.sin(index * 1.91) * 36) % Math.max(width, 1);
        const y = (index * 53.31 + 31 + Math.cos(index * 1.37) * 28) % Math.max(height, 1);
        return { x, y, depth: 0.2 + ((index * 37) % 83) / 83 * 0.8, phase: index * 0.73, drift: 0.55 + ((index * 29) % 100) / 140, baseX: x, baseY: y };
      });
      positions = nodes.map(() => ({ x: 0, y: 0, influence: 0, activation: 0, excitation: 0 }));
      buildEdges(); pulses.length = 0; ripples.length = 0; excitation.clear();
    };
    const queueResize = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(() => { resize(); draw(); }); };
    const updatePointer = () => {
      const previousX = pointer.x; const previousY = pointer.y; const ease = pointer.active ? 0.2 : 0.08;
      pointer.x += (pointer.tx - pointer.x) * ease; pointer.y += (pointer.ty - pointer.y) * ease;
      pointer.speed = reducedMotion ? 0 : Math.min(Math.hypot(pointer.x - previousX, pointer.y - previousY) / ease, 6);
    };
    const updatePositions = (time: number) => nodes.forEach((node, index) => {
      const cfg = settings[breakpoint]; const motion = reducedMotion ? 0.15 : 1;
      const baseX = node.baseX + Math.sin(time * 0.42 * node.drift + node.phase) * 9 * node.depth * motion;
      const baseY = node.baseY + Math.cos(time * 0.34 * node.drift + node.phase) * 7 * node.depth * motion;
      const distance = Math.hypot(baseX - pointer.x, baseY - pointer.y);
      const influence = pointer.active && !reducedMotion && !coarsePointerQuery.matches ? Math.max(0, 1 - distance / cfg.influence) : 0;
      let activation = 0;
      ripples.forEach((ripple) => { const delta = Math.abs(Math.hypot(baseX - ripple.x, baseY - ripple.y) - ripple.radius); activation = Math.max(activation, Math.max(0, 1 - delta / 56) * ripple.strength); });
      positions[index] = { x: baseX + (pointer.x - baseX) * influence * cfg.pull * (0.55 + node.depth * 0.55), y: baseY + (pointer.y - baseY) * influence * cfg.pull * (0.55 + node.depth * 0.55), influence, activation, excitation: excitation.get(index) ?? 0 };
    });
    const closestNode = (x: number, y: number) => nodes.reduce((closest, node, index) => { const distance = Math.hypot(node.x - x, node.y - y); return distance < closest.distance ? { index, distance } : closest; }, { index: 0, distance: Number.POSITIVE_INFINITY });
    const propagate = (pulse: Pulse) => {
      excite(pulse.to, pulse.strength);
      if (pulse.hops >= MAX_HOPS) return;
      const onward = neighborsOf(pulse.to).filter((edge) => edge.from !== pulse.from && edge.to !== pulse.from);
      if (!onward.length || pulses.length >= MAX_PULSES) return;
      const edge = onward[Math.floor(Math.random() * onward.length)]; const target = edge.from === pulse.to ? edge.to : edge.from;
      pulses.push({ from: pulse.to, to: target, progress: 0, speed: pulse.speed * 1.08, strength: pulse.strength * 0.55, hops: pulse.hops + 1 });
    };
    const sendSignal = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)) return;
      const { x, y, inside } = canvasPoint(event);
      if (reducedMotion || nodes.length < 2 || !inside) return;
      const start = closestNode(x, y).index; const fanOut = breakpoint === "desktop" ? 5 : 3;
      neighborsOf(start).slice().sort((a, b) => a.distance - b.distance).slice(0, fanOut).forEach((edge, index) => pulses.push({ from: start, to: edge.from === start ? edge.to : edge.from, progress: index * -0.05, speed: 0.018 + index * 0.002, strength: 1, hops: 0 }));
      excite(start, 1); ripples.push({ x, y, radius: 0, strength: 1 });
      if (pulses.length > MAX_PULSES) pulses.splice(0, pulses.length - MAX_PULSES); if (ripples.length > 4) ripples.splice(0, ripples.length - 4);
    };
    const drawNodes = (minDepth: number, maxDepth: number, time: number) => positions.forEach((point, index) => {
      const node = nodes[index]; if (node.depth < minDepth || node.depth >= maxDepth) return;
      const pulse = reducedMotion ? 0 : (Math.sin(time * 1.2 + node.phase) + 1) * 0.5;
      const radius = 1.1 + node.depth * 1.9 + point.influence * 3 + point.activation * 2 + point.excitation * 2.4 + pulse * 0.35;
      const alpha = 0.3 + node.depth * 0.3 + point.influence * 0.25 + point.activation * 0.2 + point.excitation * 0.3 + Math.min(0.5, pointer.speed * 0.35) * 0.12;
      ctx.beginPath(); ctx.arc(point.x, point.y, radius, 0, Math.PI * 2); ctx.fillStyle = node.depth >= 0.55 ? `rgba(187,229,255,${Math.min(1, alpha)})` : `rgba(148,201,235,${Math.min(1, alpha * 0.85)})`; ctx.fill();
    });
    function draw(now = performance.now()) {
      const cfg = settings[breakpoint];
      if (canAnimate() && now - lastFrameTime < 1000 / cfg.fps) { animationId = requestAnimationFrame(draw); return; }
      lastFrameTime = now; ctx.clearRect(0, 0, width, height); updatePointer();
      excitation.forEach((value, index) => { const next = value * 0.95; if (next < 0.03) excitation.delete(index); else excitation.set(index, next); });
      const time = frame * 0.006; updatePositions(time); drawNodes(0, 0.55, time);
      edges.forEach((edge) => { const a = positions[edge.from]; const b = positions[edge.to]; const proximity = Math.max(0, 1 - Math.hypot(a.x - b.x, a.y - b.y) / (cfg.reach * 1.2)); const boost = Math.max(a.influence, b.influence, a.activation, b.activation, a.excitation, b.excitation); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(66,183,255,${0.03 + proximity * 0.1 + boost * 0.25})`; ctx.lineWidth = 0.5 + boost * 0.8; ctx.stroke(); });
      pulses.forEach((pulse) => { pulse.progress += pulse.speed; if (pulse.progress >= 1) { propagate(pulse); return; } if (pulse.progress < 0) return; const start = positions[pulse.from]; const target = positions[pulse.to]; const x = start.x + (target.x - start.x) * pulse.progress; const y = start.y + (target.y - start.y) * pulse.progress; ctx.beginPath(); ctx.arc(x, y, 4 + pulse.strength * 2, 0, Math.PI * 2); ctx.fillStyle = `rgba(184,232,255,${0.5 + pulse.strength * 0.4})`; ctx.fill(); });
      for (let index = pulses.length - 1; index >= 0; index -= 1) if (pulses[index].progress >= 1) pulses.splice(index, 1);
      drawNodes(0.55, 1.01, time);
      ripples.forEach((ripple) => { ripple.radius += breakpoint === "desktop" ? 3.5 : 2.6; ripple.strength *= 0.965; ctx.beginPath(); ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2); ctx.strokeStyle = `rgba(66,183,255,${0.1 * ripple.strength})`; ctx.lineWidth = 1.2; ctx.stroke(); });
      for (let index = ripples.length - 1; index >= 0; index -= 1) if (ripples[index].strength < 0.04 || ripples[index].radius > Math.max(width, height)) ripples.splice(index, 1);
      if (!reducedMotion && cfg.pulseChance && pulses.length <= 10 && edges.length && Math.random() <= cfg.pulseChance) { const edge = edges[Math.floor(Math.random() * edges.length)]; pulses.push({ from: edge.from, to: edge.to, progress: 0, speed: 0.01, strength: 0.55, hops: 0 }); }
      if (canAnimate()) { frame += 1; animationId = requestAnimationFrame(draw); }
    }
    const handlePointer = (event: PointerEvent) => { if (coarsePointerQuery.matches) return; const point = canvasPoint(event); pointer.tx = point.x; pointer.ty = point.y; pointer.active = point.inside; };
    const clearPointer = () => { pointer.active = false; pointer.tx = -1000; pointer.ty = -1000; };
    const resumeOrDraw = () => { cancelAnimationFrame(animationId); lastFrameTime = 0; draw(); };
    const handleVisibilityChange = () => { documentVisible = document.visibilityState === "visible"; resumeOrDraw(); };
    const handleMotionChange = () => { reducedMotion = motionQuery.matches; resize(); resumeOrDraw(); };
    const visibilityObserver = new IntersectionObserver(([entry]) => { inViewport = entry.isIntersecting; resumeOrDraw(); }, { threshold: 0.01 });
    const resizeObserver = new ResizeObserver(queueResize);
    resize(); draw(); visibilityObserver.observe(canvas); resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointer, { passive: true }); window.addEventListener("pointerdown", sendSignal); window.addEventListener("blur", clearPointer);
    document.addEventListener("visibilitychange", handleVisibilityChange); motionQuery.addEventListener("change", handleMotionChange);
    return () => { cancelAnimationFrame(animationId); cancelAnimationFrame(resizeFrame); visibilityObserver.disconnect(); resizeObserver.disconnect(); window.removeEventListener("pointermove", handlePointer); window.removeEventListener("pointerdown", sendSignal); window.removeEventListener("blur", clearPointer); document.removeEventListener("visibilitychange", handleVisibilityChange); motionQuery.removeEventListener("change", handleMotionChange); };
  }, [paused]);

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-field" />;
}
