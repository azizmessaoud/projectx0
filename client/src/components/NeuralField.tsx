/* Signal Atelier style: inspectable signal field with depth-layered nodes, propagating click signals, eased pointer attraction, and glow bloom. */
import { useEffect, useRef } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";
type NodePoint = {
  x: number;
  y: number;
  depth: number;
  phase: number;
  drift: number;
  baseX: number;
  baseY: number;
};
type NodePosition = {
  x: number;
  y: number;
  influence: number;
  activation: number;
  excitation: number;
};
type Edge = { from: number; to: number; distance: number };
type Pulse = {
  from: number;
  to: number;
  progress: number;
  speed: number;
  strength: number;
  hops: number;
};
type Ripple = { x: number; y: number; radius: number; strength: number };
type Pointer = {
  tx: number;
  ty: number;
  x: number;
  y: number;
  active: boolean;
  speed: number;
};

const settings = {
  mobile: {
    nodes: 30,
    reach: 120,
    maxEdges: 3,
    influence: 180,
    pull: 0.1,
    pulseChance: 0.002,
  },
  tablet: {
    nodes: 50,
    reach: 145,
    maxEdges: 3,
    influence: 230,
    pull: 0.12,
    pulseChance: 0.006,
  },
  desktop: {
    nodes: 80,
    reach: 180,
    maxEdges: 4,
    influence: 300,
    pull: 0.15,
    pulseChance: 0.01,
  },
} satisfies Record<
  Breakpoint,
  {
    nodes: number;
    reach: number;
    maxEdges: number;
    influence: number;
    pull: number;
    pulseChance: number;
  }
>;

const MAX_HOPS = 5;
const MAX_PULSES = 32;

function breakpointFor(width: number): Breakpoint {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export default function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer: Pointer = { tx: -900, ty: -900, x: -900, y: -900, active: false, speed: 0 };
    let frame = 0;
    let animationId = 0;
    let resizeFrame = 0;
    let reducedMotion = motionQuery.matches;
    let visible = document.visibilityState === "visible";
    let breakpoint: Breakpoint = "desktop";
    let nodes: NodePoint[] = [];
    let edges: Edge[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    const pulses: Pulse[] = [];
    const ripples: Ripple[] = [];
    const excitation = new Map<number, number>();

    const getCanvasPoint = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        inside:
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom,
      };
    };

    const neighborsOf = (index: number) =>
      edges.filter(edge => edge.from === index || edge.to === index);

    const excite = (index: number, strength: number) => {
      const current = excitation.get(index) ?? 0;
      excitation.set(index, Math.min(1, current + strength));
    };

    const buildEdges = () => {
      const nextEdges: Edge[] = [];
      const cfg = settings[breakpoint];

      for (let i = 0; i < nodes.length; i += 1) {
        const candidates: Edge[] = [];
        for (let j = 0; j < nodes.length; j += 1) {
          if (i === j) continue;
          const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (distance <= cfg.reach * 1.2) candidates.push({ from: i, to: j, distance });
        }
        candidates
          .sort((a, b) => a.distance - b.distance)
          .slice(0, cfg.maxEdges)
          .forEach(edge => {
            const from = Math.min(edge.from, edge.to);
            const to = Math.max(edge.from, edge.to);
            if (!nextEdges.some(item => item.from === from && item.to === to))
              nextEdges.push({ from, to, distance: edge.distance });
          });
      }

      edges = nextEdges.slice(0, breakpoint === "desktop" ? 160 : breakpoint === "tablet" ? 90 : 42);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, width < 640 ? 1.35 : 1.75);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      breakpoint = breakpointFor(width);
      const count = reducedMotion ? Math.round(settings[breakpoint].nodes * 0.65) : settings[breakpoint].nodes;
      nodes = Array.from({ length: count }, (_, index) => {
        const x = (index * 89.17 + 23 + Math.sin(index * 1.91) * 36) % Math.max(width, 1);
        const y = (index * 53.31 + 31 + Math.cos(index * 1.37) * 28) % Math.max(height, 1);
        return {
          x,
          y,
          depth: 0.2 + ((index * 37) % 83) / 83 * 0.8,
          phase: index * 0.73,
          drift: 0.55 + ((index * 29) % 100) / 140,
          baseX: x,
          baseY: y,
        };
      });
      buildEdges();
      pulses.length = 0;
      ripples.length = 0;
      excitation.clear();
    };

    const queueResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resize();
        if (reducedMotion || !visible) draw();
      });
    };

    const updatePointer = () => {
      const previousX = pointer.x;
      const previousY = pointer.y;
      const ease = pointer.active ? 0.2 : 0.08;
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
      const distance = Math.hypot(pointer.x - previousX, pointer.y - previousY);
      pointer.speed = reducedMotion ? 0 : Math.min(distance / Math.max(ease, 0.01), 6);
    };

    const position = (node: NodePoint, index: number, time: number): NodePosition => {
      const cfg = settings[breakpoint];
      const motion = reducedMotion ? 0.15 : 1;
      const baseX =
        node.baseX + Math.sin(time * 0.42 * node.drift + node.phase) * 9 * node.depth * motion;
      const baseY =
        node.baseY + Math.cos(time * 0.34 * node.drift + node.phase) * 7 * node.depth * motion;
      const distance = Math.hypot(baseX - pointer.x, baseY - pointer.y);
      const influence =
        pointer.active && !reducedMotion ? Math.max(0, 1 - distance / cfg.influence) : 0;
      const activation = ripples.reduce((amount, ripple) => {
        const delta = Math.abs(Math.hypot(baseX - ripple.x, baseY - ripple.y) - ripple.radius);
        return Math.max(amount, Math.max(0, 1 - delta / 56) * ripple.strength);
      }, 0);
      return {
        x: baseX + (pointer.x - baseX) * influence * cfg.pull * (0.55 + node.depth * 0.55),
        y: baseY + (pointer.y - baseY) * influence * cfg.pull * (0.55 + node.depth * 0.55),
        influence,
        activation,
        excitation: excitation.get(index) ?? 0,
      };
    };

    const closestNode = (x: number, y: number) =>
      nodes.reduce(
        (closest, node, index) => {
          const distance = Math.hypot(node.x - x, node.y - y);
          return distance < closest.distance ? { index, distance } : closest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY }
      );

    const propagate = (pulse: Pulse) => {
      if (pulse.hops >= MAX_HOPS) {
        excite(pulse.to, pulse.strength * 0.6);
        return;
      }
      const onward = neighborsOf(pulse.to).filter(
        edge => edge.from !== pulse.from && edge.to !== pulse.from
      );
      if (!onward.length) {
        excite(pulse.to, pulse.strength * 0.6);
        return;
      }
      const edge = onward[Math.floor(Math.random() * onward.length)];
      const target = edge.from === pulse.to ? edge.to : edge.from;
      excite(pulse.to, pulse.strength);
      if (pulses.length < MAX_PULSES) {
        pulses.push({
          from: pulse.to,
          to: target,
          progress: 0,
          speed: pulse.speed * 1.08,
          strength: pulse.strength * 0.55,
          hops: pulse.hops + 1,
        });
      }
    };

    const sendSignal = (event: PointerEvent) => {
      const { x, y, inside } = getCanvasPoint(event);
      if (reducedMotion || nodes.length < 2 || !inside) return;
      event.preventDefault();
      const start = closestNode(x, y).index;
      const fanOut = breakpoint === "desktop" ? 6 : 3;
      neighborsOf(start)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, fanOut)
        .forEach((edge, index) =>
          pulses.push({
            from: start,
            to: edge.from === start ? edge.to : edge.from,
            progress: index * -0.05,
            speed: 0.018 + index * 0.002,
            strength: 1,
            hops: 0,
          })
        );
      excite(start, 1);
      ripples.push({ x, y, radius: 0, strength: 1 });
      ripples.push({ x, y, radius: 0, strength: 0.6 });
      if (pulses.length > MAX_PULSES) pulses.splice(0, pulses.length - MAX_PULSES);
      if (ripples.length > 5) ripples.splice(0, ripples.length - 5);
    };

    const createAmbientPulse = () => {
      const cfg = settings[breakpoint];
      if (
        reducedMotion ||
        pulses.length > 10 ||
        edges.length === 0 ||
        Math.random() > cfg.pulseChance
      )
        return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({
        from: edge.from,
        to: edge.to,
        progress: 0,
        speed: 0.008 + Math.random() * 0.005,
        strength: 0.55,
        hops: 0,
      });
      excite(edge.from, 0.12);
      excite(edge.to, 0.12);
    };

    const drawNodeLayer = (positions: NodePosition[], minDepth: number, maxDepth: number, time: number) => {
      const cursorBoost = Math.min(0.5, pointer.speed * 0.35);
      positions.forEach((point, index) => {
        const node = nodes[index];
        if (!node || node.depth < minDepth || node.depth >= maxDepth) return;
        const pulse = reducedMotion ? 0 : (Math.sin(time * 1.2 + node.phase) + 1) * 0.5;
        const radius =
          1.1 +
          node.depth * 1.9 +
          point.influence * 3 +
          point.activation * 2 +
          point.excitation * 2.4 +
          pulse * 0.35;
        const alpha =
          0.3 +
          node.depth * 0.3 +
          point.influence * 0.25 +
          point.activation * 0.2 +
          point.excitation * 0.3 +
          cursorBoost * 0.12;

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle =
          node.depth >= 0.55
            ? `rgba(187,229,255,${Math.min(1, alpha)})`
            : `rgba(148,201,235,${Math.min(1, alpha * 0.85)})`;
        ctx.fill();

        if (
          index % 9 === 0 ||
          point.influence > 0.5 ||
          point.activation > 0.5 ||
          point.excitation > 0.4
        ) {
          const glow = 0.025 + point.influence * 0.1 + point.activation * 0.08 + point.excitation * 0.09;
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(66,183,255,${glow})`;
          ctx.fill();
        }

        if (point.influence > 0.6 || point.excitation > 0.6) {
          const halo = point.influence * 0.035 + point.excitation * 0.04;
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius * 7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(66,183,255,${halo})`;
          ctx.fill();
        }
      });
    };

    function draw() {
      ctx.clearRect(0, 0, width, height);
      updatePointer();
      for (const [index, value] of excitation) {
        const next = value * 0.95;
        if (next < 0.03) excitation.delete(index);
        else excitation.set(index, next);
      }

      const time = frame * 0.006;
      const cfg = settings[breakpoint];
      const positions = nodes.map((node, index) => position(node, index, time));

      drawNodeLayer(positions, 0, 0.55, time);

      edges.forEach(edge => {
        const a = positions[edge.from];
        const b = positions[edge.to];
        if (!a || !b) return;
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        const proximity = Math.max(0, 1 - distance / (cfg.reach * 1.2));
        const pointerBoost = Math.max(a.influence, b.influence);
        const signalBoost = Math.max(a.activation, b.activation);
        const excitationBoost = Math.max(a.excitation, b.excitation);
        const alpha =
          0.03 + proximity * 0.1 + pointerBoost * 0.25 + signalBoost * 0.22 + excitationBoost * 0.2;
        const lineW = 0.5 + pointerBoost * 0.8 + signalBoost * 0.5 + excitationBoost * 0.5;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(66,183,255,${alpha})`;
        ctx.lineWidth = lineW;
        ctx.stroke();

        if (pointerBoost > 0.3 || signalBoost > 0.3 || excitationBoost > 0.3) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(140,215,255,${(pointerBoost + signalBoost + excitationBoost) * 0.08})`;
          ctx.lineWidth = lineW * 2.5;
          ctx.stroke();
        }
      });

      pulses.forEach(pulse => {
        pulse.progress += pulse.speed;
        if (pulse.progress < 0) return;
        if (pulse.progress >= 1) {
          propagate(pulse);
          return;
        }
        const start = positions[pulse.from];
        const target = positions[pulse.to];
        if (!start || !target) return;
        const x = start.x + (target.x - start.x) * pulse.progress;
        const y = start.y + (target.y - start.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(x, y, 4 + pulse.strength * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,232,255,${0.5 + pulse.strength * 0.4})`;
        ctx.shadowColor = "#42b7ff";
        ctx.shadowBlur = 14 + pulse.strength * 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(x, y, 8 + pulse.strength * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(66,183,255,${0.06 + pulse.strength * 0.06})`;
        ctx.fill();
      });
      for (let index = pulses.length - 1; index >= 0; index -= 1)
        if (pulses[index].progress >= 1) pulses.splice(index, 1);

      drawNodeLayer(positions, 0.55, 1.01, time);

      ripples.forEach(ripple => {
        ripple.radius += breakpoint === "desktop" ? 3.5 : 2.6;
        ripple.strength *= 0.965;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(66,183,255,${0.1 * ripple.strength})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140,215,255,${0.05 * ripple.strength})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      for (let index = ripples.length - 1; index >= 0; index -= 1)
        if (ripples[index].strength < 0.04 || ripples[index].radius > Math.max(width, height))
          ripples.splice(index, 1);

      createAmbientPulse();

      if (!reducedMotion && visible) {
        frame += 1;
        animationId = requestAnimationFrame(draw);
      }
    }

    const handlePointer = (event: PointerEvent) => {
      const point = getCanvasPoint(event);
      pointer.tx = point.x;
      pointer.ty = point.y;
      pointer.active = point.inside;
    };
    const clearPointer = () => {
      pointer.active = false;
      pointer.tx = -1000;
      pointer.ty = -1000;
    };
    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches;
      resize();
      cancelAnimationFrame(animationId);
      draw();
    };
    const handleVisibilityChange = () => {
      visible = document.visibilityState === "visible";
      cancelAnimationFrame(animationId);
      if (visible || reducedMotion) draw();
    };

    resize();
    draw();
    window.addEventListener("resize", queueResize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("pointerdown", sendSignal);
    window.addEventListener("blur", clearPointer);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);
    return () => {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", queueResize);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerdown", sendSignal);
      window.removeEventListener("blur", clearPointer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-field" />;
}