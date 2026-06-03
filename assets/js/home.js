/* math-science-yjr/assets/js/home.js */
import { getDocument, getCollection } from '../../firebase/firebase-config.js';

if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", loadHomepageContent); } else { loadHomepageContent(); }

async function loadHomepageContent() {
  try {
    // 1. Fetch Homepage Layout Config
    const config = await getDocument("homepage", "config");
    if (config) {
      updateHeroSection(config.hero);
      reorderHomepageSections(config.sections);
    }

    // 2. Fetch and render module previews
    loadCoursesPreview();
    loadResultsPreview();
    loadTestimonialsPreview();
    loadGalleryPreview();
    loadAnnouncementsPreview();
  } catch (err) {
    console.error("Error drawing homepage CMS content: ", err);
  }
}

// Update Hero text and graphic
function updateHeroSection(hero) {
  if (!hero) return;
  const title = document.getElementById("hero-title");
  const desc = document.getElementById("hero-desc");
  const img = document.getElementById("hero-img");
  const cta = document.getElementById("hero-cta");

  if (title && hero.title) title.innerText = hero.title;
  if (desc && hero.description) desc.innerText = hero.description;
  if (img && hero.imageUrl) img.src = hero.imageUrl;
  if (cta && hero.ctaText) {
    cta.innerText = hero.ctaText;
    cta.href = hero.ctaLink || "/pages/admission.html";
  }
}

// Reorder section DOM nodes & toggle visibility
function reorderHomepageSections(sectionsList) {
  const wrapper = document.getElementById("homepage-sections-wrapper");
  if (!wrapper || !sectionsList || !Array.isArray(sectionsList)) return;

  // Sort list by order ascending
  const sorted = [...sectionsList].sort((a, b) => a.order - b.order);

  sorted.forEach(section => {
    const el = document.getElementById(`sec-${section.id}`);
    if (el) {
      if (section.enabled) {
        el.style.display = ""; // Restore default display
        wrapper.appendChild(el); // Appending existing node moves it to the bottom
      } else {
        el.style.display = "none";
      }
    }
  });
}

// 3. Load top 3 courses
async function loadCoursesPreview() {
  const container = document.getElementById("home-courses-grid");
  if (!container) return;

  try {
    const courses = await getCollection("courses");
    const activeCourses = courses.filter(c => c.visible).slice(0, 3);

    if (activeCourses.length === 0) {
      container.innerHTML = `<p class="text-muted text-center" style="grid-column: 1/-1;">No courses active at this time.</p>`;
      return;
    }

    container.innerHTML = '';
    activeCourses.forEach(course => {
      const card = document.createElement("div");
      card.className = "glass-card reveal active";
      card.innerHTML = `
        <img src="${course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600'}" alt="${course.title}">
        <div class="card-content">
          <span class="category-badge">${course.category}</span>
          <h3>${course.title}</h3>
          <p>${course.description.substring(0, 110)}...</p>
          <div class="card-footer">
            <span class="fees">${course.fees}</span>
            <a href="/pages/admission.html?course=${encodeURIComponent(course.title)}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Apply Now</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p class="text-muted text-center" style="grid-column: 1/-1;">Error loading courses.</p>`;
  }
}

// 4. Load top 3 toppers
async function loadResultsPreview() {
  const container = document.getElementById("home-results-grid");
  if (!container) return;

  try {
    const results = await getCollection("results");
    const featuredResults = results.filter(r => r.visible && r.featured).slice(0, 3);

    if (featuredResults.length === 0) {
      container.innerHTML = `<p class="text-muted text-center" style="grid-column: 1/-1;">No results posted.</p>`;
      return;
    }

    container.innerHTML = '';
    featuredResults.forEach(res => {
      const card = document.createElement("div");
      card.className = "glass-card text-center reveal active";
      card.style.padding = "1.5rem";
      card.innerHTML = `
        <div class="flex-center" style="margin-bottom: 1.25rem;">
          <img src="${res.photoUrl || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAMgAyADASIAAhEBAxEB/8QAGwABAQEAAwEBAAAAAAAAAAAAAAIBAwYHBQT/xABGEAEBAAEDAQQFCAYGCQUBAAAAAQIDBBEFBhIhMRNBUXGRBxQiYYGhsdEjMkJScsEVM0NTYnMWJDU2k7LC4eJERWN00vD/xAAaAQEBAAMBAQAAAAAAAAAAAAAAAQIEBQMG/8QALREBAAIBAwMDAwQCAwEAAAAAAAECAwQRMRIhQRMyUQUiQiNhcZEUgTNSodH/2gA/AMg22t7Xeaulod7U1LzdTe/R88vOvn9Y6ZpdI6dobbRyve08cpeMvXXy+1+t9K2202mx2+nttrn3tHTvGN/l+F+5+c1unx+nj6vLz1eTrv0xw4G5ZcRy3l6PEuRki5ExcTFRUTFxEVK45VcoLlVxcrjlVyoLiLlxyt5UXKrlEcuQXyco5OQVyzlPLORVcmLOWcoq1NqOWWiNtTay1lqjay1lrLVC1lpam1VLWWltTaqWstLWWqFqbS1lqhWpGWgWgAAAAAAAAAAGWyTm+EAHbOxfUZsd9qdQ1J+g230b7b538I8q2vSNd2d2GljPLXxxwnHq8/i9K7P7C9P6DtNvlnMtcse9nfyjx+DlfUqRUdPydLT22rv8AL6T5O7dN09mAMVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfP69tZvez++0ubP0OXPh/h5/F9Bz9xoaO50M9LX0/S6efnhebcZ4X7k1MV6I48pMRMbS8Rkq5HaO0HZTX6ZlqbzY6eevtPPLGfrYY/nPq/N1WWMuOcdnNtuY42TFXeFxMVEFiomLiCoqJi4guKjjipUFyrlccqpUFyqlRcq5XHKrlRHJyco5byC+TlHJyC+W5O8zkFcs5TyzlRXLOWcs5UbLowDlG8stZyzlRvLOWcs5UbLowDlkYBvLAAAAAAAAAADsXZDZHddp'}" alt="${res.studentName}" style="width: 110px; height: 110px; border-radius: 50%; border: 3px solid var(--secondary); object-fit: cover;">
        </div>
        <span class="category-badge" style="margin-bottom: 0.5rem; background-color: rgba(245, 158, 11, 0.1); color: var(--accent);">${res.achievementType}</span>
        <h3 style="margin-bottom: 0.25rem;">${res.studentName}</h3>
        <p style="color: var(--secondary); font-weight: 700; font-family: var(--font-heading); margin-bottom: 0.5rem;">${res.rank}</p>
        <p class="text-muted" style="font-size: 0.875rem;">${res.examName} (${res.marks})</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p class="text-muted text-center" style="grid-column: 1/-1;">Error loading results.</p>`;
  }
}

// 5. Load top 2 testimonials
async function loadTestimonialsPreview() {
  const container = document.getElementById("home-testimonials-grid");
  if (!container) return;

  try {
    const reviews = await getCollection("testimonials");
    const featuredReviews = reviews.filter(r => r.visible && r.featured).slice(0, 2);

    if (featuredReviews.length === 0) {
      container.innerHTML = `<p class="text-muted text-center" style="grid-column: 1/-1;">No reviews posted yet.</p>`;
      return;
    }

    container.innerHTML = '';
    featuredReviews.forEach(rev => {
      const card = document.createElement("div");
      card.className = "glass-card reveal active";
      card.style.padding = "2rem";
      card.innerHTML = `
        <div style="font-size: 2rem; color: var(--secondary); margin-bottom: 1rem;">“</div>
        <p class="text-muted" style="font-style: italic; margin-bottom: 1.5rem;">${rev.review}</p>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <img src="${rev.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'}" alt="${rev.authorName}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
          <div>
            <h4 style="font-size: 1rem;">${rev.authorName}</h4>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${rev.role}</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p class="text-muted text-center" style="grid-column: 1/-1;">Error loading reviews.</p>`;
  }
}

// 6. Load top 3 gallery images
async function loadGalleryPreview() {
  const container = document.getElementById("home-gallery-grid");
  if (!container) return;

  try {
    const gallery = await getCollection("gallery");
    const featuredGallery = gallery.filter(g => g.visible).sort((a, b) => a.order - b.order).slice(0, 3);

    if (featuredGallery.length === 0) {
      container.innerHTML = `<p class="text-muted text-center" style="grid-column: 1/-1;">No gallery images uploaded.</p>`;
      return;
    }

    container.innerHTML = '';
    featuredGallery.forEach(item => {
      const card = document.createElement("div");
      card.className = "glass-card reveal active";
      card.innerHTML = `
        <div style="overflow: hidden; height: 240px;">
          <img src="${item.imageUrl}" alt="${item.caption}" style="width:100%; height:100%; object-fit:cover; transition: var(--transition-smooth);">
        </div>
        <div style="padding: 1rem; border-top: 1px solid var(--border-color);">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--secondary); font-weight: 600;">${item.album}</span>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-dark); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.caption}</p>
        </div>
      `;
      // Image scale hover effect
      const img = card.querySelector("img");
      card.addEventListener("mouseenter", () => img.style.transform = "scale(1.06)");
      card.addEventListener("mouseleave", () => img.style.transform = "scale(1)");

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p class="text-muted text-center" style="grid-column: 1/-1;">Error loading gallery images.</p>`;
  }
}

// 7. Load top 2 announcements (sorted: pinned first, then chronological)
async function loadAnnouncementsPreview() {
  const container = document.getElementById("home-announcements-list");
  if (!container) return;

  try {
    const list = await getCollection("announcements");
    const active = list.filter(item => {
      if (!item.visible) return false;
      const today = new Date().toISOString().split('T')[0];
      if (item.expiryDate && item.expiryDate < today) return false;
      if (item.scheduledDate && item.scheduledDate > today) return false;
      return true;
    });

    // Sort: Pinned first
    const sorted = active.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    }).slice(0, 2);

    if (sorted.length === 0) {
      container.innerHTML = `<p class="text-muted text-center">No active announcements at the moment.</p>`;
      return;
    }

    container.innerHTML = '';
    sorted.forEach(ann => {
      const card = document.createElement("div");
      card.className = "glass-card reveal active";
      card.style.padding = "1.5rem";
      card.style.borderLeft = ann.pinned ? "4px solid var(--accent)" : "1px solid var(--border-color)";
      
      const createdDate = new Date(ann.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      });

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.15rem; color: var(--text-dark);">${ann.title}</h3>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${createdDate}</span>
        </div>
        <p class="text-muted" style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 0.75rem;">${ann.content}</p>
        ${ann.pinned ? `<span class="category-badge" style="background-color: rgba(245, 158, 11, 0.15); color: var(--accent-hover);">📌 Pinned</span>` : ''}
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p class="text-muted text-center">Error loading notice board.</p>`;
  }
}
