import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DURATION, EASE, STAGGER, SCROLL_TRIGGER_DEFAULTS } from './constants';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Create a fade-in animation with optional direction
 */
export function fadeIn(
  target: gsap.TweenTarget,
  options?: {
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  }
) {
  const {
    direction = 'up',
    distance = 50,
    duration = DURATION.normal,
    delay = 0,
    ease = EASE.smooth,
  } = options || {};

  const from: gsap.TweenVars = { opacity: 0 };

  if (direction === 'up') from.y = distance;
  if (direction === 'down') from.y = -distance;
  if (direction === 'left') from.x = distance;
  if (direction === 'right') from.x = -distance;

  return gsap.from(target, {
    ...from,
    duration,
    delay,
    ease,
  });
}

/**
 * Create a staggered fade-in animation for multiple elements
 */
export function staggerFadeIn(
  targets: gsap.TweenTarget,
  options?: {
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
  }
) {
  const {
    direction = 'up',
    distance = 50,
    duration = DURATION.normal,
    stagger = STAGGER.normal,
    ease = EASE.smooth,
  } = options || {};

  const from: gsap.TweenVars = { opacity: 0 };

  if (direction === 'up') from.y = distance;
  if (direction === 'down') from.y = -distance;
  if (direction === 'left') from.x = distance;
  if (direction === 'right') from.x = -distance;

  return gsap.from(targets, {
    ...from,
    duration,
    stagger,
    ease,
  });
}

/**
 * Create a scroll-triggered animation
 */
export function scrollTriggerAnimation(
  trigger: gsap.DOMTarget,
  animation: gsap.TweenVars,
  scrollTriggerOptions?: ScrollTrigger.Vars
) {
  return gsap.from(trigger, {
    ...animation,
    scrollTrigger: {
      trigger,
      ...SCROLL_TRIGGER_DEFAULTS,
      ...scrollTriggerOptions,
    },
  });
}

/**
 * Create a parallax scroll effect
 */
export function parallaxScroll(
  target: gsap.DOMTarget,
  speed: number = 0.5,
  options?: ScrollTrigger.Vars
) {
  return gsap.to(target, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: target,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...options,
    },
  });
}

/**
 * Create a scale animation on scroll
 */
export function scaleOnScroll(
  target: gsap.DOMTarget,
  from: number = 0.8,
  to: number = 1,
  options?: ScrollTrigger.Vars
) {
  return gsap.fromTo(
    target,
    { scale: from, opacity: 0 },
    {
      scale: to,
      opacity: 1,
      scrollTrigger: {
        trigger: target,
        ...SCROLL_TRIGGER_DEFAULTS,
        ...options,
      },
    }
  );
}

/**
 * Create a rotation reveal animation
 */
export function rotateReveal(
  target: gsap.TweenTarget,
  rotation: number = 90,
  options?: {
    duration?: number;
    ease?: string;
    axis?: 'x' | 'y' | 'z';
  }
) {
  const { duration = DURATION.slow, ease = EASE.power3, axis = 'x' } = options || {};

  const from: gsap.TweenVars = { opacity: 0 };
  if (axis === 'x') from.rotationX = rotation;
  if (axis === 'y') from.rotationY = rotation;
  if (axis === 'z') from.rotationZ = rotation;

  return gsap.from(target, {
    ...from,
    duration,
    ease,
  });
}

/**
 * Create a clip-path reveal animation
 */
export function clipPathReveal(
  target: gsap.TweenTarget,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  options?: {
    duration?: number;
    ease?: string;
  }
) {
  const { duration = DURATION.slow, ease = EASE.power3 } = options || {};

  const clipPaths: Record<typeof direction, [string, string]> = {
    left: ['polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'],
    right: ['polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'],
    top: ['polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'],
    bottom: ['polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'],
  };

  return gsap.fromTo(
    target,
    { clipPath: clipPaths[direction][0] },
    { clipPath: clipPaths[direction][1], duration, ease }
  );
}

/**
 * Create a text scramble effect
 */
export function textScramble(
  target: HTMLElement,
  finalText: string,
  options?: {
    duration?: number;
    characters?: string;
  }
) {
  const { duration = 1, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()' } = options || {};

  const timeline = gsap.timeline();
  const steps = Math.floor(duration * 60); // 60fps
  const finalChars = finalText.split('');

  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const revealCount = Math.floor(finalChars.length * progress);

    timeline.to(
      target,
      {
        duration: duration / steps,
        onUpdate: () => {
          const scrambled = finalChars
            .map((char, index) => {
              if (index < revealCount) return char;
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('');
          target.textContent = scrambled;
        },
      },
      i * (duration / steps)
    );
  }

  return timeline;
}

/**
 * Create a magnetic attraction effect
 */
export function magneticEffect(
  target: HTMLElement,
  strength: number = 0.3
) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(target, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: EASE.power2,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: EASE.elastic,
    });
  };

  target.addEventListener('mousemove', handleMouseMove);
  target.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    target.removeEventListener('mousemove', handleMouseMove);
    target.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Refresh all ScrollTriggers (useful after DOM changes)
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Kill all GSAP animations and ScrollTriggers
 */
export function killAllAnimations() {
  gsap.killTweensOf('*');
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
