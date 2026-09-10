/* ===== Awesome macOS Open Source Apps — Redesigned Application Logic ===== */
(function () {
  "use strict";

  const PAGE_SIZE = 24;

  const state = {
    apps: [],
    categories: [],
    categoryById: new Map(),
    childrenByParent: new Map(),
    activeCategory: "all",
    activeLanguages: new Set(),
    query: "",
    sort: "name-asc",
    filterHasScreenshots: false,
    filterFavorites: false,
    favorites: new Set(),
    viewMode: "grid", // 'grid' | 'compact'
    langExpanded: false,

    // Infinite scroll & rendering
    filteredApps: [],
    renderedCount: 0,
    observer: null,

    // QuickLook Lightbox
    quicklookApp: null,
    quicklookIndex: 0,
  };

  const LANG_ALIASES = {
    "objective_c": "objective-c",
    "objective-c1": "objective-c",
    "objective-c": "objective-c",
    "cpp": "c++",
    "c++": "c++",
    "c_sharp": "c#",
    "csharp": "c#",
    "coffee_script": "coffeescript",
    "coffeescript": "coffeescript",
    "golang": "go",
    "free-pascal": "pascal",
    "vim script": "vim script",
  };

  const LANG_META = {
    "swift": { label: "Swift", icon: "icons/swift-64.png" },
    "objective-c": { label: "Objective-C", icon: "icons/objective-c-64.png" },
    "javascript": { label: "JavaScript", icon: "icons/javascript-64.png" },
    "typescript": { label: "TypeScript", icon: "icons/typescript-64.png" },
    "c++": { label: "C++", icon: "icons/cpp-64.png" },
    "c": { label: "C", icon: "icons/c-64.png" },
    "c#": { label: "C#", icon: "icons/csharp-64.png" },
    "python": { label: "Python", icon: "icons/python-64.png" },
    "rust": { label: "Rust", icon: "icons/rust-64.png" },
    "css": { label: "CSS", icon: "icons/css-64.png" },
    "java": { label: "Java", icon: "icons/java-64.png" },
    "shell": { label: "Shell", icon: "icons/shell-64.png" },
    "go": { label: "Go", icon: "icons/golang-64.png" },
    "lua": { label: "Lua", icon: "icons/Lua-64.png" },
    "ruby": { label: "Ruby", icon: "icons/ruby-64.png" },
    "haskell": { label: "Haskell", icon: "icons/haskell-64.png" },
    "elm": { label: "Elm", icon: "icons/elm-64.png" },
    "clojure": { label: "Clojure", icon: "icons/clojure-64.png" },
    "coffeescript": { label: "CoffeeScript", icon: "icons/coffeescript-64.png" },
    "metal": { label: "Metal", icon: "icons/metal-64.png" },
    "applescript": { label: "AppleScript", icon: "icons/applescript-64.png" },
    "vim script": { label: "Vim Script", icon: "icons/Vim%20script_icon.png" },
    "html": { label: "HTML", icon: null },
  };

  const AVATAR_COLORS = ["#007aff", "#5856d6", "#ff3b30", "#ff9500", "#34c759", "#af52de", "#5ac8fa", "#ff2d55"];

  function avatarColor(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
  }

  function buildIconFallback(title) {
    const div = document.createElement("div");
    div.className = "app-icon-fallback";
    div.style.background = avatarColor(title || "?");
    div.textContent = (title || "?").trim().charAt(0).toUpperCase() || "?";
    return div;
  }

  function normalizeLanguage(raw) {
    const key = String(raw).trim().toLowerCase();
    return LANG_ALIASES[key] || key;
  }

  function languageMeta(normalized) {
    return LANG_META[normalized] || { label: titleCase(normalized), icon: null };
  }

  function titleCase(str) {
    return String(str)
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function slugify(str) {
    return String(str).trim().toLowerCase();
  }

  function parseLenientJson(text) {
    return JSON.parse(text.replace(/,(\s*[\]}])/g, "$1"));
  }

  function sanitizeUrl(url) {
    if (!url || typeof url !== "string") return null;
    try {
      const parsed = new URL(url.trim());
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.href;
      }
    } catch (e) {
      /* ignore invalid URL */
    }
    return null;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = String(str ?? "");
    return div.innerHTML;
  }

  async function fetchJson(path) {
    const res = await fetch(path, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
    const text = await res.text();
    return parseLenientJson(text);
  }

  function getAppKey(app) {
    return app.repo_url || app.official_site || app.title;
  }

  // Load favorites and view mode from localStorage
  function loadPersistedPreferences() {
    try {
      const savedFavs = localStorage.getItem("app_favorites");
      if (savedFavs) {
        const arr = JSON.parse(savedFavs);
        if (Array.isArray(arr)) state.favorites = new Set(arr);
      }
      const savedView = localStorage.getItem("app_view_mode");
      if (savedView === "grid" || savedView === "compact") {
        state.viewMode = savedView;
      }
    } catch (e) {
      console.warn("Could not load preferences from localStorage", e);
    }
  }

  function toggleFavorite(app) {
    const key = getAppKey(app);
    if (state.favorites.has(key)) {
      state.favorites.delete(key);
    } else {
      state.favorites.add(key);
    }
    try {
      localStorage.setItem("app_favorites", JSON.stringify(Array.from(state.favorites)));
    } catch (e) {
      console.warn("Could not save favorites", e);
    }
    updateFavoritesUI();
    if (state.filterFavorites) {
      applyFilters();
    }
  }

  function updateFavoritesUI() {
    const favCountEl = document.getElementById("fav-count");
    const count = state.favorites.size;
    favCountEl.textContent = count;
    favCountEl.hidden = count === 0;

    // Update star buttons on currently rendered cards
    document.querySelectorAll(".fav-btn").forEach((btn) => {
      const key = btn.getAttribute("data-app-key");
      const isFav = state.favorites.has(key);
      btn.classList.toggle("is-fav", isFav);
      btn.innerHTML = isFav
        ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
        : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      btn.setAttribute("title", isFav ? "Remove from Favorites" : "Add to Favorites");
      btn.setAttribute("aria-label", isFav ? "Remove from Favorites" : "Add to Favorites");
    });
  }

  async function loadData() {
    const [categoriesData, applicationsData] = await Promise.all([
      fetchJson("categories.json"),
      fetchJson("applications.json"),
    ]);

    state.categories = categoriesData.categories || [];
    state.apps = applicationsData.applications || [];

    // Pre-calculate clean metadata and search index for high-speed filtering
    state.apps.forEach((app) => {
      app._categorySet = new Set((app.categories || []).map(slugify));
      app._languages = (app.languages || []).map(normalizeLanguage);
      app._hasScreenshots = Boolean(app.screenshots && app.screenshots.length > 0);
      app._key = getAppKey(app);

      // Pre-tokenized search index string
      app._searchIndex = `${app.title || ""} ${app.short_description || ""} ${(app.categories || []).join(" ")} ${app._languages.join(" ")}`.toLowerCase();
    });

    state.categories.forEach((cat) => {
      state.categoryById.set(cat.id.toLowerCase(), cat);
      if (cat.parent) {
        const list = state.childrenByParent.get(cat.parent) || [];
        list.push(cat);
        state.childrenByParent.set(cat.parent, list);
      }
    });

    // Discover category slugs used by apps but missing from categories.json
    const knownIds = new Set(state.categoryById.keys());
    const discovered = new Map();
    state.apps.forEach((app) => {
      (app.categories || []).forEach((raw) => {
        const id = slugify(raw);
        if (!knownIds.has(id) && !discovered.has(id)) {
          discovered.set(id, { id, title: titleCase(raw), description: "" });
        }
      });
    });
    discovered.forEach((cat) => {
      state.categories.push(cat);
      state.categoryById.set(cat.id, cat);
      knownIds.add(cat.id);
    });
  }

  function categoryCount(id) {
    const wantChildren = state.childrenByParent.get(id);
    const idsToMatch = new Set([id]);
    if (wantChildren) wantChildren.forEach((c) => idsToMatch.add(c.id));
    return state.apps.filter((app) => {
      for (const wanted of idsToMatch) {
        if (app._categorySet.has(wanted)) return true;
      }
      return false;
    }).length;
  }

  function renderStats() {
    document.getElementById("stat-apps").textContent = state.apps.length;
    const withShots = state.apps.filter((a) => a._hasScreenshots).length;
    const shotStat = document.getElementById("stat-screenshots");
    if (shotStat) shotStat.textContent = withShots;

    const rootCategoryCount = state.categories.filter((c) => !c.parent).length +
      state.categories.filter((c) => c.parent).length;
    document.getElementById("stat-categories").textContent = rootCategoryCount;

    const langSet = new Set();
    state.apps.forEach((app) => app._languages.forEach((l) => langSet.add(l)));
    document.getElementById("stat-languages").textContent = langSet.size;
  }

  function renderSidebar() {
    const nav = document.getElementById("category-nav");
    nav.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.className = "cat-item" + (state.activeCategory === "all" ? " active" : "");
    allBtn.setAttribute("aria-pressed", String(state.activeCategory === "all"));
    allBtn.innerHTML = `<span>All Apps</span><span class="count">${state.apps.length}</span>`;
    allBtn.addEventListener("click", () => selectCategory("all"));
    nav.appendChild(allBtn);

    const roots = state.categories
      .filter((c) => !c.parent)
      .sort((a, b) => a.title.localeCompare(b.title));

    roots.forEach((cat) => {
      nav.appendChild(makeCategoryButton(cat, false));
      const children = (state.childrenByParent.get(cat.id) || [])
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
      children.forEach((child) => nav.appendChild(makeCategoryButton(child, true)));
    });
  }

  function makeCategoryButton(cat, isChild) {
    const btn = document.createElement("button");
    btn.className = "cat-item" + (isChild ? " child" : "") + (state.activeCategory === cat.id ? " active" : "");
    btn.setAttribute("aria-pressed", String(state.activeCategory === cat.id));
    const count = categoryCount(cat.id);
    btn.innerHTML = `<span>${escapeHtml(cat.title)}</span><span class="count">${count}</span>`;
    btn.addEventListener("click", () => selectCategory(cat.id));
    return btn;
  }

  function selectCategory(id) {
    state.activeCategory = id;
    renderSidebar();
    renderActiveFilters();
    applyFilters();
  }

  const LANG_CHIP_LIMIT = 12;

  function renderLanguageFilter() {
    const counts = new Map();
    state.apps.forEach((app) => {
      app._languages.forEach((lang) => counts.set(lang, (counts.get(lang) || 0) + 1));
    });
    const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    const visible = state.langExpanded ? sorted : sorted.slice(0, LANG_CHIP_LIMIT);

    const container = document.getElementById("lang-filter");
    container.innerHTML = "";
    visible.forEach(([lang, count]) => {
      const meta = languageMeta(lang);
      const chip = document.createElement("button");
      const active = state.activeLanguages.has(lang);
      chip.className = "lang-chip" + (active ? " active" : "");
      chip.setAttribute("aria-pressed", String(active));
      chip.innerHTML = `${meta.icon ? `<img src="${meta.icon}" alt="" onerror="this.remove()">` : ""}<span>${escapeHtml(meta.label)}</span>`;
      chip.title = `${meta.label} (${count})`;
      chip.addEventListener("click", () => {
        if (state.activeLanguages.has(lang)) state.activeLanguages.delete(lang);
        else state.activeLanguages.add(lang);
        renderLanguageFilter();
        renderActiveFilters();
        applyFilters();
      });
      container.appendChild(chip);
    });

    if (sorted.length > LANG_CHIP_LIMIT) {
      const more = document.createElement("button");
      more.className = "lang-more-btn";
      more.textContent = state.langExpanded ? "Show less" : `+${sorted.length - LANG_CHIP_LIMIT} more`;
      more.addEventListener("click", () => {
        state.langExpanded = !state.langExpanded;
        renderLanguageFilter();
      });
      container.appendChild(more);
    }
  }

  function renderActiveFilters() {
    const container = document.getElementById("active-filters");
    container.innerHTML = "";

    const chips = [];
    if (state.activeCategory !== "all") {
      const cat = state.categoryById.get(state.activeCategory);
      chips.push({ label: `Category: ${cat ? cat.title : state.activeCategory}`, onRemove: () => selectCategory("all") });
    }
    state.activeLanguages.forEach((lang) => {
      chips.push({
        label: languageMeta(lang).label,
        onRemove: () => {
          state.activeLanguages.delete(lang);
          renderLanguageFilter();
          renderActiveFilters();
          applyFilters();
        },
      });
    });
    if (state.filterHasScreenshots) {
      chips.push({
        label: "With Screenshots",
        onRemove: () => {
          state.filterHasScreenshots = false;
          updateQuickTogglesUI();
          renderActiveFilters();
          applyFilters();
        },
      });
    }
    if (state.filterFavorites) {
      chips.push({
        label: "Favorites only",
        onRemove: () => {
          state.filterFavorites = false;
          updateQuickTogglesUI();
          renderActiveFilters();
          applyFilters();
        },
      });
    }
    if (state.query) {
      chips.push({ label: `"${state.query}"`, onRemove: clearSearch });
    }

    container.hidden = chips.length === 0;
    if (chips.length === 0) return;

    chips.forEach(({ label, onRemove }) => {
      const chip = document.createElement("span");
      chip.className = "filter-chip";
      const text = document.createElement("span");
      text.textContent = label;
      const removeBtn = document.createElement("button");
      removeBtn.setAttribute("aria-label", `Remove filter ${label}`);
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", onRemove);
      chip.appendChild(text);
      chip.appendChild(removeBtn);
      container.appendChild(chip);
    });

    if (chips.length > 1) {
      const clearAll = document.createElement("button");
      clearAll.className = "clear-all-chip";
      clearAll.textContent = "Clear all";
      clearAll.addEventListener("click", resetAllFilters);
      container.appendChild(clearAll);
    }
  }

  function matchesFilters(app) {
    if (state.filterHasScreenshots && !app._hasScreenshots) {
      return false;
    }

    if (state.filterFavorites && !state.favorites.has(app._key)) {
      return false;
    }

    if (state.activeCategory !== "all") {
      const children = state.childrenByParent.get(state.activeCategory);
      let ok = app._categorySet.has(state.activeCategory);
      if (!ok && children) ok = children.some((c) => app._categorySet.has(c.id));
      if (!ok) return false;
    }

    if (state.activeLanguages.size > 0) {
      let ok = false;
      for (const wanted of state.activeLanguages) {
        if (app._languages.includes(wanted)) { ok = true; break; }
      }
      if (!ok) return false;
    }

    if (state.query) {
      if (!app._searchIndex.includes(state.query)) return false;
    }

    return true;
  }

  function sortApps(apps) {
    if (state.sort === "shuffle") {
      const shuffled = apps.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    if (state.sort === "screenshots-first") {
      return apps.slice().sort((a, b) => {
        if (a._hasScreenshots && !b._hasScreenshots) return -1;
        if (!a._hasScreenshots && b._hasScreenshots) return 1;
        return (a.title || "").localeCompare(b.title || "");
      });
    }
    const dir = state.sort === "name-desc" ? -1 : 1;
    return apps.slice().sort((a, b) => dir * (a.title || "").localeCompare(b.title || ""));
  }

  function githubIconSvg() {
    return '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>';
  }

  function globeIconSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>';
  }

  function cameraIconSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
  }

  function buildCard(app) {
    const card = document.createElement("article");
    card.className = "app-card";

    const repoUrl = sanitizeUrl(app.repo_url);
    const siteUrl = sanitizeUrl(app.official_site);
    const iconUrl = sanitizeUrl(app.icon_url);
    const hasShots = app._hasScreenshots;
    const isFav = state.favorites.has(app._key);

    // Screenshot container (visual grid view)
    if (hasShots) {
      const shotWrap = document.createElement("div");
      shotWrap.className = "card-screenshot-wrap loading-shimmer";
      shotWrap.setAttribute("role", "button");
      shotWrap.setAttribute("aria-label", `View screenshots for ${app.title || "app"}`);

      const shotImg = document.createElement("img");
      shotImg.className = "card-screenshot";
      shotImg.loading = "lazy";
      shotImg.decoding = "async";
      shotImg.referrerPolicy = "no-referrer";
      shotImg.alt = `${app.title || "App"} preview`;
      shotImg.src = app.screenshots[0];

      shotImg.onload = () => {
        shotWrap.classList.remove("loading-shimmer");
      };
      shotImg.onerror = () => {
        // If image fails to load, gracefully hide this container
        shotWrap.style.display = "none";
      };

      shotWrap.appendChild(shotImg);

      // Multiple screenshot badge
      if (app.screenshots.length > 1) {
        const badge = document.createElement("div");
        badge.className = "screenshot-badge";
        badge.innerHTML = `📷 ${app.screenshots.length}`;
        shotWrap.appendChild(badge);
      }

      // Hover overlay with Quick Look button
      const overlay = document.createElement("div");
      overlay.className = "screenshot-hover-overlay";
      overlay.innerHTML = `<span class="screenshot-quicklook-pill"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg> Quick Look</span>`;
      shotWrap.appendChild(overlay);

      shotWrap.addEventListener("click", () => openQuickLook(app, 0));
      card.appendChild(shotWrap);
    }

    // Card Body
    const body = document.createElement("div");
    body.className = "app-card-body";

    // Head (Icon + Title + Category + Star)
    const head = document.createElement("div");
    head.className = "app-card-head";

    if (iconUrl) {
      const img = document.createElement("img");
      img.className = "app-icon";
      img.loading = "lazy";
      img.decoding = "async";
      img.src = iconUrl;
      img.alt = "";
      img.referrerPolicy = "no-referrer";
      img.onerror = () => { img.replaceWith(buildIconFallback(app.title)); };
      head.appendChild(img);
    } else {
      head.appendChild(buildIconFallback(app.title));
    }

    const titleWrap = document.createElement("div");
    titleWrap.className = "app-title-wrap";

    const titleH3 = document.createElement("h3");
    titleH3.className = "app-title";
    const titleLink = document.createElement("a");
    titleLink.href = repoUrl || siteUrl || "#";
    titleLink.target = "_blank";
    titleLink.rel = "noopener noreferrer";
    titleLink.textContent = app.title || "Untitled";
    titleH3.appendChild(titleLink);
    titleWrap.appendChild(titleH3);

    if (app.categories && app.categories.length > 0) {
      const catSub = document.createElement("div");
      catSub.className = "app-primary-cat";
      catSub.textContent = titleCase(app.categories[0]);
      titleWrap.appendChild(catSub);
    }
    head.appendChild(titleWrap);

    // Favorite star button
    const favBtn = document.createElement("button");
    favBtn.className = "fav-btn" + (isFav ? " is-fav" : "");
    favBtn.setAttribute("data-app-key", app._key);
    favBtn.setAttribute("title", isFav ? "Remove from Favorites" : "Add to Favorites");
    favBtn.setAttribute("aria-label", isFav ? "Remove from Favorites" : "Add to Favorites");
    favBtn.innerHTML = isFav
      ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
      : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(app);
    });
    head.appendChild(favBtn);

    body.appendChild(head);

    // Description
    const desc = document.createElement("p");
    desc.className = "app-desc";
    desc.textContent = app.short_description || "";
    body.appendChild(desc);

    // Language Tags
    const tags = document.createElement("div");
    tags.className = "app-tags";
    app._languages.slice(0, 3).forEach((lang) => {
      const meta = languageMeta(lang);
      const tag = document.createElement("span");
      tag.className = "tag lang";
      tag.innerHTML = `${meta.icon ? `<img src="${meta.icon}" alt="" onerror="this.remove()">` : ""}${escapeHtml(meta.label)}`;
      tags.appendChild(tag);
    });
    body.appendChild(tags);

    // Links / Actions
    const links = document.createElement("div");
    links.className = "app-links";

    if (hasShots) {
      const previewBtn = document.createElement("button");
      previewBtn.type = "button";
      previewBtn.className = "btn-preview-shots";
      previewBtn.innerHTML = `${cameraIconSvg()}<span>Preview</span>`;
      previewBtn.title = `View screenshots (${app.screenshots.length})`;
      previewBtn.addEventListener("click", () => openQuickLook(app, 0));
      links.appendChild(previewBtn);
    }

    if (repoUrl) {
      const a = document.createElement("a");
      a.href = repoUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `${githubIconSvg()}<span>Repo</span>`;
      links.appendChild(a);
    }
    if (siteUrl && siteUrl !== repoUrl) {
      const a = document.createElement("a");
      a.href = siteUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `${globeIconSvg()}<span>Website</span>`;
      links.appendChild(a);
    }

    body.appendChild(links);
    card.appendChild(body);

    return card;
  }

  // Progressive infinite scroll rendering
  function applyFilters() {
    state.filteredApps = sortApps(state.apps.filter(matchesFilters));

    const grid = document.getElementById("app-grid");
    const empty = document.getElementById("empty-state");
    const resultCount = document.getElementById("result-count");

    grid.innerHTML = "";
    state.renderedCount = 0;

    if (state.filteredApps.length === 0) {
      grid.hidden = true;
      empty.hidden = false;
      if (state.observer) state.observer.disconnect();
    } else {
      grid.hidden = false;
      empty.hidden = true;
      renderNextChunk();
      setupIntersectionObserver();
    }

    resultCount.textContent = `${state.filteredApps.length} of ${state.apps.length} apps`;
  }

  function renderNextChunk() {
    if (state.renderedCount >= state.filteredApps.length) return;

    const grid = document.getElementById("app-grid");
    const nextSlice = state.filteredApps.slice(state.renderedCount, state.renderedCount + PAGE_SIZE);
    const fragment = document.createDocumentFragment();

    nextSlice.forEach((app) => {
      fragment.appendChild(buildCard(app));
    });

    grid.appendChild(fragment);
    state.renderedCount += nextSlice.length;

    // Disconnect observer if all items have been rendered
    if (state.renderedCount >= state.filteredApps.length && state.observer) {
      state.observer.disconnect();
    }
  }

  function setupIntersectionObserver() {
    if (state.observer) state.observer.disconnect();

    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;

    state.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          renderNextChunk();
        }
      });
    }, {
      rootMargin: "600px", // Pre-render before reaching the bottom
    });

    state.observer.observe(sentinel);
  }

  function updateQuickTogglesUI() {
    const shotBtn = document.getElementById("filter-has-screenshots");
    if (shotBtn) {
      shotBtn.classList.toggle("active", state.filterHasScreenshots);
      shotBtn.setAttribute("aria-pressed", String(state.filterHasScreenshots));
    }
    const favBtn = document.getElementById("filter-favorites");
    if (favBtn) {
      favBtn.classList.toggle("active", state.filterFavorites);
      favBtn.setAttribute("aria-pressed", String(state.filterFavorites));
    }
  }

  function clearSearch() {
    const input = document.getElementById("search");
    const clearBtn = document.getElementById("search-clear");
    input.value = "";
    state.query = "";
    clearBtn.hidden = true;
    renderActiveFilters();
    applyFilters();
  }

  function resetAllFilters() {
    state.activeCategory = "all";
    state.activeLanguages.clear();
    state.filterHasScreenshots = false;
    state.filterFavorites = false;
    state.query = "";
    document.getElementById("search").value = "";
    document.getElementById("search-clear").hidden = true;
    updateQuickTogglesUI();
    renderSidebar();
    renderLanguageFilter();
    renderActiveFilters();
    applyFilters();
  }

  function debounce(fn, delay) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function setupSearch() {
    const input = document.getElementById("search");
    const clearBtn = document.getElementById("search-clear");

    const debouncedFilter = debounce(() => {
      renderActiveFilters();
      applyFilters();
    }, 120);

    input.addEventListener("input", () => {
      state.query = input.value.trim().toLowerCase();
      clearBtn.hidden = state.query.length === 0;
      debouncedFilter();
    });

    clearBtn.addEventListener("click", () => {
      clearSearch();
      input.focus();
    });
  }

  function setupQuickToggles() {
    const shotToggle = document.getElementById("filter-has-screenshots");
    if (shotToggle) {
      shotToggle.addEventListener("click", () => {
        state.filterHasScreenshots = !state.filterHasScreenshots;
        updateQuickTogglesUI();
        renderActiveFilters();
        applyFilters();
      });
    }

    const favToggle = document.getElementById("filter-favorites");
    if (favToggle) {
      favToggle.addEventListener("click", () => {
        state.filterFavorites = !state.filterFavorites;
        updateQuickTogglesUI();
        renderActiveFilters();
        applyFilters();
      });
    }
  }

  function setupViewSwitcher() {
    const gridBtn = document.getElementById("view-grid");
    const compactBtn = document.getElementById("view-compact");
    const gridEl = document.getElementById("app-grid");

    function setView(mode) {
      state.viewMode = mode;
      try {
        localStorage.setItem("app_view_mode", mode);
      } catch (e) { /* ignore */ }

      if (mode === "compact") {
        gridEl.classList.remove("view-grid");
        gridEl.classList.add("view-compact");
        gridBtn.classList.remove("active");
        gridBtn.setAttribute("aria-pressed", "false");
        compactBtn.classList.add("active");
        compactBtn.setAttribute("aria-pressed", "true");
      } else {
        gridEl.classList.remove("view-compact");
        gridEl.classList.add("view-grid");
        gridBtn.classList.add("active");
        gridBtn.setAttribute("aria-pressed", "true");
        compactBtn.classList.remove("active");
        compactBtn.setAttribute("aria-pressed", "false");
      }
    }

    gridBtn.addEventListener("click", () => setView("grid"));
    compactBtn.addEventListener("click", () => setView("compact"));

    // Initialize with persisted view mode
    setView(state.viewMode);
  }

  function setupSort() {
    const select = document.getElementById("sort-select");
    select.value = state.sort;
    select.addEventListener("change", () => {
      state.sort = select.value;
      applyFilters();
    });
  }

  function setupResetFilters() {
    document.getElementById("reset-filters").addEventListener("click", resetAllFilters);
  }

  function setupTheme() {
    const toggle = document.getElementById("theme-toggle");
    const stored = localStorage.getItem("theme");
    if (stored) document.documentElement.setAttribute("data-theme", stored);
    toggle.addEventListener("click", () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const current = document.documentElement.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  function setupScrollTop() {
    const btn = document.getElementById("scroll-top");
    window.addEventListener("scroll", () => {
      btn.hidden = window.scrollY < 400;
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // ===== QuickLook Lightbox Logic =====
  function openQuickLook(app, index = 0) {
    if (!app.screenshots || app.screenshots.length === 0) return;

    state.quicklookApp = app;
    state.quicklookIndex = index;

    const modal = document.getElementById("quicklook-modal");
    modal.hidden = false;
    document.body.style.overflow = "hidden";

    updateQuickLookView();
  }

  function updateQuickLookView() {
    const app = state.quicklookApp;
    if (!app) return;

    const total = app.screenshots.length;
    const index = Math.max(0, Math.min(state.quicklookIndex, total - 1));
    state.quicklookIndex = index;

    const titleEl = document.getElementById("quicklook-title");
    const counterEl = document.getElementById("quicklook-counter");
    const appNameEl = document.getElementById("quicklook-app-name");
    const descEl = document.getElementById("quicklook-desc");
    const imgEl = document.getElementById("quicklook-img");
    const spinner = document.getElementById("quicklook-spinner");
    const prevBtn = document.getElementById("quicklook-prev");
    const nextBtn = document.getElementById("quicklook-next");
    const actionsEl = document.getElementById("quicklook-actions");

    titleEl.textContent = app.title || "Preview";
    counterEl.textContent = `${index + 1} / ${total}`;
    appNameEl.textContent = app.title || "Untitled";
    descEl.textContent = app.short_description || "";

    // Prev / Next button visibility
    prevBtn.hidden = total <= 1;
    nextBtn.hidden = total <= 1;

    // Actions (Repo & Website links)
    actionsEl.innerHTML = "";
    const repoUrl = sanitizeUrl(app.repo_url);
    const siteUrl = sanitizeUrl(app.official_site);
    if (repoUrl) {
      const a = document.createElement("a");
      a.href = repoUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `${githubIconSvg()}<span>View Repository</span>`;
      actionsEl.appendChild(a);
    }
    if (siteUrl && siteUrl !== repoUrl) {
      const a = document.createElement("a");
      a.href = siteUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `${globeIconSvg()}<span>Website</span>`;
      actionsEl.appendChild(a);
    }

    // Load image
    spinner.style.display = "block";
    imgEl.style.opacity = "0.2";

    const targetSrc = app.screenshots[index];
    const preload = new Image();
    preload.referrerPolicy = "no-referrer";
    preload.onload = () => {
      imgEl.src = targetSrc;
      imgEl.style.opacity = "1";
      spinner.style.display = "none";
    };
    preload.onerror = () => {
      imgEl.alt = "Failed to load screenshot";
      spinner.style.display = "none";
      imgEl.style.opacity = "0.7";
    };
    preload.src = targetSrc;
  }

  function closeQuickLook() {
    const modal = document.getElementById("quicklook-modal");
    modal.hidden = true;
    document.body.style.overflow = "";
    state.quicklookApp = null;
  }

  function quickLookNext() {
    if (!state.quicklookApp || state.quicklookApp.screenshots.length <= 1) return;
    state.quicklookIndex = (state.quicklookIndex + 1) % state.quicklookApp.screenshots.length;
    updateQuickLookView();
  }

  function quickLookPrev() {
    if (!state.quicklookApp || state.quicklookApp.screenshots.length <= 1) return;
    state.quicklookIndex = (state.quicklookIndex - 1 + state.quicklookApp.screenshots.length) % state.quicklookApp.screenshots.length;
    updateQuickLookView();
  }

  function setupQuickLookModal() {
    const backdrop = document.getElementById("quicklook-backdrop");
    const closeBtn = document.getElementById("quicklook-close");
    const closeDot = document.getElementById("quicklook-close-dot");
    const prevBtn = document.getElementById("quicklook-prev");
    const nextBtn = document.getElementById("quicklook-next");

    backdrop.addEventListener("click", closeQuickLook);
    closeBtn.addEventListener("click", closeQuickLook);
    closeDot.addEventListener("click", closeQuickLook);
    prevBtn.addEventListener("click", quickLookPrev);
    nextBtn.addEventListener("click", quickLookNext);
  }

  function setupKeyboardShortcuts() {
    const input = document.getElementById("search");
    document.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable;

      // When QuickLook is active
      const modal = document.getElementById("quicklook-modal");
      if (modal && !modal.hidden) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeQuickLook();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          quickLookNext();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          quickLookPrev();
        }
        return;
      }

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        input.focus();
      } else if (e.key === "Escape" && e.target === input) {
        clearSearch();
        input.blur();
      }
    });
  }

  async function init() {
    loadPersistedPreferences();
    setupTheme();
    setupViewSwitcher();
    setupSearch();
    setupQuickToggles();
    setupResetFilters();
    setupScrollTop();
    setupSort();
    setupQuickLookModal();
    setupKeyboardShortcuts();

    try {
      await loadData();
      renderStats();
      updateFavoritesUI();
      renderSidebar();
      renderLanguageFilter();
      renderActiveFilters();
      applyFilters();
    } catch (err) {
      console.error(err);
      document.getElementById("loading").innerHTML =
        "<p>Sorry, applications could not be loaded right now. Please try again later.</p>";
      return;
    }
    document.getElementById("loading").hidden = true;
  }

  init();
})();
