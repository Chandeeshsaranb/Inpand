// Mobile navigation
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

// Simple front-end validation
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function setError(input, message) {
    const row = input.closest(".form-row");
    const errorText = row ? row.querySelector(".error-text") : null;

    input.classList.add("is-error");
    if (errorText) errorText.textContent = message;
}

function clearError(input) {
    const row = input.closest(".form-row");
    const errorText = row ? row.querySelector(".error-text") : null;

    input.classList.remove("is-error");
    if (errorText) errorText.textContent = "";
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value) {
    return /^[0-9+\s\-()]{8,20}$/.test(value.trim());
}

if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
        input.addEventListener("input", () => clearError(input));
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const website = document.getElementById("website");
        const phone = document.getElementById("phone");
        const message = document.getElementById("message");

        let isValid = true;

        [name, email, phone, message].forEach((field) => clearError(field));
        if (formStatus) formStatus.textContent = "";

        // Honeypot
        if (website && website.value.trim() !== "") {
            return;
        }

        if (!name.value.trim()) {
            setError(name, "Name is required.");
            isValid = false;
        }

        if (!email.value.trim()) {
            setError(email, "Email is required.");
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            setError(email, "Please enter a valid email address.");
            isValid = false;
        }

        if (!phone.value.trim()) {
            setError(phone, "Phone number is required.");
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            setError(phone, "Please enter a valid phone number.");
            isValid = false;
        }

        if (!isValid) {
            if (formStatus) formStatus.textContent = "Please fix the highlighted fields.";
            return;
        }

        if (formStatus) {
            formStatus.textContent =
                "Form is ready. Connect this form to your backend, Formspree, EmailJS, or any API endpoint for live submission.";
        }

        contactForm.reset();
    });
}

// Reveal animation
const revealItems = document.querySelectorAll(
    ".contact-hero-inner, .section-heading, .info-card, .contact-form-wrap, .map-card, .footer-column, .address-card"
);

revealItems.forEach((item) => item.classList.add("reveal"));

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