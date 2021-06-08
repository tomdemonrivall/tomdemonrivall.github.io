// CODE TO ADD MOVIE TO DATABASE

const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db/db.moviedatabase");

db.run(
  "CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Title TEXT, Year INT, Type TEXT, Poster TEXT, imdbID TEXT);"
);

const addMovi = (data) => {
  let db = new sqlite3.Database("db/db.moviedatabase.db");
  // db.run(
  //   `INSERT INTO movies (Title, Type, Year, Poster, imdbID) VALUES ("terminator", "film", "1999", "https://fr.web.img3.acsta.net/medias/nmedia/18/35/91/09/19255618.jpg")`,
  //   function (err) {

  db.run(
    `INSERT INTO movies (Title, Type, Year, Poster, imdbID) VALUES (?,?,?,?,?) `,
    [data.data[0], data.data[1], data.data[2], data.data[3], data.data[4]],
    function (err) {
      // db.run(`INSERT INTO movies (content) VALUES (?)`, [data.data], function(err) {

      if (err) {
        return console.log(err);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );

  console.log(data.data[0]);
  console.log(data);
  db.close();
};

const moviedb = (req, res) => {
  let sendData = { data: [] };

  let db = new sqlite3.Database("db/db.moviedatabase.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the movies database.");
  });
  db.serialize(() => {
    db.each(`SELECT * FROM movies`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.imdbID);
      sendData.data.push(row.imdbID);
    });
    console.log(sendData);
    // res.send(sendData)
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log(sendData);
    res.send(sendData);
    console.log("Close the database connection.");
  });
};

exports.addMovi = addMovi;
exports.moviedb = moviedb;
