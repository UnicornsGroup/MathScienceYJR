/* math-science-yjr/assets/js/main.js */
import { getDocument } from '../../firebase/firebase-config.js';

// Calculate relative prefix depth based on active document location
let prefix = './';
const pathname = window.location.pathname.toLowerCase();
if (pathname.includes('/pages/') || pathname.includes('/admin/')) {
  prefix = '../';
}

if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", initApp); } else { initApp(); }

async function initApp() {
  // Hide loader
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 300);
  }

  // Fetch Global settings to load custom header info or title overrides
  let globalSettings = null;
  try {
    globalSettings = await getDocument("settings", "global");
  } catch (err) {
    console.error("Failed to load settings: ", err);
  }

  // Load UI components
  injectHeader(globalSettings);
  injectFooter(globalSettings);
  injectWhatsApp(globalSettings);

  // Setup theme engine (Light/Dark mode)
  initThemeEngine();

  // Setup Scroll Effects
  initScrollEffects();

  // Setup Reveal Animations
  initRevealAnimations();
}

// 1. Dynamic Header Injection with Mega Menu
function injectHeader(settings) {
  const headerContainer = document.getElementById("global-header");
  if (!headerContainer) return;

  const instName = settings?.instituteName || "MathScienceYJR";
  const logoUrl = settings?.logoUrl || "";

  headerContainer.outerHTML = `
    <header class="main-header" id="main-header">
      <div class="nav-container container">
        <div class="logo">
          <a href="${prefix}index.html">
            ${logoUrl ? `<img src="${logoUrl}" alt="${instName}">` : ""}
            <span>${instName}</span>
          </a>
        </div>
        <nav>
          <ul class="nav-links">
            <li class="nav-item"><a href="${prefix}index.html" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="${prefix}pages/about.html" class="nav-link">About</a></li>
            <li class="nav-item">
              <a href="${prefix}pages/courses.html" class="nav-link">
                Courses 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </a>
              <div class="mega-menu">
                <div>
                  <h4 class="mega-title">Elite Programs</h4>
                  <ul class="mega-links">
                    <li>
                      <a href="${prefix}pages/courses.html" class="mega-link">
                        <h4>Olympiad Mathematics</h4>
                        <p>Advanced discrete math, algebra, calculus for RMO/INMO.</p>
                      </a>
                    </li>
                    <li>
                      <a href="${prefix}pages/courses.html" class="mega-link">
                        <h4>JEE & NEET Physics</h4>
                        <p>Rigorous physics concepts and test preparation.</p>
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="mega-title">Foundations</h4>
                  <ul class="mega-links">
                    <li>
                      <a href="${prefix}pages/courses.html" class="mega-link">
                        <h4>High School STEM</h4>
                        <p>Building deep visual foundations in science & math.</p>
                      </a>
                    </li>
                    <li>
                      <a href="${prefix}pages/admission.html" class="mega-link">
                        <h4>Apply Online</h4>
                        <p>Submit your application and schedule a diagnostic test.</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="nav-item"><a href="${prefix}pages/results.html" class="nav-link">Results</a></li>
            <li class="nav-item"><a href="${prefix}pages/gallery.html" class="nav-link">Gallery</a></li>
            <li class="nav-item"><a href="${prefix}pages/testimonials.html" class="nav-link">Reviews</a></li>
            <li class="nav-item"><a href="${prefix}pages/announcements.html" class="nav-link">Notices</a></li>
            <li class="nav-item"><a href="${prefix}pages/contact.html" class="nav-link">Contact</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle Theme">
            <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          </button>
          <a href="${prefix}pages/admission.html" class="btn btn-primary header-admission-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Admission</a>
          <button class="menu-toggle" id="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-sidebar" id="mobile-sidebar">
      <div class="logo" style="margin-bottom: 2rem;">
        <a href="${prefix}index.html" style="font-weight: 800; font-size: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
          ${logoUrl ? `<img src="${logoUrl}" alt="${instName}" style="max-height: 40px;">` : ""}
          <span>${instName}</span>
        </a>
      </div>
      <ul class="mobile-nav-links">
        <li><a href="${prefix}index.html" class="mobile-nav-link">Home</a></li>
        <li><a href="${prefix}pages/about.html" class="mobile-nav-link">About</a></li>
        <li><a href="${prefix}pages/courses.html" class="mobile-nav-link">Courses</a></li>
        <li><a href="${prefix}pages/results.html" class="mobile-nav-link">Results</a></li>
        <li><a href="${prefix}pages/gallery.html" class="mobile-nav-link">Gallery</a></li>
        <li><a href="${prefix}pages/testimonials.html" class="mobile-nav-link">Reviews</a></li>
        <li><a href="${prefix}pages/announcements.html" class="mobile-nav-link">Notices</a></li>
        <li><a href="${prefix}pages/contact.html" class="mobile-nav-link">Contact</a></li>
        <li style="margin-top: 1.5rem; list-style: none;">
          <a href="${prefix}pages/admission.html" class="btn btn-primary" style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 0.5rem; box-sizing: border-box;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Admission Open
          </a>
        </li>
      </ul>
    </div>
  `;

  // Bind Hamburger Toggle
  const toggleBtn = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("mobile-sidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("active");
      toggleBtn.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove("active");
        toggleBtn.classList.remove("active");
      }
    });
  }

  // Bind active route helper
  highlightActiveLink();
}

// Highlight current page active link
function highlightActiveLink() {
  const currentPath = window.location.pathname.toLowerCase();
  const links = document.querySelectorAll(".nav-link, .mobile-nav-link");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href) {
      const isHome = currentPath === '/' || currentPath.endsWith('/index.html');
      const hrefIsHome = href.endsWith('index.html');
      
      if ((isHome && hrefIsHome) || (!hrefIsHome && currentPath.endsWith(href.replace(/^\.\.\//, '').replace(/^\.\//, '')))) {
        link.parentElement.classList.add("active");
      }
    }
  });
}

// 2. Dynamic Footer Injection
function injectFooter(settings) {
  const footerContainer = document.getElementById("global-footer");
  if (!footerContainer) return;

  const instName = settings?.instituteName || "MathScienceYJR";
  const phone = settings?.contactNumber || "+91 98765 43210";
  const email = settings?.email || "admissions@mathscienceyjr.com";
  const address = settings?.address || "YJR Towers, Sector 62, Noida";
  const year = new Date().getFullYear();

  footerContainer.outerHTML = `
    <footer class="main-footer">
      <div class="container footer-top">
        <div class="footer-brand">
          <h3>${instName}</h3>
          <p>Nurturing future scientists, mathematicians, and leaders with premium conceptual teaching methodologies. Elevate your potential.</p>
          <div class="social-links">
            <a href="${settings?.socialMedia?.facebook || '#'}" class="social-link" target="_blank"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
            <a href="${settings?.socialMedia?.instagram || '#'}" class="social-link" target="_blank"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="${settings?.socialMedia?.youtube || '#'}" class="social-link" target="_blank"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163c-.272-1.016-1.07-1.815-2.085-2.087-1.84-.495-9.213-.495-9.213-.495s-7.373 0-9.213.495c-1.015.272-1.813 1.071-2.085 2.087-.496 1.84-.496 5.677-.496 5.677s0 3.837.496 5.677c.272 1.015 1.07 1.813 2.085 2.085 1.84.496 9.213.496 9.213.496s7.373 0 9.213-.496c1.015-.272 1.813-1.07 2.085-2.085.496-1.84.496-5.677.496-5.677s0-3.837-.496-5.677zm-13.882 9.046v-6.417l6.513 3.209-6.513 3.208z"/></svg></a>
          </div>
        </div>
        <div class="footer-links">
          <h4>Explore</h4>
          <ul class="footer-nav">
            <li><a href="${prefix}index.html">Home</a></li>
            <li><a href="${prefix}pages/about.html">About Us</a></li>
            <li><a href="${prefix}pages/courses.html">Dynamic Courses</a></li>
            <li><a href="${prefix}pages/results.html">Topper Showcase</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Utility</h4>
          <ul class="footer-nav">
            <li><a href="${prefix}pages/gallery.html">Photo Gallery</a></li>
            <li><a href="${prefix}pages/testimonials.html">Success Stories</a></li>
            <li><a href="${prefix}pages/announcements.html">Notice Board</a></li>
            <li><a href="${prefix}pages/admission.html">Apply for Admission</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Reach Us</h4>
          <ul class="footer-nav">
            <li style="color: #cbd5e1;">📞 ${phone}</li>
            <li style="color: #cbd5e1;">✉️ ${email}</li>
            <li style="color: #cbd5e1; line-height: 1.4;">📍 ${address}</li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; ${year} ${instName}. All rights reserved.</p>
        <p>Managed via <a href="${prefix}admin/index.html" style="color: var(--secondary)">YJR CMS</a> | Designed for STEM Success</p>
      </div>
    </footer>
  `;
}

// 3. WhatsApp Bubble Injector
function injectWhatsApp(settings) {
  const bubbleContainer = document.getElementById("global-whatsapp");
  if (!bubbleContainer) return;

  const number = settings?.whatsAppNumber || "919876543210";
  const name = settings?.instituteName || "MathScienceYJR";
  const message = encodeURIComponent(`Hello ${name}, I would like to inquire about courses and admissions.`);

  bubbleContainer.outerHTML = `
    <a href="https://wa.me/${number}?text=${message}" class="whatsapp-bubble" target="_blank" aria-label="Chat on WhatsApp" id="whatsapp-bubble">
      <svg viewBox="0 0 32 32">
        <path d="M16 2a13 13 0 0 0-11.27 19.51L3 29l7.74-2.5A13 13 0 1 0 16 2zm6.66 18.52c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.61.14s-.7 1-.86 1.09-.32.09-.59-.05a7.48 7.48 0 0 1-2.22-1.37 8.27 8.27 0 0 1-1.54-1.92c-.15-.27-.02-.42.12-.55.12-.12.27-.32.41-.48a1.76 1.76 0 0 0 .27-.45.51.51 0 0 0-.02-.48c-.05-.14-.61-1.48-.84-2-.22-.55-.44-.48-.61-.48h-.52a1 1 0 0 0-.74.34 3.09 3.09 0 0 0-1 2.27 5.37 5.37 0 0 0 1.13 2.87c.14.18 2.2 3.36 5.34 4.72.75.32 1.33.52 1.79.66a4.29 4.29 0 0 0 2-.13 3.28 3.28 0 0 0 2.15-1.52c.23-.46.23-.86.16-1.52s-.4-1.02-.67-1.16z"/>
      </svg>
    </a>
  `;
}

// 4. Light/Dark theme manager
function initThemeEngine() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  if (theme === "dark") {
    btn.innerHTML = `<svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  } else {
    btn.innerHTML = `<svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
  }
}

// 5. Navigation Scroll Effects
function initScrollEffects() {
  const header = document.getElementById("main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// 6. Reveal-on-scroll Intersection Observer
function initRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
}
