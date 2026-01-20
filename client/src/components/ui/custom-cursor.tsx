import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

interface Position {
  x: number;
  y: number;
}

type CursorState = "default" | "link" | "button";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState<Position[]>(
    Array(5).fill({ x: 0, y: 0 })
  );
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const prefersReducedMotion = useReducedMotionSafe();
  
  const animationFrameRef = useRef<number | null>(null);
  const mousePositionRef = useRef<Position>({ x: 0, y: 0 });
  const trailPositionsRef = useRef<Position[]>(Array(5).fill({ x: 0, y: 0 }));

  const updateTrail = useCallback(() => {
    const newTrailPositions = [...trailPositionsRef.current];
    
    for (let i = newTrailPositions.length - 1; i > 0; i--) {
      newTrailPositions[i] = {
        x: newTrailPositions[i].x + (newTrailPositions[i - 1].x - newTrailPositions[i].x) * 0.3,
        y: newTrailPositions[i].y + (newTrailPositions[i - 1].y - newTrailPositions[i].y) * 0.3,
      };
    }
    
    newTrailPositions[0] = {
      x: newTrailPositions[0].x + (mousePositionRef.current.x - newTrailPositions[0].x) * 0.4,
      y: newTrailPositions[0].y + (mousePositionRef.current.y - newTrailPositions[0].y) * 0.4,
    };
    
    trailPositionsRef.current = newTrailPositions;
    setTrailPositions([...newTrailPositions]);
    
    animationFrameRef.current = requestAnimationFrame(updateTrail);
  }, []);

  useEffect(() => {
    const hasTouchSupport = 
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (hasTouchSupport || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);
    
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      
      const isLink = target.tagName === "A" || target.closest("a") !== null;
      const isButton = 
        target.tagName === "BUTTON" || 
        target.closest("button") !== null ||
        target.getAttribute("role") === "button";

      if (isButton) {
        setCursorState("button");
      } else if (isLink) {
        setCursorState("link");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animationFrameRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      document.body.style.cursor = "";
    };
  }, [updateTrail, prefersReducedMotion]);

  if (isTouchDevice || !isVisible) return null;

  const getCursorSize = () => {
    switch (cursorState) {
      case "link":
        return 60;
      case "button":
        return 20;
      default:
        return 40;
    }
  };

  const getGradientColors = () => {
    if (cursorState === "button") {
      return "from-purple-600 to-purple-600";
    }
    return "from-[#3b82f6] to-[#5b21b6]";
  };

  const cursorSize = getCursorSize();
  const dotSize = 8;
  const trailDotSize = 6;

  const trailOpacities = [1.0, 0.8, 0.6, 0.4, 0.2];

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none bg-transparent`}
        style={{
          width: cursorSize,
          height: cursorSize,
          zIndex: 9998,
          background: "transparent",
          border: "2px solid transparent",
          backgroundImage: cursorState === "button" 
            ? "linear-gradient(transparent, transparent), linear-gradient(135deg, #5b21b6, #5b21b6)"
            : "linear-gradient(transparent, transparent), linear-gradient(135deg, #3b82f6, #5b21b6)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        animate={{
          x: mousePosition.x - cursorSize / 2,
          y: mousePosition.y - cursorSize / 2,
          scale: cursorState === "default" ? [1, 1.1, 1] : 1,
        }}
        transition={
          cursorState === "default"
            ? {
                x: { type: "spring", stiffness: 300, damping: 28, mass: 0.5 },
                y: { type: "spring", stiffness: 300, damping: 28, mass: 0.5 },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : {
                type: "spring",
                stiffness: 300,
                damping: 28,
                mass: 0.5,
              }
        }
      />

      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none ${
          cursorState === "button" ? "bg-purple-600" : "bg-gradient-to-br from-[#3b82f6] to-[#5b21b6]"
        }`}
        style={{
          width: dotSize,
          height: dotSize,
          zIndex: 9998,
        }}
        animate={{
          x: mousePosition.x - dotSize / 2,
          y: mousePosition.y - dotSize / 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.2,
        }}
      />

      {trailPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 rounded-full pointer-events-none bg-gradient-to-br from-[#3b82f6] to-[#5b21b6]"
          style={{
            width: trailDotSize - index * 0.5,
            height: trailDotSize - index * 0.5,
            zIndex: 9998 - index - 1,
            opacity: trailOpacities[index],
          }}
          animate={{
            x: pos.x - (trailDotSize - index * 0.5) / 2,
            y: pos.y - (trailDotSize - index * 0.5) / 2,
          }}
          transition={{
            type: "spring",
            stiffness: 400 - index * 50,
            damping: 30 + index * 5,
            mass: 0.1 + index * 0.05,
          }}
        />
      ))}
    </>
  );
}
