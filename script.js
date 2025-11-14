/**
 * @file Manages all scroll animations for the portfolio page.
 * @author Ricardo Casais
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- CRITICAL FIX: Force scroll to top on page refresh ---
  if (window.history.scrollRestoration) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  // --- Animation Logic ---
  const initAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. The Definitive, Two-Part Hero Animation ---

    const heroContent = document.querySelector("#hero .content-container");
    const heroSymbol = document.querySelector("#hero .title-deco");
    const heroTextLines = gsap.utils.toArray(
      "#hero .main-title .title-line, #hero .tagline"
    );

    // --- PART A: THE "WELCOME" ANIMATION ---
    // This runs ONCE on page load and has an onComplete callback.
    const welcomeTl = gsap.timeline({
      // When this timeline completes, it will create the scroll-based animation.
      onComplete: () => {
        // --- PART B: THE "ENTER/LEAVE" SCROLL ANIMATION ---
        // This is created ONLY after the welcome animation is finished.
        ScrollTrigger.create({
          trigger: "#hero",
          start: "top bottom", // When the top of the hero hits the bottom of the screen
          end: "bottom top", // When the bottom of the hero hits the top of the screen

          // A simple, subtle fade/slide for leaving and re-entering.
          onLeave: () =>
            gsap.to(heroContent, { autoAlpha: 0, y: -100, ease: "power3.in" }),
          onEnterBack: () =>
            gsap.to(heroContent, { autoAlpha: 1, y: 0, ease: "power3.out" }),
          onEnter: () =>
            gsap.to(heroContent, { autoAlpha: 1, y: 0, ease: "power3.out" }),
          onLeaveBack: () =>
            gsap.to(heroContent, { autoAlpha: 0, y: 100, ease: "power3.in" }),
        });
      },
    });

    // Define the welcome animation sequence.
    welcomeTl
      .from(heroSymbol, {
        autoAlpha: 0,
        rotate: -720,
        scale: 0,
        duration: 1.2,
        ease: "power4.out",
      })
      .from(
        heroTextLines,
        {
          autoAlpha: 0,
          x: -100,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
        },
        0.2 // Starts shortly after the symbol animation begins
      );

    // --- 2. NAVBAR LOGO FIX ---
    const logo = document.querySelector(".navbar-logo");
    if (logo) {
      logo.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // --- 3. Animation for the Projects Section Title ---
    const projectsTitle = document.querySelector(".work-experience-title");
    if (projectsTitle) {
      gsap.set(projectsTitle, { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: projectsTitle,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () =>
          gsap.fromTo(
            projectsTitle,
            { y: 200, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
          ),
        onLeave: () =>
          gsap.to(projectsTitle, {
            y: -200,
            autoAlpha: 0,
            duration: 1.2,
            ease: "power3.in",
          }),
        onEnterBack: () =>
          gsap.fromTo(
            projectsTitle,
            { y: -200, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
          ),
        onLeaveBack: () =>
          gsap.to(projectsTitle, {
            y: 200,
            autoAlpha: 0,
            duration: 1.2,
            ease: "power3.in",
          }),
      });
    }

    // --- 4. HIGH-ENERGY Directional Animations for Other Sections ---
    const animatedSections = gsap.utils.toArray(".animated-section");
    animatedSections.forEach((section) => {
      // We skip the hero and projects as they have their own specific logic.
      if (section.id === "hero" || section.id === "projects") return;
      const content = section.querySelector(".content-container");
      gsap.set(content, { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () =>
          gsap.fromTo(
            content,
            { y: 250, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
          ),
        onLeave: () =>
          gsap.to(content, {
            y: -250,
            autoAlpha: 0,
            duration: 1.2,
            ease: "power3.in",
          }),
        onEnterBack: () =>
          gsap.fromTo(
            content,
            { y: -250, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
          ),
        onLeaveBack: () =>
          gsap.to(content, {
            y: 250,
            autoAlpha: 0,
            duration: 1.2,
            ease: "power3.in",
          }),
      });
    });

    // --- 5. Timeline Item Animations ---
    const timelineContents = gsap.utils.toArray(".timeline-content");
    timelineContents.forEach((content) => {
      const isLeft = content.classList.contains("left");
      const xStart = isLeft ? -200 : 200;
      gsap.from(content, {
        x: xStart,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: content,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    // --- 6. Timeline Point ---
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
