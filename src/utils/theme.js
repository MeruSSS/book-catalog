// Light/dark theme: set as data-theme on <html>, saved in localStorage

const STORAGE_KEY = 'book-catalog:theme';

const readSavedTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // storage blocked: the theme just won't be remembered
  }
};

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
};

export const getTheme = () => document.documentElement.dataset.theme;

// a saved choice wins, otherwise follow the system theme
export const initTheme = () => {
  setTheme(readSavedTheme() ?? getSystemTheme());
};

export const toggleTheme = () => {
  const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  saveTheme(nextTheme);
};