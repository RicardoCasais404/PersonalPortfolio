/**
 * @file Manages scroll-triggered animations for elements within each section using GSAP.
 * @author Ricardo Casais
 */

document.addEventListener("DOMContentLoaded", () => {
  // Register the GSAP ScrollTrigger plugin.
  gsap.registerPlugin(ScrollTrigger);

  // Animate the hero section elements without a scroll trigger, on page load.
  gsap.from(".header-hero .main-title, .header-hero .tagline", {
    delay: 0.2,
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Select all sections that should animate on scroll.
  const animatedSections = gsap.utils.toArray(".section:not(.header-hero)");

  animatedSections.forEach((section) => {
    // Find all animatable child elements within the section.
    const contentElements = section.querySelectorAll(
      ".section-title, p, .project-item, .skill-grid, .contact-links"
    );

    // Create the scroll-triggered animation for the elements.
    gsap.fromTo(
      contentElements,
      {
        // Initial state: shifted down and transparent.
        y: 100,
        opacity: 0,
      },
      {
        // Final state: original position and fully visible.
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1, // A slightly faster stagger for a tighter feel.
        ease: "power2.out",

        // Configure the ScrollTrigger for this specific section.
        scrollTrigger: {
          trigger: section,
          // Start the animation when the top of the section enters the bottom of the viewport.
          start: "top bottom",
          // End the animation when the center of the section reaches 75% down the viewport.
          end: "center 75%",
          // Link the animation progress directly to the scrollbar.
          scrub: 1.5,
        },
      }
    );
  });
});
