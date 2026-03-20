document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        if (preloader) {
            preloader.classList.add("hidden");
            setTimeout(() => {
                preloader.style.display = "none";
            }, 450);
        }
    });

    // Mobile nav
    const navToggle = document.getElementById("nav-toggle");
    const siteNav = document.getElementById("site-nav");

    if (navToggle && siteNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = siteNav.classList.toggle("open");
            navToggle.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        siteNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                siteNav.classList.remove("open");
                navToggle.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", (e) => {
            if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
                siteNav.classList.remove("open");
                navToggle.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // Reveal animations
    const animatedItems = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    );

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    animatedItems.forEach((item) => observer.observe(item));

    // Back to top
    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {
        window.addEventListener(
            "scroll",
            () => {
                backToTop.classList.toggle("visible", window.scrollY > 300);
            },
            { passive: true }
        );

        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});