const themeMap = {
  "NEO-TOKYO":      { file: "neotokyo.css",     dataTheme: "neo-tokyo" },
  "UNIVERSE CITY":  { file: "universecity.css",  dataTheme: "universe-city" },
  "EMOLESBIAN!":    { file: "emolesbian.css",    dataTheme: "emo-lesbian" },
  "FANCY THAT":     { file: "fancythat.css",     dataTheme: "fancy-that" },
  "MONOCHROME":     { file: "monochrome.css",    dataTheme: "monochrome" }
};

function setTheme(name) {
  localStorage.setItem("currentTheme", name);
  const file = themeMap[name]?.file;
  if (!file) return;
  document.querySelectorAll('link[href*="/themes/"]').forEach(link => {
    link.disabled = !link.href.endsWith(file);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const buttons = document.getElementById("theme-buttons");
  if (buttons) {
    Object.entries(themeMap).forEach(([name, { dataTheme }]) => {
      const btn = document.createElement("button");
      btn.dataset.theme = dataTheme;
      btn.dataset.themeName = name;
      btn.onclick = () => setTheme(name);
      buttons.appendChild(btn);
    });
  }

  const saved = localStorage.getItem("currentTheme") || "NEO-TOKYO";
  setTheme(saved);
});