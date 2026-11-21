const SEARCH_URL = 'https://openlibrary.org/search.json';
const COVER_URL = 'https://covers.openlibrary.org/b/id';
const RESULTS_LIMIT = 20;
const FIELDS = 'key,title,author_name,first_publish_year,cover_i';

// Converts a raw API item into the book object used in the app
const normalizeBook = (doc) => ({
  id: doc.key,
  title: doc.title ?? 'Untitled',
  authors: doc.author_name ?? [],
  year: doc.first_publish_year ?? null,
  coverUrl: doc.cover_i ? `${COVER_URL}/${doc.cover_i}-M.jpg` : null,  // -M = medium size
});

// Returns a list of books for the query, throws if the request fails
export const searchBooks = async (query) => {
  const params = new URLSearchParams({
    q: query,
    limit: String(RESULTS_LIMIT),
    fields: FIELDS,
  });

  const response = await fetch(`${SEARCH_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.docs.map(normalizeBook);
};