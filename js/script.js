document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lenis for Smooth Scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Integrate Lenis with GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // 2. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('scrolled'); // Force transparent on top
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Initial GSAP Animations (Hero Section)
  const tl = gsap.timeline();
  
  tl.from(".hero-badge", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  })
  .from(".hero-title", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.6")
  .from(".hero-desc", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6")
  .from(".hero-btns .btn", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "power3.out"
  }, "-=0.4");

  // Parallax Shapes
  gsap.to(".shape-1", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".shape-2", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll(".gs-reveal");
  
  revealElements.forEach((elem) => {
    gsap.fromTo(elem, 
      { y: 50, opacity: 0 },
      {
        y: 0, 
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 85%", // Trigger when top of element is 85% down viewport
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Typing Text Effect
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const words = ["Experiences", "Moments", "Celebrations"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    typingText.parentNode.insertBefore(cursor, typingText.nextSibling);

    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 100 : 200;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // Animated Counters
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    counter.innerText = '0';
    
    ScrollTrigger.create({
      trigger: counter,
      start: "top 80%",
      once: true,
      onEnter: () => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; 
        
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
          onUpdate: function() {
            counter.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString();
          }
        });
      }
    });
  });

  // ---- Image Reveal Mask (scroll-triggered wipe) ----
  document.querySelectorAll(".img-reveal").forEach((wrap) => {
    const panel = wrap.querySelector(".reveal-panel");
    if (!panel) return;
    gsap.to(panel, {
      scaleX: 0,
      duration: 1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: wrap,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });

  // ---- Tilt Hover Effect ----
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -12;
      const rotateY = ((x / rect.width) - 0.5) * 12;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
    });
  });

  // ---- Lightbox Gallery ----
  const galleryGroups = {};
  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    const group = el.getAttribute("data-lightbox");
    if (!galleryGroups[group]) galleryGroups[group] = [];
    galleryGroups[group].push(el);
  });

  if (Object.keys(galleryGroups).length) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.innerHTML = `
      <button class="lightbox-nav prev"><i class="ph ph-caret-left"></i></button>
      <img src="" alt="">
      <button class="lightbox-nav next"><i class="ph ph-caret-right"></i></button>
      <button class="lightbox-close"><i class="ph ph-x"></i></button>
      <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector("img");
    const lbCaption = overlay.querySelector(".lightbox-caption");
    let currentGroup = [];
    let currentIndex = 0;

    function openLightbox(group, index) {
      currentGroup = galleryGroups[group];
      currentIndex = index;
      renderLightbox();
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function renderLightbox() {
      const el = currentGroup[currentIndex];
      const fullSrc = el.getAttribute("data-full") || el.querySelector("img").src;
      lbImg.src = fullSrc;
      lbCaption.textContent = el.getAttribute("data-caption") || "";
    }

    function closeLightbox() {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    Object.values(galleryGroups).forEach((group) => {
      group.forEach((el, i) => {
        el.addEventListener("click", () => openLightbox(el.getAttribute("data-lightbox"), i));
      });
    });

    overlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeLightbox(); });
    overlay.querySelector(".prev").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
      renderLightbox();
    });
    overlay.querySelector(".next").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % currentGroup.length;
      renderLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") overlay.querySelector(".prev").click();
      if (e.key === "ArrowRight") overlay.querySelector(".next").click();
    });
  }

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('i');
      
      if (body.style.display === 'block') {
        body.style.display = 'none';
        icon.classList.replace('ph-caret-up', 'ph-caret-down');
      } else {
        // Close others
        document.querySelectorAll('.accordion-body').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.accordion-header i').forEach(i => i.classList.replace('ph-caret-up', 'ph-caret-down'));
        
        body.style.display = 'block';
        icon.classList.replace('ph-caret-down', 'ph-caret-up');
      }
    });
  });

  // Hamburger Menu Logic
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {

    let savedScrollY = 0; // Remember where user was before menu opened

    const openMenu = () => {
      // Save current scroll position
      savedScrollY = window.scrollY;

      // Lock body at current scroll position — position:fixed stops scroll
      // without any scrollbar-width layout shift (scrollbar-gutter:stable in CSS handles the rest)
      document.body.style.top = `-${savedScrollY}px`;
      document.body.classList.add('no-scroll');

      navLinks.classList.add('active');
      hamburger.classList.add('active');
    };

    const closeMenu = () => {
      // Remove lock
      document.body.classList.remove('no-scroll');
      document.body.style.top = '';

      // Restore scroll position silently (position:fixed resets scroll to 0)
      window.scrollTo({ top: savedScrollY, behavior: 'instant' });

      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') &&
          !navLinks.contains(e.target) &&
          !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu if the viewport is resized back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Newsletter Validation and Redirection
  document.querySelectorAll('.newsletter-box').forEach(container => {
    const button = container.querySelector('button');
    const input = container.querySelector('input');
    
    if (button && input) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const email = input.value.trim();
        
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
          // Valid email: animate and redirect to 404.html
          gsap.to(container, {
            scale: 0.95,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
              window.location.href = '404.html';
            }
          });
        } else {
          // Invalid email: add shake class and remove it after animation
          container.classList.add('newsletter-shake');
          input.focus();
          setTimeout(() => {
            container.classList.remove('newsletter-shake');
          }, 500);
        }
      });
    }
  });

});

