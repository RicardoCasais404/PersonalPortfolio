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
    duration: 2,
  });

  // 3. Direction-Aware Animations for all other sections
  const animatedSections = gsap.utils.toArray(".section:not(.header-hero)");

  animatedSections.forEach((section) => {
    const contentElements = section.querySelectorAll(
      ".section-title, p, .about-socials, .accordion, .skill-list-container, .contact-links"
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
          duration: 4,
        },
        ">+1"
      );
  });

  // --- INTERACTIVE SKILL LIST ---
  const skillList = document.querySelector(".skill-list-container");

  if (skillList) {
    const skillItems = document.querySelectorAll(".skill-list-item");

    const handleMouseMove = (e) => {
      skillItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInside) {
          item.style.opacity = "1";
          item.style.transform = "scale(1.1)";
        } else {
          item.style.opacity = "0.3";
          item.style.transform = "scale(1)";
        }
      });
    };

    const handleMouseLeave = () => {
      skillItems.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
      });
    };

    skillList.addEventListener("mousemove", handleMouseMove);
    skillList.addEventListener("mouseleave", handleMouseLeave);

    handleMouseLeave();
  }

  // --- ACCORDION LOGIC ---
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
