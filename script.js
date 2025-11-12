/**
 * @file Manages scroll animations and accordion functionality.
 * @author Ricardo Casais
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- GSAP SCROLL ANIMATIONS ---
  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Section: Initial page load animation
  gsap.from(".header-hero .main-title > *, .header-hero .tagline", {
    delay: 0.2,
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  });

  // 2. Hero Section: Scroll-based fade-out/fade-in animation
  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".header-hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.8,
    },
  });

  heroTimeline.to(".header-hero .main-title > *, .header-hero .tagline", {
    y: -200,
    opacity: 0,
    stagger: 0.1,
    ease: "none",
    // UPDATED: Added a duration to make the hero fade out more slowly and consistently.
    duration: 2,
  });

  // 3. Direction-Aware Animations for all other sections
  const animatedSections = gsap.utils.toArray(".section:not(.header-hero)");

  animatedSections.forEach((section) => {
    const contentElements = section.querySelectorAll(
      ".section-title, p, .about-socials, .accordion, .skill-marquee, .contact-links"
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.8,
      },
    });

    // Fade IN animation
    tl.fromTo(
      contentElements,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        // UPDATED: Significantly increased duration for a very slow, gradual fade-in.
        duration: 4,
      }
    )
      // Fade OUT animation
      .to(
        contentElements,
        {
          y: -200,
          opacity: 0,
          stagger: 0.1,
          ease: "none",
          // UPDATED: Significantly increased duration for a very slow, gradual fade-out.
          duration: 4,
        },
        // The delay between fade-in completion and fade-out start.
        ">+1"
      );
  });

  // --- ACCORDION LOGIC (Unchanged) ---
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".accordion-content").style.maxHeight = "0px";
      });

      if (!isActive) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
