import { useEffect, useRef } from 'react';

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    const particleCount = Math.min(window.innerWidth / 8, 100);
    const connectionDistance = 180;
    const mouseDistance = 250;
    
    const symbols = ['ψ', 'φ', 'H', 'U', '|0⟩', '|1⟩', '∑', '∫', '∂', '∇', 'Ω', 'λ', 'θ', 'π', 'σ'];
    
    interface Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      symbol?: string;
      isSymbol: boolean;
      layer: number;
      pulsePhase: number;
      pulseSpeed: number;
      orbitRadius: number;
      orbitSpeed: number;
      orbitAngle: number;
    }

    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };
    let targetMouse = { x: -1000, y: -1000 };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const isSymbol = Math.random() > 0.7;
        const layer = Math.floor(Math.random() * 3);
        const baseX = Math.random() * width;
        const baseY = Math.random() * height;
        
        particles.push({
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 3 + 2 + layer,
          isSymbol,
          symbol: isSymbol ? symbols[Math.floor(Math.random() * symbols.length)] : undefined,
          layer,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          orbitRadius: 20 + Math.random() * 40,
          orbitSpeed: 0.001 + Math.random() * 0.002,
          orbitAngle: Math.random() * Math.PI * 2
        });
      }
    };

    const draw = () => {
      time += 1;
      
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;
      
      ctx.fillStyle = 'rgba(10, 25, 41, 0.15)';
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        p.pulsePhase += p.pulseSpeed;
        p.orbitAngle += p.orbitSpeed * (p.layer + 1);
        
        const pulse = 0.8 + Math.sin(p.pulsePhase) * 0.3;
        
        const orbitX = Math.cos(p.orbitAngle) * p.orbitRadius;
        const orbitY = Math.sin(p.orbitAngle) * p.orbitRadius;
        
        p.baseX += p.vx;
        p.baseY += p.vy;
        
        if (p.baseX < -50) p.baseX = width + 50;
        if (p.baseX > width + 50) p.baseX = -50;
        if (p.baseY < -50) p.baseY = height + 50;
        if (p.baseY > height + 50) p.baseY = -50;
        
        let targetX = p.baseX + orbitX;
        let targetY = p.baseY + orbitY;
        
        const dxMouse = mouse.x - targetX;
        const dyMouse = mouse.y - targetY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseDistance && distMouse > 0) {
          const force = (mouseDistance - distMouse) / mouseDistance;
          const repelStrength = force * force * 80;
          targetX -= (dxMouse / distMouse) * repelStrength;
          targetY -= (dyMouse / distMouse) * repelStrength;
        }
        
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        const opacity = 0.3 + p.layer * 0.25;

        if (p.isSymbol && p.symbol) {
          ctx.font = `${12 + p.layer * 5}px "JetBrains Mono", monospace`;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.pulsePhase * 0.3) * 0.15);
          
          ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
          ctx.shadowBlur = 10 + Math.sin(p.pulsePhase) * 5;
          ctx.fillStyle = `rgba(139, 92, 246, ${opacity * pulse})`;
          ctx.fillText(p.symbol, -8, 4);
          ctx.shadowBlur = 0;
          ctx.restore();
        } else {
          const glowSize = p.size * pulse * 3;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
          gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.8})`);
          gradient.addColorStop(0.3, `rgba(91, 33, 182, ${opacity * 0.4})`);
          gradient.addColorStop(1, 'rgba(91, 33, 182, 0)');
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * pulse * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
          ctx.fill();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (Math.abs(p.layer - p2.layer) > 1) continue;

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.4 * (0.8 + Math.sin(time * 0.02 + i * 0.1) * 0.2);
            
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            grad.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
            grad.addColorStop(0.5, `rgba(139, 92, 246, ${alpha * 0.8})`);
            grad.addColorStop(1, `rgba(91, 33, 182, ${alpha})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1 + (p.layer * 0.3);
            ctx.stroke();
            
            if (dist < connectionDistance * 0.5) {
              const dataFlowPos = (time * 0.003 + i * 0.1) % 1;
              const flowX = p.x + (p2.x - p.x) * dataFlowPos;
              const flowY = p.y + (p2.y - p.y) * dataFlowPos;
              
              ctx.beginPath();
              ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
              ctx.fill();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouse.x = -1000;
      targetMouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    init();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #0a1929 0%, #0d2137 50%, #0a1929 100%)' }}
    />
  );
}
