const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("homepage", { page: "home" });
});

app.get("/about", (req, res) => {
  res.render("about", { page: "about" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
