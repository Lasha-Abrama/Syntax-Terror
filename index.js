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
  res.render("homepage", { data, page: "homepage"});
});

app.get("/discover", (req, res) => {
  res.render("discover", {
    page: "discover"
  });
});

app.get("/search", (req, res) => {
  res.render("search", { data, page: "search"});
});

app.get("/library", (req, res) => {
  // 1. Liked playlist
  const likedPlaylist = data.playlists.find(p => p.title === "Liked Songs");

  // 2. Only Daft Punk and David Bowie
  const selectedArtists = data.artists.filter(a =>
    a.name === "Daft Punk" || a.name === "David Bowie"
  );

  // 3. Rest playlists
  const otherPlaylists = data.playlists.filter(p => p.title !== "Liked Songs");

  // 4. Selected mixes
  const selectedMixes = data.mixes.filter(m =>
    [
      "Daily Mix 1",
      "Daily Mix 2",
      "Daily Mix 3",
      "Rock Mix",
      "Chill Mix",
      "Pop Mix"
    ].includes(m.title)
  );

  res.render("library", {
    likedPlaylist,
    selectedArtists,
    otherPlaylists,
    albums : data.albums,
    selectedMixes,
    page : "library"
  });
});

app.get("/pins", (req, res) => {
  res.render("pins", {
    page: "pins"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    page: "about"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
