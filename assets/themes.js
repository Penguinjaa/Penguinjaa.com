const themeMap = {
  "NEO-TOKYO": "themeOne",
  "MONOCHROME": "themeTwo",
  "KANYE UNIVERSE CITY": "themeThree",
  "v3.33": "themeFour",
  "v2.22": "themeFive",
  "v1.11": "themeSix"
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