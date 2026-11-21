import { createElement } from '../utils/dom.js';

// Cover image, or a grey "No cover" block
const createCover = (book) => {
  const cover = createElement('div', 'book-card__cover');

  if (book.coverUrl) {
    const image = createElement('img', 'book-card__img');
    image.src = book.coverUrl;
    image.alt = `Cover of ${book.title}`;
    image.loading = 'lazy';
    cover.append(image);
  } else {
    cover.append(createElement('div', 'book-card__placeholder', 'No cover'));
  }

  return cover;
};

// Builds a book card. Calls onAddFavorite(book) when the button is pressed.
// isFavorite turns the button into a disabled "In favorites".
export const createBookCard = (book, { isFavorite, onAddFavorite }) => {
  const card = createElement('article', 'book-card');
  const body = createElement('div', 'book-card__body');

  const authors = book.authors.length > 0 ? book.authors.join(', ') : 'Unknown';
  const year = book.year ?? 'Unknown';

  const button = createElement(
    'button',
    'btn book-card__btn',
    isFavorite ? 'In favorites' : 'Add to favorites',
  );
  button.type = 'button';
  button.disabled = isFavorite;
  button.addEventListener('click', () => onAddFavorite(book));

  const titleElement = createElement('h3', 'book-card__title', book.title);
  titleElement.title = book.title;

  const authorElement = createElement('p', 'book-card__author', authors);
  authorElement.title = authors;

  body.append(
    titleElement,
    authorElement,
    createElement('p', 'book-card__year', year),
    button,
  );

  card.append(createCover(book), body);
  return card;
};