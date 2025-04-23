const themeMap = {
  "NEO-TOKYO": "theme1",
  "MONOCHROME": "theme2",
  "UNIVERSE CITY": "theme3",
  "MIKU": "theme4"
};

window.onload = () => {
  const savedTheme = localStorage.getItem("currentTheme") || "NEO-TOKYO";
  setTheme(savedTheme);
};

function setTheme(theme) {
  localStorage.setItem("currentTheme", theme);
  toggleThemes(themeMap[theme]);
}

function toggleThemes(activeThemeId) {
  Object.values(themeMap).forEach(themeId => {
    document.getElementById(themeId).disabled = themeId !== activeThemeId;
  });
}