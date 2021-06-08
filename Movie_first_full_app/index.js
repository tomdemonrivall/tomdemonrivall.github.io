// lib and imports
const express = require("express");
const app = express();
const test = require("./controllers/test");
const movie = require("./controllers/movies");

// app setup
app.use(express.json());

app.use("/static", express.static("public"));
app.set("view engine", "ejs");

// pages and api
app.get("/", (req, res) => {
  res.render("movies.ejs");
});

app.get("/saved_movies", (req, res) => {
  res.render("saved_movies.ejs");
});

//api test front to back
app.post("/api/addtest", (req, res) => {
  test.addTest(req.body);
});
app.post("/api/test", test.testdb);

//api movie front to back
app.post("/api/addmovie", (req, res) => {
  movie.addMovi(req.body);
});

app.post("/api/movie", movie.moviedb);

app.listen(3000, () => console.log("Server Up and running"));
