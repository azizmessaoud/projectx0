import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for using GSAP with automatic cleanup
 * @param callback - GSAP animation function
 * @param dependencies - Dependencies array for useEffect
 */
export function useGSAP(
  callback: (context: gsap.Context) => void,
  dependencies: unknown[] = []
) {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!);
    });

    return () => {
      contextRef.current?.revert();
    };
  }, dependencies);

  return contextRef;
}

/**
 * Hook for creating scroll-triggered animations
 * @param target - Target element ref or selector
 * @param config - ScrollTrigger configuration
 */
export function useScrollTrigger<T extends HTMLElement>(
  config: ScrollTrigger.Vars
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      ...config,
    });

    return () => {
      trigger.kill();
    };
  }, [config]);

  return elementRef;
}

/**
 * Hook for creating timeline animations with automatic cleanup
 */
export function useTimeline(
  config?: gsap.TimelineVars
): gsap.core.Timeline {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    timelineRef.current = gsap.timeline(config);

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  return timelineRef.current!;
}

/**
 * Hook for batch animations with stagger effects
 */
export function useBatchAnimation<T extends HTMLElement>(
  selector: string,
  animation: gsap.TweenVars,
  config?: ScrollTrigger.BatchVars
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const batch = ScrollTrigger.batch(selector, {
      onEnter: (elements) => {
        gsap.from(elements, animation);
      },
      ...config,
    });

    return () => {
      batch.forEach((trigger) => trigger.kill());
    };
  }, [selector, animation, config]);

  return containerRef;
}
