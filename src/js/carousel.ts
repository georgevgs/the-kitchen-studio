import EmblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

const initCarousel = (root: HTMLElement) => {
  if (!root || root.dataset.carouselInitialized === "true") {
    return;
  }

  const viewport = root.querySelector<HTMLElement>("[data-carousel-viewport]");
  if (!viewport) {
    return;
  }

  root.dataset.carouselInitialized = "true";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const autoplay = prefersReducedMotion
    ? undefined
    : Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: false,
      });

  const embla = EmblaCarousel(
    viewport,
    {
      loop: true,
      align: "start",
    },
    autoplay ? [autoplay] : undefined
  );

  const prevButton = root.querySelector<HTMLButtonElement>(
    "[data-carousel-prev]"
  );
  const nextButton = root.querySelector<HTMLButtonElement>(
    "[data-carousel-next]"
  );
  const lightbox = root.querySelector<HTMLElement>("[data-carousel-lightbox]");
  const lightboxImage = lightbox?.querySelector<HTMLImageElement>(
    "[data-carousel-lightbox-img]"
  );
  const closeLightboxButton = lightbox?.querySelector<HTMLButtonElement>(
    "[data-carousel-lightbox-close]"
  );

  const setupImageSkeletons = () => {
    root
      .querySelectorAll<HTMLElement>("[data-carousel-skeleton]")
      .forEach((wrapper) => {
        const image = wrapper.querySelector<HTMLImageElement>(
          "[data-carousel-image]"
        );
        if (!image) {
          return;
        }

        const reveal = () => {
          wrapper.classList.remove(
            "animate-pulse",
            "bg-slate-200",
            "dark:bg-slate-800"
          );
          image.classList.remove("opacity-0");
          image.classList.add("opacity-100");
        };

        if (image.complete) {
          reveal();
        } else {
          image.addEventListener("load", reveal, { once: true });
          image.addEventListener("error", reveal, { once: true });
        }
      });
  };

  setupImageSkeletons();

  const stopAutoplay = () => autoplay?.stop();
  const resetAutoplay = () => autoplay?.reset();

  prevButton?.addEventListener("click", () => {
    embla.scrollPrev();
    resetAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    embla.scrollNext();
    resetAutoplay();
  });

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", resetAutoplay);

  if (lightbox && lightboxImage) {
    function hideLightbox() {
      lightbox.classList.add("hidden");
      resetAutoplay();
      document.removeEventListener("keydown", handleKeydown);
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
        hideLightbox();
      }
    }

    function showLightbox(src: string, alt: string) {
      lightboxImage.src = src;
      lightboxImage.alt = alt;
      lightbox.classList.remove("hidden");
      lightbox.focus();
      stopAutoplay();
      document.addEventListener("keydown", handleKeydown);
    }

    root
      .querySelectorAll<HTMLElement>("[data-carousel-open-lightbox]")
      .forEach((trigger) => {
        trigger.addEventListener("click", () => {
          const src = trigger.getAttribute("data-src");
          const alt =
            trigger.getAttribute("data-alt") || "Carousel image preview";
          if (src) {
            showLightbox(src, alt);
          }
        });
      });

    closeLightboxButton?.addEventListener("click", hideLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        hideLightbox();
      }
    });
  }
};

const initAllCarousels = () => {
  document
    .querySelectorAll<HTMLElement>("[data-carousel-root]")
    .forEach((root) => initCarousel(root));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllCarousels, {
    once: true,
  });
} else {
  initAllCarousels();
}

document.addEventListener("astro:page-load", initAllCarousels);
document.addEventListener("astro:after-swap", initAllCarousels);
