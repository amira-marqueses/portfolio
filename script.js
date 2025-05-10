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
 });
