/* ======================================================
   script.js - dinámicas: nav-height, particles, theme,
   loader, partículas en hover/scroll, reveal animations
   ====================================================== */

(function () {
  /* ---------- 1) Ajuste dinámico del alto del navbar (para anchors) ---------- */
  function updateNavHeight() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const h = nav.offsetHeight || 72;
    document.documentElement.style.setProperty('--nav-height', `${h}px`);
    // También actualizamos el padding top del header por si el nav cambia
    const header = document.querySelector('header');
    if (header) header.style.paddingTop = `calc(${h}px + 40px)`;
  }
  window.addEventListener('load', updateNavHeight);
  window.addEventListener('resize', updateNavHeight);

  /* ---------- 2) Loader (usa tu favicon.png) ---------- */
  window.addEventListener('load', function () {
    // esperamos un instante para que todo se estabilice
    setTimeout(function () {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.transition = 'opacity 400ms ease';
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }
      // Revelar elementos con clase .reveal (animación sutil)
      document.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 120 + i * 80);
      });
    }, 700);
  });

  /* ---------- 3) Tema claro/oscuro (persistente) ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.textContent = '☀️';
      localStorage.setItem('site-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent = '🌙';
      localStorage.setItem('site-theme', 'dark');
    }
  }

  // on load: read saved theme or prefer dark by default
  (function initTheme() {
    const saved = localStorage.getItem('site-theme');
    if (saved === 'light') setTheme('light');
    else setTheme('dark');
  })();

  themeToggle && themeToggle.addEventListener('click', function () {
    const current = localStorage.getItem('site-theme') === 'light' ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });

  /* ---------- 4) Partículas (config original + interacciones) ---------- */
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
        opacity: 0.25,
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

  /* Helper: empujar partículas programáticamente si particles.js está listo */
  function pushParticlesAt(x, y, amount = 6) {
    try {
      if (window.pJSDom && window.pJSDom.length) {
        const pJS = window.pJSDom[0].pJS;
        if (pJS && pJS.fn && pJS.fn.modes && typeof pJS.fn.modes.pushParticles === 'function') {
          pJS.fn.modes.pushParticles(amount, { pos_x: x, pos_y: y });
        }
      }
    } catch (err) {
      // no crítico; en caso de error no interrumpe el resto
      // console.warn('pushParticlesAt error', err);
    }
  }

  /* ---------- 5) Partículas en hover y scroll (ligero, throttled) ---------- */
  // hover sobre .project-card -> burst en la posición del cursor (throttle 150ms)
  const cards = document.querySelectorAll('.project-card');
  const lastBurst = new WeakMap();

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const now = Date.now();
      const prev = lastBurst.get(card) || 0;
      if (now - prev < 150) return;
      lastBurst.set(card, now);
      pushParticlesAt(e.clientX, e.clientY, 5);
    });

    card.addEventListener('mouseenter', (e) => {
      pushParticlesAt(e.clientX, e.clientY, 8);
    });
  });

  // scroll -> burst en el centro de la ventana (throttle)
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScroll < 300) return;
    lastScroll = now;
    pushParticlesAt(window.innerWidth / 2, window.innerHeight / 2, 4);
  }, { passive: true });

  /* ---------- 6) Reveal elements when in viewport (simple) ---------- */
  function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('load', revealOnScroll);

  /* ---------- 7) Small accessibility: focus outlines for keyboard users ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
  });

  /* ---------- 8) OPTIONAL: add small aria-label to contact & CTAs (already set in HTML) ---------- */

  /* All done */
})();
