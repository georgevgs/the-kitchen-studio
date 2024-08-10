declare global {
  interface Window {
    Carousel?: FlowbiteCarousel;
  }
}

interface FlowbiteCarouselOptions {
  indicators?: {
    items: Element[];
    activeClasses: string[];
    inactiveClasses: string[];
  };
  interval?: number;
}

interface FlowbiteCarousel {
  new (element: Element, options?: FlowbiteCarouselOptions): unknown;
}

(function () {
  function initializeCarousel(retryCount = 0) {
    const carousel = document.getElementById("default-carousel");
    const slideIndicators = document.getElementById("slide-indicators");

    if (carousel && window.Carousel) {
      try {
        const items = carousel.querySelectorAll("[data-carousel-item]");
        if (items.length === 0) {
          throw new Error("No carousel items found");
        }

        const options: FlowbiteCarouselOptions = {
          indicators: {
            items: Array.from(
              slideIndicators?.querySelectorAll("button") || [],
            ),
            activeClasses: ["bg-white"],
            inactiveClasses: ["bg-white/50"],
          },
          interval: 0, // Disable autoplay
        };

        const instance = new window.Carousel(carousel, options);

        // Show the first slide
        if (items[0] instanceof HTMLElement) {
          items[0].classList.remove("hidden");
        }

        console.log("Carousel initialized successfully");
      } catch (error) {
        console.error("Error initializing Flowbite carousel:", error);
        if (retryCount < 5) {
          console.log(`Retrying in ${(retryCount + 1) * 500}ms...`);
          setTimeout(
            () => initializeCarousel(retryCount + 1),
            (retryCount + 1) * 500,
          );
        }
      }
    } else if (retryCount < 5) {
      console.log(
        `Carousel or Flowbite not available. Retrying in ${(retryCount + 1) * 500}ms...`,
      );
      setTimeout(
        () => initializeCarousel(retryCount + 1),
        (retryCount + 1) * 500,
      );
    } else {
      console.warn("Failed to initialize carousel after multiple attempts");
    }
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      const skeletonLoader = document.getElementById("skeleton-loader");
      const carouselWrapper = document.getElementById("carousel-wrapper");
      const slideIndicators = document.getElementById("slide-indicators");
      const navButtons = document.querySelectorAll<HTMLElement>(
        "[data-carousel-prev], [data-carousel-next]",
      );
      const lightbox = document.getElementById("lightbox");
      const lightboxImage = document.getElementById(
        "lightbox-image",
      ) as HTMLImageElement;
      const closeLightbox = document.getElementById("close-lightbox");
      const carouselImages = document.querySelectorAll<HTMLImageElement>(
        "[data-lightbox-image]",
      );

      if (skeletonLoader instanceof HTMLElement) {
        skeletonLoader.classList.add("hidden");
      }

      if (carouselWrapper instanceof HTMLElement) {
        carouselWrapper.classList.remove("hidden");
      }

      if (slideIndicators instanceof HTMLElement) {
        slideIndicators.classList.remove("opacity-0");
      }

      navButtons.forEach((button) => {
        button.classList.remove("opacity-0");
      });

      // Lightbox functionality
      carouselImages.forEach((img) => {
        img.addEventListener("click", () => {
          if (
            lightbox instanceof HTMLElement &&
            lightboxImage instanceof HTMLImageElement
          ) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.remove("hidden");
          }
        });
      });

      if (
        closeLightbox instanceof HTMLElement &&
        lightbox instanceof HTMLElement
      ) {
        closeLightbox.addEventListener("click", () => {
          lightbox.classList.add("hidden");
        });
      }

      if (lightbox instanceof HTMLElement) {
        lightbox.addEventListener("click", (e) => {
          if (e.target === lightbox) {
            lightbox.classList.add("hidden");
          }
        });
      }

      // Close lightbox with Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox instanceof HTMLElement) {
          lightbox.classList.add("hidden");
        }
      });

      // Initialize carousel with retry mechanism
      initializeCarousel();
    }, 1000);
  });

  // Mobile image carousel controls
  let startX = 0;
  let movedX = 0;

  const carousel = document.getElementById("default-carousel");
  const prevButton = document.querySelector(
    "[data-carousel-prev]",
  ) as HTMLElement | null;
  const nextButton = document.querySelector(
    "[data-carousel-next]",
  ) as HTMLElement | null;

  if (carousel) {
    carousel.addEventListener(
      "touchstart",
      (event) => {
        startX = event.touches[0].clientX;
      },
      { passive: true },
    );

    carousel.addEventListener(
      "touchmove",
      (event) => {
        movedX = event.touches[0].clientX - startX;
      },
      { passive: true },
    );

    carousel.addEventListener(
      "touchend",
      () => {
        const threshold = 50;

        if (movedX > threshold && prevButton) {
          prevButton.dispatchEvent(new Event("click"));
        } else if (movedX < -threshold && nextButton) {
          nextButton.dispatchEvent(new Event("click"));
        }

        movedX = 0;
      },
      { passive: true },
    );
  }
})();

export {};
