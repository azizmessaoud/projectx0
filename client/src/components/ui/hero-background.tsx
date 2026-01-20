import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotionSafe } from '@/hooks/use-reduced-motion-safe';

const SYMBOLS = ['|0⟩', '|1⟩', 'ψ', 'φ', 'θ', '∑', '∫', '∂', '∇', 'Ω', 'H', 'X', 'CNOT', 'λ'];

type SectionKey = 'hero' | 'about' | 'experience' | 'projects' | 'certifications' | 'contact';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  layer: number;
  pulse: number;
  pulseSpeed: number;
};

type ScatterPoint = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  layer: number;
};

type Bar = { x: number; width: number; height: number; layer: number; phase: number; };
type LinePoint = { x: number; y: number; layer: number; phase: number; };
type BinaryDrop = { x: number; y: number; speed: number; len: number; offset: number; };
type HexCell = { x: number; y: number; r: number; };

type ThemeState = {
  gradient: [string, string];
  connectionHue: [number, number];
  densityBoost: number;
  purpleBoost: number;
  dataStreams: boolean;
  spotlight: boolean;
};

const SECTION_THEMES: Record<SectionKey, ThemeState> = {
  hero: { gradient: ['#0b1221', '#0d1f37'], connectionHue: [215, 260], densityBoost: 1, purpleBoost: 0.4, dataStreams: false, spotlight: false },
  about: { gradient: ['#0d1424', '#0f2239'], connectionHue: [210, 250], densityBoost: 0.9, purpleBoost: 0.35, dataStreams: false, spotlight: false },
  experience: { gradient: ['#0b1221', '#111d33'], connectionHue: [210, 255], densityBoost: 1.15, purpleBoost: 0.4, dataStreams: false, spotlight: false },
  projects: { gradient: ['#0e1530', '#1a1035'], connectionHue: [225, 275], densityBoost: 1.2, purpleBoost: 0.7, dataStreams: false, spotlight: false },
  certifications: { gradient: ['#0c1328', '#161a30'], connectionHue: [215, 270], densityBoost: 1.05, purpleBoost: 0.5, dataStreams: true, spotlight: false },
  contact: { gradient: ['#080d1a', '#0b0f1d'], connectionHue: [205, 245], densityBoost: 0.8, purpleBoost: 0.3, dataStreams: false, spotlight: true },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function join(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function HeroBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbolsRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const prefersReducedMotion = useReducedMotionSafe();
  const heavyDisabledRef = useRef(false);
  const themeRef = useRef<ThemeState>(SECTION_THEMES.hero);

  const symbolStyle = useMemo(
    () => `
      @keyframes hb-float {
        0% { transform: translate3d(0, 0, 0) rotate(0deg); }
        50% { transform: translate3d(12px, -18px, 0) rotate(6deg); }
        100% { transform: translate3d(0, 0, 0) rotate(0deg); }
      }
      @keyframes hb-fade {
        0% { opacity: 0; }
        10% { opacity: var(--hb-opacity); filter: blur(0px); }
        80% { opacity: var(--hb-opacity); }
        100% { opacity: 0; filter: blur(2px); }
      }
    `,
    []
  );

  useEffect(() => {
    const sectionIds: SectionKey[] = ['hero', 'about', 'experience', 'projects', 'certifications', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          const id = mostVisible.target.id as SectionKey;
          if (SECTION_THEMES[id]) {
            setActiveSection(id);
          }
        }
      },
      { threshold: [0.1, 0.25, 0.5, 0.75], rootMargin: '0px 0px -30% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    themeRef.current = SECTION_THEMES[activeSection];
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = `radial-gradient(circle at 20% 20%, ${themeRef.current.gradient[0]} 0%, transparent 35%), linear-gradient(135deg, ${themeRef.current.gradient[0]} 0%, ${themeRef.current.gradient[1]} 100%)`;
    }
  }, [activeSection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    heavyDisabledRef.current = prefersReducedMotion || isMobile || deviceMemory < 4;

    if (heavyDisabledRef.current) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = `linear-gradient(135deg, ${SECTION_THEMES.hero.gradient[0]}, ${SECTION_THEMES.hero.gradient[1]})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    const baseNodeCount = clamp(Math.floor(width / 20), 40, 55);
    const connectionDistance = 180;
    const mouse = { x: -1000, y: -1000 };
    const targetMouse = { x: -1000, y: -1000 };

    const nodes: Node[] = [];
    const scatter: ScatterPoint[] = [];
    const bars: Bar[] = [];
    const lines: LinePoint[][] = [];
    const rain: BinaryDrop[] = [];
    const hexes: HexCell[] = [];

    const densityScale = Math.max(0.6, themeRef.current.densityBoost * 0.8);

    for (let i = 0; i < baseNodeCount * densityScale; i++) {
      const layer = i % 3;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (0.6 + layer * 0.2),
        vy: (Math.random() - 0.5) * (0.6 + layer * 0.2),
        baseSize: 2.5 + Math.random() * 3.5,
        layer,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    const scatterClusters = Math.floor(6 * densityScale);
    for (let i = 0; i < scatterClusters; i++) {
      const cx = Math.random() * width;
      const cy = Math.random() * height;
      const count = 12 + Math.floor(Math.random() * 10);
      for (let j = 0; j < count; j++) {
        scatter.push({
          x: cx + (Math.random() - 0.5) * 60,
          y: cy + (Math.random() - 0.5) * 60,
          size: 1.5 + Math.random() * 3,
          opacity: 0.15 + Math.random() * 0.25,
          layer: j % 3,
        });
      }
    }

    for (let i = 0; i < 18; i++) {
      bars.push({
        x: (width / 18) * i + Math.random() * 12,
        width: 6 + Math.random() * 8,
        height: 40 + Math.random() * 120,
        layer: i % 3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    for (let l = 0; l < 3; l++) {
      const series: LinePoint[] = [];
      for (let i = 0; i < 16; i++) {
        series.push({
          x: (width / 15) * i,
          y: height * 0.35 + Math.sin(i * 0.5 + l) * 40,
          layer: l,
          phase: Math.random() * Math.PI * 2,
        });
      }
      lines.push(series);
    }

    for (let i = 0; i < 60; i++) {
      rain.push({
        x: (i % 2 === 0 ? 0.05 : 0.95) * width + (Math.random() - 0.5) * 20,
        y: Math.random() * height,
        speed: 60 + Math.random() * 90,
        len: 12 + Math.random() * 20,
        offset: Math.random() * Math.PI * 2,
      });
    }

    const hexSize = 32;
    for (let y = -hexSize; y < height + hexSize; y += hexSize * 0.86) {
      for (let x = -hexSize; x < width + hexSize; x += hexSize * 1.5) {
        const offset = (Math.floor(y / (hexSize * 0.86)) % 2) * (hexSize * 0.75);
        hexes.push({ x: x + offset, y, r: hexSize });
      }
    }

    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseUpdate < 16) return;
      lastMouseUpdate = now;
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouse.x = -1000;
      targetMouse.y = -1000;
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
      }, 150);
    };

    let paused = false;
    const handleVisibility = () => {
      paused = document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let frame = 0;
    const draw = () => {
      if (paused) {
        requestAnimationFrame(draw);
        return;
      }

      frame += 1;
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      const theme = themeRef.current;

      // Draw background gradient first
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, theme.gradient[0]);
      bgGrad.addColorStop(1, theme.gradient[1]);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Optional: add radial gradient overlay
      const radGrad = ctx.createRadialGradient(width * 0.2, height * 0.2, 0, width * 0.5, height * 0.5, Math.max(width, height) * 0.8);
      radGrad.addColorStop(0, `rgba(59, 130, 246, 0.08)`);
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      hexes.forEach((h) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = Math.PI / 3 * i;
          const x = h.x + h.r * Math.cos(angle);
          const y = h.y + h.r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      });
      ctx.restore();

      // Reset globalAlpha before drawing particles
      ctx.globalAlpha = 1;

      scatter.forEach((p) => {
        const shimmer = 0.01 * Math.sin(frame * 0.01 + p.x * 0.01 + p.y * 0.01);
        ctx.fillStyle = `rgba(255,255,255,${(p.opacity + shimmer) * 1.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      bars.forEach((b) => {
        const h = b.height * (0.6 + Math.sin(frame * 0.015 + b.phase) * 0.3);
        const baseY = height * 0.82 + (b.layer - 1) * 16;
        ctx.fillStyle = 'rgba(59,130,246,0.12)';
        ctx.fillRect(b.x, baseY - h, b.width, h);
      });

      lines.forEach((series) => {
        ctx.beginPath();
        series.forEach((pt, idx) => {
          const y = pt.y + Math.sin(frame * 0.012 + pt.phase) * 14;
          const x = pt.x;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        const hue = 210 + Math.sin(frame * 0.008) * 15;
        ctx.strokeStyle = `hsla(${hue}, 75%, 55%, 0.22)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      rain.forEach((r, i) => {
        const speed = r.speed * (0.65 + Math.sin(frame * 0.015 + r.offset) * 0.25);
        r.y += speed * 0.016;
        if (r.y - r.len > height) {
          r.y = -r.len;
        }
        ctx.fillStyle = `rgba(91,33,182,${0.08 + 0.04 * Math.sin(frame * 0.04 + i)})`;
        ctx.fillRect(r.x, r.y, 1.5, r.len);
      });

      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;
        const pulseScale = 0.8 + Math.sin(n.pulse) * 0.4;

        n.x += n.vx * (0.3 + n.layer * 0.3);
        n.y += n.vy * (0.3 + n.layer * 0.3);

        if (n.x < -50) n.x = width + 50;
        if (n.x > width + 50) n.x = -50;
        if (n.y < -50) n.y = height + 50;
        if (n.y > height + 50) n.y = -50;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          n.x += (dx / dist) * force * 3;
          n.y += (dy / dist) * force * 3;
        }

        const glowSize = n.baseSize * 10 * pulseScale;
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
        gradient.addColorStop(0, `rgba(59,130,246,0.5)`);
        gradient.addColorStop(0.4, `rgba(91,33,182,0.35)`);
        gradient.addColorStop(1, 'rgba(91,33,182,0.08)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.baseSize * pulseScale * (1.1 + n.layer * 0.25), 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > connectionDistance) continue;
          const alpha = (1 - dist / connectionDistance) * 0.28;
          const hueStart = theme.connectionHue[0];
          const hueEnd = theme.connectionHue[1];
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `hsla(${hueStart}, 75%, ${45 + theme.purpleBoost * 15}%, ${alpha})`);
          grad.addColorStop(1, `hsla(${hueEnd}, 75%, ${45 + theme.purpleBoost * 15}%, ${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8 + a.layer * 0.15;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          const flow = (frame * 0.003 + (i % 10) * 0.1) % 1;
          const fx = a.x + (b.x - a.x) * flow;
          const fy = a.y + (b.y - a.y) * flow;
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(fx, fy, 1.8, 0, Math.PI * 2);
          ctx.fill();

          if (theme.dataStreams && frame % 3 === 0) {
            ctx.fillStyle = `rgba(91,33,182,${alpha * 0.35})`;
            ctx.fillRect(fx, fy, 2.5, 2.5);
          }
        }
      }

      if (theme.spotlight) {
        const grad = ctx.createRadialGradient(width * 0.5, height * 0.55, 40, width * 0.5, height * 0.55, Math.max(width, height));
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.35)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      clearTimeout(resizeTimeout);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || heavyDisabledRef.current) return;
    const container = symbolsRef.current;
    if (!container) return;

    let timer = 0;
    let raf = 0;
    const active: Array<{ el: HTMLSpanElement; removeAt: number; drift: number; rot: number; depth: number; }> = [];

    const spawn = () => {
      if (!container) return;
      const el = document.createElement('span');
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const lifespan = 5000 + Math.random() * 3000;
      const depth = 0.4 + Math.random() * 0.6;
      el.style.position = 'absolute';
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.fontSize = `${12 + Math.random() * 16}px`;
      el.style.opacity = '0';
      el.style.filter = 'blur(2px)';
      el.style.color = 'rgba(255,255,255,0.8)';
      el.style.setProperty('--hb-opacity', `${0.2 + Math.random() * 0.4}`);
      el.style.animation = `hb-fade ${lifespan}ms ease-in-out forwards, hb-float ${3500 + Math.random() * 2000}ms ease-in-out infinite`;
      el.style.transformOrigin = 'center';
      el.style.pointerEvents = 'none';
      el.style.backfaceVisibility = 'hidden';
      container.appendChild(el);
      active.push({ el, removeAt: performance.now() + lifespan, drift: 6 + Math.random() * 8, rot: Math.random() * 0.6 - 0.3, depth });
    };

    const tick = () => {
      const now = performance.now();
      active.forEach((item) => {
        const t = now * 0.001;
        const dx = Math.sin(t * 0.6) * item.drift;
        const dy = Math.cos(t * 0.7) * item.drift;
        const translateY = window.scrollY * 0.04 * item.depth;
        item.el.style.transform = `translate(${dx}px, ${dy + translateY}px) rotate(${item.rot}rad)`;
      });
      for (let i = active.length - 1; i >= 0; i--) {
        if (active[i].removeAt <= now) {
          active[i].el.remove();
          active.splice(i, 1);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    tick();

    const schedule = () => {
      spawn();
      const interval = 2000 + Math.random() * 1000;
      timer = window.setTimeout(schedule, interval);
    };

    schedule();

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      active.forEach((item) => item.el.remove());
      active.length = 0;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;
    let raf = 0;
    const theme = themeRef.current;
    el.style.background = `radial-gradient(circle at 30% 30%, ${theme.gradient[0]} 0%, transparent 35%), linear-gradient(135deg, ${theme.gradient[0]} 0%, ${theme.gradient[1]} 100%)`;
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={join('fixed inset-0 w-full h-full overflow-hidden pointer-events-none', className)} style={{ zIndex: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: symbolStyle }} />
      <div ref={gradientRef} className="absolute inset-0" aria-hidden />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
        aria-hidden
        style={{ background: `linear-gradient(135deg, #0b1221, #0d1f37)` }}
      />
      <div ref={symbolsRef} className="absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 120%, rgba(91,33,182,0.12), transparent 45%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}
