/**
 * @file Manages all scroll animations for the portfolio page.
 * @author Ricardo Casais
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Animation Logic ---
  const initAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Universal Section Animation ---
    // This single block will handle all sections you've marked with the .animated-section class.
    const animatedSections = gsap.utils.toArray(".animated-section");

    animatedSections.forEach((section) => {
      // Find the main content container within each section
      const content = section.querySelector(".content-container");

      // We create a GSAP Timeline to control the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // Animation begins when the top of the section is 80% down the viewport
          end: "bottom 20%", // Considered "out of view" when the bottom is 20% from the top
          // This is the key: defines behavior for each trigger point
          // onEnter: play forward
          // onLeave: reverse
          // onEnterBack: play forward (when scrolling up)
          // onLeaveBack: reverse (when scrolling up)
          toggleActions: "play reverse play reverse",
        },
      });

      // Define the "from" state for the animation (what it looks like when hidden)
      // This will be a simple fade and slide-up effect.
      tl.from(content, {
        y: 50, // Start 50px down
        autoAlpha: 0, // Start invisible (handles both opacity and visibility)
        duration: 1.2,
        ease: "power3.out",
      });
    });

    // --- Animate the Timeline Point on Scroll ---
    // This logic remains exactly the same as it's already working perfectly.
    const timelineContainer = document.querySelector(".timeline-container");
    const timelinePoint = document.querySelector(".timeline-point");

    if (timelineContainer && timelinePoint) {
      gsap.to(timelinePoint, {
        y: () => timelineContainer.offsetHeight - timelinePoint.offsetHeight,
        ease: "none",
        scrollTrigger: {
          trigger: timelineContainer,
          start: "top center",
          end: "+=150%",
          scrub: 1,
        },
      });
    }
  };

  // --- Font Loading & Initialization ---
  document.fonts.ready
    .then(() => {
      initAnimations();
    })
    .catch((error) => {
      console.error("An error occurred while loading fonts:", error);
      initAnimations();
    });
});
