// === PARTICULAS ===
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#00bfff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#00bfff", opacity: 0.3, width: 1 },
    move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: { grab: { distance: 140, line_linked: { opacity: 0.7 } }, push: { particles_nb: 4 } }
  },
  retina_detect: true
});

// === AOS ===
AOS.init({ duration: 1000 });

// === LOADER ===
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 5000); // 5 segundos
});

// === TRADUCTOR ===
const translateBtn = document.getElementById("translateBtn");
let currentLang = "es";

translateBtn.addEventListener("click", () => {
  document.querySelectorAll("[data-es]").forEach(el => {
    el.textContent = currentLang === "es" ? el.dataset.en : el.dataset.es;
  });
  currentLang = currentLang === "es" ? "en" : "es";
});

// === FOOTER AÑO ACTUAL ===
document.getElementById("year").textContent = new Date().getFullYear();
