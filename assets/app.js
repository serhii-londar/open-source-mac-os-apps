/* ===== Awesome macOS Open Source Apps — site logic ===== */
(function () {
  "use strict";

  const state = {
    apps: [],
    categories: [],
    categoryById: new Map(),
    childrenByParent: new Map(),
    activeCategory: "all",
    activeLanguages: new Set(),
    query: "",
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
  };

  const AVATAR_COLORS = ["#0a84ff", "#5e5ce6", "#ff453a", "#ff9f0a", "#30d158", "#bf5af2", "#64d2ff", "#ff375f"];

  function avatarColor(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
  }

  // No dedicated square app-icon asset exists (icons/icon.png is a wide banner),
  // so missing/broken icons fall back to a generated letter avatar instead.
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

  // Repo data occasionally contains trailing commas (invalid strict JSON);
  // strip them defensively before parsing so the page never hard-fails.
  function parseLenientJson(text) {
    return JSON.parse(text.replace(/,(\s*[\]}])/g, "$1"));
  }

  function sanitizeUrl(url) {
    if (!url || typeof url !== "string") return null;
    try {
      const parsed = new URL(url, window.location.href);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.href;
      }
    } catch (e) {
      /* ignore invalid URL */
    }
    return null;
  }

  async function fetchJson(path) {
    const res = await fetch(path, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
    const text = await res.text();
    return parseLenientJson(text);
  }

  async function loadData() {
    const [categoriesData, applicationsData] = await Promise.all([
      fetchJson("categories.json"),
      fetchJson("applications.json"),
    ]);

    state.categories = categoriesData.categories || [];
    state.apps = applicationsData.applications || [];

    state.categories.forEach((cat) => {
      state.categoryById.set(cat.id.toLowerCase(), cat);
      if (cat.parent) {
        const list = state.childrenByParent.get(cat.parent) || [];
        list.push(cat);
        state.childrenByParent.set(cat.parent, list);
      }
    });

    // Discover category slugs used by apps but missing from categories.json
    // so every app stays reachable from the sidebar.
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

  function appCategoryIds(app) {
    return new Set((app.categories || []).map(slugify));
  }

  function appLanguages(app) {
    return (app.languages || []).map(normalizeLanguage);
  }

  function categoryCount(id) {
    const wantChildren = state.childrenByParent.get(id);
    const idsToMatch = new Set([id]);
    if (wantChildren) wantChildren.forEach((c) => idsToMatch.add(c.id));
    return state.apps.filter((app) => {
      const cats = appCategoryIds(app);
      for (const wanted of idsToMatch) if (cats.has(wanted)) return true;
      return false;
    }).length;
  }

  function renderStats() {
    document.getElementById("stat-apps").textContent = state.apps.length;
    const rootCategoryCount = state.categories.filter((c) => !c.parent).length +
      state.categories.filter((c) => c.parent).length;
    document.getElementById("stat-categories").textContent = rootCategoryCount;
    const langSet = new Set();
    state.apps.forEach((app) => appLanguages(app).forEach((l) => langSet.add(l)));
    document.getElementById("stat-languages").textContent = langSet.size;
  }

  function renderSidebar() {
    const nav = document.getElementById("category-nav");
    nav.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.className = "cat-item" + (state.activeCategory === "all" ? " active" : "");
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
    const count = categoryCount(cat.id);
    btn.innerHTML = `<span>${escapeHtml(cat.title)}</span><span class="count">${count}</span>`;
    btn.addEventListener("click", () => selectCategory(cat.id));
    return btn;
  }

  function selectCategory(id) {
    state.activeCategory = id;
    renderSidebar();
    renderGrid();
  }

  function renderLanguageFilter() {
    const counts = new Map();
    state.apps.forEach((app) => {
      appLanguages(app).forEach((lang) => counts.set(lang, (counts.get(lang) || 0) + 1));
    });
    const top = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);

    const container = document.getElementById("lang-filter");
    container.innerHTML = "";
    top.forEach(([lang, count]) => {
      const meta = languageMeta(lang);
      const chip = document.createElement("button");
      chip.className = "lang-chip" + (state.activeLanguages.has(lang) ? " active" : "");
      chip.innerHTML = `${meta.icon ? `<img src="${meta.icon}" alt="" onerror="this.remove()">` : ""}<span>${escapeHtml(meta.label)}</span>`;
      chip.title = `${meta.label} (${count})`;
      chip.addEventListener("click", () => {
        if (state.activeLanguages.has(lang)) state.activeLanguages.delete(lang);
        else state.activeLanguages.add(lang);
        renderLanguageFilter();
        renderGrid();
      });
      container.appendChild(chip);
    });
  }

  function matchesFilters(app) {
    if (state.activeCategory !== "all") {
      const cats = appCategoryIds(app);
      const children = state.childrenByParent.get(state.activeCategory);
      let ok = cats.has(state.activeCategory);
      if (!ok && children) ok = children.some((c) => cats.has(c.id));
      if (!ok) return false;
    }

    if (state.activeLanguages.size > 0) {
      const langs = new Set(appLanguages(app));
      let ok = false;
      for (const wanted of state.activeLanguages) if (langs.has(wanted)) { ok = true; break; }
      if (!ok) return false;
    }

    if (state.query) {
      const q = state.query;
      const haystack = `${app.title || ""} ${app.short_description || ""}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = String(str ?? "");
    return div.innerHTML;
  }

  function githubIconSvg() {
    return '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>';
  }

  function globeIconSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>';
  }

  function buildCard(app) {
    const card = document.createElement("article");
    card.className = "app-card";

    const repoUrl = sanitizeUrl(app.repo_url);
    const siteUrl = sanitizeUrl(app.official_site);
    const iconUrl = sanitizeUrl(app.icon_url);

    const head = document.createElement("div");
    head.className = "app-card-head";

    if (iconUrl) {
      const img = document.createElement("img");
      img.className = "app-icon";
      img.loading = "lazy";
      img.src = iconUrl;
      img.alt = "";
      img.referrerPolicy = "no-referrer";
      img.onerror = () => { img.replaceWith(buildIconFallback(app.title)); };
      head.appendChild(img);
    } else {
      head.appendChild(buildIconFallback(app.title));
    }

    const titleWrap = document.createElement("h3");
    titleWrap.className = "app-title";
    const titleLink = document.createElement("a");
    titleLink.href = repoUrl || siteUrl || "#";
    titleLink.target = "_blank";
    titleLink.rel = "noopener noreferrer";
    titleLink.textContent = app.title || "Untitled";
    titleWrap.appendChild(titleLink);
    head.appendChild(titleWrap);

    card.appendChild(head);

    const desc = document.createElement("p");
    desc.className = "app-desc";
    desc.textContent = app.short_description || "";
    card.appendChild(desc);

    const tags = document.createElement("div");
    tags.className = "app-tags";
    appLanguages(app).slice(0, 3).forEach((lang) => {
      const meta = languageMeta(lang);
      const tag = document.createElement("span");
      tag.className = "tag lang";
      tag.innerHTML = `${meta.icon ? `<img src="${meta.icon}" alt="" onerror="this.remove()">` : ""}${escapeHtml(meta.label)}`;
      tags.appendChild(tag);
    });
    card.appendChild(tags);

    const links = document.createElement("div");
    links.className = "app-links";
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
    card.appendChild(links);

    return card;
  }

  function renderGrid() {
    const grid = document.getElementById("app-grid");
    const empty = document.getElementById("empty-state");
    const resultCount = document.getElementById("result-count");

    const filtered = state.apps.filter(matchesFilters);
    grid.innerHTML = "";

    if (filtered.length === 0) {
      grid.hidden = true;
      empty.hidden = false;
    } else {
      grid.hidden = false;
      empty.hidden = true;
      const fragment = document.createDocumentFragment();
      filtered.forEach((app) => fragment.appendChild(buildCard(app)));
      grid.appendChild(fragment);
    }

    resultCount.textContent = `${filtered.length} of ${state.apps.length} apps`;
  }

  function setupSearch() {
    const input = document.getElementById("search");
    const clearBtn = document.getElementById("search-clear");
    input.addEventListener("input", () => {
      state.query = input.value.trim().toLowerCase();
      clearBtn.hidden = state.query.length === 0;
      renderGrid();
    });
    clearBtn.addEventListener("click", () => {
      input.value = "";
      state.query = "";
      clearBtn.hidden = true;
      renderGrid();
      input.focus();
    });
  }

  function setupResetFilters() {
    document.getElementById("reset-filters").addEventListener("click", () => {
      state.activeCategory = "all";
      state.activeLanguages.clear();
      state.query = "";
      document.getElementById("search").value = "";
      document.getElementById("search-clear").hidden = true;
      renderSidebar();
      renderLanguageFilter();
      renderGrid();
    });
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
    });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  async function init() {
    setupTheme();
    setupSearch();
    setupResetFilters();
    setupScrollTop();

    try {
      await loadData();
      renderStats();
      renderSidebar();
      renderLanguageFilter();
      renderGrid();
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
