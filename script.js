/**
 * @file Manages scroll animations and accordion functionality for the portfolio page.
 * @author Ricardo Casais
 * @uses gsap
 * @uses ScrollTrigger
 */

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- Hero Section Animations ---

  // Animate hero text into view on initial page load.
  gsap.from(".header-hero .main-title > *, .header-hero .tagline", {
    delay: 0.2,
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Animate hero text to fade out smoothly on scroll down.
  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".header-hero",
      start: "1px top",
      end: "bottom 50%",
      scrub: 1.5,
    },
  });

  heroTimeline.to(".header-hero .title-line > span, .header-hero .tagline", {
    opacity: 0,
    stagger: 0.1,
    ease: "none",
  });

  // --- UNIFORM FADE ANIMATIONS FOR ALL SECTIONS & DIVIDERS ---

  const scrollElements = gsap.utils.toArray(
    ".section:not(.header-hero), .section-divider"
  );

  scrollElements.forEach((element) => {
    // Select the appropriate content to animate.
    const contentElements = element.classList.contains("section-divider")
      ? element
      : element.querySelectorAll(
          ".section-title, p, .about-socials, .accordion, .skill-list-container, .contact-links"
        );

    // Set the initial state to invisible to prevent flickering.
    gsap.set(contentElements, { opacity: 0 });

    // Create a simple, robust timeline for fading in and out.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 65%",
        end: "bottom 35%",
        scrub: 2,
      },
    });

    // 1. FADE IN: This occurs during the first half of the scroll duration.
    tl.to(contentElements, {
      opacity: 1,
      ease: "power1.in",
    });

    // 2. FADE OUT: This occurs during the second half of the scroll duration.
    tl.to(contentElements, {
      opacity: 0,
      ease: "power1.out",
    });
  });

  // --- Accordion Functionality ---

  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // First, close all currently active accordion items.
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".accordion-content").style.maxHeight = "0px";
      });

      // If the clicked item was not already active, open it.
      if (!isActive) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});

// --- ROBUST REFRESH LOGIC ---
// This listens for the moment the page is fully loaded, including scroll restoration.
// It then forces ScrollTrigger to recalculate all positions, ensuring animations
// are in the correct state no matter where the user refreshes the page.
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
