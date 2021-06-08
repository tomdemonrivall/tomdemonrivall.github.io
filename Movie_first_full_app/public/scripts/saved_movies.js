const movieContainer = document.getElementById("saved");
movieContainer.innerHTML = "";

const getMovieFromDB = () => {
  fetch("api/movie", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let i = 0;
      console.log("Success:", data);

      data.data.forEach((element) => {
        fetch(`http://www.omdbapi.com/?i=${data.data[i]}&apikey=adf1f2d7&`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            let movieCard = `<section>
                      <div id="card" class="card" data-img=${
                        data.Poster
                      } style="background-image: url(${data.Poster})">
                        <div class="inner">
                          <div class="header">
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            <h1 class="main-title">${data.Title.substring(
                              0,
                              25
                            )}</h1>
                            <div class="stars">
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star-half" aria-hidden="true"></i>
                            </div>
                          </div>
                          <div class="content">
                            <p class="type">${data.Type}</p>
                            <a class="year" href="#">${data.Year}</a>
                          </div>
                          <div class="btn_row">
                            <a href="#" id="${
                              data.imdbID
                            }"class="card-action">Add to my DB<i class="fa fa-caret-right" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                        <!-- the trailer -->
                      </div>
                    </section>`;
            console.log(data.Title);
            movieContainer.insertAdjacentHTML("beforeend", movieCard);
          });
        i++;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
getMovieFromDB();
