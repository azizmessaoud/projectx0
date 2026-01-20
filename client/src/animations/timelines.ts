import gsap from 'gsap';
import { DURATION, EASE, STAGGER } from './constants';

/**
 * Hero section entrance timeline
 */
export function createHeroTimeline() {
  const tl = gsap.timeline({ defaults: { ease: EASE.power3 } });

  // Logo slide-in from left
  const logoExists = gsap.utils.toArray('.hero-logo').length;
  if (logoExists) {
    tl.from('.hero-logo', {
      x: -100,
      opacity: 0,
      duration: DURATION.slow,
    });
  }

  // Badge scale + rotate
  const badgeExists = gsap.utils.toArray('.hero-badge').length;
  if (badgeExists) {
    tl.from(
      '.hero-badge',
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: DURATION.slow,
        ease: EASE.bounce,
      },
      '-=0.3'
    );
  }

  // Title clip-path reveal (left to right)
  const titleExists = gsap.utils.toArray('.hero-title').length;
  if (titleExists) {
    tl.from('.hero-title', {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      duration: DURATION.verySlow,
    });
  }

  // Gradient text shimmer
  const gradientExists = gsap.utils.toArray('.hero-gradient-text').length;
  if (gradientExists) {
    tl.from(
      '.hero-gradient-text',
      {
        backgroundPosition: '-200% center',
        duration: DURATION.verySlow,
      },
      '-=0.5'
    );
  }

  // Description blur-in
  const descExists = gsap.utils.toArray('.hero-description').length;
  if (descExists) {
    tl.from('.hero-description', {
      filter: 'blur(10px)',
      opacity: 0,
      duration: DURATION.normal,
    });
  }

  // CTA buttons stagger
  const ctaExists = gsap.utils.toArray('.hero-cta').length;
  if (ctaExists) {
    tl.from(
      '.hero-cta',
      {
        y: 30,
        opacity: 0,
        duration: DURATION.normal,
        stagger: STAGGER.fast,
      },
      '-=0.2'
    );
  }

  // Social icons elastic bounce
  const socialExists = gsap.utils.toArray('.hero-social').length;
  if (socialExists) {
    tl.from(
      '.hero-social',
      {
        scale: 0,
        opacity: 0,
        duration: DURATION.normal,
        ease: EASE.elastic,
        stagger: STAGGER.fast,
      },
      '-=0.3'
    );
  }

  // Scroll indicator pulse
  const scrollExists = gsap.utils.toArray('.hero-scroll-indicator').length;
  if (scrollExists) {
    tl.from(
      '.hero-scroll-indicator',
      {
        opacity: 0,
        y: -20,
        duration: DURATION.normal,
      },
      '-=0.2'
    );
  }

  return tl;
}

/**
 * Project card hover timeline
 */
export function createProjectCardHoverTimeline(card: HTMLElement) {
  const tl = gsap.timeline({ paused: true });

  // Scale up card
  tl.to(card, {
    scale: 1.05,
    boxShadow: '0 20px 60px rgba(59, 130, 246, 0.4)',
    duration: DURATION.fast,
    ease: EASE.power2,
  });

  // Float up tags
  tl.to(
    card.querySelectorAll('.project-tag'),
    {
      y: -5,
      duration: DURATION.fast,
      stagger: STAGGER.fast,
    },
    0
  );

  // Slide in button
  tl.from(
    card.querySelector('.project-button'),
    {
      y: 20,
      opacity: 0,
      duration: DURATION.normal,
    },
    0
  );

  return tl;
}

/**
 * Experience timeline reveal
 */
export function createExperienceRevealTimeline() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.experience-timeline',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
    },
  });

  // Draw timeline line
  tl.from('.timeline-line', {
    scaleY: 0,
    transformOrigin: 'top',
    ease: 'none',
  });

  // Reveal dots sequentially
  tl.from(
    '.timeline-dot',
    {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      ease: EASE.bounce,
    },
    0
  );

  // Reveal cards
  tl.from(
    '.timeline-card',
    {
      x: (index: number) => (index % 2 === 0 ? -50 : 50),
      opacity: 0,
      stagger: 0.1,
    },
    0.2
  );

  return tl;
}

/**
 * Navbar active indicator animation
 */
export function animateNavIndicator(
  indicator: HTMLElement,
  target: HTMLElement
) {
  const targetRect = target.getBoundingClientRect();
  const indicatorParent = indicator.parentElement!.getBoundingClientRect();

  gsap.to(indicator, {
    x: targetRect.left - indicatorParent.left,
    width: targetRect.width,
    duration: DURATION.normal,
    ease: EASE.power3,
  });
}

/**
 * Contact form submit animation
 */
export function createFormSubmitTimeline(button: HTMLElement) {
  const tl = gsap.timeline();

  // Expand button
  tl.to(button, {
    scale: 1.1,
    duration: DURATION.fast,
  });

  // Show spinner
  tl.to(
    button.querySelector('.button-spinner'),
    {
      opacity: 1,
      rotation: 360,
      duration: DURATION.slow,
      ease: 'none',
    },
    '-=0.1'
  );

  // Contract and show checkmark
  tl.to(button, {
    scale: 1,
    duration: DURATION.fast,
  });

  tl.to(button.querySelector('.button-spinner'), {
    opacity: 0,
    duration: DURATION.fast,
  });

  tl.to(
    button.querySelector('.button-checkmark'),
    {
      opacity: 1,
      scale: 1,
      duration: DURATION.normal,
      ease: EASE.bounce,
    },
    '-=0.1'
  );

  return tl;
}

/**
 * Shake animation for errors
 */
export function shakeAnimation(target: gsap.TweenTarget) {
  return gsap.timeline().to(target, {
    x: '-10, 10, -10, 10, -5, 5, 0',
    duration: 0.5,
    ease: EASE.power2,
  });
}

/**
 * Pulse animation
 */
export function pulseAnimation(target: gsap.TweenTarget, scale: number = 1.05) {
  return gsap.to(target, {
    scale,
    duration: DURATION.slow,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

/**
 * Gradient shimmer animation
 */
export function shimmerAnimation(target: gsap.TweenTarget) {
  return gsap.to(target, {
    backgroundPosition: '200% center',
    duration: 2,
    ease: 'none',
    repeat: -1,
  });
}
