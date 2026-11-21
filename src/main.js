import './index.css';
import { searchBooks } from './api/openLibrary.js';
import { createBookCard } from './components/bookCard.js';
import { createFavoriteItem } from './components/favoriteItem.js';
import { getFavorites, isFavorite, addFavorite, removeFavorite } from './storage/favorites.js';
import { createElement } from './utils/dom.js';
import { initTheme, toggleTheme, getTheme } from './utils/theme.js';
import { debounce } from './utils/debounce.js';

const MIN_QUERY_LENGTH = 3; // Open Library rejects shorter queries
const SEARCH_DELAY = 500; // ms to wait after the last keystroke

// DOM elements
const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const status = document.querySelector('#status');
const results = document.querySelector('#results');
const authorFilter = document.querySelector('#author-filter');
const favoritesList = document.querySelector('#favorites-list');
const favoritesCount = document.querySelector('#favorites-count');
const themeToggle = document.querySelector('#theme-toggle');

// State
let currentBooks = []; // books from the latest search
let selectedAuthor = ''; // author chosen in the filter ('' = all)
let latestSearch = 0; // number of the latest search, to ignore outdated answers

const showStatus = (message) => {
  status.textContent = message;
};

// Favorites
const handleAddFavorite = (book) => {
  addFavorite(book);
  renderAll();
};

const handleRemoveFavorite = (id) => {
  removeFavorite(id);
  renderAll();
};

// Author filter
const getUniqueAuthors = (books) => {
  const names = books.flatMap((book) => book.authors);
  return [...new Set(names)].sort((a, b) => a.localeCompare(b));
};

const getVisibleBooks = () =>
  selectedAuthor
    ? currentBooks.filter((book) => book.authors.includes(selectedAuthor))
    : currentBooks;

const renderAuthorFilter = () => {
  const authors = getUniqueAuthors(currentBooks);

  const allOption = createElement('option', '', 'All authors');
  allOption.value = '';

  const options = authors.map((author) => {
    const option = createElement('option', '', author);
    option.value = author;
    return option;
  });

  authorFilter.replaceChildren(allOption, ...options);
  authorFilter.value = selectedAuthor;
  authorFilter.hidden = authors.length === 0; // nothing to filter by
};

const handleAuthorChange = () => {
  selectedAuthor = authorFilter.value;
  renderResults();
};

// Rendering
const renderResults = () => {
  const cards = getVisibleBooks().map((book) =>
    createBookCard(book, {
      isFavorite: isFavorite(book.id),
      onAddFavorite: handleAddFavorite,
    }),
  );
  results.replaceChildren(...cards);
};

const renderFavorites = () => {
  const favorites = getFavorites();
  favoritesCount.textContent = favorites.length;

  if (favorites.length === 0) {
    favoritesList.replaceChildren(createElement('p', 'favorites__empty', 'No favorites yet'));
    return;
  }

  const items = favorites.map((book) => createFavoriteItem(book, handleRemoveFavorite));
  favoritesList.replaceChildren(...items);
};

// Redraws both lists so button states stay in sync
const renderAll = () => {
  renderResults();
  renderFavorites();
};

// Search
const runSearch = async (query) => {
  const thisSearch = ++latestSearch;

  currentBooks = [];
  selectedAuthor = '';
  renderAuthorFilter();
  renderResults();

  if (!query) {
    showStatus('Enter a search query');
    return;
  }

  if (query.length < MIN_QUERY_LENGTH) {
    showStatus(`Enter at least ${MIN_QUERY_LENGTH} characters`);
    return;
  }

  showStatus('Loading...');

  try {
    const books = await searchBooks(query);

    // A newer search has started while we were waiting: drop this answer
    if (thisSearch !== latestSearch) return;

    if (books.length === 0) {
      showStatus('Nothing found');
      return;
    }

    showStatus('');
    currentBooks = books;
    renderAuthorFilter();
    renderResults();
  } catch (error) {
    if (thisSearch !== latestSearch) return;
    console.error(error);
    showStatus('Network error');
  }
};

const debouncedSearch = debounce(runSearch, SEARCH_DELAY);

const handleSubmit = (event) => {
  event.preventDefault(); // stop the page from reloading on submit
  debouncedSearch.cancel(); // no need to wait: search right now
  runSearch(input.value.trim());
};

const handleInput = () => {
  debouncedSearch(input.value.trim());
};

// Theme
// The button label shows what a click will switch to
const updateThemeButton = () => {
  themeToggle.textContent = getTheme() === 'dark' ? 'Light theme' : 'Dark theme';
};

const handleThemeToggle = () => {
  toggleTheme();
  updateThemeButton();
};

// Init
form.addEventListener('submit', handleSubmit);
input.addEventListener('input', handleInput);
authorFilter.addEventListener('change', handleAuthorChange);
themeToggle.addEventListener('click', handleThemeToggle);

renderFavorites(); // restore favorites from localStorage
initTheme(); // apply the saved (or system) theme
updateThemeButton();