// ================= LOAD COMPONENT =================
async function loadComponent(id, file) {
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error("Component not found");

        const data = await res.text();
        document.getElementById(id).innerHTML = data;
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
}

// ================= INIT NAVBAR =================
function initNavbar() {

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");
    const overlay = document.querySelector(".nav-overlay");

    if (!toggle || !menu) return;

    // TOGGLE MENU
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();

        const isActive = menu.classList.toggle("active");

        if (overlay) overlay.classList.toggle("active");

        document.body.style.overflow = isActive ? "hidden" : "auto";

        toggle.innerHTML = isActive
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // CLOSE ON OVERLAY
    if (overlay) {
        overlay.addEventListener("click", () => {
            menu.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "auto";
            toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    }

    // CLOSE ON LINK CLICK
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 991) {
                menu.classList.remove("active");
                if (overlay) overlay.classList.remove("active");
                document.body.style.overflow = "auto";
                toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    });

    // ACTIVE LINK
    const links = document.querySelectorAll(".nav-menu a");

    links.forEach(link => {
        link.addEventListener("click", function () {
            links.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // STICKY NAVBAR
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".header-wrapper");
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    });
}

// ================= INIT EVERYTHING =================
document.addEventListener("DOMContentLoaded", () => {

    // ✅ LOAD NAVBAR + INIT AFTER LOAD
    loadComponent("navbar", "../components/navbar.html").then(() => {
        initNavbar();
    });

    // ✅ LOAD FOOTER
    loadComponent("footer", "../components/footer.html");

});

// ================= SERVICES SLIDER =================
if (document.querySelector(".services-slider")) {
    new Swiper(".services-slider", {
        loop: true,
        spaceBetween: 20,
        speed: 800,
        centeredSlides: false,

        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },

        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
                autoplay: false
            }
        }
    });
}

document.querySelectorAll(".faq-head").forEach(head => {
    head.addEventListener("click", () => {
        const item = head.parentElement;

        document.querySelectorAll(".faq-item").forEach(el => {
            if (el !== item) el.classList.remove("active");
        });

        item.classList.toggle("active");
    });
});

// ================= ANIMATION OBSERVER (COMMON) =================
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
        }
    });
});

// ================= HERO ANIMATION =================
document.querySelectorAll(
    ".hero-badge, .hero-content h1, .hero-content p, .hero-btn"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});

// ================= ABOUT ANIMATION =================
document.querySelectorAll(
    ".img-main, .img-small, .about-badge, .sub-title, .about-content h2, .highlight-text, .about-content p, .feature, .about-list li, .progress-box, .about-btn"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});

// ================= STATS COUNTER =================
function animateCounter(el) {
    const target = +el.getAttribute("data-target");
    let count = 0;

    const suffix = el.textContent.replace(/[0-9]/g, ''); // M+, K+, X

    const update = () => {
        const increment = target / 60;

        if (count < target) {
            count += increment;
            el.textContent = Math.floor(count) + suffix;
            requestAnimationFrame(update);
        } else {
            el.textContent = target + suffix;
        }
    };

    update();
}

// ================= OBSERVER FOR STATS =================
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            entry.target.querySelectorAll(".counter").forEach(counter => {
                animateCounter(counter);
            });

            observer.unobserve(entry.target); // run once
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
    statsObserver.observe(statsSection);
}


document.querySelectorAll(
    ".section-badge, .seo-approach-section h2, .seo-left .seo-box, .seo-right .seo-box, .circle, .seo-description"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});

// SERVICES ANIMATION
document.querySelectorAll(
    ".services-header, .view-all, .service-item, .services-image img"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});

// SEO AUDIT ANIMATION
document.querySelectorAll(
    ".seo-header h2, .seo-header .sub, .seo-header .desc, .seo-audit-section .seo-box"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});

// INTEGRATION ANIMATION
document.querySelectorAll(
    ".integration-content .badge, .integration-content h2, .integration-content p, .integration-btn, .integration-circle"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});

// VALUE SECTION ANIMATION
document.querySelectorAll(
    ".value-content .badge, .value-content h2, .value-content > p, .value-item, .value-card, .stat-box"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});
// FAQ ANIMATION
document.querySelectorAll(
    ".faq-image img, .faq-content .badge, .faq-content h2, .faq-item"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});

// CTA ANIMATION
document.querySelectorAll(
    ".cta-box, .cta-content h2, .cta-content p, .cta-btn"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});
// ================= SCROLL TO TOP =================
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = "flex";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// ================= WHO SECTION ANIMATION =================
document.querySelectorAll(
    ".who-image img, .who-card, .section-badge, .who-content h2, .who-content p, .who-item, .who-btn"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});
// ================= JOURNEY ANIMATION =================
document.querySelectorAll(
    ".journey-badge, .journey-header h2, .journey-header p, .journey-card"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});

// ================= APPROACH ANIMATION =================
document.querySelectorAll(
    ".approach-badge, .approach-header h2, .approach-header p, .approach-card"
).forEach(el => {
    el.style.animationPlayState = "paused";
    animationObserver.observe(el);
});

// ================= CONTACT HEADER ANIMATION =================
function initContactHeaderAnimation() {

    const section = document.querySelector(".contact-header-hero");

    if (!section) return;

    // enable animation safely
    section.classList.add("animate-init");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}

document.addEventListener("DOMContentLoaded", initContactHeaderAnimation);

// ================= CONTACT BOX ANIMATION =================
const contactBoxes = document.querySelectorAll(".contact-box");

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

contactBoxes.forEach(box => {
    contactObserver.observe(box);
});

// ================= CONTACT SECTION ANIMATION =================
function initContactSectionAnimation() {

    const section = document.querySelector(".contact-form-section");

    if (!section) return;

    // enable animation safely
    section.classList.add("animate-init");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("contact-show");
            }
        });
    }, { threshold: 0.2 });

    observer.observe(section);
}

document.addEventListener("DOMContentLoaded", initContactSectionAnimation);

// ================= WHY CONTACT ANIMATION =================
function initWhyContactAnimation() {

    const section = document.querySelector(".why-contact-section");

    if (!section) return;

    section.classList.add("animate-init");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.2 });

    observer.observe(section);
}

document.addEventListener("DOMContentLoaded", initWhyContactAnimation);

// ================= PROCESS SECTION ANIMATION =================
function initProcessAnimation() {

    const section = document.querySelector(".process-section");

    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    observer.observe(section);
}

document.addEventListener("DOMContentLoaded", initProcessAnimation);



// ================= FAQ TOGGLE =================
document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;

        item.classList.toggle("active");
    });
});

// ================= FAQ ANIMATION =================
const faqSection = document.querySelector(".contact-faq-section");

const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.2 });

faqObserver.observe(faqSection);

// ================= SERVICE HERO ANIMATION =================
const serviceHero = document.querySelector(".service-header-hero");

if (serviceHero) {

    // ADD INIT CLASS (VERY IMPORTANT)
    serviceHero.classList.add("animate-init");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.2 });

    observer.observe(serviceHero);
}


// ================= SERVICES ANIMATION =================
const servicesSection = document.querySelector(".services-list-section");

if (servicesSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.2 });

    observer.observe(servicesSection);
}

// ================= VISION MISSION ANIMATION =================
const vmSection = document.querySelector(".vision-mission-section");

if (vmSection) {

    // INIT CLASS (VERY IMPORTANT)
    vmSection.classList.add("animate-init");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.2 });

    observer.observe(vmSection);
}

// ================= FAQ =================
document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {

        // close others
        document.querySelectorAll(".faq-item").forEach(i => {
            if(i !== item){
                i.classList.remove("active");
                i.querySelector(".icon").innerHTML = "+";
            }
        });

        // toggle current
        item.classList.toggle("active");

        const icon = item.querySelector(".icon");
        icon.innerHTML = item.classList.contains("active") ? "−" : "+";

    });
});

// ================= CASE HEADER ANIMATION =================
const caseHero = document.querySelector(".case-header-hero");

if (caseHero) {

    caseHero.classList.add("animate-init");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.2 });

    observer.observe(caseHero);
}

