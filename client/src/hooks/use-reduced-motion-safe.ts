import { useEffect, useState } from 'react';

/**
 * Hook that checks if user prefers reduced motion
 * Respects accessibility settings
 */
export function useReducedMotionSafe() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook that returns safe animation variants based on motion preference
 */
export function useSafeAnimation<T extends object>(
  normalVariants: T,
  reducedVariants: Partial<T>
): T {
  const prefersReducedMotion = useReducedMotionSafe();

  if (prefersReducedMotion) {
    return { ...normalVariants, ...reducedVariants } as T;
  }

  return normalVariants;
}

/**
 * Hook for conditionally enabling animations
 */
export function useAnimationEnabled() {
  const prefersReducedMotion = useReducedMotionSafe();
  return !prefersReducedMotion;
}

/**
 * Get animation duration based on user preference
 */
export function useSafeAnimationDuration(normalDuration: number, reducedDuration: number = 0) {
  const prefersReducedMotion = useReducedMotionSafe();
  return prefersReducedMotion ? reducedDuration : normalDuration;
}

/**
 * Get spring configuration based on user preference
 */
export function useSafeSpring(
  normalSpring: { stiffness: number; damping: number },
  reducedSpring: { stiffness: number; damping: number } = { stiffness: 300, damping: 30 }
) {
  const prefersReducedMotion = useReducedMotionSafe();
  return prefersReducedMotion ? reducedSpring : normalSpring;
}
