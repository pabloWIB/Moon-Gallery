/* ==========================================================================
   gallery.js — slide rotation, counter, caption and next-photo preview

   Attached to a single namespace object rather than exported as an ES module,
   so the page also works when index.html is opened straight from disk, where
   module imports are blocked by the browser.
   ========================================================================== */

window.MoonGallery = window.MoonGallery || {};

(() => {
  "use strict";

  const pad = (value) => String(value).padStart(2, "0");

  /**
   * Wires the slide list to every control that carries a data-step, plus the
   * left and right arrow keys. Returns null when there is nothing to rotate.
   */
  const createGallery = (root) => {
    if (!root) {
      return null;
    }

    const slides = [...root.querySelectorAll("[data-slide]")];

    if (slides.length < 2) {
      return null;
    }

    const counter = document.querySelector("[data-counter-current]");
    const total = document.querySelector("[data-counter-total]");
    const captionTitle = document.querySelector("[data-caption-title]");
    const captionText = document.querySelector("[data-caption-text]");
    const thumbImage = document.querySelector("[data-thumb-image]");

    const activeIndex = slides.findIndex((slide) =>
      slide.classList.contains("is-active")
    );
    let index = activeIndex < 0 ? 0 : activeIndex;

    if (total) {
      total.textContent = pad(slides.length);
    }

    const render = () => {
      const current = slides[index];
      const next = slides[(index + 1) % slides.length];

      slides.forEach((slide, position) => {
        slide.classList.toggle("is-active", position === index);
      });

      if (counter) {
        counter.textContent = pad(index + 1);
      }

      if (captionTitle) {
        captionTitle.textContent = current.dataset.title;
      }

      if (captionText) {
        captionText.textContent = current.dataset.text;
      }

      if (thumbImage) {
        thumbImage.src = next.dataset.thumb;
      }
    };

    const go = (step) => {
      index = (index + step + slides.length) % slides.length;
      render();
    };

    /* The controls sit in the panel and the preview sits over the photograph,
       so delegation happens at document level rather than inside the gallery. */
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-step]");

      if (trigger) {
        go(Number(trigger.dataset.step));
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        go(-1);
      } else if (event.key === "ArrowRight") {
        go(1);
      }
    });

    render();

    return { go };
  };

  window.MoonGallery.createGallery = createGallery;
})();
