let inauthor = document.querySelector("#author");
let intitle = document.querySelector("#title");
let poembox = document.querySelector("#poembox");
let search = document.querySelector("#search");
let ListAuthors = document.querySelector("#Authors-list");

fetch(`https://poetrydb.org/author`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.authors);
    console.log(data.authors.length);
    for (i = 0; i < data.authors.length; i++) {
      let AuthorsOption = document.createElement("option");
      ListAuthors.append(AuthorsOption);
      let Authors = document.createTextNode(data.authors[i]);
      // AuthorsOption = data.authors[i];
      AuthorsOption.append(Authors);
      console.log(AuthorsOption);
    }
    console.log(ListAuthors);
  });

search.addEventListener("click", (event) => {
  let author = inauthor.value;
  let title = intitle.value;

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
