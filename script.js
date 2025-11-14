/**
 * @file Manages accordion and scroll animations for the portfolio page.
 * @author Ricardo Casais
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Accordion Logic ---
  const accordionItems = document.querySelectorAll(".accordion-item");
  const accordionTransitionDuration = 500; // This must match the CSS transition time (0.5s)

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other tabs
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".accordion-content").style.maxHeight = "0px";
          otherItem
            .querySelector(".accordion-header")
            .setAttribute("aria-expanded", "false");
        }
      });

      // Toggle the clicked tab
      if (isActive) {
        item.classList.remove("active");
        content.style.maxHeight = "0px";
        header.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
      }

      // CRITICAL: Refresh ScrollTrigger after the accordion animation completes.
      // We use a timeout to wait for the CSS transition to finish before recalculating.
      if (typeof ScrollTrigger !== "undefined") {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, accordionTransitionDuration);
      }
    });
  });

  // --- Animation Logic ---
  // This function contains all our GSAP animations.
  const initAnimations = () => {
    // Make GSAP aware of the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Select all sections we want to animate using the class we added
    const animatedSections = gsap.utils.toArray(".animated-section");

    animatedSections.forEach((section) => {
      // We animate the content container inside each section
      const content = section.querySelector(".content-container");

      // Create a dedicated timeline for each section's animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%", // Animation starts when the top of the section is 85% down from the viewport top
          end: "bottom 15%", // Animation ends when the bottom of the section is 15% down from the viewport top
          scrub: 1, // Smoothly links animation progress to scroll position
        },
      });

      // This is the "scanner" effect timeline:
      // 1. Fade IN and move UP
      tl.fromTo(
        content,
        { autoAlpha: 0, y: 75 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
      )
        // 2. Keep it fully visible for a duration while scrolling through the center
        .to(content, { autoAlpha: 1, y: 0, duration: 2 })
        // 3. Fade OUT and move UP
        .to(content, { autoAlpha: 0, y: -75, duration: 1, ease: "power2.in" });
    });
  };

  // --- Font Loading & Initialization ---
  // CRITICAL: We wait for the browser's fonts to be fully loaded and ready.
  // This completely solves the race condition and ensures GSAP measures the correct layout.
  document.fonts.ready
    .then(() => {
      // Now that fonts are loaded, it's safe to initialize our animations.
      initAnimations();
    })
    .catch((error) => {
      console.error("An error occurred while loading fonts:", error);
      // As a fallback in case of error, initialize animations anyway.
      initAnimations();
    });
});
