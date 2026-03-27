/**
 * Global scroll-reveal animation system
 * Elements with class "reveal-up" will fade in and slide up when scrolled into view.
 * Also handles the floating CTA visibility.
 */

function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal for elements
  const revealElements = document.querySelectorAll<HTMLElement>('.reveal-up');

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add('revealed'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // Floating CTA - show after scrolling past first viewport
  const floatingCta = document.querySelector<HTMLElement>('[data-floating-cta]');
  if (floatingCta) {
    const showThreshold = window.innerHeight * 0.8;

    const handleScroll = () => {
      if (window.scrollY > showThreshold) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
  }
}

// Run on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

// Re-run on Astro page transitions
document.addEventListener('astro:page-load', initScrollReveal);
