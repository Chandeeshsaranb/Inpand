/**
 * INPAND TECHNOLOGIES — blog.js
 * Handles: scroll reveal animations, FAQ accordion
 */

(function () {
    'use strict';

    /* =============================================
       REVEAL ANIMATION
       ============================================= */
    function initReveal() {
        const items = document.querySelectorAll('.reveal');
        if (!items.length) return;

        if (!('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.01 }
        );

        items.forEach(function (el) { observer.observe(el); });
    }

    /* =============================================
       FAQ ACCORDION
       ============================================= */
    function initFaq() {
        const items = document.querySelectorAll('.faq-item');
        if (!items.length) return;

        items.forEach(function (item) {
            const btn = item.querySelector('.faq-question');
            if (!btn) return;

            btn.addEventListener('click', function () {
                const isOpen = item.classList.contains('open');

                // Close all
                items.forEach(function (i) {
                    i.classList.remove('open');
                    const b = i.querySelector('.faq-question');
                    if (b) b.setAttribute('aria-expanded', 'false');
                });

                // Open clicked if it was closed
                if (!isOpen) {
                    item.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
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
            requestAnimationFrame(function () {
                track.style.transform = 'translateX(-' + (current * 100) + '%)';
            });
            updateDots();
        }

        function goNext() { goTo(current + 1); }

        function startAuto() { autoTimer = setInterval(goNext, 5000); }
        function resetAuto() { clearInterval(autoTimer); startAuto(); }

        let touchStartX = 0;
        track.parentElement.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        track.parentElement.addEventListener('touchend', function (e) {
            const dx = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(dx) > 40) { dx < 0 ? goNext() : goTo(current - 1); resetAuto(); }
        }, { passive: true });

        track.parentElement.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
        track.parentElement.addEventListener('mouseleave', startAuto);

        startAuto();
    }

    /* =============================================
       FACEBOOK IFRAME — RESPONSIVE WIDTH
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
            const fbWidth = Math.min(500, Math.max(180, Math.floor(width)));
            const old = wrapper.querySelector('iframe');
            if (old) old.remove();
            const iframe = document.createElement('iframe');
            iframe.src = BASE_URL + '&width=' + fbWidth + '&height=600';
            iframe.width = '100%';
            iframe.height = 600;
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
                if (w > 0 && w !== lastWidth) { lastWidth = w; rebuildIframe(w); }
            });
            ro.observe(wrapper);
        } else {
            rebuildIframe(wrapper.offsetWidth || 500);
        }
    }

    /* =============================================
       INIT ALL
       ============================================= */
    function init() {
        initReveal();
        initFaq();
        initTestimonialCarousel();
        initFbResponsive();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();