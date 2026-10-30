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
  let activeFilter = "Todos", toastTimeout;
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function visibleScripts() {
    const q = searchInput.value.trim().toLocaleLowerCase("pt-BR");
    let list = scripts.filter(s => (activeFilter === "Todos" || s.category === activeFilter) &&
      [s.title,s.category,s.description,s.level,s.place,...(s.tags||[])].join(" ").toLocaleLowerCase("pt-BR").includes(q));
    if (sortSelect.value === "az") list.sort((a,b)=>a.title.localeCompare(b.title,"pt-BR"));
    if (sortSelect.value === "category") list.sort((a,b)=>a.category.localeCompare(b.category,"pt-BR"));
    if (sortSelect.value === "featured") list.sort((a,b)=>Number(!!b.featured)-Number(!!a.featured));
    return list;
  }
  function card(s) {
    return `<article class="script-card">
      <div class="card-topline"><div class="card-icon">${escapeHTML(s.icon)}</div><span class="category-label">${escapeHTML(s.category)}</span></div>
      <h3 class="card-title">${escapeHTML(s.title)}</h3><p class="card-description">${escapeHTML(s.description)}</p>
      <div class="card-meta"><span>${escapeHTML(s.level)}</span><span class="meta-dot"></span><span>${escapeHTML(s.place)}</span></div>
      <div class="code-block"><div class="code-block-head"><span>LUAU • EXEMPLO PARA SEU JOGO</span><span>.lua</span></div><pre><code>${escapeHTML(s.code)}</code></pre></div>
      <div class="card-actions"><button class="copy-btn" type="button" data-copy="${escapeHTML(s.id)}">▣ Copiar código</button><a class="details-btn source-btn" href="${escapeHTML(s.source)}" target="_blank" rel="noopener noreferrer">Documentação ↗</a></div>
    </article>`;
  }
  function render() {
    const list = visibleScripts();
    container.innerHTML = list.map(card).join("");
    totalCount.textContent = String(scripts.length).padStart(2,"0");
    allCount.textContent = scripts.length;
    resultCount.textContent = `${list.length} ${list.length===1?"recurso encontrado":"recursos encontrados"}`;
    emptyState.classList.toggle("hidden",list.length!==0);
    container.classList.toggle("hidden",list.length===0);
    filterButtons.querySelectorAll("[data-filter]").forEach(b=>{
      const on=b.dataset.filter===activeFilter;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));
    });
  }
  function showToast(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove("show"),2200);}
  async function copy(s){
    try {
      if(navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(s.code);
      else {const t=document.createElement("textarea");t.value=s.code;t.style.position="fixed";t.style.opacity="0";document.body.appendChild(t);t.select();if(!document.execCommand("copy"))throw Error();t.remove();}
      showToast("Código copiado! Cole no Roblox Studio.");
    } catch {showToast("Não foi possível copiar automaticamente.");}
  }
  filterButtons.addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;render();});
  searchInput.addEventListener("input",render);sortSelect.addEventListener("change",render);
  clearFilters.addEventListener("click",()=>{searchInput.value="";activeFilter="Todos";sortSelect.value="featured";render();searchInput.focus();});
  container.addEventListener("click",e=>{const b=e.target.closest("[data-copy]");if(b){const s=scripts.find(x=>x.id===b.dataset.copy);if(s)copy(s);}});
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();searchInput.focus();}if(e.key==="Escape"&&document.activeElement===searchInput){searchInput.value="";render();searchInput.blur();}});
  document.getElementById("currentYear").textContent=new Date().getFullYear();render();
})();