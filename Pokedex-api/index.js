let Pokelist = document.querySelector("#PokeName");

fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.results);
    console.log(data.results.length);
    for (i = 0; i < data.results.length; i++) {
      var list = data.results[i].name;
      console.log(list);

      let NameOption = document.createElement("option");
      Pokelist.append(NameOption);
      let Name = document.createTextNode(list);
      NameOption.append(Name);
    }
  });
