// Favorites storage: all localStorage access lives here
// localStorage keeps only strings, so data goes through JSON

const STORAGE_KEY = 'book-catalog:favorites';

export const getFavorites = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // Broken JSON or blocked storage: return an empty list
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const isFavorite = (id) => getFavorites().some((book) => book.id === id);

export const addFavorite = (book) => {
  if (isFavorite(book.id)) return;
  saveFavorites([...getFavorites(), book]);
};

export const removeFavorite = (id) => {
  saveFavorites(getFavorites().filter((book) => book.id !== id));
};