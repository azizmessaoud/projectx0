import { useEffect, useState, useCallback } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Hook that tracks mouse position with throttling for performance
 * @param throttleMs - Throttle delay in milliseconds (default: 16ms ~60fps)
 */
export function useMousePosition(throttleMs: number = 16): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    let lastUpdate = 0;
    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      const now = Date.now();
      
      if (now - lastUpdate < throttleMs) {
        return;
      }

      lastUpdate = now;
      
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, [throttleMs]);

  return mousePosition;
}

/**
 * Hook for tracking mouse position relative to an element
 */
export function useMousePositionRelative(
  ref: React.RefObject<HTMLElement>
): MousePosition & { isHovering: boolean } {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  return { ...position, isHovering };
}

/**
 * Hook for magnetic button effect (element follows mouse)
 */
export function useMagneticEffect(
  ref: React.RefObject<HTMLElement>,
  strength: number = 0.3
) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setOffset({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);

  return offset;
}

/**
 * Hook for parallax effect based on mouse position
 */
export function useMouseParallax(
  layers: number = 3,
  intensity: number = 20
) {
  const mousePosition = useMousePosition(16);
  const [offsets, setOffsets] = useState<MousePosition[]>([]);

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (mousePosition.x - centerX) / centerX;
    const deltaY = (mousePosition.y - centerY) / centerY;

    const newOffsets = Array.from({ length: layers }, (_, i) => {
      const layerIntensity = intensity * ((i + 1) / layers);
      return {
        x: deltaX * layerIntensity,
        y: deltaY * layerIntensity,
      };
    });

    setOffsets(newOffsets);
  }, [mousePosition, layers, intensity]);

  return offsets;
}
