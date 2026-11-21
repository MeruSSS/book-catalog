# Book Catalog

A small web app for searching books via the Open Library API and keeping a personal list of favorites.
Built with HTML, CSS and JavaScript (ES6+) and bundled with Vite. No frameworks or libraries are used in the app.

## Task

The task description is available here: [LINK TO THE TASK DOCUMENT](https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view)

### Implemented features

- Book search by title, author or keyword (Open Library API, `fetch`)
- Book cards: cover (or a "No cover" placeholder), title, authors, first publish year, "Add to favorites" button
- Loading, empty input, short query, "Nothing found" and "Network error" states
- Favorites list with add / remove, stored in `localStorage` and restored after a page reload
- Responsive layout (desktop and mobile)
- Extra: filter by author
- Extra: light / dark theme switch (saved in `localStorage`)
- Extra: search as you type with debounce
- Extra: deployment (see the link below)

Live demo: <LINK TO DEPLOYED APP>

## How to run the app

Requirements: Node.js 18 or newer.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build the optimized production bundle into the dist/ folder
npm run build

# 4. Preview the production build locally
npm run preview
```

The build output in `dist/` contains `index.html`, a single `main.js` and the `assets/` folder (CSS and icons), regardless of how many source files there are.

## Project structure

```
book-catalog/
├── public/
│   └── assets/            # Static files copied as is to dist/assets (icons)
├── src/
│   ├── api/               # Requests to Open Library; returns plain data, no DOM code
│   ├── components/        # Functions that build DOM elements (book card, favorite item)
│   ├── storage/           # localStorage access (favorites)
│   ├── utils/             # Small helpers (debounce, DOM helper, theme switch)
│   ├── index.css          # All styles and theme variables
│   └── main.js            # Entry point: connects search, rendering, favorites and theme
├── index.html             # Page markup
├── vite.config.js         # Vite build configuration
└── package.json           # Scripts and dev dependencies
```