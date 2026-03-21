/**
 * INPAND TECHNOLOGIES — common.js
 * Injects shared header + footer into every page,
 * then wires up: preloader, nav toggle, sticky header, back-to-top.
 */
(function () {
  'use strict';

  /* ── helpers ── */
  var currentPage = window.location.pathname.split('/').pop() || 'home.html';

  var NAV_LINKS = [
    { href: 'home.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'services.html', label: 'Our Services' },
    { href: 'tools.html', label: 'Our Tools' },
    { href: 'blog.html', label: 'Our Blog' },
    { href: 'contact.html', label: 'Contact' },
  ];

  /* =============================================
     HEADER HTML
     ============================================= */
  function buildHeader() {
    var items = NAV_LINKS.map(function (l) {
      var active = currentPage === l.href ? ' class="active"' : '';
      return '<li><a href="' + l.href + '"' + active + '>' + l.label + '</a></li>';
    }).join('');

    return '\
<!-- PRELOADER -->\
<div class="preloader" id="preloader">\
  <div class="preloader-inner">\
    <div class="bounce b1"></div>\
    <div class="bounce b2"></div>\
    <div class="bounce b3"></div>\
  </div>\
</div>\
<!-- MOBILE NAV OVERLAY -->\
<div class="mobile-nav-overlay" id="mobile-nav-overlay" aria-hidden="true">\
  <div class="mobile-nav-header">\
    <a href="home.html" class="mobile-nav-logo">\
      <img src="https://inpand.com/wp-content/uploads/2025/05/cropped-final-1-300x144.png" alt="Inpand Technologies" />\
    </a>\
    <button class="mobile-nav-close" id="mobile-nav-close" aria-label="Close navigation">&times;</button>\
  </div>\
  <nav class="mobile-nav-links">\
    <ul>' + items + '</ul>\
  </nav>\
</div>\
<!-- HEADER -->\
<header class="site-header" id="site-header">\
  <div class="header-inner">\
    <a href="home.html" class="logo">\
      <img src="https://inpand.com/wp-content/uploads/2025/05/cropped-final-1-300x144.png" alt="Inpand Technologies" />\
    </a>\
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">\
      <span></span><span></span><span></span>\
    </button>\
    <nav class="site-nav" id="site-nav">\
      <ul>' + items + '</ul>\
    </nav>\
  </div>\
</header>';
  }

  /* =============================================
     FOOTER HTML
     ============================================= */
  function buildFooter() {
    var socialSVGs = {
      facebook: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>',
      linkedin: '<svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>',
      instagram: '<svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>',
      youtube: '<svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>',
    };

    return '\
<footer class="site-footer">\
  <div class="footer-main">\
    <div class="container">\
      <div class="footer-grid">\
        <div class="footer-brand">\
          <a href="home.html"><img src="https://inpand.com/wp-content/uploads/2025/05/cropped-final-1.png" alt="Inpand Technologies" /></a>\
          <p>We are a forward-thinking tech company delivering innovative solutions for business success. From web design to digital marketing, we offer full-service support backed by 24/7 customer care.</p>\
        </div>\
        <div class="footer-links">\
          <h3>Quick Links</h3>\
          <ul>\
            <li><a href="home.html">Home</a></li>\
            <li><a href="about.html">About</a></li>\
            <li><a href="services.html">Service</a></li>\
            <li><a href="blog.html">Blog</a></li>\
            <li><a href="contact.html">Contact</a></li>\
          </ul>\
        </div>\
        <div class="footer-contact">\
          <h3>Contact Info</h3>\
          <p class="contact-phone">6382016500 / 9080394828</p>\
          <p class="contact-email">info@inpand.com</p>\
          <div class="social-icons">\
            <a href="https://www.facebook.com/share/1FwJ7k5xwx/" target="_blank" rel="noopener" aria-label="Facebook">' + socialSVGs.facebook + '</a>\
            <a href="https://www.linkedin.com/company/inpand-technologies/" target="_blank" rel="noopener" aria-label="LinkedIn">' + socialSVGs.linkedin + '</a>\
            <a href="https://www.instagram.com/inpand_technologies" target="_blank" rel="noopener" aria-label="Instagram">' + socialSVGs.instagram + '</a>\
            <a href="https://www.youtube.com/@inpandtechnologies" target="_blank" rel="noopener" aria-label="YouTube">' + socialSVGs.youtube + '</a>\
          </div>\
        </div>\
        <div class="footer-map">\
          <h3>Location</h3>\
          <div class="map-embed">\
            <iframe loading="lazy" src="https://maps.google.com/maps?q=Inpand%20Technologies%2C%20MRC%20Complex%2C%20Karur%20Main%20Road%2C%20opposite%20to%20Pandiyan%20Hotel%2C%20Gujiliamparai%2C%20Tamil%20Nadu%20624703&t=m&z=10&output=embed&iwloc=near" title="Inpand Technologies Location" aria-label="Inpand Technologies Location Map"></iframe>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>\
  <div class="footer-addresses">\
    <div class="container">\
      <h3 class="addresses-heading">Office Address</h3>\
      <div class="addresses-grid">\
        <div class="address-card"><h4>📍 Head Office</h4><p>MRC Complex,<br>Guziliamparai,<br>Dindigul - 624703</p></div>\
        <div class="address-card"><h4>📍 Branch Office</h4><p>8/A, S.S. Towers,<br>5th Cross Spencer\'s Compound,<br>Near Kurinji Lodge<br>Dindigul - 624001</p></div>\
      </div>\
    </div>\
  </div>\
  <div class="footer-bottom">\
    <div class="container">\
      <hr class="footer-divider" />\
      <p><a href="home.html">Copyright &copy; 2025 Inpand Technologies</a></p>\
    </div>\
  </div>\
</footer>\
<!-- WHATSAPP FLOAT -->\
<a href="https://wa.me/919080394828" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">\
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />\
</a>\
<!-- BACK TO TOP -->\
<button class="back-to-top" id="back-to-top" aria-label="Back to top">&#8679;</button>';
  }

  /* =============================================
     INJECT
     ============================================= */
  function inject() {
    var headerEl = document.getElementById('site-header-placeholder');
    var footerEl = document.getElementById('site-footer-placeholder');
    if (headerEl) headerEl.outerHTML = buildHeader();
    if (footerEl) footerEl.outerHTML = buildFooter();
  }

  /* =============================================
     BEHAVIOURS
     ============================================= */
  function initPreloader() {
    var el = document.getElementById('preloader');
    if (!el) return;
    var hide = function () { setTimeout(function () { el.classList.add('hidden'); }, 400); };
    if (document.readyState === 'complete') { hide(); } else { window.addEventListener('load', hide); }
    setTimeout(function () { el.classList.add('hidden'); }, 5000);
  }

  function initNavToggle() {
    var toggle = document.getElementById('nav-toggle');
    var overlay = document.getElementById('mobile-nav-overlay');
    var closeBtn = document.getElementById('mobile-nav-close');
    if (!toggle || !overlay) return;

    function openMenu() {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      overlay.classList.contains('open') ? closeMenu() : openMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }


  function initStickyHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.12)'
        : '0 2px 12px rgba(0,0,0,0.07)';
    }, { passive: true });
  }

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

  /* =============================================
     BOOT
     ============================================= */
  function init() {
    inject();
    initPreloader();
    initNavToggle();
    initStickyHeader();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
