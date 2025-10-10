(function () {
  function updateNavHeight() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const h = nav.offsetHeight || 72;
    document.documentElement.style.setProperty('--nav-height', `${h}px`);
    const header = document.querySelector('header');
    if (header) header.style.paddingTop = `calc(${h}px + 40px)`;
  }
  window.addEventListener('load', updateNavHeight);
  window.addEventListener('resize', updateNavHeight);

  window.addEventListener('load', function () {
    setTimeout(function () {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.transition = 'opacity 400ms ease';
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }
      document.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 120 + i * 80);
      });
    }, 5000);
  });

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

  (function initTheme() {
    const saved = localStorage.getItem('site-theme');
    if (saved === 'light') setTheme('light');
    else setTheme('dark');
  })();

  themeToggle && themeToggle.addEventListener('click', function () {
    const current = localStorage.getItem('site-theme') === 'light' ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });

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

  function pushParticlesAt(x, y, amount = 6) {
    try {
      if (window.pJSDom && window.pJSDom.length) {
        const pJS = window.pJSDom[0].pJS;
        if (pJS && pJS.fn && pJS.fn.modes && typeof pJS.fn.modes.pushParticles === 'function') {
          pJS.fn.modes.pushParticles(amount, { pos_x: x, pos_y: y });
        }
      }
    } catch (err) {
    }
  }

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

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScroll < 300) return;
    lastScroll = now;
    pushParticlesAt(window.innerWidth / 2, window.innerHeight / 2, 4);
  }, { passive: true });

  function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('load', revealOnScroll);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
  });

  const langToggle = document.getElementById('lang-toggle');
  const translations = {
    es: {
      nav: ['Sobre mí', 'Proyectos', 'Tecnologías'],
      headerSub: 'Estudiante de Tecnólogo en Desarrollo de Software — 7° semestre',
      aboutHeading: 'Sobre mí',
      aboutParagraph: 'Soy un estudiante de Tecnólogo en Desarrollo de Software en CETI con experiencia en la práctica de los lenguajes: Java, C, C#, Arduino, MySQL, HTML y CSS. He estado creando varios proyectos en los que he podido utilizar estos aprendizajes, principalmente en los que integran software, electrónica y robótica. Deseo seguir avanzando en el campo tecnológico y continuar mis estudios en Mecatrónica, donde tenga la oportunidad de combinar mejor el desarrollo de software con los sistemas físicos.',
      projectsHeading: 'Mis Proyectos',
      proj1: 'Sistema con Arduino y sensores ultrasónicos que mide el nivel de agua en tiempo real.',
      proj2: 'Aplicación en C# conectada con Arduino para controlar motores y monitorear su estado.',
      proj3: 'Proyecto en MySQL y Java para gestionar el inventario y ventas de una juguetería.',
      skillsHeading: 'Tecnologías y Herramientas',
      downloadCV: 'Descargar CV',
      viewREADME: 'Ver README',
      viewCode: 'Ver código',
      contact: 'Correo',
      footerMadeBy: 'Diseñado y desarrollado por Ernesto Rivera 💻',
      langBtn: 'EN'
    },
    en: {
      nav: ['About', 'Projects', 'Skills'],
      headerSub: 'Software Development Technologist student — 7th semester',
      aboutHeading: 'About me',
      aboutParagraph: 'I am a Software Development Technologist student at CETI with hands-on experience in Java, C, C#, Arduino, MySQL, HTML and CSS. I have created several projects where I applied these skills, mainly integrating software, electronics and robotics. I want to keep advancing in the tech field and continue my studies in Mechatronics to better combine software development with physical systems.',
      projectsHeading: 'My Projects',
      proj1: 'System with Arduino and ultrasonic sensors that measures water level in real time.',
      proj2: 'C# application connected to Arduino to control motors and monitor their status.',
      proj3: 'MySQL and Java project to manage inventory and sales for a toy store.',
      skillsHeading: 'Technologies & Tools',
      downloadCV: 'Download CV',
      viewREADME: 'View README',
      viewCode: 'View code',
      contact: 'Email',
      footerMadeBy: 'Designed and developed by Ernesto Rivera 💻',
      langBtn: 'ES'
    }
  };

  function setLang(lang) {
    const t = translations[lang] || translations.es;
    document.querySelectorAll('.nav-links a')[0].textContent = t.nav[0];
    document.querySelectorAll('.nav-links a')[1].textContent = t.nav[1];
    document.querySelectorAll('.nav-links a')[2].textContent = t.nav[2];
    const headerSub = document.getElementById('header-sub');
    if (headerSub) headerSub.textContent = t.headerSub;
    const aboutHeading = document.getElementById('about-heading');
    if (aboutHeading) aboutHeading.textContent = t.aboutHeading;
    const aboutParagraph = document.getElementById('about-paragraph');
    if (aboutParagraph) aboutParagraph.textContent = t.aboutParagraph;
    const projectsHeading = document.getElementById('projects-heading');
    if (projectsHeading) projectsHeading.textContent = t.projectsHeading;
    const proj1 = document.getElementById('proj1-desc');
    if (proj1) proj1.textContent = t.proj1;
    const proj2 = document.getElementById('proj2-desc');
    if (proj2) proj2.textContent = t.proj2;
    const proj3 = document.getElementById('proj3-desc');
    if (proj3) proj3.textContent = t.proj3;
    const skillsHeading = document.getElementById('skills-heading');
    if (skillsHeading) skillsHeading.textContent = t.skillsHeading;
    const downloadCv = document.getElementById('download-cv');
    if (downloadCv) downloadCv.textContent = t.downloadCV;
    document.querySelectorAll('.project-actions .btn').forEach((btn, i) => {
      if (i % 2 === 0) btn.textContent = t.viewREADME;
      else btn.textContent = t.viewCode;
    });
    const footerContact = document.querySelectorAll('.footer-link')[1];
    if (footerContact) footerContact.textContent = t.contact;
    const madeBy = document.getElementById('footer-madeby');
    if (madeBy) madeBy.textContent = t.footerMadeBy;
    if (langToggle) langToggle.textContent = t.langBtn;
    localStorage.setItem('site-lang', lang);
  }

  (function initLang() {
    const saved = localStorage.getItem('site-lang') || 'es';
    setLang(saved);
  })();

  langToggle && langToggle.addEventListener('click', function () {
    const current = localStorage.getItem('site-lang') === 'en' ? 'en' : 'es';
    setLang(current === 'en' ? 'es' : 'en');
  });

})();

