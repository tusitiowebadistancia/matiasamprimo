(() => {
  const $ = (sel) => document.querySelector(sel);

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