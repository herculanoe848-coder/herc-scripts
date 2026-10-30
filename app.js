(() => {
  "use strict";

  const scripts = Array.isArray(window.HERC_SCRIPTS) ? window.HERC_SCRIPTS : [];
  const container = document.getElementById("scriptsContainer");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.getElementById("filterButtons");
  const sortSelect = document.getElementById("sortSelect");
  const resultCount = document.getElementById("resultCount");
  const totalCount = document.getElementById("totalCount");
  const allCount = document.getElementById("allCount");
  const emptyState = document.getElementById("emptyState");
  const clearFilters = document.getElementById("clearFilters");
  const toast = document.getElementById("toast");
  let activeFilter = "Todos";
  let toastTimeout;

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  function getVisibleScripts() {
    const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
    let visible = scripts.filter((item) => {
      const matchesFilter = activeFilter === "Todos" || item.category === activeFilter;
      const searchable = [
        item.title, item.category, item.description, item.level, item.place,
        ...(item.tags || []), item.code
      ].join(" ").toLocaleLowerCase("pt-BR");
      return matchesFilter && (!query || searchable.includes(query));
    });

    const sort = sortSelect.value;
    if (sort === "az") visible.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    if (sort === "category") visible.sort((a, b) =>
      a.category.localeCompare(b.category, "pt-BR") || a.title.localeCompare(b.title, "pt-BR"));
    if (sort === "featured") visible.sort((a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.title.localeCompare(b.title, "pt-BR"));
    return visible;
  }

  function cardTemplate(item) {
    return `
      <article class="script-card">
        <div class="card-topline">
          <div class="card-icon" aria-hidden="true">${escapeHTML(item.icon)}</div>
          <span class="category-label">${escapeHTML(item.category)}</span>
        </div>
        <h3 class="card-title">${escapeHTML(item.title)}</h3>
        <p class="card-description">${escapeHTML(item.description)}</p>
        <div class="card-meta"><span>${escapeHTML(item.level)}</span><span class="meta-dot"></span><span>${escapeHTML(item.place)}</span></div>
        <div class="code-block">
          <div class="code-block-head"><span>EXEMPLO LUAU</span><span>.lua</span></div>
          <pre><code>${escapeHTML(item.code)}</code></pre>
        </div>
        <div class="card-actions">
          <button class="copy-btn" type="button" data-copy="${escapeHTML(item.id)}">▣ &nbsp; Copiar código</button>
          <button class="details-btn" type="button" data-details="${escapeHTML(item.id)}" aria-label="Ver detalhes de ${escapeHTML(item.title)}">Detalhes</button>
        </div>
      </article>`;
  }

  function render() {
    const visible = getVisibleScripts();
    container.innerHTML = visible.map(cardTemplate).join("");
    totalCount.textContent = String(scripts.length).padStart(2, "0");
    allCount.textContent = String(scripts.length);
    resultCount.textContent = `${visible.length} ${visible.length === 1 ? "exemplo encontrado" : "exemplos encontrados"}`;
    emptyState.classList.toggle("hidden", visible.length !== 0);
    container.classList.toggle("hidden", visible.length === 0);

    filterButtons.querySelectorAll("[data-filter]").forEach((button) => {
      const isActive = button.dataset.filter === activeFilter;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  async function copyCode(item) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(item.code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = item.code;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand("copy");
        textarea.remove();
        if (!successful) throw new Error("Cópia não disponível");
      }
      showToast(`Código de "${item.title}" copiado!`);
    } catch (error) {
      showToast("Não foi possível copiar automaticamente. Selecione o código e copie.");
    }
  }

  filterButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    render();
  });

  searchInput.addEventListener("input", render);
  sortSelect.addEventListener("change", render);
  clearFilters.addEventListener("click", () => {
    searchInput.value = "";
    activeFilter = "Todos";
    sortSelect.value = "featured";
    render();
    searchInput.focus();
  });

  container.addEventListener("click", (event) => {
    const copyButton = event.target.closest("[data-copy]");
    if (copyButton) {
      const item = scripts.find((script) => script.id === copyButton.dataset.copy);
      if (item) copyCode(item);
      return;
    }

    const detailsButton = event.target.closest("[data-details]");
    if (detailsButton) {
      const item = scripts.find((script) => script.id === detailsButton.dataset.details);
      if (!item) return;
      showToast(`Onde usar: ${item.place}`);
    }
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      searchInput.focus();
    }
    if (event.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      render();
      searchInput.blur();
    }
  });

  document.getElementById("currentYear").textContent = String(new Date().getFullYear());
  render();
})();
