const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const data = require("./data/data.json");

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware for current page
app.use((req, res, next) => {
  res.locals.currentPage = req.path;
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("homepage", { data, page: "homepage" });
});

app.get("/discover", (req, res) => {
  res.render("discover", { data, page: "discover" });
});

app.get("/search", (req, res) => {
  res.render("search", { data, page: "search" });
});
// 1. Liked playlist
const likedPlaylist = data.playlists.find((p) => p.title === "Liked Songs");
// 3. Rest playlists
const otherPlaylists = data.playlists.filter((p) => p.title !== "Liked Songs");

app.get("/library", (req, res) => {
  // 2. Only Daft Punk and David Bowie
  const selectedArtists = data.artists.filter((a) => a.name === "Daft Punk" || a.name === "David Bowie");

  // 4. Folders
  const folders = data.folders.filter((p) => p.title === "Fav bands");

  // 4. Selected mixes
  const selectedMixes = data.mixes.filter((m) =>
    ["Daily Mix 1", "Daily Mix 2", "Daily Mix 3", "Rock Mix", "Chill Mix", "Pop Mix"].includes(m.title),
  );

  res.render("library", {
    likedPlaylist,
    selectedArtists,
    otherPlaylists,
    folders,
    albums: data.albums,
    selectedMixes,
    page: "library",
  });
});

app.get("/liked", (req, res) => {
  res.render("liked", { data, page: "liked" });
});

app.get("/pins", (req, res) => {
  const pinnedItems = [];

  Object.keys(data).forEach((type) => {
    const section = data[type];

    if (Array.isArray(section)) {
      section.forEach((item) => {
        if (item.pinned) {
          pinnedItems.push({
            ...item,
            type,
          });
        }
      });
    }
  });

  res.render("pins", {
    items: pinnedItems,
    page: "pins",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    page: "about",
  });
});

app.get("/liked", (req, res) => {
  res.render("liked", { data, page: "liked" });
});

app.get("/saves", (req, res) => {
  res.render("saves", {
    page: "saves",
  });
});

app.get("/playlists", (req, res) => {
  res.render("playlists", {
    likedPlaylist,
    otherPlaylists,
    page: "library",
  });
});

app.get("/albums", (req, res) => {
  res.render("albums", {
    albums: data.albums,
    page: "albums",
  });
});

app.get("/folders", (req, res) => {
  res.render("folders", {
    folders: data.folders,
    type: "folder",
    page: "library",
  });
});

app.get("/podcasts", (req, res) => {
  res.render("podcasts", {
    podcasts: data.podcasts,
    type: "podcast",
    page: "podcasts",
  });
});

app.get("/audiobooks", (req, res) => {
  res.render("audiobooks", {
    audiobooks: data.audiobooks,
    type: "audiobook",
    page: "audiobooks",
  });
});

// Artists page
app.get("/artists", (req, res) => {
  res.render("artists", {
    artists: data.artists,
    type: "artist",
    page: "artists",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
