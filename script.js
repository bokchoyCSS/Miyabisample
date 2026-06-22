/* Miyabi Matcha — interactions
   sample by _ziyad._ @ code-caffeine */
(function () {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  const hasHero = document.body.classList.contains('has-hero');

  /* --- Nav solid / hero state on scroll --- */
  function onScroll() {
    const scrolled = window.scrollY > 40;
    if (!nav) return;
    nav.classList.toggle('nav--solid', scrolled || !hasHero);
    nav.classList.toggle('nav--hero', hasHero && !scrolled);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Mobile menu --- */
  if (toggle && links) {
    const setMenu = (open) => {
      links.classList.toggle('open', open);
      nav.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));

    // close when a nav link is followed (but not when switching language)
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => setMenu(false))
    );
    // Escape closes the menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    // closing back to desktop width resets the menu
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && links.classList.contains('open')) setMenu(false);
    });
  }

  /* --- Scroll reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* --- Rotating carousels (featured menu + reviews), 5s each --- */
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const slides = root.querySelectorAll('[data-slide]');
    const dots = root.querySelectorAll('[data-dot]');
    if (slides.length < 2) return;
    let i = 0;
    const show = (n) => {
      slides[i].classList.remove('active');
      if (dots[i]) dots[i].classList.remove('on');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
      if (dots[i]) dots[i].classList.add('on');
    };
    setInterval(() => show(i + 1), 5000);
  });

  /* --- Footer year --- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
