import { useEffect, useRef, useState } from 'react';

type SectionKey = 'hero' | 'about' | 'experience' | 'projects' | 'certifications' | 'contact';

type Theme = {
  gradient: [string, string];
  connectionHue: [number, number];
  dataStreams: boolean;
  particleDensityMultiplier: number;
  spotlightEffect: boolean;
};

const SECTION_THEMES: Record<SectionKey, Theme> = {
  hero: { 
    gradient: ['#030810', '#0a1520'], 
    connectionHue: [200, 220], 
    dataStreams: false,
    particleDensityMultiplier: 0.8,
    spotlightEffect: true
  },
  about: { 
    gradient: ['#040a14', '#0c1a28'], 
    connectionHue: [195, 215], 
    dataStreams: false,
    particleDensityMultiplier: 1.2, 
    spotlightEffect: true
  },
  experience: {
    gradient: ['#050c18', '#0e1825'],
    connectionHue: [200, 230], 
    dataStreams: false,
    particleDensityMultiplier: 1.0,
    spotlightEffect: true
  },
  projects: { 
    gradient: ['#040a14', '#0a1520'], 
    connectionHue: [190, 220],
    dataStreams: false, 
    particleDensityMultiplier: 1.0,
    spotlightEffect: true
  },
  certifications: {
    gradient: ['#050c18', '#0c1825'],
    connectionHue: [200, 225],
    dataStreams: false,
    particleDensityMultiplier: 1.0,
    spotlightEffect: true
  },
  contact: {
    gradient: ['#020508', '#060e18'], 
    connectionHue: [200, 220],
    dataStreams: false,
    particleDensityMultiplier: 0.6,
    spotlightEffect: true
  }
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  layer: number; 
  phase: number;
  driftSpeed: number; // Parallax drift for space travel
  color: string; // Cosmic color
};

// Cosmic color palette for space theme
const spaceColors = [
  'rgba(139, 92, 246, 0.9)',   // Purple
  'rgba(59, 130, 246, 0.9)',   // Blue  
  'rgba(236, 72, 153, 0.9)',   // Pink/Magenta
  'rgba(147, 51, 234, 0.9)',   // Deep purple
  'rgba(99, 102, 241, 0.9)',   // Indigo
  'rgba(167, 139, 250, 0.9)',  // Light purple
  'rgba(56, 189, 248, 0.9)',   // Cyan
  'rgba(192, 132, 252, 0.9)',  // Lavender
];

const getSpaceColor = () => spaceColors[Math.floor(Math.random() * spaceColors.length)];

type Symbol = {
  x: number;
  y: number;
  char: string;
  opacity: number;
  speed: number;
  phase: number;
  layer: number;
};

type DataStream = { 
  x: number; 
  y: number; 
  vx: number; 
  vy: number; 
  opacity: number; 
  type: 'binary' | 'bar' | 'stream' | 'scatter' | 'line';
  value?: string;
  height?: number;
  points?: {x: number, y: number}[];
};

export function HeroBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentSection, setCurrentSection] = useState<SectionKey>('hero');
  const mouseRef = useRef({ x: 0, y: 0 });
  const themeRef = useRef(SECTION_THEMES.hero);
  const isVisibleRef = useRef(true);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    themeRef.current = SECTION_THEMES[currentSection];
  }, [currentSection]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = mediaQuery.matches;
    
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); 
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Mobile optimization - reduce particles for better performance
    const isMobile = width < 768;
    const particleCountReduction = isMobile ? 0.5 : 1;
    
    const nodes: Node[] = [];
    const symbols: Symbol[] = [];
    const streams: DataStream[] = [];
    
    const connectionDistance = isMobile ? 120 : 180; // Extended for space connections 
    
    // Minimal, subtle Data Science symbols for the moody aesthetic
    const dataScienceSymbols = [
      // Core math - very subtle
      'σ', 'μ', 'π', 'Σ', '∞', '∫', '∂', '∇', 
      'α', 'β', 'θ', 'λ', 'Δ',
      // Simple symbols
      '→', '∈', '∩', '≈', '∝',
      // ML essentials
      'w', 'b', 'L', 'η',
      // Subtle markers
      '●', '○', '·'
    ];
    
    // Smoky particle type for atmospheric effect
    type SmokeParticle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
      maxLife: number;
    };
    
    const smokeParticles: SmokeParticle[] = [];
    
    const initSmoke = (count: number) => {
      smokeParticles.length = 0;
      for (let i = 0; i < count; i++) {
        smokeParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.5 - 0.1,
          size: Math.random() * 80 + 40,
          opacity: Math.random() * 0.08 + 0.02,
          life: Math.random() * 1000,
          maxLife: 1000 + Math.random() * 500
        });
      }
    };
    
    initSmoke(isMobile ? 8 : 15);
    
    // Section-specific symbol density - cosmic presence
    const getSectionSymbolCount = (section: SectionKey): number => {
      const base = {
        hero: 12,
        about: 15,
        experience: 14,
        projects: 18,
        certifications: 18,
        contact: 10
      };
      return Math.floor((base[section] || 12) * particleCountReduction);
    };

    const initNodes = (count: number) => {
      nodes.length = 0; 
      for (let i = 0; i < count; i++) {
        // 3 depth layers: 0=far (slow), 1=mid, 2=near (fast) - parallax effect
        const layer = Math.random() < 0.3 ? 0 : (Math.random() < 0.6 ? 1 : 2);
        // Larger nodes: 3-7px for visibility
        const radius = layer === 0 ? Math.random() * 2 + 2 : 
                       layer === 1 ? Math.random() * 2.5 + 3 :
                       Math.random() * 3 + 4;
        // Drift speed based on layer (parallax: far=slow, near=fast)
        const driftSpeed = layer === 0 ? 0.2 + Math.random() * 0.2 :
                          layer === 1 ? 0.4 + Math.random() * 0.3 :
                          0.6 + Math.random() * 0.4;
        nodes.push({
          x: Math.random() * (width + 200) - 100, // Spawn off-screen too
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3, // Small random vertical movement
          vy: (Math.random() - 0.5) * 0.3, // Small random horizontal movement
          radius: radius,
          baseRadius: radius,
          layer: layer,
          phase: Math.random() * Math.PI * 2,
          driftSpeed: driftSpeed,
          color: getSpaceColor()
        });
      }
    };

    // More nodes for richer space experience
    initNodes(Math.floor(80 * particleCountReduction));

    const initSymbols = (count: number) => {
      symbols.length = 0;
      for (let i = 0; i < count; i++) {
        symbols.push({
          x: Math.random() * width,
          y: Math.random() * height,
          char: dataScienceSymbols[Math.floor(Math.random() * dataScienceSymbols.length)],
          opacity: Math.random() * 0.5 + 0.35, // Slightly higher base opacity
          speed: (Math.random() * 0.35) + 0.12, // Slightly slower for readability
          phase: Math.random() * Math.PI * 2,
          layer: Math.random() 
        });
      }
    };
    
    // Initialize with section-aware symbol count
    initSymbols(getSectionSymbolCount(currentSection));

    const initStreams = (count: number) => {
      streams.length = 0;
      for (let i = 0; i < count; i++) {
        createStream(i < count * 0.2);
      }
    };

    const createStream = (forceBinaryRain = false) => {
      const typeRand = Math.random();
      let type: DataStream['type'] = 'stream';
      let x = Math.random() * width;
      let y = Math.random() * height;
      
      if (forceBinaryRain || typeRand > 0.85) {
        type = 'binary';
        if (Math.random() > 0.5) x = Math.random() * (width * 0.1);
        else x = width - Math.random() * (width * 0.1);
        y = Math.random() * height;
      } else if (typeRand > 0.7) {
        type = 'bar';
      } else if (typeRand > 0.6) {
        type = 'scatter';
      } else if (typeRand > 0.55) {
        type = 'line';
      }

      const newStream: DataStream = {
        x, y,
        vx: type === 'line' ? 1 : 0,
        vy: (Math.random() * 2) + 1,
        opacity: Math.random() * 0.5 + 0.1, // Better visibility
        type: type,
        value: type === 'binary' ? (Math.random() > 0.5 ? '1' : '0') : undefined,
        height: type === 'bar' ? Math.random() * 60 + 20 : undefined,
        points: []
      };

      if (type === 'scatter') {
        for (let k = 0; k < 10; k++) {
          newStream.points?.push({
            x: (Math.random() - 0.5) * 30, 
            y: (Math.random() - 0.5) * 30
          });
        }
      }

      if (type === 'line') {
        let ly = 0;
        for (let k = 0; k < 20; k++) {
          ly += (Math.random() - 0.5) * 10;
          newStream.points?.push({ x: k * 5, y: ly });
        }
      }
      
      streams.push(newStream);
    };

    initStreams(Math.floor(25 * particleCountReduction)); // Reduced stream count

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const theme = themeRef.current;
      
      // Reduce animation speed for users who prefer reduced motion
      const timeIncrement = prefersReducedMotionRef.current ? 0.002 : 0.008;
      time += timeIncrement;

      // Deep, moody background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, theme.gradient[0]);
      grad.addColorStop(0.5, theme.gradient[1]);
      grad.addColorStop(1, theme.gradient[0]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      
      // Motion trail effect - semi-transparent overlay for speed blur
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
      ctx.fillRect(0, 0, width, height);
      
      // Cosmic nebula smoke particles - adds depth to space
      smokeParticles.forEach(smoke => {
        smoke.x += smoke.vx + Math.sin(time * 0.5 + smoke.y * 0.01) * 0.2;
        smoke.y += smoke.vy;
        smoke.life += 1;
        
        // Reset smoke when it goes off screen or expires
        if (smoke.y < -smoke.size || smoke.life > smoke.maxLife) {
          smoke.x = Math.random() * width;
          smoke.y = height + smoke.size;
          smoke.life = 0;
          smoke.opacity = Math.random() * 0.1 + 0.03;
        }
        
        // Fade based on life
        const lifeFade = 1 - (smoke.life / smoke.maxLife) * 0.5;
        const smokeGrad = ctx.createRadialGradient(
          smoke.x, smoke.y, 0,
          smoke.x, smoke.y, smoke.size
        );
        // Cosmic nebula colors - purples and blues
        smokeGrad.addColorStop(0, `rgba(139, 92, 246, ${smoke.opacity * lifeFade * 0.7})`);
        smokeGrad.addColorStop(0.3, `rgba(99, 102, 241, ${smoke.opacity * lifeFade * 0.4})`);
        smokeGrad.addColorStop(0.6, `rgba(59, 130, 246, ${smoke.opacity * lifeFade * 0.2})`);
        smokeGrad.addColorStop(1, 'rgba(30, 60, 100, 0)');
        
        ctx.fillStyle = smokeGrad;
        ctx.beginPath();
        ctx.arc(smoke.x, smoke.y, smoke.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Subtle vignette effect
      const vignetteGrad = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.2,
        width / 2, height / 2, height * 0.9
      );
      vignetteGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignetteGrad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle cosmic grid - space wireframe aesthetic
      ctx.save();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.02)';
      ctx.lineWidth = 1;
      const hexSize = 100;
      for (let x = 0; x < width; x += hexSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += hexSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Data streams - only if enabled for section
      if (theme.dataStreams) {
        for (let i = 0; i < streams.length; i++) {
          const s = streams[i];
          s.y += s.vy;
          s.x += s.vx;
          s.opacity = Math.max(0, s.opacity * 0.995); 
          
          if (s.y > height + 50 || s.opacity < 0.05) {
            streams.splice(i, 1);
            createStream(); 
            i--;
            continue;
          }

          ctx.fillStyle = `rgba(139, 92, 246, ${s.opacity * 0.7})`; // Reduced opacity
          ctx.strokeStyle = `rgba(139, 92, 246, ${s.opacity * 0.7})`;
          
          if (s.type === 'stream') {
            ctx.fillRect(s.x, s.y, 2, 8);
          } else if (s.type === 'binary') {
            ctx.font = '11px monospace';
            ctx.fillText(s.value || '1', s.x, s.y);
            if (Math.random() > 0.95) s.value = s.value === '1' ? '0' : '1';
          } else if (s.type === 'bar') {
            const barH = (s.height || 20) * (0.5 + 0.5 * Math.sin(time * 5 + s.x));
            ctx.fillRect(s.x, s.y, 6, barH);
          } else if (s.type === 'scatter' && s.points) {
            s.points.forEach(p => {
              ctx.beginPath();
              ctx.arc(s.x + p.x, s.y + p.y, 1.5, 0, Math.PI * 2);
              ctx.fill();
            });
          } else if (s.type === 'line' && s.points) {
            ctx.beginPath();
            ctx.moveTo(s.x + s.points[0].x, s.y + s.points[0].y);
            for (let k = 1; k < s.points.length; k++) {
              ctx.lineTo(s.x + s.points[k].x, s.y + s.points[k].y);
            }
            ctx.stroke();
          }
        }
      }

      // Data Science symbols with cosmic colors - floating through space
      ctx.font = 'bold 18px "JetBrains Mono", "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Cosmic symbol colors (matching nodes)
      const symbolColors = [
        'rgba(139, 92, 246,',  // Purple
        'rgba(59, 130, 246,',  // Blue
        'rgba(167, 139, 250,', // Light purple
        'rgba(99, 102, 241,',  // Indigo
        'rgba(56, 189, 248,',  // Cyan
      ];
      
      symbols.forEach((s, idx) => {
        // Drift horizontally like nodes (space travel effect)
        s.x += 0.4 + s.layer * 0.3; 
        s.y -= s.speed * (1 + Math.sin(time + s.phase) * 0.2);
        s.x += Math.sin(time * 0.3 + s.phase) * 0.4; 
        
        // Wrap around when going off screen
        if (s.x > width + 40) {
          s.x = -40;
          s.y = Math.random() * height;
          s.char = dataScienceSymbols[Math.floor(Math.random() * dataScienceSymbols.length)];
        }
        if (s.y < -40) {
          s.y = height + 40;
          s.x = Math.random() * width;
          s.char = dataScienceSymbols[Math.floor(Math.random() * dataScienceSymbols.length)];
        }
        
        // Parallax opacity - farther = dimmer
        const parallaxOpacity = s.opacity * (0.5 + s.layer * 0.4);
        
        // Cycle through cosmic colors
        const colorBase = symbolColors[idx % symbolColors.length];
        const color = `${colorBase} ${parallaxOpacity})`;
        
        // Enhanced purple glow effect on symbols - REDUCED
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(139, 92, 246, ${parallaxOpacity * 0.5})`;
        ctx.fillStyle = color;
        ctx.fillText(s.char, s.x, s.y);
        ctx.shadowBlur = 0;
      });

      // Cosmic space nodes & connections
      const targetNodeCount = Math.floor(80 * theme.particleDensityMultiplier * particleCountReduction);
      
      if (nodes.length < targetNodeCount) {
        for (let k = 0; k < targetNodeCount - nodes.length; k++) {
          const layer = Math.random() < 0.3 ? 0 : (Math.random() < 0.6 ? 1 : 2);
          const radius = layer === 0 ? Math.random() * 2 + 2 : 
                         layer === 1 ? Math.random() * 2.5 + 3 :
                         Math.random() * 3 + 4;
          const driftSpeed = layer === 0 ? 0.2 + Math.random() * 0.2 :
                            layer === 1 ? 0.4 + Math.random() * 0.3 :
                            0.6 + Math.random() * 0.4;
          nodes.push({
            x: -100, // Spawn from left edge
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3, 
            vy: (Math.random() - 0.5) * 0.3,
            radius: radius, 
            baseRadius: radius, 
            layer, 
            phase: Math.random() * Math.PI * 2,
            driftSpeed: driftSpeed,
            color: getSpaceColor()
          });
        }
      } else if (nodes.length > targetNodeCount) {
        nodes.splice(targetNodeCount);
      }

      nodes.forEach((node, i) => {
        // Pulsing animation - size oscillates with sine wave
        const pulse = 1 + 0.25 * Math.sin(time * 2.5 + node.phase); 
        const currentRadius = node.baseRadius * pulse;
        
        // Space drift - continuous horizontal movement (left to right, parallax)
        node.x += node.driftSpeed;
        
        // Small random movement for organic feel
        node.x += node.vx;
        node.y += node.vy;
        
        // Wrap horizontally (seamless loop for space travel effect)
        if (node.x > width + 100) {
          node.x = -100;
          node.y = Math.random() * height;
          node.color = getSpaceColor(); // New color on respawn
        }
        
        // Bounce vertically (stay on screen)
        if (node.y < 0 || node.y > height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(height, node.y));
        }

        // Mouse attraction/interaction - creates subtle pull
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 250;
        
        if (dist < repulsionRadius) {
          const force = (repulsionRadius - dist) / repulsionRadius;
          node.x -= (dx / dist) * force * 0.8;
          node.y -= (dy / dist) * force * 0.8;
        }

        // Draw cosmic connections with gradient lines
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const cdx = node.x - nodeB.x;
          const cdy = node.y - nodeB.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          
          const maxDistance = 180; // Extended connection range
          if (cdist < maxDistance) {
            // Opacity fades with distance - REDUCED for text visibility
            const alpha = (1 - cdist / maxDistance) * 0.18;
            
            // Gradient line between nodes for depth effect
            const lineGrad = ctx.createLinearGradient(
              node.x, node.y, nodeB.x, nodeB.y
            );
            lineGrad.addColorStop(0, node.color.replace('0.9', String(alpha)));
            lineGrad.addColorStop(1, nodeB.color.replace('0.9', String(alpha)));
            
            ctx.lineWidth = 1.5; // Thicker lines for visibility
            ctx.strokeStyle = lineGrad;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }

        // Glow intensity based on depth layer - REDUCED for text visibility
        const glowIntensity = node.layer === 0 ? 5 : node.layer === 1 ? 10 : 15;
        
        // Draw outer glow halo first - REDUCED opacity
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = node.color.replace('0.9', '0.06');
        ctx.fill();
        
        // Draw glow effect using shadowBlur
        ctx.shadowBlur = glowIntensity;
        ctx.shadowColor = node.color;
        
        // Draw main node with cosmic gradient
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0, 
          node.x, node.y, currentRadius
        );
        gradient.addColorStop(0, node.color.replace('0.9', '1')); // Bright core
        gradient.addColorStop(0.6, node.color); 
        gradient.addColorStop(1, node.color.replace('0.9', '0.4'));
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Reset shadow for other drawings
        ctx.shadowBlur = 0;
      });

      // Cosmic spotlight effect following mouse - REDUCED opacity
      if (theme.spotlightEffect) {
        const spotGrad = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 450
        );
        spotGrad.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
        spotGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.03)');
        spotGrad.addColorStop(0.7, 'rgba(59, 130, 246, 0.01)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      
      const aboutPos = document.getElementById('about')?.offsetTop || height;
      const expPos = document.getElementById('experience')?.offsetTop || height * 2;
      const projPos = document.getElementById('projects')?.offsetTop || height * 3;
      const certPos = document.getElementById('certifications')?.offsetTop || height * 4;
      const contactPos = document.getElementById('contact')?.offsetTop || height * 5;
      
      const buffer = height * 0.3;
      
      if (scrollY < aboutPos - buffer) setCurrentSection('hero');
      else if (scrollY < expPos - buffer) setCurrentSection('about');
      else if (scrollY < projPos - buffer) setCurrentSection('experience');
      else if (scrollY < certPos - buffer) setCurrentSection('projects');
      else if (scrollY < contactPos - buffer) setCurrentSection('certifications');
      else setCurrentSection('contact');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 z-0 pointer-events-none ${className || ''}`}
      aria-hidden="true"
    />
  );
}
