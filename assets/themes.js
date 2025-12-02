const themeMap = {
  "NEO-TOKYO": "theme1",
  "UNIVERSE CITY": "theme2",
  "EMOLESBIAN": "theme3",
  "FANCY THAT": "theme4",
  "DOWNTOWN": "theme5",
  "MONOCHROME": "theme6"
};

window.onload = () => {
  const savedTheme = localStorage.getItem("currentTheme") || "EMOLESBIAN!";
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