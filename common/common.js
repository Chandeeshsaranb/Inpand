(function () {
    'use strict';

    /* =============================================
       HEADER HTML
       ============================================= */
    function getHeaderHTML() {
        var currentPage = window.location.pathname.split('/').pop() || 'home.html';

        var navLinks = [
            { href: 'home.html', label: 'Home' },
            { href: 'about.html', label: 'About' },
            { href: 'services.html', label: 'Our Services' },
            { href: 'tools.html', label: 'Our Tools' },
            { href: 'blog.html', label: 'Our Blog' },
            { href: 'contact.html', label: 'Contact' },
        ];

        var navItems = navLinks.map(function (link) {
            var isActive = currentPage === link.href ? ' class="active"' : '';
            return '<li><a href="' + link.href + '"' + isActive + '>' + link.label + '</a></li>';
        }).join('');

        return `
        <!-- ======== PRELOADER ======== -->
        <div class="preloader" id="preloader">
            <div class="preloader-inner">
                <div class="bounce b1"></div>
                <div class="bounce b2"></div>
                <div class="bounce b3"></div>
            </div>
        </div>

        <!-- ======== HEADER / NAV ======== -->
        <header class="site-header" id="site-header">
            <div class="header-inner">
                <a href="home.html" class="logo">
                    <img src="https://inpand.com/wp-content/uploads/2025/05/cropped-final-1-300x144.png"
                        alt="Inpand Technologies" />
                </a>
                <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                <nav class="site-nav" id="site-nav">
                    <ul>${navItems}</ul>
                </nav>
            </div>
        </header>`;
    }

    /* =============================================
       FOOTER HTML
       ============================================= */
    function getFooterHTML() {
        return `
        <footer class="site-footer">
            <div class="footer-inner">
                <div class="footer-logo">
                    <img src="https://inpand.com/wp-content/uploads/2025/05/cropped-final-1-300x144.png"
                        alt="Inpand Technologies" />
                </div>
                <p class="footer-copy">&copy; ${new Date().getFullYear()} Inpand Technologies. All rights reserved.</p>
            </div>
        </footer>`;
    }

    /* =============================================
       INJECT HEADER & FOOTER
       ============================================= */
    function loadHeader() {
        var el = document.getElementById('header');
        if (el) el.innerHTML = getHeaderHTML();
    }

    function loadFooter() {
        var el = document.getElementById('footer');
        if (el) el.innerHTML = getFooterHTML();
    }

    /* =============================================
       BEHAVIOURS
       ============================================= */
    function initPreloader() {
        var preloader = document.getElementById('preloader');
        if (!preloader) return;

        var hide = function () {
            setTimeout(function () {
                preloader.classList.add('hidden');
            }, 400);
        };

        if (document.readyState === 'complete') {
            hide();
        } else {
            window.addEventListener('load', hide);
        }

        setTimeout(function () { preloader.classList.add('hidden'); }, 5000);
    }

    function initNavToggle() {
        var toggle = document.getElementById('nav-toggle');
        var nav = document.getElementById('site-nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
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

    function initStickyHeader() {
        var header = document.getElementById('site-header');
        if (!header) return;

        window.addEventListener('scroll', function () {
            header.style.boxShadow = window.scrollY > 10
                ? '0 2px 20px rgba(0,0,0,0.12)'
                : '0 2px 12px rgba(0,0,0,0.07)';
        }, { passive: true });
    }

    /* =============================================
       BOOTSTRAP
       ============================================= */
    function init() {
        loadHeader();
        loadFooter();
        initPreloader();
        initNavToggle();
        initStickyHeader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();