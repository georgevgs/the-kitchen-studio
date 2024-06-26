window.addEventListener("load", () => {
  setTimeout(() => {
    const skeletonLoader = document.getElementById("skeleton-loader");
    const carouselWrapper = document.getElementById("carousel-wrapper");
    const slideIndicators = document.getElementById("slide-indicators");
    const navButtons = document.querySelectorAll<HTMLElement>(
      "[data-carousel-prev], [data-carousel-next]",
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
  }, 750);
});
