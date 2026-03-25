# Syntax-Terror (Spotify UI Clone)

A multi-page Spotify-inspired UI built with Express + EJS + Sass. This project is intended to demonstrate practical front-end and templating knowledge in a professional, portfolio-ready format. Data is driven from `data/data.json`, and the UI is rendered server-side using reusable EJS partials.

👉 [Open the app](https://syntax-terror-spotify-clone.onrender.com/#)

## Tech Stack
- Node.js + Express (server + routing)
- EJS (templating)
- Sass (SCSS)
- Static assets in `public/`

## Features
- Multiple sections: Home, Search, Discover, Library, Pins, Profile, Liked, Saves, etc.
- Reusable EJS components for cards, sidebar, header, player
- Data-driven content from a single JSON file
- Optional “pinned” items surfaced via `/pins`
- Light/Dark theme toggle (styles defined in `scss/themes/_light.scss`)

## Project Structure
- `index.js` Express server and routes
- `views/` EJS pages and partials
- `data/data.json` content data for all sections
- `scss/` source styles
- `public/` compiled CSS, images, fonts, and JS

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the server (dev)
```bash
npm run dev
```

### 3. Build Sass
```bash
npm run build:css
```
Server runs at `http://localhost:3000`.

### 4. Watch Sass (optional)
```bash
npm run watch:css
```

## Routes
Core routes are defined in `index.js`:
- `/` homepage
- `/discover`
- `/search`
- `/library`
- `/pins`
- `/liked`
- `/saves`
- `/profile`
- `/playlists`
- `/albums`
- `/folders`
- `/podcasts`
- `/audiobooks`
- `/artists`
- `/library-mobile`

## Data Notes
All content is in `data/data.json`. To pin an item (playlist, artist, album, etc.), add:
```json
{
  "pinned": true
}
```
Pinned items appear in the Library card UI and on `/pins`.

## Scripts
Available scripts:
- `dev` run server with nodemon
- `build:css` build Sass once
- `watch:css` watch and rebuild Sass on change
