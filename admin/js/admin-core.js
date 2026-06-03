/* math-science-yjr/admin/js/admin-core.js */
import { checkAdminSession, adminLogout } from '../../firebase/firebase-config.js';

if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", initAdminCore); } else { initAdminCore(); }

function initAdminCore() {
  // Check session
  checkAdminSession((user) => {
    // If not on login page and not logged in, redirect
    const path = window.location.pathname;
    const isLoginPage = path.includes("login.html");

    if (!user && !isLoginPage) {
      window.location.href = "login.html";
      return;
    }

    if (user && isLoginPage) {
      window.location.href = "index.html";
      return;
    }

    if (user) {
      setupAdminLayout(user);
    }
  });
}

function setupAdminLayout(user) {
  // Inject Sidebar if container exists
  const sidebarContainer = document.getElementById("admin-sidebar-container");
  if (sidebarContainer) {
    sidebarContainer.outerHTML = `
      <aside class="admin-sidebar">
        <div class="sidebar-header">
          <a href="index.html" class="sidebar-logo">YJR <span>CMS Panel</span></a>
        </div>
        <ul class="sidebar-menu">
          <li class="sidebar-item" id="menu-dash"><a href="index.html">📊 Dashboard</a></li>
          <li class="sidebar-item" id="menu-settings"><a href="settings.html">⚙️ Global Settings</a></li>
          <li class="sidebar-item" id="menu-home"><a href="homepage.html">🏠 Home Control</a></li>
          <li class="sidebar-item" id="menu-courses"><a href="courses.html">📚 Course Manager</a></li>
          <li class="sidebar-item" id="menu-results"><a href="results.html">🏆 Result Manager</a></li>
          <li class="sidebar-item" id="menu-gallery"><a href="gallery.html">🖼️ Gallery Manager</a></li>
          <li class="sidebar-item" id="menu-testi"><a href="testimonials.html">💬 Review Manager</a></li>
          <li class="sidebar-item" id="menu-notices"><a href="announcements.html">📌 Notice Board</a></li>
          <li class="sidebar-item" id="menu-forms"><a href="forms.html">📝 Form Builder & Leads</a></li>
          <li class="sidebar-item" id="menu-media"><a href="media.html">📁 Media Library</a></li>
        </ul>
        <div class="sidebar-footer">
          <button class="logout-btn" id="admin-logout-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            Sign Out
          </button>
        </div>
      </aside>
    `;

    // Highlight Menu Item
    highlightAdminMenu();

    // Bind Logout
    const logoutBtn = document.getElementById("admin-logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to log out of the YJR CMS Console?")) {
          await adminLogout();
          window.location.href = "login.html";
        }
      });
    }
  }

  // Inject Header if container exists
  const headerContainer = document.getElementById("admin-header-container");
  if (headerContainer) {
    const pageName = getPageName();
    const userInitial = user.email ? user.email.charAt(0).toUpperCase() : "A";

    headerContainer.outerHTML = `
      <header class="admin-header">
        <div style="display:flex; align-items:center; gap:1rem;">
          <button class="menu-toggle" id="admin-menu-toggle" style="display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px;">
            <span style="display:block; width:22px; height:2px; background-color:#fff; border-radius:2px;"></span>
            <span style="display:block; width:22px; height:2px; background-color:#fff; border-radius:2px;"></span>
            <span style="display:block; width:22px; height:2px; background-color:#fff; border-radius:2px;"></span>
          </button>
          <div class="admin-title">
            <h1>${pageName}</h1>
          </div>
        </div>
        <div class="admin-user">
          <span style="font-size:0.9rem; color:#94a3b8;">${user.email || 'admin@yjr.com'}</span>
          <div class="admin-avatar">${userInitial}</div>
        </div>
      </header>
    `;

    // Bind sidebar drawer toggling on mobile viewports
    const adminToggle = document.getElementById("admin-menu-toggle");
    const adminSidebar = document.querySelector(".admin-sidebar");
    if (adminToggle && adminSidebar) {
      adminToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        adminSidebar.classList.toggle("active");
        adminToggle.classList.toggle("active");
      });
      document.addEventListener("click", (e) => {
        if (!adminSidebar.contains(e.target) && !adminToggle.contains(e.target)) {
          adminSidebar.classList.remove("active");
          adminToggle.classList.remove("active");
        }
      });
    }
  }
}

function highlightAdminMenu() {
  const path = window.location.pathname;
  let menuId = "menu-dash";

  if (path.includes("settings.html")) menuId = "menu-settings";
  else if (path.includes("homepage.html")) menuId = "menu-home";
  else if (path.includes("courses.html")) menuId = "menu-courses";
  else if (path.includes("results.html")) menuId = "menu-results";
  else if (path.includes("gallery.html")) menuId = "menu-gallery";
  else if (path.includes("testimonials.html")) menuId = "menu-testi";
  else if (path.includes("announcements.html")) menuId = "menu-notices";
  else if (path.includes("forms.html")) menuId = "menu-forms";
  else if (path.includes("media.html")) menuId = "menu-media";

  const el = document.getElementById(menuId);
  if (el) el.classList.add("active");
}

function getPageName() {
  const path = window.location.pathname;
  if (path.includes("settings.html")) return "Global Settings Configuration";
  if (path.includes("homepage.html")) return "Homepage CMS Manager";
  if (path.includes("courses.html")) return "Courses Catalog Manager";
  if (path.includes("results.html")) return "Wall of Fame Result Manager";
  if (path.includes("gallery.html")) return "Visual Gallery & Albums Manager";
  if (path.includes("testimonials.html")) return "Testimonial Reviews Manager";
  if (path.includes("announcements.html")) return "Notice Board Manager";
  if (path.includes("forms.html")) return "Dynamic Form Builder & Lead Center";
  if (path.includes("media.html")) return "Central Media Library";
  return "System Dashboard Overview";
}
