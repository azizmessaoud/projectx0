/* Signal Atelier style: a restrained scientific signal field; the animation supports the content and never competes with it. */
import { useEffect, useRef } from "react";

type NodePoint = { x: number; y: number; depth: number; phase: number };

export default function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1000, y: -1000 };
    let frame = 0;
    let animationId = 0;
    let nodes: NodePoint[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 640 ? 30 : width < 1000 ? 54 : 76;
      nodes = Array.from({ length: count }, (_, index) => ({
        x: (index * 83.17 + 19) % Math.max(width, 1),
        y: (index * 47.31 + 29) % Math.max(height, 1),
        depth: 0.25 + ((index * 17) % 100) / 150,
        phase: index * 0.73,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const time = frame * 0.006;
      const reach = width < 640 ? 112 : 148;

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        const ax = a.x + Math.sin(time * 0.42 + a.phase) * 7 * a.depth;
        const ay = a.y + Math.cos(time * 0.34 + a.phase) * 5 * a.depth;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const bx = b.x + Math.sin(time * 0.42 + b.phase) * 7 * b.depth;
          const by = b.y + Math.cos(time * 0.34 + b.phase) * 5 * b.depth;
          const distance = Math.hypot(ax - bx, ay - by);
          if (distance > reach) continue;
          const proximity = 1 - distance / reach;
          const pointerBoost = Math.max(0, 1 - Math.hypot((ax + bx) / 2 - pointer.x, (ay + by) / 2 - pointer.y) / 190);
          context.beginPath();
          context.moveTo(ax, ay);
          context.lineTo(bx, by);
          context.strokeStyle = `rgba(66,183,255,${0.06 + proximity * 0.11 + pointerBoost * 0.2})`;
          context.lineWidth = pointerBoost > 0.4 ? 1.15 : 0.65;
          context.stroke();
        }
      }

      nodes.forEach((node, index) => {
        const x = node.x + Math.sin(time * 0.42 + node.phase) * 7 * node.depth;
        const y = node.y + Math.cos(time * 0.34 + node.phase) * 5 * node.depth;
        const activation = Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 150);
        const pulse = reducedMotion ? 0 : (Math.sin(time * 1.2 + node.phase) + 1) * 0.5;
        const radius = 1.3 + node.depth * 1.8 + activation * 2.1 + pulse * 0.35;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(187,229,255,${0.35 + node.depth * 0.3 + activation * 0.3})`;
        context.fill();
        if (index % 9 === 0 || activation > 0.7) {
          context.beginPath();
          context.arc(x, y, radius * 4.2, 0, Math.PI * 2);
          context.fillStyle = `rgba(66,183,255,${0.025 + activation * 0.08})`;
          context.fill();
        }
      });

      if (!reducedMotion) {
        frame += 1;
        animationId = requestAnimationFrame(draw);
      }
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const clearPointer = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", handlePointer);
    canvas.addEventListener("pointerleave", clearPointer);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handlePointer);
      canvas.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-field" />;
}
