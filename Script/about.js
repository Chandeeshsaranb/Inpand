/**
 * INPAND TECHNOLOGIES — about.js
 * About page: preloader, nav, scroll animations,
 * stat counter, testimonial carousel, back-to-top
 */

(function () {
    'use strict';

    /* =============================================
       PRELOADER
       ============================================= */
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        window.addEventListener('load', function () {
            setTimeout(function () { preloader.classList.add('hidden'); }, 400);
        });
    }

    /* =============================================
       MOBILE NAV TOGGLE
       ============================================= */
    function initNavToggle() {
        const toggle = document.getElementById('nav-toggle');
        const nav = document.getElementById('site-nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen);
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* =============================================
       SCROLL ANIMATIONS
       ============================================= */
    function initScrollAnimations() {
        const els = document.querySelectorAll(
            '.animate-zoom, .animate-fade, .animate-left, .animate-right, .animate-up'
        );
        if (!els.length) return;

        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('animated'); });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        els.forEach(function (el) { observer.observe(el); });
    }

    /* =============================================
       STAT COUNTER
       ============================================= */
    function initStatCounters() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;

        const easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

        const animateCounter = function (el) {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 2000;
            const start = performance.now();

            const step = function (now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(easeOut(progress) * target);
                el.textContent = value.toLocaleString();
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = target.toLocaleString();
            };
            requestAnimationFrame(step);
        };

        if (!('IntersectionObserver' in window)) {
            counters.forEach(function (el) { animateCounter(el); });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        counters.forEach(function (el) { observer.observe(el); });
    }

    /* =============================================
       TESTIMONIAL CAROUSEL
       ============================================= */
    function initTestimonialCarousel() {
        const track = document.getElementById('testimonial-track');
        const dotsContainer = document.getElementById('carousel-dots');
        if (!track) return;

        const slides = track.querySelectorAll('.testimonial-slide');
        const total = slides.length;
        let current = 0;
        let autoTimer = null;

        // Build dots
        slides.forEach(function (_, i) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function () { goTo(i); resetAuto(); });
            dotsContainer.appendChild(dot);
        });

        function updateDots() {
            dotsContainer.querySelectorAll('.dot').forEach(function (dot, i) {
                dot.classList.toggle('active', i === current);
            });
        }

        function goTo(index) {
            current = (index + total) % total;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            updateDots();
        }

        function startAuto() {
            autoTimer = setInterval(function () { goTo(current + 1); }, 5000);
        }

        function resetAuto() {
            clearInterval(autoTimer);
            startAuto();
        }

        // Touch swipe
        let touchStartX = 0;
        track.parentElement.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        track.parentElement.addEventListener('touchend', function (e) {
            const dx = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(dx) > 40) {
                dx < 0 ? goTo(current + 1) : goTo(current - 1);
                resetAuto();
            }
        }, { passive: true });

        // Pause on hover
        track.parentElement.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
        track.parentElement.addEventListener('mouseleave', startAuto);

        startAuto();
    }

    /* =============================================
       BACK TO TOP
       ============================================= */
    function initBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            btn.classList.toggle('visible', window.scrollY > 300);
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =============================================
       STICKY HEADER SHADOW
       ============================================= */
    function initStickyHeader() {
        const header = document.getElementById('site-header');
        if (!header) return;

        window.addEventListener('scroll', function () {
            header.style.boxShadow = window.scrollY > 10
                ? '0 2px 20px rgba(0,0,0,0.12)'
                : '0 2px 12px rgba(0,0,0,0.07)';
        }, { passive: true });
    }

    /* =============================================
       INIT
       ============================================= */
    function init() {
        initPreloader();
        initNavToggle();
        initScrollAnimations();
        initStatCounters();
        initTestimonialCarousel();
        initBackToTop();
        initStickyHeader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();