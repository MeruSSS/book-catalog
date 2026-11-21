import { createElement } from '../utils/dom.js';

// Compact row for the favorites list. Calls onRemove(id) on button click.
export const createFavoriteItem = (book, onRemove) => {
  const item = createElement('div', 'fav-item');

  const thumb = createElement('div', 'fav-item__thumb');
  if (book.coverUrl) {
    const image = createElement('img');
    image.src = book.coverUrl;
    image.alt = '';
    thumb.append(image);
  }

  const authors = book.authors.length > 0 ? book.authors.join(', ') : 'Unknown';

  const info = createElement('div', 'fav-item__info');
  info.append(
    createElement('p', 'fav-item__title', book.title),
    createElement('p', 'fav-item__author', authors),
  );

  const removeButton = createElement('button', 'fav-item__remove', 'Remove');
  removeButton.type = 'button';
  removeButton.addEventListener('click', () => onRemove(book.id));

  item.append(thumb, info, removeButton);
  return item;
};