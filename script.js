// Ajuste dinámico de la variable --nav-height para que anclas no queden ocultas
(function () {
  function updateNavHeight() {
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    var h = nav.offsetHeight;
    document.documentElement.style.setProperty('--nav-height', h + 'px');
  }
  // actualizar al cargar y al redimensionar
  window.addEventListener('load', updateNavHeight);
  window.addEventListener('resize', updateNavHeight);
})();

/* === Partículas (tu configuración original) === */
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#00bfff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00bfff",
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0.7 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
