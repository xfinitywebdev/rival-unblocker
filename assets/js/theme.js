// theme-changer.js

function changeTheme(theme) {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const newThemeHref = `assets/css/themes/${theme}.css`;
    themeStylesheet.setAttribute('href', newThemeHref);
  
    // Save the selected theme to localStorage
    localStorage.setItem('selectedTheme', theme);
  }
  
  function applySavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      changeTheme(savedTheme);
    }
  }
  
  function applyTheme() {
    applySavedTheme();
    // You can add additional logic here if needed
  }
  