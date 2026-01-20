import { useEffect, useState, useCallback } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Hook that tracks scroll progress (0-1) of the entire page
 */
export function useScrollProgress() {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useTransform(
    scrollY,
    [0, typeof document !== 'undefined' ? document.documentElement.scrollHeight - window.innerHeight : 0],
    [0, 1]
  );
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateScrollY = () => {
      scrollY.set(window.scrollY);
    };

    updateScrollY();
    window.addEventListener('scroll', updateScrollY, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollY);
    };
  }, [scrollY]);

  return {
    scrollY,
    scrollYProgress,
    smoothProgress,
  };
}

/**
 * Hook that provides scroll direction (up/down)
 */
export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const newDirection = scrollY > lastScrollY ? 'down' : 'up';
      
      if (
        newDirection !== direction &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setDirection(newDirection);
      }
      
      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [lastScrollY, direction]);

  return direction;
}

/**
 * Hook for detecting when an element enters/exits viewport
 */
export function useInView(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) {
  const [isInView, setIsInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return { isInView, hasEntered };
}

/**
 * Hook for smooth scroll to element
 */
export function useSmoothScrollTo() {
  const scrollTo = useCallback((target: string | HTMLElement, offset = 0) => {
    const element = typeof target === 'string' 
      ? document.querySelector(target) as HTMLElement
      : target;

    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }, []);

  return scrollTo;
}

/**
 * Hook for detecting scroll position relative to sections
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;

        const { offsetTop, offsetHeight } = section;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
}
