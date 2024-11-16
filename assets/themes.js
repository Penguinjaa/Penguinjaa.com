const themeMap = {
  "DOWNTOWN": "theme1",
  "NEO-TOKYO": "theme2",
  "MONOCHROME": "theme3",
  "KANYE UNIVERSE CITY": "theme4",
};

window.onload = () => {
  const savedTheme = localStorage.getItem("currentTheme") || "DOWNTOWN";
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