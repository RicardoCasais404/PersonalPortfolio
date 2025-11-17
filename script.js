/**
 * @file Manages all scroll animations for the portfolio page.
 * @author Ricardo Casais
 */

document.addEventListener("DOMContentLoaded", () => {
  // Force scroll to top on page refresh to ensure consistent animation starts.
  if (window.history.scrollRestoration) {
    window.history.scrollRestoration = "manual";
  }
  // Use a small timeout to ensure this runs after the browser's own attempts.
  setTimeout(() => window.scrollTo(0, 0), 10);

  // Manages padding for the fixed navbar on mobile.
  const handleFixedNavbar = () => {
    const leftColumn = document.querySelector(".left-column");
    const rightColumn = document.querySelector(".right-column");

    if (!leftColumn || !rightColumn) return;

    // Check if we are on the mobile view (less than the 800px breakpoint).
    if (window.matchMedia("(max-width: 799px)").matches) {
      const navbarHeight = leftColumn.offsetHeight;
      rightColumn.style.paddingTop = `${navbarHeight}px`;
    } else {
      // Remove the padding on desktop.
      rightColumn.style.paddingTop = "0";
    }
  };

  // Run the function on load and on window resize.
  handleFixedNavbar();
  window.addEventListener("resize", handleFixedNavbar);

  const initAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    /**
     * Hero Animation
     * A two-part animation: a welcome sequence on page load, followed by
     * a scroll-triggered animation for entering and leaving the viewport.
     */
    const heroContent = document.querySelector("#hero .content-container");
    const heroSymbol = document.querySelector("#hero .title-deco");
    const heroTextLines = gsap.utils.toArray(
      "#hero .main-title .title-line, #hero .tagline"
    );

    const welcomeTl = gsap.timeline({
      onComplete: () => {
        // This scroll-triggered animation is created only after the welcome animation finishes.
        ScrollTrigger.create({
          trigger: "#hero",
          start: "top bottom",
          end: "bottom top",
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
        0.2
      );

    // Smooth scroll to top when the navbar logo is clicked.
    const logo = document.querySelector(".navbar-logo");
    if (logo) {
      logo.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Animate the "Work Experience" title.
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

    // Generic directional scroll animations for content sections.
    const animatedSections = gsap.utils.toArray(".animated-section");
    animatedSections.forEach((section) => {
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

    // Animate timeline content blocks from the side.
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

    // Animate the timeline point to follow the scroll position.
    const timelineContainer = document.querySelector(".timeline-container");
    const timelinePoint = document.querySelector(".timeline-point");
    const timelineItems = gsap.utils.toArray(".timeline-item");

    if (timelineContainer && timelinePoint && timelineItems.length > 0) {
      const firstItem = timelineItems[0];
      const lastItem = timelineItems[timelineItems.length - 1];

      const startY =
        firstItem.offsetTop +
        firstItem.offsetHeight / 2 -
        timelinePoint.offsetHeight / 2;
      const endY =
        lastItem.offsetTop +
        lastItem.offsetHeight / 2 -
        timelinePoint.offsetHeight / 2;

      gsap.set(timelinePoint, { y: startY });

      gsap.to(timelinePoint, {
        y: endY,
        ease: "none",
        scrollTrigger: {
          trigger: timelineContainer,
          start: "top center",
          end: "bottom center",
          scrub: 1.5,
        },
      });
    }

    // Navbar link active state manager.
    const navLinks = gsap.utils.toArray(".nav-links a");
    navLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) =>
            self.isActive
              ? link.classList.add("active")
              : link.classList.remove("active"),
        });
      }
    });
  };

  // Initialize animations after fonts are loaded for accurate calculations.
  document.fonts.ready
    .then(() => {
      initAnimations();
    })
    .catch((error) => {
      console.error("An error occurred while loading fonts:", error);
      initAnimations(); // Fallback to initialize anyway
    });
});
