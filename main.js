(() => {
  const $ = (sel) => document.querySelector(sel);

    // ✅ Ajuste automático del padding según la altura real del encabezado
  const topbar = document.querySelector(".topbar");
  const setTopbarHeight = () => {
    if (!topbar) return;
    const h = topbar.offsetHeight;
    document.documentElement.style.setProperty("--topbar-h", `${h}px`);
  };

  setTopbarHeight();
  window.addEventListener("resize", setTopbarHeight);

  // Año footer
  const year = new Date().getFullYear();
  const elYear = $("#year");
  if (elYear) elYear.textContent = String(year);

  // WhatsApp (si querés, cambiá el mensaje)
  const phoneDigits = "542262576623"; // +54 2262 576623
  const waMsg = encodeURIComponent("Hola Matías, ¿cómo estás? Te contacto por una oportunidad laboral.");
  const waLink = `https://wa.me/${phoneDigits}?text=${waMsg}`;
  const btnWa = $("#btnWa");
  if (btnWa) btnWa.href = waLink;

  // Imprimir
  const btnPrint = $("#btnPrint");
  if (btnPrint) btnPrint.addEventListener("click", () => window.print());

  // Tema (claro/oscuro)
  const btnTheme = $("#btnTheme");

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cv_theme", theme);
    if (btnTheme) btnTheme.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    if (btnTheme) btnTheme.textContent = theme === "dark" ? "Claro" : "Oscuro";
  };

  const saved = localStorage.getItem("cv_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  if (btnTheme) {
    btnTheme.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
})();

  // ✅ Menú hamburguesa (mobile)
  const btnMenu = document.querySelector("#btnMenu");
  const actionsMenu = document.querySelector("#actionsMenu");

  const closeMenu = () => {
    if (!actionsMenu || !btnMenu) return;
    actionsMenu.classList.remove("is-open");
    btnMenu.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    if (!actionsMenu || !btnMenu) return;
    const open = actionsMenu.classList.toggle("is-open");
    btnMenu.setAttribute("aria-expanded", open ? "true" : "false");
  };

  if (btnMenu && actionsMenu) {
    btnMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Cerrar tocando afuera
    document.addEventListener("click", (e) => {
      if (!actionsMenu.classList.contains("is-open")) return;
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (!actionsMenu.contains(target) && !btnMenu.contains(target)) closeMenu();
    });

    // Cerrar al cambiar tamaño a desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 640) closeMenu();
    });
  }