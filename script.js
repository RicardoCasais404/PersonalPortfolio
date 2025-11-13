/**
 * @file Manages scroll animations and accordion functionality for the portfolio page.
 * @author Ricardo Casais
 * @uses gsap
 * @uses ScrollTrigger
 */

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- Hero Section Animations ---

  // This correctly animates the title and tagline IN on page load.
  gsap.from(".header-hero .main-title > *, .header-hero .tagline", {
    delay: 0.2,
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  });

  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".header-hero",
      start: "1px top",
      end: "bottom 50%",
      scrub: 1.5,
    },
  });

  // CORRECTED: The tagline is now included here again, so it will fade OUT with the main title on scroll.
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
    const contentElements = element.classList.contains("section-divider")
      ? element
      : element.querySelectorAll(
          ".section-title, p, .about-socials, .accordion, .skill-list-container, .contact-links"
        );

    gsap.set(contentElements, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 65%",
        end: "bottom 35%",
        scrub: 2,
      },
    });

    tl.to(contentElements, {
      opacity: 1,
      ease: "power1.in",
    });

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

// --- ROBUST REFRESH LOGIC ---
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
