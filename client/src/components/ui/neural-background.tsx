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

    // Configuration
    const particleCount = Math.min(window.innerWidth / 10, 80); // Responsive count (increased density)
    const connectionDistance = 200;
    const mouseDistance = 200; // Repulsion radius
    
    // Quantum symbols (expanded list)
    const symbols = ['ψ', 'φ', 'H', 'U', '|0⟩', '|1⟩', '|+' + '⟩', '|-' + '⟩', '∑', '∫', '∂', '∇', 'Ω', 'X', 'CNOT', 'λ', 'θ'];
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      symbol?: string;
      isSymbol: boolean;
      layer: number; // 0 (slow/back), 1 (medium), 2 (fast/front)
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
        const isSymbol = Math.random() > 0.6; // 40% chance to be a symbol
        const layer = Math.floor(Math.random() * 3); // 0, 1, 2
        
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.3 + layer * 0.3), // Speed based on layer
          vy: (Math.random() - 0.5) * (0.3 + layer * 0.3),
          size: Math.random() * 2 + 1 + layer, // Larger in front
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
      
      // Update and draw particles
      particles.forEach((p, i) => {
        // Pulse effect
        p.pulsePhase += p.pulseSpeed;
        const pulse = 0.9 + Math.sin(p.pulsePhase) * 0.2; // 0.7 to 1.1 scale (more subtle pulse)

        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction (Repulsion)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseDistance) {
          const force = (mouseDistance - distMouse) / mouseDistance;
          // Move away from mouse
          p.x -= dxMouse * force * 0.05 * (p.layer + 1); 
          p.y -= dyMouse * force * 0.05 * (p.layer + 1);
        }

        const opacity = 0.2 + p.layer * 0.2; // More opaque in front

        // Draw particle or symbol
        if (p.isSymbol && p.symbol) {
          ctx.font = `${14 + p.layer * 4}px monospace`; // Larger symbols
          ctx.save();
          // Gentle rotation for symbols
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.pulsePhase * 0.5) * 0.2);
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`; // Electric blue
          ctx.fillText(p.symbol, -5, 5); // Center approximate
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
          
          // Gradient fill for nodes
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * pulse * 2);
          gradient.addColorStop(0, `rgba(91, 33, 182, ${opacity})`); // Purple core
          gradient.addColorStop(1, `rgba(91, 33, 182, 0)`); // Fade out
          
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Solid center
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
          ctx.fill();
        }

        // Connections (only for non-symbol nodes or mixed, limit checks for performance)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          // Only connect if on same or adjacent layer
          if (Math.abs(p.layer - p2.layer) > 1) continue;

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / connectionDistance) * 0.2;
            
            // Gradient connection from blue to purple
            const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            grad.addColorStop(0, `rgba(59, 130, 246, ${alpha})`); // Blue
            grad.addColorStop(1, `rgba(91, 33, 182, ${alpha})`); // Purple
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1 + (p.layer * 0.5); // Thicker lines in front
            ctx.stroke();
            
            // Data flow animation along lines (random moving dots)
            if (Math.random() > 0.995) { // Occasional pulse
               // Implementation for complex flow dots is simplified here to avoid excessive draw calls in 2D context
               // Real "flow" would need tracking active pulses per line, which is heavy. 
               // Instead, we can flash the line brighter occasionally.
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-80 bg-[#0a1929]"
    />
  );
}
