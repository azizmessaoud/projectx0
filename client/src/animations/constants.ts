/**
 * Animation configuration constants
 */

// Durations (in seconds)
export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 1.0,
} as const;

// Easing functions
export const EASE = {
  // Standard eases
  power1: 'power1.inOut',
  power2: 'power2.inOut',
  power3: 'power3.inOut',
  power4: 'power4.inOut',
  
  // Custom eases
  smooth: 'power2.out',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.5)',
  
  // Expo
  expoIn: 'expo.in',
  expoOut: 'expo.out',
  expoInOut: 'expo.inOut',
  
  // Circ
  circIn: 'circ.in',
  circOut: 'circ.out',
  circInOut: 'circ.inOut',
} as const;

// Stagger configuration
export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
} as const;

// ScrollTrigger defaults
export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none none',
  markers: false, // Set to true for debugging
} as const;

// Parallax speeds
export const PARALLAX = {
  slow: 0.3,
  medium: 0.6,
  fast: 1.0,
} as const;

// Animation variants
export const FADE_UP = {
  y: 50,
  opacity: 0,
} as const;

export const FADE_DOWN = {
  y: -50,
  opacity: 0,
} as const;

export const FADE_LEFT = {
  x: 50,
  opacity: 0,
} as const;

export const FADE_RIGHT = {
  x: -50,
  opacity: 0,
} as const;

export const SCALE_UP = {
  scale: 0.8,
  opacity: 0,
} as const;

export const SCALE_DOWN = {
  scale: 1.2,
  opacity: 0,
} as const;

// Rotation angles
export const ROTATION = {
  slight: 5,
  medium: 15,
  strong: 30,
} as const;

// Z-index layers
export const Z_INDEX = {
  background: -1,
  base: 0,
  content: 10,
  overlay: 20,
  modal: 30,
  cursor: 40,
  max: 50,
} as const;
