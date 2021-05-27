let InputAuthor = document.querySelector("#author");
let InputTitle = document.querySelector("#title");
let poembox = document.querySelector("#poembox");
let search = document.querySelector("#search");
let ListAuthors = document.querySelector("#Authors-list");
let ListTitle = document.querySelector("#Title-list");

fetch(`https://poetrydb.org/author`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (i = 0; i < data.authors.length; i++) {
      let AuthorsOption = document.createElement("option");
      ListAuthors.append(AuthorsOption);
      let Authors = document.createTextNode(data.authors[i]);
      // AuthorsOption = data.authors[i];
      AuthorsOption.append(Authors);
    }
  });

InputAuthor.addEventListener("change", (event) => {
  console.log("event ok");
  let author = InputAuthor.value;
  let title = InputTitle.value;
  ListTitle.innerHTML = "";
  InputTitle.value = "";
  fetch(`https://poetrydb.org/author/${author}/title`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.length);
      console.log(data[1]);
      console.log(data[1].title);

      for (i = 0; i < data.length; i++) {
        let TitleOption = document.createElement("option");
        ListTitle.append(TitleOption);
        let Title = document.createTextNode(data[i].title);
        // TitleOption = data.authors[i];
        TitleOption.append(Title);
        console.log(TitleOption);
      }
      console.log(ListTitle);
    });
});

search.addEventListener("click", (event) => {
  let author = InputAuthor.value;
  let title = InputTitle.value.slice(0, 15);

  // https://poetrydb.org/author,title/Shakespeare;Sonnet
  // https://poetrydb.org/author/Emily Dickinson/title
  // https://poetrydb.org/author

  fetch(`https://poetrydb.org/author,title/${author};${title}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(`https://poetrydb.org/author,title/${author};${title}`);
      console.log(data);
      let poem = document.createElement("ul");
      poem.style.listStyleType = "none";
      poembox.prepend(poem);
      let tit = document.createElement("li");
      poem.prepend(tit);
      let titl = document.createElement("h3");
      titl.textContent = `${data[0].title} by  ${data[0].author}`;
      tit.prepend(titl);

      content = data[0].lines;

      content.forEach((element) => {
        let lin = document.createElement("li");
        poem.append(lin);
        let lines = document.createElement("text");
        lin.append(lines);
        lines.append(element);
      });
    });
});
clear.addEventListener("click", (event) => {
  poembox.innerHTML = "";
});
InputAuthor.addEventListener("click", (event) => {
  InputAuthor.value = "";
});
InputTitle.addEventListener("click", (event) => {
  InputTitle.value = "";
});
