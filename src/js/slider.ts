/**
 * Crossfade slider. A root with [data-slider] holds [data-slide] images,
 * optional [data-slider-current], [data-slider-previous], [data-slider-next]
 * and autoplays when it has data-slider-autoplay.
 */
const AUTOPLAY_DELAY = 6500;

function initSlider(root: HTMLElement) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"));
  const counter = root.querySelector<HTMLElement>("[data-slider-current]");
  const previousButton = root.querySelector<HTMLButtonElement>("[data-slider-previous]");
  const nextButton = root.querySelector<HTMLButtonElement>("[data-slider-next]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isAutoplay = "true" === root.dataset.sliderAutoplay;
  const state = { index: 0, timer: 0 };

  const showSlide = (nextIndex: number) => {
    state.index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      const isActive = position === state.index;

      slide.dataset.active = isActive.toString();
      slide.setAttribute("aria-hidden", (false === isActive).toString());
    });
    if (null !== counter) {
      counter.textContent = (state.index + 1).toString().padStart(2, "0");
    }
  };

  const stopAutoplay = () => window.clearInterval(state.timer);

  const startAutoplay = () => {
    stopAutoplay();
    if (isAutoplay && false === prefersReducedMotion) {
      state.timer = window.setInterval(() => showSlide(state.index + 1), AUTOPLAY_DELAY);
    }
  };

  if (null !== previousButton && null !== nextButton) {
    previousButton.addEventListener("click", () => {
      showSlide(state.index - 1);
      startAutoplay();
    });
    nextButton.addEventListener("click", () => {
      showSlide(state.index + 1);
      startAutoplay();
    });
  }

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
  root.addEventListener("focusin", stopAutoplay);
  root.addEventListener("focusout", startAutoplay);
  startAutoplay();
}

document.querySelectorAll<HTMLElement>("[data-slider]").forEach((root) => initSlider(root));
