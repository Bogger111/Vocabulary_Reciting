const appState = {
  wordBookId: getInitialWordBookId(wordRootStore.getWordBook()),
  wordBook: getWordBook(getInitialWordBookId(wordRootStore.getWordBook())),
  words: [],
  groups: [],
  query: "",
  filter: "all",
  revealedMeanings: new Set(),
  visibleCount: PAGE_SIZE,
  loading: true,
  error: ""
};

const app = document.querySelector("#app");
const themeToggle = document.querySelector("#themeToggle");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeQuery(value) {
  return String(value || "").trim().toLowerCase();
}

function getCurrentRoute() {
  const match = (window.location.hash || "#/").match(/^#\/prefix\/([^/]+)$/);
  return match ? { name: "detail", prefix: decodeURIComponent(match[1]) } : { name: "home" };
}

function setDocumentTitle(title) {
  document.title = `${title} - WordRoot`;
}

function renderProgressPanel(words, label = "总进度") {
  const stats = calculateStats(words);

  return `
    <div class="progress-panel" aria-label="${escapeHtml(label)}">
      <div>
        <span class="progress-label">${escapeHtml(label)}</span>
        <strong>${stats.learned} / ${stats.total}</strong>
      </div>
      <div class="progress-track" aria-hidden="true">
        <span style="width: ${stats.completionRate}%"></span>
      </div>
    </div>
  `;
}

function renderWordBookSelector() {
  return `
    <label class="book-select" for="wordBookSelect">
      <span>词库</span>
      <select id="wordBookSelect" aria-label="选择词库">
        ${getSelectableWordBooks()
          .map((wordBook) => {
            const selected = wordBook.id === appState.wordBookId ? " selected" : "";
            const disabled = wordBook.enabled === false ? " disabled" : "";
            const label = wordBook.enabled === false ? `${wordBook.label}（预留）` : wordBook.label;
            return `<option value="${escapeHtml(wordBook.id)}"${selected}${disabled}>${escapeHtml(label)}</option>`;
          })
          .join("")}
      </select>
    </label>
  `;
}

function renderStatusPage(title, message) {
  app.innerHTML = `
    <section class="hero" aria-labelledby="statusTitle">
      <p class="eyebrow">WordRoot</p>
      <h1 id="statusTitle">${escapeHtml(title)}</h1>
      <p class="hero-copy">${escapeHtml(message)}</p>
    </section>
  `;
}

function renderHome() {
  setDocumentTitle(appState.wordBook.headline);
  const groups = filterGroups(appState.groups, appState.query);
  const stats = calculateStats(appState.words);

  app.innerHTML = `
    <section class="hero" aria-labelledby="homeTitle">
      <p class="eyebrow">${escapeHtml(appState.wordBook.title)}</p>
      <h1 id="homeTitle">${escapeHtml(appState.wordBook.headline)}</h1>
      <p class="hero-copy">${escapeHtml(appState.wordBook.description)}</p>
    </section>

    <section class="summary-grid" aria-label="总体统计">
      <div class="summary-card">
        <span>总词数</span>
        <strong>${stats.total}</strong>
      </div>
      <div class="summary-card">
        <span>已学数量</span>
        <strong>${stats.learned}</strong>
      </div>
      <div class="summary-card">
        <span>完成率</span>
        <strong>${stats.completionRate}%</strong>
      </div>
    </section>

    <section class="tools" aria-label="学习工具">
      ${renderWordBookSelector()}
      <label class="search-box" for="homeSearch">
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input id="homeSearch" type="search" placeholder="搜索英文、中文或前缀" autocomplete="off" value="${escapeHtml(appState.query)}" />
      </label>
      ${renderProgressPanel(appState.words, "总进度")}
    </section>

    <section class="section-heading">
      <div>
        <p class="eyebrow">Prefixes</p>
        <h2>前缀分类</h2>
      </div>
      <p class="result-count">共 ${groups.length} 个分类</p>
    </section>

    <section class="prefix-grid" aria-label="前缀分类列表">
      ${groups.map(renderPrefixCard).join("")}
    </section>
    ${groups.length ? "" : '<p class="empty-state">没有找到匹配的前缀或单词。</p>'}
  `;

  bindSearch("#homeSearch", renderHome);
  bindWordBookSelector();
}

function renderPrefixCard(group) {
  const stats = calculateStats(group.words);

  return `
    <a class="prefix-card" href="#/prefix/${encodeURIComponent(group.prefix)}" aria-label="进入 ${escapeHtml(group.label)} 分类学习">
      <div class="prefix-card-header">
        <h3 class="prefix-name">${escapeHtml(group.label)}</h3>
        <span class="word-count">${stats.total} 个词</span>
      </div>
      <div>
        <p class="prefix-meaning">按 ${escapeHtml(group.label)} 分类</p>
        <p class="prefix-description">${escapeHtml(group.words.slice(0, 5).map((word) => word.word).join(" / "))}</p>
      </div>
      <div class="card-footer">
        <div class="card-progress-row">
          <span>完成率</span>
          <strong>${stats.completionRate}%</strong>
        </div>
        <div class="progress-track" aria-hidden="true">
          <span style="width: ${stats.completionRate}%"></span>
        </div>
        <span class="enter-link">进入学习 <span aria-hidden="true">→</span></span>
      </div>
    </a>
  `;
}

function renderDetail(prefix) {
  const group = appState.groups.find((item) => item.prefix === prefix);

  if (!group) {
    window.location.hash = "#/";
    return;
  }

  setDocumentTitle(`${appState.wordBook.label} ${group.label} 分类学习`);
  let words = filterWords(group.words, appState.query);

  if (appState.filter === "favorite") {
    words = words.filter((word) => wordRootStore.isFavorite(word.id));
  }

  if (appState.filter === "learned") {
    words = words.filter((word) => wordRootStore.isLearned(word.id));
  }

  if (appState.filter === "unlearned") {
    words = words.filter((word) => !wordRootStore.isLearned(word.id));
  }

  const stats = calculateStats(group.words);
  const visibleWords = getVisiblePageItems(words, appState.visibleCount);
  const moreAvailable = hasMoreItems(words, appState.visibleCount);

  app.innerHTML = `
    <div class="detail-top">
      <a class="back-button" href="#/">← 返回首页</a>
      <span class="status-pill">${stats.learned} / ${stats.total} 已学</span>
    </div>

    <section class="detail-hero" aria-labelledby="detailTitle">
      <p class="eyebrow">Prefix Detail</p>
      <h1 id="detailTitle">${escapeHtml(group.label)}</h1>
      <p class="detail-copy">当前分类共 ${stats.total} 个 ${escapeHtml(appState.wordBook.label)} 单词，每次显示 50 个，避免长列表卡顿。</p>
    </section>

    <section class="summary-grid" aria-label="分类统计">
      <div class="summary-card">
        <span>总词数</span>
        <strong>${stats.total}</strong>
      </div>
      <div class="summary-card">
        <span>已学数量</span>
        <strong>${stats.learned}</strong>
      </div>
      <div class="summary-card">
        <span>完成率</span>
        <strong>${stats.completionRate}%</strong>
      </div>
    </section>

    <section class="tools" aria-label="分类学习工具">
      ${renderWordBookSelector()}
      <label class="search-box" for="detailSearch">
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input id="detailSearch" type="search" placeholder="搜索英文或中文" autocomplete="off" value="${escapeHtml(appState.query)}" />
      </label>
      ${renderProgressPanel(group.words, "分类进度")}
    </section>

    <div class="filter-row" role="group" aria-label="单词筛选">
      ${renderFilterButton("all", "全部")}
      ${renderFilterButton("favorite", "只看收藏")}
      ${renderFilterButton("unlearned", "未学习")}
      ${renderFilterButton("learned", "已学习")}
    </div>

    <section class="section-heading">
      <div>
        <p class="eyebrow">Words</p>
        <h2>单词列表</h2>
      </div>
      <p class="result-count">显示 ${visibleWords.length} / ${words.length}</p>
    </section>

    <section class="word-list" aria-label="单词列表">
      ${visibleWords.map(renderWordCard).join("")}
    </section>
    ${moreAvailable ? '<button class="load-more" id="loadMore" type="button">加载更多 50 个</button>' : ""}
    ${words.length ? "" : '<p class="empty-state">当前条件下没有单词。</p>'}
  `;

  bindDetailEvents(group.prefix);
}

function renderFilterButton(value, label) {
  const active = appState.filter === value ? " active" : "";
  return `<button class="filter-button${active}" type="button" data-filter="${value}">${label}</button>`;
}

function renderWordCard(word) {
  const isFavorite = wordRootStore.isFavorite(word.id);
  const isLearned = wordRootStore.isLearned(word.id);
  const isMeaningVisible = appState.revealedMeanings.has(word.id);

  return `
    <article class="word-card" id="${escapeHtml(word.id)}">
      <div class="word-card-header">
        <div>
          <h3 class="word-title">${escapeHtml(word.word)}</h3>
          <p class="phonetic">${escapeHtml(word.phonetic || "暂无音标")}</p>
        </div>
        <span class="status-pill">${isLearned ? "已学" : "未学"}</span>
      </div>
      <div class="word-meta">
        <span class="tag">${escapeHtml(getPrefixLabel(word.prefix))}</span>
        ${isFavorite ? '<span class="tag favorite">已收藏</span>' : ""}
      </div>
      ${
        isMeaningVisible
          ? `<p class="word-meaning">${escapeHtml(word.meaning)}</p>`
          : `<button class="meaning-reveal" type="button" data-action="toggle-meaning" data-word-id="${escapeHtml(word.id)}">显示中文释义</button>`
      }
      <p class="example">Example: ${escapeHtml(word.example || "No example yet.")}</p>
      <div class="word-actions">
        <button class="word-action ${isFavorite ? "is-active" : ""}" type="button" data-action="favorite" data-word-id="${escapeHtml(word.id)}">
          ${isFavorite ? "★ 已收藏" : "☆ 收藏"}
        </button>
        ${
          isMeaningVisible
            ? `<button class="word-action is-active" type="button" data-action="toggle-meaning" data-word-id="${escapeHtml(word.id)}">隐藏释义</button>`
            : ""
        }
        <button class="word-action ${isLearned ? "is-active" : ""}" type="button" data-action="learned" data-word-id="${escapeHtml(word.id)}">
          ${isLearned ? "✓ 已学习" : "标记已学"}
        </button>
      </div>
    </article>
  `;
}

function bindSearch(selector, renderFn) {
  const search = app.querySelector(selector);

  search.addEventListener("input", (event) => {
    appState.query = event.target.value;
    appState.visibleCount = PAGE_SIZE;
    renderFn();
    const input = app.querySelector(selector);
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  });
}

function bindWordBookSelector() {
  const selector = app.querySelector("#wordBookSelect");

  if (!selector) {
    return;
  }

  selector.addEventListener("change", (event) => {
    switchWordBook(event.target.value);
  });
}

function bindDetailEvents(prefix) {
  bindSearch("#detailSearch", () => renderDetail(prefix));
  bindWordBookSelector();

  app.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.filter = button.dataset.filter;
      appState.visibleCount = PAGE_SIZE;
      renderDetail(prefix);
    });
  });

  app.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const wordId = button.dataset.wordId;

      if (button.dataset.action === "favorite") {
        wordRootStore.toggleFavorite(wordId);
      }

      if (button.dataset.action === "learned") {
        wordRootStore.toggleLearned(wordId);
      }

      if (button.dataset.action === "toggle-meaning") {
        if (appState.revealedMeanings.has(wordId)) {
          appState.revealedMeanings.delete(wordId);
        } else {
          appState.revealedMeanings.add(wordId);
        }
      }

      renderDetail(prefix);
    });
  });

  const loadMore = app.querySelector("#loadMore");

  if (loadMore) {
    loadMore.addEventListener("click", () => {
      const group = appState.groups.find((item) => item.prefix === prefix);
      const words = filterWords(group.words, appState.query);
      appState.visibleCount = getNextVisibleCount(words, appState.visibleCount);
      renderDetail(prefix);
    });
  }
}

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.setAttribute("aria-pressed", theme === "dark");
  themeToggle.querySelector(".theme-text").textContent = theme === "dark" ? "浅色模式" : "深色模式";
}

function bindTheme() {
  applyTheme(wordRootStore.getTheme());

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
    wordRootStore.setTheme(nextTheme);
    applyTheme(nextTheme);
  });
}

function renderRoute() {
  if (appState.loading) {
    renderStatusPage("正在加载词库", `正在读取 ${appState.wordBook.label} 词库，请稍候。`);
    return;
  }

  if (appState.error) {
    renderStatusPage("词库加载失败", appState.error);
    return;
  }

  const route = getCurrentRoute();

  if (route.name === "detail") {
    renderDetail(route.prefix);
  } else {
    appState.filter = "all";
    renderHome();
  }

  app.focus({ preventScroll: true });
}

function resetStudyView() {
  appState.query = "";
  appState.filter = "all";
  appState.revealedMeanings.clear();
  appState.visibleCount = PAGE_SIZE;
}

async function loadActiveWordBook() {
  appState.loading = true;
  appState.error = "";
  renderRoute();

  try {
    const result = await loadWordBookWords(appState.wordBookId);
    appState.wordBook = result.wordBook;
    appState.words = result.words;
    appState.groups = groupWordsByPrefix(appState.words);
  } catch (error) {
    appState.error = `${error.message}。请通过本地服务器访问网站，例如 node server.js。`;
  } finally {
    appState.loading = false;
    renderRoute();
  }
}

async function switchWordBook(wordBookId) {
  if (wordBookId === appState.wordBookId) {
    return;
  }

  appState.wordBookId = getInitialWordBookId(wordBookId);
  appState.wordBook = getWordBook(appState.wordBookId);
  wordRootStore.setWordBook(appState.wordBookId);
  resetStudyView();
  window.location.hash = "#/";
  await loadActiveWordBook();
}

async function initData() {
  await loadActiveWordBook();
}

function init() {
  bindTheme();
  window.addEventListener("hashchange", () => {
    resetStudyView();
    renderRoute();
  });
  renderRoute();
  initData();
}

init();
