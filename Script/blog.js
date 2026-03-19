// Mobile nav
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// Back to top
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Reveal animation
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Testimonial slider
const testimonialCards = document.querySelectorAll(".testimonial-card");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");
const sliderDots = document.getElementById("sliderDots");

let currentSlide = 0;
let autoSlide;

function renderDots() {
    if (!sliderDots) return;

    sliderDots.innerHTML = "";
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = "slider-dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);

        if (index === currentSlide) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            goToSlide(index);
            restartAutoSlide();
        });

        sliderDots.appendChild(dot);
    });
}

function showSlide(index) {
    testimonialCards.forEach((card, cardIndex) => {
        card.classList.toggle("active", cardIndex === index);
    });

    const dots = sliderDots ? sliderDots.querySelectorAll(".slider-dot") : [];
    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === index);
    });
}

function goToSlide(index) {
    if (!testimonialCards.length) return;
    currentSlide = (index + testimonialCards.length) % testimonialCards.length;
    showSlide(currentSlide);
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoSlide() {
    if (testimonialCards.length <= 1) return;
    autoSlide = setInterval(nextSlide, 5000);
}

function restartAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

if (testimonialCards.length) {
    renderDots();
    showSlide(currentSlide);
    startAutoSlide();

    if (nextSlideBtn) {
        nextSlideBtn.addEventListener("click", () => {
            nextSlide();
            restartAutoSlide();
        });
    }

    if (prevSlideBtn) {
        prevSlideBtn.addEventListener("click", () => {
            prevSlide();
            restartAutoSlide();
        });
    }
}