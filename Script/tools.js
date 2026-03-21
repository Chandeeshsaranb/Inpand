document.addEventListener("DOMContentLoaded", () => {
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
});