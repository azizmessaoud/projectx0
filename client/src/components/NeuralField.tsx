/* Signal Atelier style: an inspectable signal field; pointer attraction and click pulses make the system feel responsive without competing with the case-study content. */
import { useEffect, useRef } from "react";

type NodePoint = { x: number; y: number; depth: number; phase: number };
type Pulse = { from: number; to: number; progress: number; speed: number };

export default function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1000, y: -1000, active: false };
    let frame = 0;
    let animationId = 0;
    let nodes: NodePoint[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    const pulses: Pulse[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 640 ? 28 : width < 1000 ? 52 : 78;
      nodes = Array.from({ length: count }, (_, index) => ({
        x: (index * 83.17 + 19) % Math.max(width, 1),
        y: (index * 47.31 + 29) % Math.max(height, 1),
        depth: 0.25 + ((index * 17) % 100) / 150,
        phase: index * 0.73,
      }));
    };

    const position = (node: NodePoint, time: number) => {
      const baseX = node.x + Math.sin(time * 0.42 + node.phase) * 7 * node.depth;
      const baseY = node.y + Math.cos(time * 0.34 + node.phase) * 5 * node.depth;
      const distance = Math.hypot(baseX - pointer.x, baseY - pointer.y);
      const influence = pointer.active ? Math.max(0, 1 - distance / 210) : 0;
      return {
        x: baseX + (pointer.x - baseX) * influence * 0.075,
        y: baseY + (pointer.y - baseY) * influence * 0.075,
        influence,
      };
    };

    const closestNode = (x: number, y: number) => nodes.reduce((closest, node, index) => {
      const distance = Math.hypot(node.x - x, node.y - y);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });

    const sendSignal = (event: PointerEvent) => {
      if (reducedMotion || nodes.length < 2) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const start = closestNode(x, y).index;
      let target = 0;
      let targetDistance = Number.POSITIVE_INFINITY;
      nodes.forEach((node, index) => {
        if (index === start) return;
        const distance = Math.hypot(node.x - nodes[start].x, node.y - nodes[start].y);
        if (distance < targetDistance) { target = index; targetDistance = distance; }
      });
      pulses.push({ from: start, to: target, progress: 0, speed: 0.012 });
      if (pulses.length > 8) pulses.shift();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const time = frame * 0.006;
      const reach = width < 640 ? 118 : 148;
      const positions = nodes.map((node) => position(node, time));
      const edges: Array<[number, number]> = [];

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = positions[i];
          const b = positions[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > reach) continue;
          edges.push([i, j]);
          const proximity = 1 - distance / reach;
          const pointerBoost = Math.max(a.influence, b.influence);
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = `rgba(66,183,255,${0.055 + proximity * 0.1 + pointerBoost * 0.22})`;
          context.lineWidth = pointerBoost > 0.4 ? 1.15 : 0.65;
          context.stroke();
        }
      }

      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        const start = positions[pulse.from];
        const target = positions[pulse.to];
        const x = start.x + (target.x - start.x) * pulse.progress;
        const y = start.y + (target.y - start.y) * pulse.progress;
        context.beginPath();
        context.arc(x, y, 3.5, 0, Math.PI * 2);
        context.fillStyle = "#b8e8ff";
        context.shadowColor = "#42b7ff";
        context.shadowBlur = 16;
        context.fill();
        context.shadowBlur = 0;
      });
      for (let index = pulses.length - 1; index >= 0; index -= 1) if (pulses[index].progress >= 1) pulses.splice(index, 1);

      positions.forEach((point, index) => {
        const node = nodes[index];
        const pulse = reducedMotion ? 0 : (Math.sin(time * 1.2 + node.phase) + 1) * 0.5;
        const radius = 1.3 + node.depth * 1.8 + point.influence * 2.5 + pulse * 0.35;
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(187,229,255,${0.35 + node.depth * 0.3 + point.influence * 0.3})`;
        context.fill();
        if (index % 9 === 0 || point.influence > 0.7) {
          context.beginPath();
          context.arc(point.x, point.y, radius * 4.2, 0, Math.PI * 2);
          context.fillStyle = `rgba(66,183,255,${0.025 + point.influence * 0.1})`;
          context.fill();
        }
      });

      if (!reducedMotion) { frame += 1; animationId = requestAnimationFrame(draw); }
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const clearPointer = () => { pointer.x = -1000; pointer.y = -1000; pointer.active = false; };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", handlePointer);
    canvas.addEventListener("pointerdown", sendSignal);
    canvas.addEventListener("pointerleave", clearPointer);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handlePointer);
      canvas.removeEventListener("pointerdown", sendSignal);
      canvas.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-label="Interactive neural network background. Move the pointer to attract nodes and click to send a signal." role="img" className="neural-field" />;
}
