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
  res.render("homepage", { data });
});

app.get("/discover", (req, res) => {
  res.render("discover");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/library", (req, res) => {
  res.render("library");
});

app.get("/pins", (req, res) => {
  res.render("pins");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
