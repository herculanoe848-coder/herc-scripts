(() => {
  const scripts = Array.isArray(window.HERC_SCRIPTS) ? window.HERC_SCRIPTS : [];
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");
  const grid = document.getElementById("scriptGrid");
  const emptyState = document.getElementById("emptyState");
  const categoryGrid = document.getElementById("categoryGrid");
  const modal = document.getElementById("scriptModal");
  const toast = document.getElementById("toast");
  let currentScript = null;
  let toastTimer;

  const categoryMeta = {
    "Fundamentos": { icon: "⌘", description: "Conceitos básicos e estrutura" },
    "Mecânicas": { icon: "⚙", description: "Sistemas de jogo e objetos" },
    "Interação": { icon: "↗", description: "Interações com o mundo" },
    "Personagem": { icon: "♟", description: "Movimento e personagens" },
    "Interface": { icon: "▤", description: "UI, botões e menus" }
  };

  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function renderCategories() {
    const categories = [...new Set(scripts.map(item => item.category))].sort();
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
    categoryGrid.innerHTML = categories.map(category => {
      const meta = categoryMeta[category] || { icon: "✦", description: "Explore esta categoria" };
      const count = scripts.filter(item => item.category === category).length;
      return `<button class="category-card" type="button" data-category="${escapeHtml(category)}">
        <span class="category-emoji">${meta.icon}</span><span><strong>${escapeHtml(category)}</strong><small>${count} ${count === 1 ? "exemplo" : "exemplos"} · ${escapeHtml(meta.description)}</small></span>
      </button>`;
    }).join("");
    categoryGrid.querySelectorAll("[data-category]").forEach(button => {
      button.addEventListener("click", () => {
        categoryFilter.value = button.dataset.category;
        document.getElementById("scripts").scrollIntoView({ behavior: "smooth" });
        renderScripts();
      });
    });
    document.getElementById("scriptCount").textContent = scripts.length;
    document.getElementById("gameCount").textContent = categories.length;
  }

  function renderScripts() {
    const term = searchInput.value.trim().toLocaleLowerCase("pt-BR");
    const category = categoryFilter.value;
    let filtered = scripts.filter(item => {
      const text = `${item.title} ${item.category} ${item.game} ${item.description}`.toLocaleLowerCase("pt-BR");
      return text.includes(term) && (category === "all" || item.category === category);
    });
    if (sortFilter.value === "az") filtered.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    else filtered.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

    grid.innerHTML = filtered.map(item => `<article class="script-card">
      <div class="card-top"><span class="card-icon">&lt;/&gt;</span><span class="pill">${escapeHtml(item.category)}</span></div>
      <h3 class="card-title">${escapeHtml(item.title)}</h3>
      <p class="card-description">${escapeHtml(item.description)}</p>
      <div class="card-meta"><span>Luau · Roblox Studio</span><span>${escapeHtml(item.game)}</span></div>
      <button class="card-open" type="button" data-script-id="${escapeHtml(item.id)}"><span>VER SCRIPT E CÓDIGO</span><span>↗</span></button>
    </article>`).join("");
    emptyState.hidden = filtered.length > 0;
    grid.querySelectorAll("[data-script-id]").forEach(button => {
      button.addEventListener("click", () => openScript(button.dataset.scriptId));
    });
  }

  function openScript(id) {
    currentScript = scripts.find(item => item.id === id);
    if (!currentScript) return;
    document.getElementById("modalTitle").textContent = currentScript.title;
    document.getElementById("modalCategory").textContent = currentScript.category.toUpperCase();
    document.getElementById("modalDescription").textContent = `${currentScript.description} Compatibilidade: ${currentScript.game}.`;
    document.getElementById("modalCode").textContent = currentScript.code;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  async function copyCode() {
    if (!currentScript) return;
    try {
      await navigator.clipboard.writeText(currentScript.code);
      showToast("Código copiado!");
    } catch {
      const area = document.createElement("textarea");
      area.value = currentScript.code;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      showToast(ok ? "Código copiado!" : "Não foi possível copiar. Selecione o código manualmente.");
    }
  }

  searchInput.addEventListener("input", renderScripts);
  categoryFilter.addEventListener("change", renderScripts);
  sortFilter.addEventListener("change", renderScripts);
  document.getElementById("copyButton").addEventListener("click", copyCode);
  modal.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      searchInput.focus();
    }
  });

  renderCategories();
  renderScripts();
})();
