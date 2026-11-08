function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("show");
 }
 
 document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ensurePageVeil = () => {
       let veil = document.querySelector(".page-veil");
       if (!veil) {
          veil = document.createElement("div");
          veil.className = "page-veil";
          veil.setAttribute("aria-hidden", "true");
          document.body.prepend(veil);
       }
       return veil;
    };

    const navigateWithTransition = (url) => {
       if (reduceMotion) {
          window.location.href = url;
          return;
       }
       if (document.body.classList.contains("is-page-leaving")) return;
       ensurePageVeil();
       document.body.classList.add("is-page-leaving");
       window.setTimeout(() => {
          window.location.href = url;
       }, 340);
    };

    const isInternalPageLink = (anchor) => {
       const href = anchor.getAttribute("href");
       if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;
       if (anchor.target === "_blank" || anchor.hasAttribute("download")) return null;
       let dest;
       try {
          dest = new URL(href, window.location.href);
       } catch (e) {
          return null;
       }
       if (dest.origin !== window.location.origin) return null;
       if (dest.pathname === window.location.pathname && dest.search === window.location.search) return null;
       return dest.href;
    };

    if (!reduceMotion) {
       ensurePageVeil();
       document.body.classList.add("is-page-entering");
       window.setTimeout(() => {
          document.body.classList.remove("is-page-entering");
       }, 900);
    }

    document.querySelectorAll(".topnav .nav-links a, .topnav .logo a").forEach((link) => {
       link.addEventListener("click", (e) => {
          const url = isInternalPageLink(link);
          if (!url) return;
          e.preventDefault();
          const nav = document.getElementById("navLinks");
          if (nav) nav.classList.remove("show");
          navigateWithTransition(url);
       });
    });

    document.querySelectorAll(".home-actions a[href]").forEach((link) => {
       link.addEventListener("click", (e) => {
          const url = isInternalPageLink(link);
          if (!url) return;
          e.preventDefault();
          navigateWithTransition(url);
       });
    });

    const form = document.querySelector(".contact-form");
    if (form) {
       form.addEventListener("submit", function (e) {
          setTimeout(() => {
             this.reset();
          }, 500);
       });
    }

    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
       const toggleCard = () => {
          const isOpen = card.classList.toggle("is-open");
          card.setAttribute("aria-expanded", isOpen ? "true" : "false");
       };

       card.addEventListener("click", (e) => {
          if (e.target.closest("a, .project-carousel-btn, .project-carousel-dot")) return;
          toggleCard();
       });
       card.addEventListener("keydown", (e) => {
          if (e.target.closest(".project-carousel-btn, .project-carousel-dot")) return;
          if (e.key === "Enter" || e.key === " ") {
             e.preventDefault();
             toggleCard();
          }
       });
    });

    const capstoneSlides = [
       {
          src: "images/dc-space-capstone.png",
          alt: "DC SPACE Capstone project interface collage",
       },
       {
          src: "images/dc-space-capstone-gallery/02-login.png",
          alt: "DC SPACE login screen",
       },
       {
          src: "images/dc-space-capstone-gallery/03-attendance.jpg",
          alt: "DC SPACE attendance and RFID activity logs",
       },
       {
          src: "images/dc-space-capstone-gallery/04-event-details.jpg",
          alt: "DC SPACE organized event details page",
       },
       {
          src: "images/dc-space-capstone-gallery/05-organize.jpg",
          alt: "DC SPACE organize an event page",
       },
       {
          src: "images/dc-space-capstone-gallery/06-feedback.png",
          alt: "DC SPACE submit feedback page",
       },
       {
          src: "images/dc-space-capstone-gallery/07-notifications.png",
          alt: "DC SPACE notifications page",
       },
       {
          src: "images/dc-space-capstone-gallery/08-explore.png",
          alt: "DC SPACE explore events page",
       },
    ];

    document.querySelectorAll("[data-filter-tabs]").forEach((tabs) => {
       const buttons = tabs.querySelectorAll("[data-filter]");
       const page = tabs.nextElementSibling;
       if (!page) return;
       const categories = page.querySelectorAll(".achievement-category");

       const applyFilter = (filter) => {
          categories.forEach((section) => {
             const show = filter === "all" || section.id === filter;
             section.classList.toggle("is-hidden", !show);
          });

          buttons.forEach((button) => {
             const active = button.getAttribute("data-filter") === filter;
             button.classList.toggle("is-active", active);
             button.setAttribute("aria-pressed", active ? "true" : "false");
          });
       };

       buttons.forEach((button) => {
          button.addEventListener("click", () => {
             applyFilter(button.getAttribute("data-filter"));
          });
       });

       applyFilter("all");
    });

    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
       const image = carousel.querySelector(".project-carousel-image");
       const prevBtn = carousel.querySelector(".project-carousel-prev");
       const nextBtn = carousel.querySelector(".project-carousel-next");
       const dotsWrap = carousel.querySelector(".project-carousel-dots");
       const slides = capstoneSlides;
       let index = 0;

       const renderDots = () => {
          dotsWrap.innerHTML = "";
          slides.forEach((_, i) => {
             const dot = document.createElement("button");
             dot.type = "button";
             dot.className = "project-carousel-dot" + (i === index ? " is-active" : "");
             dot.setAttribute("aria-label", "Go to image " + (i + 1));
             dot.addEventListener("click", (e) => {
                e.stopPropagation();
                index = i;
                showSlide();
             });
             dotsWrap.appendChild(dot);
          });
       };

       const showSlide = () => {
          const slide = slides[index];
          image.src = slide.src;
          image.alt = slide.alt;
          renderDots();
       };

       prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          index = (index - 1 + slides.length) % slides.length;
          showSlide();
       });

       nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          index = (index + 1) % slides.length;
          showSlide();
       });

       showSlide();
    });

    const lightbox = document.createElement("div");
    lightbox.className = "cert-lightbox";
    lightbox.hidden = true;
    lightbox.innerHTML = `
       <div class="cert-lightbox-backdrop" data-lightbox-close></div>
       <div class="cert-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Certificate preview">
          <button type="button" class="cert-lightbox-close" data-lightbox-close aria-label="Close certificate preview">&times;</button>
          <div class="cert-lightbox-content"></div>
       </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxContent = lightbox.querySelector(".cert-lightbox-content");
    let lastFocus = null;

    const isImageFile = (url) => /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(url || "");
    const isPdfFile = (url) => /\.pdf(\?.*)?$/i.test(url || "");

    const closeLightbox = () => {
       lightbox.hidden = true;
       document.body.classList.remove("cert-lightbox-open");
       lightboxContent.innerHTML = "";
       if (lastFocus && typeof lastFocus.focus === "function") {
          lastFocus.focus();
       }
    };

    const openLightbox = (trigger) => {
       const href = trigger.getAttribute("href");
       if (!href) return;

       const card = trigger.closest(".text-container2, .leadership-card, .certificate-item") || trigger.parentElement;
       const previewImg = card ? card.querySelector("img") : null;
       const title =
          (card && (card.querySelector("h2, h3") || {}).textContent) ||
          trigger.getAttribute("aria-label") ||
          "Certificate";

       lastFocus = trigger;
       lightboxContent.innerHTML = "";

       if (isImageFile(href)) {
          const img = document.createElement("img");
          img.src = href;
          img.alt = title.trim();
          lightboxContent.appendChild(img);
       } else if (previewImg && previewImg.getAttribute("src") && !isPdfFile(href)) {
          const img = document.createElement("img");
          img.src = previewImg.getAttribute("src");
          img.alt = previewImg.getAttribute("alt") || title.trim();
          lightboxContent.appendChild(img);
       } else if (isPdfFile(href)) {
          const frame = document.createElement("iframe");
          frame.src = href;
          frame.title = title.trim();
          frame.className = "cert-lightbox-pdf";
          lightboxContent.appendChild(frame);
       } else {
          const frame = document.createElement("iframe");
          frame.src = href;
          frame.title = title.trim();
          lightboxContent.appendChild(frame);
       }

       lightbox.hidden = false;
       document.body.classList.add("cert-lightbox-open");
       lightbox.querySelector(".cert-lightbox-close").focus();
    };

    document.querySelectorAll(".view-button, .leadership-view").forEach((link) => {
       link.addEventListener("click", (e) => {
          e.preventDefault();
          openLightbox(link);
       });
    });

    lightbox.addEventListener("click", (e) => {
       if (e.target.closest("[data-lightbox-close]")) {
          closeLightbox();
       }
    });

    document.addEventListener("keydown", (e) => {
       if (e.key === "Escape" && !lightbox.hidden) {
          closeLightbox();
       }
    });

    document.querySelectorAll(".site-shell").forEach((shell) => {
       if ("IntersectionObserver" in window) {
          const watcher = new IntersectionObserver(
             (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                   shell.classList.add("site-shell--play");
                   watcher.disconnect();
                }
             },
             { threshold: 0.12 }
          );
          watcher.observe(shell);
       } else {
          shell.classList.add("site-shell--play");
       }
    });

    document.querySelectorAll(".amz").forEach((aboutSection) => {
       if ("IntersectionObserver" in window) {
          const watcher = new IntersectionObserver(
             (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                   aboutSection.classList.add("amz--play");
                   watcher.disconnect();
                }
             },
             { threshold: 0.15 }
          );
          watcher.observe(aboutSection);
       } else {
          aboutSection.classList.add("amz--play");
       }

       const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
       const zone = aboutSection.querySelector(".amz__tilt-zone");
       const card = aboutSection.querySelector(".amz__card");
       const glare = aboutSection.querySelector(".amz__glare");

       if (!reduceMotion && zone && card) {
          zone.addEventListener("mousemove", (e) => {
             const rect = zone.getBoundingClientRect();
             const px = (e.clientX - rect.left) / rect.width;
             const py = (e.clientY - rect.top) / rect.height;
             card.style.transition = "transform .12s ease-out";
             card.style.transform = `rotateX(${(0.5 - py) * 18}deg) rotateY(${(px - 0.5) * 22}deg)`;
             if (glare) {
                glare.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 45%)`;
                glare.style.opacity = "1";
             }
          });

          zone.addEventListener("mouseleave", () => {
             card.style.transition = "transform .7s cubic-bezier(.2,.8,.2,1)";
             card.style.transform = "rotateX(0deg) rotateY(0deg)";
             if (glare) glare.style.opacity = "0";
          });
       }
    });
 });
