// ================= LOAD COMPONENT =================
async function loadComponent(id, file) {
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to load ${file}`);

        const data = await res.text();
        const element = document.getElementById(id);

        if (element) {
            element.innerHTML = data;
        }

        return true;

    } catch (error) {
        console.error(`❌ Error loading ${file}:`, error);
        return false;
    }
}


// ================= AUTO PATH FIX (WORKS EVERYWHERE) =================
function getBasePath() {

    const path = window.location.pathname;

    if (path.includes("/services/")) return "../../";
    if (path.includes("/about/")) return "../";
    if (path.includes("/contact/")) return "../";
    if (path.includes("/case-studies/")) return "../";

    return "./"; // root
}

function getComponentPath(fileName) {
    return getBasePath() + "components/" + fileName;
}


// ================= INIT NAVBAR =================
function initNavbar() {

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");
    const overlay = document.querySelector(".nav-overlay");

    if (!toggle || !menu) return;

    // MENU TOGGLE
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();

        const isActive = menu.classList.toggle("active");

        if (overlay) overlay.classList.toggle("active");

        document.body.style.overflow = isActive ? "hidden" : "auto";

        toggle.innerHTML = isActive
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // CLOSE ON LINK CLICK (MOBILE)
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 991) {
                menu.classList.remove("active");
                document.body.style.overflow = "auto";
                toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    });

  // ================= AUTO ACTIVE MENU (FIXED) =================
const currentPath = window.location.pathname.replace(/\/$/, "");

document.querySelectorAll(".nav-menu a").forEach(link => {

    let href = link.getAttribute("href");

    // Normalize href
    href = href.replace("/index.html", "").replace(/\/$/, "");

    // Special case for HOME
    if (href === "" || href === "/") {
        if (currentPath === "" || currentPath === "/" || currentPath === "/index.html") {
            link.classList.add("active");
        }
    } 
    // Match exact section pages
    else if (currentPath.startsWith(href)) {
        link.classList.add("active");
    }

});

    // ================= STICKY NAVBAR =================
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".header-wrapper");
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    });
}


// ================= INIT EVERYTHING =================
document.addEventListener("DOMContentLoaded", async () => {

    const navbarPath = getComponentPath("navbar.html");
    const footerPath = getComponentPath("footer.html");

    // LOAD NAVBAR
    const navLoaded = await loadComponent("navbar", navbarPath);

    if (navLoaded) {
        initNavbar();
    }

    // LOAD FOOTER
    loadComponent("footer", footerPath);

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


document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
        q.parentElement.classList.toggle("active");
    });
});

const boxes = document.querySelectorAll('.contact-box');

window.addEventListener('scroll', () => {
    boxes.forEach(box => {
        const top = box.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            box.classList.add('show');
        }
    });
});

const contactSection = document.querySelector('.contact-form-section');

window.addEventListener('scroll', () => {
    const top = contactSection.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
        contactSection.classList.add('contact-show');
    }
});

const whySection = document.querySelector('.why-contact-section');

window.addEventListener('scroll', () => {
    const top = whySection.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
        whySection.classList.add('animate-init');
        whySection.classList.add('active');
    }
});

const processSection = document.querySelector('.process-section');

window.addEventListener('scroll', () => {
    const top = processSection.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
        processSection.classList.add('show');
    }
});


