import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

type HoverState = "default" | "small" | "medium" | "large";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const prefersReducedMotion = useReducedMotionSafe();
  
  // Use refs for animation values to avoid re-renders
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const targetScale = useRef(1);
  const currentScale = useRef(1);
  const hoverState = useRef<HoverState>("default");
  const lastHoverState = useRef<HoverState>("default");
  const magneticTarget = useRef<{ x: number; y: number } | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastUpdateTime = useRef(0);
  const stateChangeDebounce = useRef<number | null>(null);

  const animate = useCallback(() => {
    if (!cursorRef.current || !cursorDotRef.current) {
      animationFrameId.current = requestAnimationFrame(animate);
      return;
    }

    const isMagnetic = hoverState.current !== "default";
    
    // Calculate target position with magnetic pull
    let targetX = mousePos.current.x;
    let targetY = mousePos.current.y;
    
    if (isMagnetic && magneticTarget.current) {
      // Pull cursor 25% towards center of element
      targetX += (magneticTarget.current.x - targetX) * 0.25;
      targetY += (magneticTarget.current.y - targetY) * 0.25;
    }
    
    // INCREASED smoothing for stability on small elements
    // Lower value = slower/smoother, higher = faster/snappier
    // Added minimum update threshold to prevent micro-jitter
    const deltaX = Math.abs(targetX - cursorPos.current.x);
    const deltaY = Math.abs(targetY - cursorPos.current.y);
    const minThreshold = hoverState.current === "small" ? 0.5 : 1; // Lower threshold for smoother small element tracking
    
    let smoothing: number;
    switch (hoverState.current) {
      case "small":
        smoothing = 0.04; // Ultra slow for small buttons - prevents jitter
        break;
      case "medium":
        smoothing = 0.10; // Moderate smoothing
        break;
      case "large":
        smoothing = 0.12; // Slightly faster for large elements
        break;
      default:
        smoothing = 0.15; // Default speed
    }
    
    // Smooth position follow (LERP) with GPU-friendly transforms
    // Only update if movement exceeds threshold to prevent oscillation
    if (deltaX > minThreshold || deltaY > minThreshold) {
      cursorPos.current.x += (targetX - cursorPos.current.x) * smoothing;
      cursorPos.current.y += (targetY - cursorPos.current.y) * smoothing;
    }
    
    // MUCH smoother scale transition with cubic easing
    const scaleDiff = targetScale.current - currentScale.current;
    const scaleSmoothing = hoverState.current === "small" ? 0.04 : 0.06;
    currentScale.current += scaleDiff * scaleSmoothing;
    
    // Determine cursor size based on hover state
    let cursorSize: number;
    switch (hoverState.current) {
      case "small":
        cursorSize = 28;
        break;
      case "medium":
        cursorSize = 40;
        break;
      case "large":
        cursorSize = 50;
        break;
      default:
        cursorSize = 40;
    }
    
    // Ring color intensity based on state
    const ringOpacity = hoverState.current === "small" ? 0.9 : 0.6;
    const glowIntensity = hoverState.current === "small" ? "0 0 15px rgba(139, 92, 246, 0.8)" : "0 0 10px rgba(139, 92, 246, 0.4)";
    
    // Apply transforms with GPU acceleration (translate3d forces GPU layer)
    cursorRef.current.style.transform = 
      `translate3d(${cursorPos.current.x - cursorSize / 2}px, ${cursorPos.current.y - cursorSize / 2}px, 0) scale(${currentScale.current})`;
    cursorRef.current.style.width = `${cursorSize}px`;
    cursorRef.current.style.height = `${cursorSize}px`;
    cursorRef.current.style.borderColor = `rgba(139, 92, 246, ${ringOpacity})`;
    cursorRef.current.style.boxShadow = glowIntensity;
    
    // Dot follows with slightly faster response for precision feel
    const dotSize = hoverState.current === "small" ? 6 : 8;
    
    // Dot uses a slightly faster lerp towards mouse for precision
    const dotX = cursorPos.current.x + (mousePos.current.x - cursorPos.current.x) * 0.5;
    const dotY = cursorPos.current.y + (mousePos.current.y - cursorPos.current.y) * 0.5;
    
    cursorDotRef.current.style.transform = 
      `translate3d(${dotX - dotSize / 2}px, ${dotY - dotSize / 2}px, 0) scale(${currentScale.current * 0.85})`;
    cursorDotRef.current.style.width = `${dotSize}px`;
    cursorDotRef.current.style.height = `${dotSize}px`;
    
    animationFrameId.current = requestAnimationFrame(animate);
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
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const target = e.target as HTMLElement;
      
      // Find the interactive element - expanded to include all small button types
      const interactiveEl = target.closest(
        ".tech-chip, .magnetic-target, [data-cursor-magnetic], button, a, .skill-tag, .tech-stack-item, [class*='badge'], [class*='chip'], [class*='tag']"
      ) as HTMLElement | null;
      
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("tech-chip") ||
        target.closest(".tech-chip") ||
        target.classList.contains("skill-tag") ||
        target.closest(".skill-tag") ||
        target.classList.contains("tech-stack-item") ||
        target.closest(".tech-stack-item") ||
        target.closest("[class*='badge']") ||
        target.closest("[class*='chip']") ||
        target.closest("[class*='tag']");
      
      if (isInteractive && interactiveEl) {
        const rect = interactiveEl.getBoundingClientRect();
        const elementSize = Math.max(rect.width, rect.height);
        
        // Check if it's a tech chip - always use small state for these
        const isTechChip = interactiveEl.classList.contains("tech-chip") || 
                           interactiveEl.closest(".tech-chip") !== null ||
                           interactiveEl.hasAttribute("data-cursor-magnetic");
        
        // Set magnetic target for pull effect
        magneticTarget.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        
        // Determine new hover state
        let newState: HoverState;
        let newScale: number;
        
        // Tech chips always get the "small" animation regardless of size
        if (isTechChip || elementSize < 120) {
          newState = "small";
          newScale = 0.65; // Shrink for chips and small buttons
        } else if (elementSize < 200) {
          newState = "medium";
          newScale = 1.0; // Normal size
        } else {
          newState = "large";
          newScale = 1.15; // Expand for large buttons
        }
        
        // Debounce state changes to prevent rapid switching
        if (newState !== lastHoverState.current) {
          if (stateChangeDebounce.current) {
            clearTimeout(stateChangeDebounce.current);
          }
          stateChangeDebounce.current = window.setTimeout(() => {
            hoverState.current = newState;
            targetScale.current = newScale;
            lastHoverState.current = newState;
          }, 50); // 50ms debounce
        } else {
          hoverState.current = newState;
          targetScale.current = newScale;
        }
      } else {
        // Debounce returning to default state
        if (lastHoverState.current !== "default") {
          if (stateChangeDebounce.current) {
            clearTimeout(stateChangeDebounce.current);
          }
          stateChangeDebounce.current = window.setTimeout(() => {
            hoverState.current = "default";
            targetScale.current = 1.0;
            magneticTarget.current = null;
            lastHoverState.current = "default";
          }, 30); // Faster return to default
        } else {
          hoverState.current = "default";
          targetScale.current = 1.0;
          magneticTarget.current = null;
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      document.body.style.cursor = "";
    };
  }, [animate, prefersReducedMotion]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Cursor Ring - GPU accelerated */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          border: "2px solid rgba(139, 92, 246, 0.6)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform, width, height, border-color, box-shadow",
          transformOrigin: "center",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />
      
      {/* Cursor Dot - GPU accelerated */}
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: "rgba(139, 92, 246, 0.95)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000,
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.7)",
          willChange: "transform, width, height",
          transformOrigin: "center",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />
    </>
  );
}
