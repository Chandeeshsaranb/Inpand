/**
 * INPAND TECHNOLOGIES — contact.js
 * Handles: nav toggle, sticky header shadow, back-to-top,
 * form validation, and scroll reveal animations.
 */

(function () {
    'use strict';

    /* ==============================================
       MOBILE NAV TOGGLE
       ============================================== */
    function initNavToggle() {
        var toggle = document.getElementById('nav-toggle');
        var nav    = document.getElementById('site-nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close when any nav link is clicked
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

    /* ==============================================
       STICKY HEADER SHADOW
       ============================================== */
    function initStickyHeader() {
        var header = document.getElementById('site-header');
        if (!header) return;

        window.addEventListener('scroll', function () {
            header.style.boxShadow = window.scrollY > 10
                ? '0 2px 20px rgba(0,0,0,0.12)'
                : '0 2px 12px rgba(0,0,0,0.07)';
        }, { passive: true });
    }

    /* ==============================================
       BACK TO TOP
       ============================================== */
    function initBackToTop() {
        var btn = document.getElementById('back-to-top');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            btn.classList.toggle('visible', window.scrollY > 300);
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==============================================
       FORM VALIDATION
       ============================================== */
    function initContactForm() {
        var contactForm = document.getElementById('contactForm');
        var formStatus  = document.getElementById('formStatus');
        if (!contactForm) return;

        function setError(input, message) {
            var row       = input.closest('.form-row');
            var errorText = row ? row.querySelector('.error-text') : null;
            input.classList.add('is-error');
            if (errorText) errorText.textContent = message;
        }

        function clearError(input) {
            var row       = input.closest('.form-row');
            var errorText = row ? row.querySelector('.error-text') : null;
            input.classList.remove('is-error');
            if (errorText) errorText.textContent = '';
        }

        function isValidEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
        }

        function isValidPhone(value) {
            return /^[0-9+\s\-()]{8,20}$/.test(value.trim());
        }

        // Clear errors on input
        contactForm.querySelectorAll('input, textarea').forEach(function (input) {
            input.addEventListener('input', function () { clearError(input); });
        });

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            var name    = document.getElementById('name');
            var email   = document.getElementById('email');
            var website = document.getElementById('website');
            var phone   = document.getElementById('phone');
            var message = document.getElementById('message');

            var isValid = true;

            [name, email, phone, message].forEach(function (f) { clearError(f); });
            if (formStatus) formStatus.textContent = '';

            // Honeypot — silent bail if filled
            if (website && website.value.trim() !== '') return;

            if (!name.value.trim()) {
                setError(name, 'Name is required.');
                isValid = false;
            }

            if (!email.value.trim()) {
                setError(email, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                setError(email, 'Please enter a valid email address.');
                isValid = false;
            }

            if (!phone.value.trim()) {
                setError(phone, 'Phone number is required.');
                isValid = false;
            } else if (!isValidPhone(phone.value)) {
                setError(phone, 'Please enter a valid phone number.');
                isValid = false;
            }

            if (!isValid) {
                if (formStatus) formStatus.textContent = 'Please fix the highlighted fields.';
                return;
            }

            if (formStatus) {
                formStatus.textContent =
                    'Form is ready. Connect this form to your backend, Formspree, EmailJS, or any API endpoint for live submission.';
            }

            contactForm.reset();
        });
    }

    /* ==============================================
       SCROLL REVEAL ANIMATIONS
       ============================================== */
    function initReveal() {
        var items = document.querySelectorAll(
            '.contact-hero-inner, .section-heading, .info-card, ' +
            '.contact-form-wrap, .map-card, .footer-brand, ' +
            '.footer-links, .footer-contact, .footer-map, .address-card'
        );

        if (!items.length) return;

        items.forEach(function (el) { el.classList.add('reveal'); });

        if (!('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        items.forEach(function (el) { observer.observe(el); });
    }

    /* ==============================================
       INIT ALL
       ============================================== */
    function init() {
        initNavToggle();
        initStickyHeader();
        initBackToTop();
        initContactForm();
        initReveal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();