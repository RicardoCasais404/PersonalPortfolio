/**
 * @file Manages scroll animations and accordion functionality.
 * @author Ricardo Casais
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- GSAP SCROLL ANIMATIONS ---
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".header-hero .main-title > *, .header-hero .tagline", {
    delay: 0.2,
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  });

  const animatedSections = gsap.utils.toArray(".section:not(.header-hero)");

  animatedSections.forEach((section) => {
    const contentElements = section.querySelectorAll(
      ".section-title, p, .accordion, .skill-grid, .contact-links"
    );

    gsap.fromTo(
      contentElements,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "center 75%",
          scrub: 1.5,
        },
      }
    );
  });

  // --- ACCORDION LOGIC ---
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items when one is opened
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".accordion-content").style.maxHeight = "0px";
      });

      // If the clicked item was not already active, open it
      if (!isActive) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
