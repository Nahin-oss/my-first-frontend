# KITCHENOIR — Product Requirements Document
> Version 1.0 | Stack: HTML + Tailwind CSS + Vanilla JS | Data: JSON | Platform: Web Browser

---

## 0. What this file is

This is your single source of truth. Every decision about what to build, how it should look, and in what order to build it lives here. Read it top to bottom once before writing any code. When in doubt — come back here.

---

## 1. Project overview

**KITCHENOIR** is a fine-dining interactive cookbook website with a cinematic dark editorial aesthetic inspired by flaircreative.co. It is a static front-end web app — no server, no login, no database. Recipes live in a JSON file. Users land on a dramatic hero section, browse recipe cards, search/filter by category or keyword, and open individual recipe detail pages with step-by-step instructions.

**The feeling:** Like opening a luxury restaurant's tasting menu in digital form. Dark. Slow. Intentional. Every scroll feels earned.

---

## 2. Tech stack

| Tool | What it is (beginner explanation) | Why we use it |
|---|---|---|
| HTML5 | The skeleton of every webpage — defines structure | Standard, runs in any browser with zero setup |
| Tailwind CSS (CDN) | A CSS framework — instead of writing `.my-class { color: red }` you write class names directly in HTML like `text-red-500` | Speeds up styling, enforces consistency, no build step needed via CDN |
| Vanilla JS | Plain JavaScript, no framework | Enough for search, filter, animations — no React complexity needed for a beginner |
| JSON | JavaScript Object Notation — a text file structured like a list of objects | Human-readable, easy to edit, acts as our "database" |
| Google Fonts | Free web fonts loaded via a `<link>` tag | Gives us editorial typography without installing anything |
| Intersection Observer API | A built-in browser feature that detects when an element enters the viewport (the visible screen area) | Powers scroll-triggered animations without any library |

> **No build step.** Everything runs by opening `index.html` in a browser or deploying to Netlify/Vercel by drag-and-drop.

---

## 3. File structure

```
kitchenoir/
│
├── index.html           ← Landing page (hero + recipe grid + search)
├── recipe.html          ← Individual recipe detail page (reused for all recipes)
│
├── data/
│   └── recipes.json     ← All recipe data lives here
│
├── css/
│   └── animations.css   ← Custom keyframe animations Tailwind can't do alone
│
├── js/
│   ├── main.js          ← Search, filter, card rendering on index.html
│   └── recipe.js        ← Loads and renders a single recipe on recipe.html
│
└── assets/
    └── images/          ← Recipe photos (use royalty-free: Unsplash/Pexels)
```




---

## 4. Design system

### 4.1 Color palette

All colors are defined as CSS custom properties (variables) in a `<style>` block inside `<head>`. Tailwind's config extension is not needed — we override via CSS vars.

```css
:root {
  --noir-bg:        #0a0a0a;   /* near-black background — NOT pure #000 */
  --noir-surface:   #111111;   /* card/panel backgrounds */
  --noir-border:    #1f1f1f;   /* subtle borders */
  --noir-text:      #e8e2d9;   /* warm off-white — easier on eyes than #fff */
  --noir-muted:     #6b6560;   /* secondary text, labels */
  --noir-accent:    #c9a96e;   /* gold accent — the ONE warm color */
  --noir-accent-dim:#7a5f3a;   /* dimmed gold for hover states */
}
```

> **Why not pure black (#000)?** Pure black feels flat and digital. `#0a0a0a` has depth — it's what luxury fashion brands use. Your eye perceives it as "dark" but with more character.

### 4.2 Typography

Load via Google Fonts in every HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / hero titles | Cormorant Garamond | 300 (Light) | Page titles, recipe names in hero |
| Display italic | Cormorant Garamond Italic | 300 | Decorative subheadings, pull quotes |
| Body / UI | Jost | 300–400 | Navigation, body text, labels, search |
| Accent label | Jost | 500 (Medium) | Tags, category chips, buttons |



### 4.3 Spacing & layout rules

- Max content width: `1280px`, centered with `mx-auto`
- Section vertical padding: `py-24` (96px) minimum
- Recipe grid: CSS Grid, `3 columns` on desktop → `2` on tablet → `1` on mobile
- All section gaps: multiples of 8px (Tailwind's default spacing scale)

### 4.4 Elevation & depth

No card shadows in the traditional sense. Instead, depth is created by:
- `border border-[#1f1f1f]` — a barely-visible border
- Hover state: border color shifts to `--noir-accent` with a `transition-colors duration-500`
- Background difference: cards use `--noir-surface` (#111) against page `--noir-bg` (#0a0a0a)

---

## 5. Data schema — `recipes.json`



```json
{
  "recipes": [
    {
      "id": "beef-wellington",
      "title": "Beef Wellington",
      "subtitle": "Tenderloin wrapped in mushroom duxelles and golden pastry",
      "category": "Mains",
      "tags": ["beef", "pastry", "french", "classic"],
      "difficulty": "Advanced",
      "time": {
        "prep": 45,
        "cook": 30,
        "total": 75
      },
      "servings": 4,
      "image": "assets/images/beef-wellington.jpg",
      "heroImage": "assets/images/beef-wellington-hero.jpg",
      "description": "A long-form editorial paragraph describing the dish — its history, the feeling of eating it, why it belongs on this menu.",
      "ingredients": [
        { "amount": "800", "unit": "g", "item": "centre-cut beef tenderloin" },
        { "amount": "300", "unit": "g", "item": "mixed wild mushrooms" },
        { "amount": "6", "unit": "slices", "item": "Parma ham" },
        { "amount": "500", "unit": "g", "item": "puff pastry, ready-rolled" }
      ],
      "steps": [
        {
          "step": 1,
          "title": "Sear the tenderloin",
          "instruction": "Season the beef generously. Heat a cast-iron skillet over high heat. Sear all sides for 2 minutes each until deeply browned. Set aside to cool completely.",
          "timer": 480
        }
      ],
      "chef_note": "The duxelles must be completely dry before assembly — excess moisture will make the pastry soggy."
    }
  ]
}
```

**Field reference:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | URL-safe slug, used in `?id=beef-wellington` |
| `title` | string | yes | Displayed in card and hero |
| `subtitle` | string | yes | One-line descriptor |
| `category` | string | yes | One of: `Starters`, `Mains`, `Desserts`, `Cocktails` |
| `tags` | array of strings | yes | Used for search matching |
| `difficulty` | string | yes | `Beginner`, `Intermediate`, `Advanced` |
| `time.prep` / `time.cook` / `time.total` | number (minutes) | yes | Displayed on card and detail |
| `servings` | number | yes | Default serving count |
| `image` | string (path) | yes | Card thumbnail |
| `heroImage` | string (path) | yes | Full-bleed detail page image |
| `description` | string | yes | Editorial paragraph |
| `ingredients` | array of objects | yes | See structure above |
| `steps` | array of objects | yes | `timer` in seconds, optional |
| `chef_note` | string | no | Italic callout at end of recipe |

> **Start with 6 recipes minimum** — 2 per category (Starters, Mains, Desserts). This gives the grid and filter enough to demonstrate correctly.

---

## 6. Pages

### 6.1 `index.html` — Landing page

#### Sections (top to bottom):

**A. Navigation bar**
- Fixed to top, `backdrop-blur-sm bg-[#0a0a0a]/80` (semi-transparent dark blur)
- Left: KITCHENOIR wordmark in Cormorant Garamond, tracking wide (`tracking-[0.3em]`)
- Right: text links — `Menu`, `About`, `Search icon`
- On scroll past 80px: add a bottom border `border-b border-[#1f1f1f]` via JS class toggle

**B. Hero section**
- Full viewport height (`min-h-screen`)
- Background: full-bleed image OR dark video loop (use a free Pexels video — `object-cover`)
- Overlay: `bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]`
- Content centered:
  - Small label: `— A FINE DINING COLLECTION —` in Jost 500, letter-spaced, gold color
  - Main title: `KITCHENOIR` in Cormorant 300, ~120px desktop / 56px mobile
  - Subtitle in italic Cormorant: `"Where the kitchen meets the night."`
  - Scroll indicator: animated arrow or text fading in after 1.5s delay

**C. Intro text strip**
- Single centered paragraph, max-width 640px
- Cormorant italic, large (~24px), muted gold color
- Example: `"Thirty-two recipes. Four courses. One obsession with perfection."`

**D. Search & filter bar**
- Search input: dark, borderless, underline style — `border-b border-[#1f1f1f] focus:border-[--noir-accent]`
- Filter chips below: `All`, `Starters`, `Mains`, `Desserts`, `Cocktails`
- Active chip: gold text + gold border. Inactive: muted text
- Chips are `<button>` elements — JS handles the filtering

**E. Recipe grid**
- CSS Grid, responsive (see 4.3)
- Each card is a `<article>` tag rendered by JS from `recipes.json`
- Cards animate in on scroll (see Section 8)

**F. Footer**
- Minimal: wordmark left, `© KITCHENOIR MMXXV` right
- One thin gold horizontal rule above

---

### 6.2 `recipe.html` — Recipe detail page

This single HTML file is reused for every recipe. JS reads `?id=recipe-slug` from the URL and fetches the matching recipe from the JSON.


#### Sections:

**A. Navigation** — same as index

**B. Recipe hero**
- Full viewport height, `heroImage` as background
- Strong dark gradient overlay from bottom
- Recipe title (Cormorant 300, very large), category tag, difficulty + total time chips

**C. Recipe meta strip**
- Horizontal row: Prep time | Cook time | Servings | Difficulty
- Thin gold dividers between items

**D. Description**
- Full editorial paragraph in Cormorant italic, large, centered, max-width 720px

**E. Ingredients list**
- Two-column layout: amount+unit left, item name right
- Thin `border-b border-[#1f1f1f]` between each row

**F. Method / steps**
- Numbered steps, large step number in Cormorant (very large, muted gold, behind the text as a background-ish element)
- Step title in Jost 500
- Instruction in Jost 300

**G. Chef's note** (if present)
- Italic callout box, left gold border, Cormorant italic

**H. Back link**
- `← Back to the menu` — links back to `index.html`

---

## 7. Components (reusable pieces)


### RecipeCard

```js
function RecipeCard(recipe) {
  return `
    <article class="recipe-card group cursor-pointer" data-id="${recipe.id}" onclick="goToRecipe('${recipe.id}')">
      <div class="overflow-hidden aspect-[3/4]">
        <img src="${recipe.image}" alt="${recipe.title}"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div class="pt-4">
        <span class="text-xs tracking-widest text-[--noir-accent] font-medium">${recipe.category.toUpperCase()}</span>
        <h3 class="text-2xl font-light mt-1" style="font-family: 'Cormorant Garamond', serif">${recipe.title}</h3>
        <p class="text-sm text-[--noir-muted] mt-1">${recipe.time.total} min · ${recipe.difficulty}</p>
      </div>
    </article>
  `
}
```

### FilterChip

```js
function FilterChip(label, isActive) {
  return `
    <button class="filter-chip px-4 py-1 text-xs tracking-widest border transition-colors duration-300
      ${isActive
        ? 'border-[--noir-accent] text-[--noir-accent]'
        : 'border-[--noir-border] text-[--noir-muted] hover:border-[--noir-accent]/50'
      }"
      data-filter="${label}">
      ${label.toUpperCase()}
    </button>
  `
}
```

---

## 8. Animation specifications


### 8.1 Scroll-reveal (fade up)

Add `data-reveal` attribute to any element you want to animate in. JS will handle the rest.

```css
/* animations.css */
[data-reveal] {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}
```

```js
/* in main.js */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

### 8.2 Staggered card reveal

Recipe cards get `transition-delay` based on their index:

```js
cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
  card.setAttribute('data-reveal', '');
});
```

### 8.3 Hero text entrance

On page load, hero elements animate in sequence using CSS `animation-delay`:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-label   { animation: fadeUp 1s ease 0.3s both; }
.hero-title   { animation: fadeUp 1.2s ease 0.6s both; }
.hero-sub     { animation: fadeUp 1s ease 1s both; }
.hero-scroll  { animation: fadeUp 0.8s ease 1.6s both; }
```

> `both` in animation fill-mode means: apply the start state before the animation begins, and hold the end state after it ends. Without it, elements flash at full opacity before animating.

### 8.4 Navigation scroll behavior

```js
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 80) {
    nav.classList.add('border-b', 'border-[#1f1f1f]');
  } else {
    nav.classList.remove('border-b', 'border-[#1f1f1f]');
  }
});
```

### 8.5 Image hover zoom

Already handled via Tailwind group-hover on card images (see RecipeCard component).

---

## 9. Feature specs

### 9.1 Search

- Input element with `id="search-input"`
- On `input` event (fires on every keystroke): filter `allRecipes` array
- Match against: `title`, `subtitle`, `tags`, `category` — all lowercased
- Re-render grid with matching results
- If 0 results: show empty state message in Cormorant italic: `"Nothing found in the dark."`

```js
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = allRecipes.filter(r =>
    r.title.toLowerCase().includes(query) ||
    r.category.toLowerCase().includes(query) ||
    r.tags.some(tag => tag.toLowerCase().includes(query))
  );
  renderGrid(filtered);
});
```

### 9.2 Category filter

- Active filter stored in a variable: `let activeFilter = 'All'`
- Clicking a chip sets `activeFilter`, re-renders grid
- Filter and search work together: apply both simultaneously

```js
function getFilteredRecipes() {
  const query = searchInput.value.toLowerCase().trim();
  return allRecipes.filter(r => {
    const matchesCategory = activeFilter === 'All' || r.category === activeFilter;
    const matchesSearch = !query ||
      r.title.toLowerCase().includes(query) ||
      r.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });
}
```

### 9.3 Recipe navigation

```js
function goToRecipe(id) {
  window.location.href = `recipe.html?id=${id}`;
}
```

On `recipe.html`, `recipe.js` reads the ID, fetches `recipes.json`, finds the match, and renders the page content into pre-existing placeholder `<div>` elements.

---

## 10. Build order

Follow this sequence. Each step builds on the last — don't skip ahead.

```
Step 1  Set up file structure — create all folders and empty files
Step 2  Write recipes.json — at least 6 recipes, all fields populated
Step 3  Build index.html shell — navbar, hero, search bar, empty grid div, footer
Step 4  Style with Tailwind CDN — apply color vars, typography, layout classes
Step 5  Write animations.css — keyframes and data-reveal styles
Step 6  Write main.js — fetch JSON → render cards → attach search + filter events
Step 7  Add IntersectionObserver — scroll-reveal for cards and sections
Step 8  Build recipe.html shell — all section divs with placeholder structure
Step 9  Write recipe.js — read URL param → find recipe → populate DOM
Step 10 Polish — hover states, transitions, spacing, mobile responsiveness
Step 11 Test — resize to mobile, test search edge cases, check all recipe links
Step 12 Deploy — drag project folder to Netlify Drop (netlify.com/drop)
```


---

## 11. Responsive breakpoints

Using Tailwind's default breakpoints:

| Breakpoint | Screen width | Grid columns | Font scale |
|---|---|---|---|
| default (mobile) | < 640px | 1 column | Hero title: 56px |
| `sm` | ≥ 640px | 1 column | Hero title: 72px |
| `md` | ≥ 768px | 2 columns | Hero title: 96px |
| `lg` | ≥ 1024px | 3 columns | Hero title: 120px |

---

## 12. Deployment

No build process needed. To go live:

1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag your `kitchenoir/` folder into the browser
3. Netlify gives you a live URL instantly — free

> Your site will be live at something like `https://kitchenoir-abc123.netlify.app`. You can rename it in Netlify settings.

---

## 13. Starter Tailwind CDN snippet

Place this in the `<head>` of both HTML files:

```html
<!-- Tailwind CSS via CDN — no install needed -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'noir-bg':      '#0a0a0a',
          'noir-surface': '#111111',
          'noir-border':  '#1f1f1f',
          'noir-text':    '#e8e2d9',
          'noir-muted':   '#6b6560',
          'noir-accent':  '#c9a96e',
        },
        fontFamily: {
          display: ['"Cormorant Garamond"', 'serif'],
          sans:    ['Jost', 'sans-serif'],
        }
      }
    }
  }
</script>
<link rel="stylesheet" href="css/animations.css">
```

With this config, you can write `bg-noir-bg`, `text-noir-accent`, `font-display` directly in your HTML classes.

---

## 14. Minimum viable product (MVP) checklist

- [ ] `recipes.json` with 6+ recipes, all fields correct
- [ ] Hero section renders with image, title, subtitle animating in
- [ ] Recipe grid renders all cards from JSON
- [ ] Search filters cards in real time
- [ ] Category filter chips work and combine with search
- [ ] Clicking a card navigates to `recipe.html?id=...`
- [ ] Recipe detail page renders the correct recipe
- [ ] Scroll-reveal animations on cards and sections
- [ ] Site is readable and usable on mobile
- [ ] Deployed to Netlify and accessible via URL

---

*KITCHENOIR PRD — end of document. Build in order. Trust the process.*