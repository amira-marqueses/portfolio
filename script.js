function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("show");
 }
 
 document.addEventListener("DOMContentLoaded", () => {
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
 });
