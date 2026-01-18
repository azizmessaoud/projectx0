import { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const particleCount = Math.min(window.innerWidth / 10, 80);
    const connectionDistance = 200;
    const mouseDistance = 200;
    
    const symbols = ['ψ', 'φ', 'H', 'U', '|0⟩', '|1⟩', '|+⟩', '|-⟩', '∑', '∫', '∂', '∇', 'Ω', 'X', 'CNOT', 'λ', 'θ'];
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      symbol?: string;
      isSymbol: boolean;
      layer: number;
      pulsePhase: number;
      pulseSpeed: number;
    }

    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const isSymbol = Math.random() > 0.6;
        const layer = Math.floor(Math.random() * 3);
        
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.3 + layer * 0.3),
          vy: (Math.random() - 0.5) * (0.3 + layer * 0.3),
          size: Math.random() * 2 + 1 + layer,
          isSymbol,
          symbol: isSymbol ? symbols[Math.floor(Math.random() * symbols.length)] : undefined,
          layer,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.04
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Theme-based colors
      const isDark = theme === 'dark';
      const primaryColor = isDark ? 'rgba(91, 33, 182,' : 'rgba(139, 92, 246,'; // Purple
      const secondaryColor = isDark ? 'rgba(59, 130, 246,' : 'rgba(59, 130, 246,'; // Blue
      const symbolColor = isDark ? 'rgba(59, 130, 246,' : 'rgba(91, 33, 182,';
      
      particles.forEach((p, i) => {
        p.pulsePhase += p.pulseSpeed;
        const pulse = 0.9 + Math.sin(p.pulsePhase) * 0.2;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseDistance) {
          const force = (mouseDistance - distMouse) / mouseDistance;
          p.x -= dxMouse * force * 0.05 * (p.layer + 1); 
          p.y -= dyMouse * force * 0.05 * (p.layer + 1);
        }

        const baseOpacity = isDark ? 0.2 + p.layer * 0.2 : 0.15 + p.layer * 0.15;

        if (p.isSymbol && p.symbol) {
          ctx.font = `${14 + p.layer * 4}px monospace`;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.pulsePhase * 0.5) * 0.2);
          ctx.fillStyle = `${symbolColor}${baseOpacity})`;
          ctx.fillText(p.symbol, -5, 5);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
          
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * pulse * 2);
          gradient.addColorStop(0, `${primaryColor}${baseOpacity})`);
          gradient.addColorStop(1, `${primaryColor}0)`);
          
          ctx.fillStyle = gradient;
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `${secondaryColor}${baseOpacity})`;
          ctx.fill();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (Math.abs(p.layer - p2.layer) > 1) continue;

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / connectionDistance) * (isDark ? 0.2 : 0.15);
            
            const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            grad.addColorStop(0, `${secondaryColor}${alpha})`);
            grad.addColorStop(1, `${primaryColor}${alpha})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1 + (p.layer * 0.5);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full -z-10 pointer-events-none ${
        theme === 'dark' ? 'opacity-80 bg-[#0a1929]' : 'opacity-60 bg-slate-50'
      }`}
    />
  );
}
