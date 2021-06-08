const movieContainer = document.getElementById("movies");
const searchBtn = document.querySelector(".btn-search");
let LoadBtn = document.getElementById("load-movies");

const searchMovies = (movie) => {
  movieContainer.innerHTML = "";

  fetch(`http://www.omdbapi.com/?s=${movie}&apikey=adf1f2d7&`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.Search);
      let i = 0;

      data.Search.forEach((movie) => {
        let movieCard = `<section>
          <div id="card" class="card" data-img=${
            movie.Poster
          } style="background-image: url(${movie.Poster})">
            <div class="inner">
              <div class="header">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <h1 class="main-title">${movie.Title.substring(0, 25)}</h1>
                <div class="stars">
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star-half" aria-hidden="true"></i>
                </div>
              </div>
              <div class="content">
                <p class="type">${movie.Type}</p>
                <a class="year" href="#">${movie.Year}</a>
              </div>
              <div class="btn_row">
                <a href="#" id="${
                  movie.imdbID
                }"class="card-action">Add to my DB<i class="fa fa-caret-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <!-- the trailer -->
          </div>
        </section>`;
        console.log(movie.Title);
        movieContainer.insertAdjacentHTML("beforeend", movieCard);

        const addBtn = document.getElementsByClassName("btn_row");
        let movieData = [
          movie.Title.substring(0, 25),
          movie.Year,
          movie.Type,
          movie.Poster,
          movie.imdbID,
        ];

        addBtn[i].addEventListener("click", (event) => {
          console.log(movieData);
          addMovieToDB({ data: movieData });
        });
        i++;
      });
    });
};

// ENTRY POINTS
searchBtn.addEventListener("click", (event) => {
  let input = document.getElementById("searchInput");
  console.log(input.value);
  searchMovies(input.value);
});

// FUNCTION TO BRIDGE/BRAIN
const addMovieToDB = (infos) => {
  fetch("api/addmovie", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infos),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
