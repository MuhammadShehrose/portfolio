/**
 * Muhammad Shehrose Portfolio — main.js
 * Scroll animations, custom cursor, mouse parallax, click effects
 */

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let rafId = null;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        rafId = requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover state
    const hoverEls = document.querySelectorAll('a, button, [data-cursor="hover"], .project-card, .job-card, .stat-card, .chip, .tag');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Click state
    document.addEventListener('mousedown', () => {
        document.body.classList.add('cursor-click');
    });
    document.addEventListener('mouseup', () => {
        document.body.classList.remove('cursor-click');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '';
        follower.style.opacity = '';
    });
})();

/* ============================================================
   NAVBAR SCROLL BEHAVIOR
   ============================================================ */
(function initNavbar() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Add scrolled class
        if (scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Subtle hide/show on scroll direction
        if (scrollY > lastScroll && scrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = scrollY;
    }, { passive: true });

    // Add CSS transition for hide/show
    nav.style.transition = 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease, transform 0.4s ease';
})();

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
(function initReveal() {
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    });

    revealEls.forEach(el => observer.observe(el));
})();

/* ============================================================
   SKILL BAR ANIMATION
   ============================================================ */
(function initSkillBars() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const w = fill.getAttribute('data-width');
                setTimeout(() => {
                    fill.style.width = w + '%';
                }, 200);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(fill => observer.observe(fill));
})();

/* ============================================================
   MOUSE PARALLAX — Hero Section
   ============================================================ */
(function initParallax() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const heroGlow = hero.querySelector('.hero-glow');
    const avatar = hero.querySelector('.hero-avatar');

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (e.clientX - rect.left - cx) / cx;
        const dy = (e.clientY - rect.top - cy) / cy;

        if (heroGlow) {
            heroGlow.style.transform = `translate(${dx * 30}px, ${dy * 20}px)`;
        }
        if (avatar) {
            avatar.style.transform = `perspective(600px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg) translateZ(10px)`;
        }
    });

    hero.addEventListener('mouseleave', () => {
        if (heroGlow) heroGlow.style.transform = '';
        if (avatar) avatar.style.transform = '';
    });
})();

/* ============================================================
   MOUSE PARALLAX — Code Window
   ============================================================ */
(function initCodeWindowParallax() {
    const codeWindow = document.querySelector('.code-window');
    if (!codeWindow) return;

    const wrapper = codeWindow.closest('.about-visual');
    if (!wrapper) return;

    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (e.clientX - rect.left - cx) / cx;
        const dy = (e.clientY - rect.top - cy) / cy;

        codeWindow.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg) translateZ(8px)`;
        codeWindow.style.boxShadow = `${-dx * 20}px ${-dy * 20}px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        codeWindow.style.transform = '';
        codeWindow.style.boxShadow = '';
    });
})();

/* ============================================================
   PROJECT CARD TILT
   ============================================================ */
(function initCardTilt() {
    const cards = document.querySelectorAll('.project-card, .job-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const dx = (e.clientX - rect.left - cx) / cx;
            const dy = (e.clientY - rect.top - cy) / cy;

            card.style.transform = `perspective(800px) rotateY(${dx * 3}deg) rotateX(${-dy * 2}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

/* ============================================================
   RIPPLE EFFECT ON BUTTONS
   ============================================================ */
(function initRipple() {
    const btns = document.querySelectorAll('.btn-primary-custom, .btn-ghost-custom, .btn-hire');

    btns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        background: rgba(255,255,255,0.15);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-anim 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 10;
      `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 700);
        });
    });

    // Add keyframes via style tag if not present
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
      @keyframes ripple-anim {
        to { transform: scale(2.5); opacity: 0; }
      }
    `;
        document.head.appendChild(style);
    }
})();

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    link.style.removeProperty('color');
                });
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.style.color = 'var(--accent)';
                }
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   SMOOTH SCROLL for internal links
   ============================================================ */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile navbar if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });
})();

/* ============================================================
   STAGGER HERO ELEMENTS ON LOAD
   ============================================================ */
(function initHeroLoad() {
    // Hero elements marked with reveal-up animate on page load
    const heroRevealEls = document.querySelectorAll('.hero-section .reveal-up, .hero-section .reveal-left');

    // Trigger them immediately since they're in viewport on load
    requestAnimationFrame(() => {
        setTimeout(() => {
            heroRevealEls.forEach(el => el.classList.add('visible'));
        }, 100);
    });
})();

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
(function initProgressBar() {
    const bar = document.createElement('div');
    bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(to right, var(--accent), var(--accent-strong));
    z-index: 9997;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollTop / scrollHeight * 100;
        bar.style.width = progress + '%';
    }, { passive: true });
})();

/* ============================================================
   COUNTER ANIMATION for stats
   ============================================================ */
(function initCounters() {
    const statNums = document.querySelectorAll('.stat-num');
    if (!statNums.length) return;

    const counts = ['4+', '10+', '4'];
    const targets = [4, 10, 4];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const idx = Array.from(statNums).indexOf(el);
                if (idx < 0) return;

                const target = targets[idx];
                const suffix = counts[idx].replace(/[0-9]/g, '');
                let current = 0;
                const step = target / 30;
                const interval = setInterval(() => {
                    current = Math.min(current + step, target);
                    el.textContent = Math.ceil(current) + suffix;
                    if (current >= target) clearInterval(interval);
                }, 40);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => observer.observe(el));
})();

/* ============================================================
   TYPING EFFECT for hero role text
   ============================================================ */
(function initTyping() {
    const roleText = document.querySelector('.role-text');
    if (!roleText) return;

    const text = roleText.textContent.trim();
    roleText.textContent = '';

    let i = 0;

    setTimeout(() => {
        const interval = setInterval(() => {
            if (i < text.length) {
                roleText.textContent += text[i];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 60);
    }, 1200);
})();

/* ============================================================
   PARTICLE CLICK EFFECT
   ============================================================ */
(function initParticleClick() {
    const colors = ['#f59e0b', '#fbbf24', '#ffffff', '#a1a1aa'];

    document.addEventListener('click', (e) => {
        const target = e.target;
        // Only create particles if clicking on background areas
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) return;

        for (let p = 0; p < 6; p++) {
            const particle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 4 + 2;
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const distance = Math.random() * 60 + 30;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9996;
        animation: particle-fly 0.7s ease forwards;
        --tx: ${tx}px;
        --ty: ${ty}px;
      `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 750);
        }
    });

    if (!document.getElementById('particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
      @keyframes particle-fly {
        0% { transform: translate(0,0) scale(1); opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
      }
    `;
        document.head.appendChild(style);
    }
})();

/* ============================================================
   BACK-SCROLL: Scroll to hero when clicking brand
   ============================================================ */
(function initBrandScroll() {
    const brand = document.querySelector('.navbar-brand');
    if (!brand) return;
    brand.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
