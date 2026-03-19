/**
 * INPAND TECHNOLOGIES — home.js
 * Vanilla JS for: preloader, nav toggle, scroll animations,
 * portfolio filter, testimonial carousel, back-to-top
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
            setTimeout(function () {
                preloader.classList.add('hidden');
            }, 400);
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

        // Close nav when a link is clicked
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* =============================================
       SCROLL ANIMATIONS (IntersectionObserver)
       ============================================= */
    function initScrollAnimations() {
        const animatable = document.querySelectorAll(
            '.animate-zoom, .animate-fade, .animate-left, .animate-right, .animate-slide-up, .animate-up'
        );
        if (!animatable.length) return;

        if (!('IntersectionObserver' in window)) {
            // Fallback: show everything immediately
            animatable.forEach(function (el) { el.classList.add('animated'); });
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

        animatable.forEach(function (el) { observer.observe(el); });
    }

    /* =============================================
       PORTFOLIO FILTER
       ============================================= */
    function initPortfolioFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.portfolio-item');
        if (!filterBtns.length || !items.length) return;

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const filter = btn.getAttribute('data-filter');

                // Update active button
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                // Show/hide items
                items.forEach(function (item) {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    /* =============================================
       TESTIMONIAL CAROUSEL
       ============================================= */
    function initTestimonialCarousel() {
        const track = document.getElementById('testimonial-track');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
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

        function goNext() { goTo(current + 1); }
        function goPrev() { goTo(current - 1); }

        function startAuto() {
            autoTimer = setInterval(goNext, 5000);
        }

        function resetAuto() {
            clearInterval(autoTimer);
            startAuto();
        }

        if (prevBtn) prevBtn.addEventListener('click', function () { goPrev(); resetAuto(); });
        if (nextBtn) nextBtn.addEventListener('click', function () { goNext(); resetAuto(); });

        // Touch / swipe support
        let touchStartX = 0;
        track.parentElement.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        track.parentElement.addEventListener('touchend', function (e) {
            const dx = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(dx) > 40) {
                dx < 0 ? goNext() : goPrev();
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
       INIT ALL
       ============================================= */
    function init() {
        initPreloader();
        initNavToggle();
        initScrollAnimations();
        initPortfolioFilter();
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