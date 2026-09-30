(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-nav]');
  const backToTop = document.querySelector('[data-back-to-top]');

  function setMenu(open) {
    if (!menuButton || !navigation) return;
    navigation.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', open);
  }

  menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });

  document.addEventListener('click', event => {
    if (!navigation?.classList.contains('open')) return;
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
      setMenu(false);
    });
  });

  const sections = [...document.querySelectorAll('[data-section]')];
  const navLinks = [...document.querySelectorAll('.nav-link')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const revealItems = [...document.querySelectorAll('.reveal')];
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('visible'));
  } else {
    document.querySelectorAll('[data-stagger]').forEach(group => {
      [...group.querySelectorAll('.reveal')].forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 45, 360)}ms`;
      });
    });
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  const timeline = document.querySelector('[data-timeline]');
  const timelineProgress = document.querySelector('[data-timeline-progress]');
  let ticking = false;

  function updateScrollState() {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 24);
    backToTop?.classList.toggle('visible', y > 700);

    if (timeline && timelineProgress && !reducedMotion.matches) {
      const rect = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.72;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (rect.height + start * 0.35)));
      timelineProgress.style.height = `${progress * Math.max(0, rect.height - 30)}px`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollState);
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) setMenu(false);
    updateScrollState();
  });
  reducedMotion.addEventListener?.('change', updateScrollState);
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' }));
  updateScrollState();
})();
