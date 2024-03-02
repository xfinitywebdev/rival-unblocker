function changeTheme(theme) {
    const themeStylesheet = document.getElementById('themeStylesheet');
    const newThemeHref = `assets/css/themes/${theme}.css`;
    themeStylesheet.setAttribute('href', newThemeHref);
  

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

  }
  
