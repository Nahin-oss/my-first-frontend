/**
 * KITCHENOIR — Main Grid Page Logic
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

  function createCard(recipe) {
    const saved = isFavorite(recipe.id);
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.dataset.category = recipe.category;
    card.dataset.id = recipe.id;
    card.innerHTML = `
      <div class="recipe-card__img-wrap">
        <img src="${recipe.image}" alt="${recipe.title}" loading="lazy" />
        <div class="recipe-card__overlay">
          <span class="recipe-card__overlay-text">View Recipe</span>
        </div>
        <button class="recipe-card__fav${saved ? ' saved' : ''}" data-id="${recipe.id}"
                aria-label="Save ${recipe.title}">
          ${saved ? '♥' : '♡'}
        </button>
      </div>
      <div class="recipe-card__body">
        <span class="recipe-card__category">${recipe.category}</span>
        <h2 class="recipe-card__title">${recipe.title}</h2>
        <p class="recipe-card__desc">${recipe.description}</p>
        <div class="recipe-card__meta">
          <span>${recipe.time}</span>
          <span>${recipe.servings} servings</span>
          <span>${recipe.difficulty}</span>
        </div>
      </div>`;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.recipe-card__fav')) return;
      window.location.href = `recipe.html?id=${recipe.id}`;
    });

    card.querySelector('.recipe-card__fav').addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      const added = toggleFavorite(recipe.id);
      btn.classList.toggle('saved', added);
      btn.innerHTML = added ? '♥' : '♡';
      showToast(added ? `Saved — ${recipe.title}` : `Removed — ${recipe.title}`);
      if (currentFilter === 'Saved') renderGrid();
    });

    return card;
  }

  let currentFilter = 'All';
  let searchQuery = '';

  function renderGrid() {
    const grid = document.getElementById('recipe-grid');
    const countEl = document.getElementById('recipe-count');
    grid.innerHTML = '';

    const recipes = KITCHENOIR_DATA.recipes;
    const favs = getFavorites();

    const filtered = recipes.filter((r) => {
      let matchFilter = true;
      if (currentFilter === 'Saved') matchFilter = favs.includes(r.id);
      else if (currentFilter !== 'All') matchFilter = r.category === currentFilter;

      let matchSearch = true;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        matchSearch = r.title.toLowerCase().includes(query) || 
                      r.description.toLowerCase().includes(query) ||
                      r.category.toLowerCase().includes(query);
      }
      return matchFilter && matchSearch;
    });

    if (countEl) countEl.textContent = `( ${filtered.length} )`;

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state">
        ${currentFilter === 'Saved'
          ? 'No saved recipes yet — tap ♡ on any recipe to save it.'
          : 'No recipes found in this category.'}
      </div>`;
      return;
    }

    filtered.forEach((r, i) => {
      const card = createCard(r);
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      grid.appendChild(card);
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.style.transition = 'opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 100);
      });
    });
  }

  function initSearch() {
    const searchInput = document.getElementById('recipe-search');
    if (!searchInput) return;
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderGrid();
    });
  }

  function initFilters() {
    const container = document.getElementById('filters');
    if (!container) return;
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGrid();
    });
  }

  function initNavFavs() {
    const link = document.getElementById('nav-favs');
    if (!link) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      currentFilter = 'Saved';
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === 'Saved');
      });
      renderGrid();
      window.scrollTo({ top: document.getElementById('recipe-grid').offsetTop - 120, behavior: 'smooth' });
    });
  }

  /* Sticky header shrink */
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* Check URL for filter param */
  function checkUrlFilter() {
    const params = new URLSearchParams(window.location.search);
    const f = params.get('filter');
    if (f) {
      currentFilter = f;
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === f);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateFavCount();
    initSearch();
    initFilters();
    initNavFavs();
    initHeaderScroll();
    checkUrlFilter();
    renderGrid();
  });
})();
