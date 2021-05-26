let inauthor = document.querySelector("#author");
let intitle = document.querySelector("#title");
let poembox = document.querySelector("#poembox");
let search = document.querySelector("#search");

search.addEventListener("click", (event) => {
  let author = inauthor.value;
  let title = intitle.value;

  //   let ifauthor;
  //   let iftitle;
  //   if (inauthor.value.length > 0 && intitle.value.length > 0) {
  //     ifauthor = "author";
  //     iftitle = ",title/";
  //     author = inauthor.value;
  //     title = `${intitle.value}`;
  //   } else if (inauthor.value.length > 0 && intitle.value.length < 0) {
  //     ifauthor = "author/";
  //     iftitle = "";
  //     author = inauthor.value;
  //     title = "";
  //   } else if (inauthor.value.length < 0 && intitle.value.length > 0) {
  //     ifauthor = "";
  //     iftitle = "title/";
  //     author = "";
  //     title = intitle.value;
  //   } else if (inauthor.value.length < 0 && intitle.value.length < 0) {
  //     ifauthor = "";
  //     iftitle = "";
  //     author = "";
  //     title = "";
  //   }

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
