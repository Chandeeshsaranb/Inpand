/* ================================================
   INPAND TECHNOLOGIES — SERVICES PAGE
   services.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── PRELOADER ── */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
        setTimeout(() => preloader.classList.add('hidden'), 3000);
    }

    /* ── STICKY HEADER SHADOW ── */
    const header = document.getElementById('site-header');
    const onScroll = () => {
        if (!header) return;
        header.style.boxShadow = window.scrollY > 10
            ? '0 2px 16px rgba(0,0,0,0.12)'
            : '0 1px 8px rgba(0,0,0,0.08)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── MOBILE NAV TOGGLE ── */
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');
    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            const open = siteNav.classList.toggle('open');
            navToggle.classList.toggle('open', open);
            navToggle.setAttribute('aria-expanded', open);
        });
        // Close nav on link click
        siteNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                siteNav.classList.remove('open');
                navToggle.classList.remove('open');
            });
        });
        // Close on outside click
        document.addEventListener('click', e => {
            if (!header.contains(e.target)) {
                siteNav.classList.remove('open');
                navToggle.classList.remove('open');
            }
        });
    }

    /* ── BACK TO TOP ── */
    const backBtn = document.getElementById('back-to-top');
    if (backBtn) {
        window.addEventListener('scroll', () => {
            backBtn.classList.toggle('visible', window.scrollY > 300);
        }, { passive: true });
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── TESTIMONIAL CAROUSEL ── */
    const track = document.getElementById('testimonial-track');
    const dotsEl = document.getElementById('carousel-dots');
    if (track && dotsEl) {
        const slides = track.querySelectorAll('.testimonial-slide');
        let current = 0;
        let timer;

        // Build dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsEl.appendChild(dot);
        });

        function goTo(idx) {
            current = (idx + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dotsEl.querySelectorAll('.dot').forEach((d, i) =>
                d.classList.toggle('active', i === current)
            );
        }

        function startAuto() {
            timer = setInterval(() => goTo(current + 1), 5000);
        }

        function stopAuto() { clearInterval(timer); }

        startAuto();
        track.parentElement.addEventListener('mouseenter', stopAuto);
        track.parentElement.addEventListener('mouseleave', startAuto);

        // Touch swipe
        let startX = 0;
        track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
        });
    }

    /* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = header ? header.offsetHeight + 16 : 80;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

});