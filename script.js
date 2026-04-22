const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const revealItems = document.querySelectorAll(".service-card, .about-block, .reason-card, .intro-card, .contact-card, .portfolio-card, .poster-card, .panel-card, .panel-highlight");
const contactForm = document.querySelector(".contact-form");
const emailLink = document.querySelector("#email-link");
const heroCopy = document.querySelector(".hero-copy");
const heroPanel = document.querySelector(".hero-panel");
const carousels = document.querySelectorAll("[data-carousel]");

if (heroCopy) {
  heroCopy.classList.add("is-ready");
}

if (heroPanel) {
  heroPanel.classList.add("is-ready");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("is-open");
  });
}

revealItems.forEach((element) => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealItems.forEach((element) => {
  observer.observe(element);
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");
    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const whatsappText = [
      "Bonjour DIGITAL TECHNOLOGY SERVICES,",
      name ? `Nom: ${name}` : "",
      email ? `Email: ${email}` : "",
      message ? `Besoin: ${message}` : "Je souhaite obtenir des informations sur vos services."
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/221773679600?text=${encodeURIComponent(whatsappText)}`, "_blank");

    if (button) {
      const originalText = button.textContent;
      button.textContent = "Ouverture WhatsApp...";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1800);
    }
  });

  contactForm.addEventListener("input", () => {
    if (!emailLink) {
      return;
    }

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const subject = "Demande de service DIGITAL TECHNOLOGY SERVICES";
    const body = [
      "Bonjour DIGITAL TECHNOLOGY SERVICES,",
      "",
      name ? `Nom: ${name}` : "",
      email ? `Email: ${email}` : "",
      message ? `Besoin: ${message}` : ""
    ].filter(Boolean).join("\n");

    emailLink.href = `mailto:digitech0029@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

carousels.forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dotsContainer = carousel.querySelector("[data-carousel-dots]");
  const shouldAutoplay = carousel.dataset.autoplay === "true";
  let currentIndex = 0;
  let intervalId = null;

  if (!slides.length) {
    return;
  }

  const dots = slides.map((_, index) => {
    if (!dotsContainer) {
      return null;
    }

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Aller a l image ${index + 1}`);
    dot.addEventListener("click", () => {
      goTo(index);
      restartAutoplay();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  const render = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === currentIndex);
    });

    dots.forEach((dot, index) => {
      if (dot) {
        dot.classList.toggle("is-active", index === currentIndex);
      }
    });
  };

  const goTo = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    render();
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  const stopAutoplay = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };

  const startAutoplay = () => {
    if (!shouldAutoplay || slides.length < 2) {
      return;
    }

    stopAutoplay();
    intervalId = window.setInterval(next, 3500);
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prev();
      restartAutoplay();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      next();
      restartAutoplay();
    });
  }

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  render();
  startAutoplay();
});
