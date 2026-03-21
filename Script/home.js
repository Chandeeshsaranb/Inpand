/**
 * INPAND TECHNOLOGIES — home.js
 * Handles: scroll animations, portfolio filter, testimonial carousel, FB embed
 */

(function () {
    'use strict';

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

            requestAnimationFrame(() => {
                track.style.transform = `translateX(-${current * 100}%)`;
            });

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
       FACEBOOK IFRAME — RESPONSIVE WIDTH
       ResizeObserver watches the wrapper and rebuilds
       the iframe src with the exact container pixel width
       so Facebook renders content edge-to-edge always.
       ============================================= */
    function initFbResponsive() {
        const wrapper = document.querySelector('.fb-embed-wrapper');
        if (!wrapper) return;

        const BASE_URL = 'https://www.facebook.com/plugins/page.php'
            + '?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61567145293560'
            + '&tabs=timeline'
            + '&small_header=false'
            + '&adapt_container_width=true'
            + '&hide_cover=false'
            + '&show_facepile=true';

        function rebuildIframe(width) {
            // FB minimum is 180px, maximum is 500px
            const fbWidth = Math.min(500, Math.max(180, Math.floor(width)));
            const fbHeight = 600;

            // Remove old iframe if present
            const old = wrapper.querySelector('iframe');
            if (old) old.remove();

            const iframe = document.createElement('iframe');
            iframe.src = BASE_URL + '&width=' + fbWidth + '&height=' + fbHeight;
            iframe.width = '100%';
            iframe.height = fbHeight;
            iframe.style.cssText = 'border:none;overflow:hidden;width:100%;display:block;';
            iframe.scrolling = 'no';
            iframe.frameBorder = '0';
            iframe.allow = 'encrypted-media';
            iframe.loading = 'lazy';
            iframe.title = 'Inpand Technologies Facebook';

            wrapper.appendChild(iframe);
        }

        if ('ResizeObserver' in window) {
            let lastWidth = 0;
            const ro = new ResizeObserver(function (entries) {
                const w = Math.floor(entries[0].contentRect.width);
                if (w > 0 && w !== lastWidth) {
                    lastWidth = w;
                    rebuildIframe(w);
                }
            });
            ro.observe(wrapper);
        } else {
            // Fallback for older browsers — just use wrapper width once
            rebuildIframe(wrapper.offsetWidth || 500);
        }
    }

    /* =============================================
       INIT ALL
       ============================================= */
    function init() {
        initScrollAnimations();
        initPortfolioFilter();
        initTestimonialCarousel();
        initFbResponsive();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();