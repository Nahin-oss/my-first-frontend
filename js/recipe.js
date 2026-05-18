/**
 * KITCHENOIR — Recipe Detail Page Logic
 * Reads from global KITCHENOIR_DATA (no fetch / no CORS).
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'kitchenoir_favorites';
  function getFavorites() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveFavorites(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
  function isFavorite(id) { return getFavorites().includes(id); }
  function toggleFavorite(id) {
    const favs = getFavorites();
    const idx = favs.indexOf(id);
    if (idx > -1) favs.splice(idx, 1); else favs.push(id);
    saveFavorites(favs);
    updateFavCount();
    return idx === -1;
  }
  function updateFavCount() {
    const el = document.getElementById('fav-count');
    if (el) el.textContent = getFavorites().length;
  }

  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  function renderRecipe(recipe) {
    document.getElementById('detail-img').src = recipe.image;
    document.getElementById('detail-img').alt = recipe.title;
    document.title = `${recipe.title} — KITCHENOIR`;

    const saved = isFavorite(recipe.id);
    const content = document.getElementById('detail-content');
    content.innerHTML = `
      <a href="index.html" class="back-link">← Back to recipes</a>
      <span class="category-tag">${recipe.category}</span>
      <h1>${recipe.title}</h1>
      <div class="detail-meta">
        <span>${recipe.time}</span>
        <span>${recipe.servings} servings</span>
        <span>${recipe.difficulty}</span>
      </div>
      <button class="detail-fav-btn${saved ? ' saved' : ''}" id="detail-fav">
        ${saved ? '♥  Saved' : '♡  Save Recipe'}
      </button>
      <p class="detail-desc">${recipe.description}</p>

      <h2 class="section-label">Ingredients</h2>
      <ul class="ingredients-list">
        ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
      </ul>

      <h2 class="section-label">Steps</h2>
      <ol class="steps-list">
        ${recipe.steps.map(s => `<li>${s}</li>`).join('')}
      </ol>
    `;

    document.getElementById('detail-fav').addEventListener('click', () => {
      const added = toggleFavorite(recipe.id);
      const btn = document.getElementById('detail-fav');
      btn.classList.toggle('saved', added);
      btn.innerHTML = added ? '♥  Saved' : '♡  Save Recipe';
      showToast(added ? `Saved — ${recipe.title}` : `Removed — ${recipe.title}`);
    });
  }

  function initNavFavs() {
    const link = document.getElementById('nav-favs');
    if (!link) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'index.html?filter=Saved';
    });
  }

  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateFavCount();
    initNavFavs();
    initHeaderScroll();

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) { window.location.href = 'index.html'; return; }

    const recipe = KITCHENOIR_DATA.recipes.find(r => r.id === id);
    if (!recipe) {
      document.getElementById('detail-content').innerHTML =
        '<div class="empty-state">Recipe not found. <a href="index.html" style="color:var(--accent);">Back to recipes →</a></div>';
      return;
    }
    renderRecipe(recipe);
  });
})();
