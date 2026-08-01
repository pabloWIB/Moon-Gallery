/* ==========================================================================
   main.js — entry point. Loads after every module and starts them.
   ========================================================================== */

(() => {
  "use strict";

  const { createGallery } = window.MoonGallery ?? {};

  if (typeof createGallery === "function") {
    createGallery(document.querySelector("[data-gallery]"));
  }
})();
