





fetch('https://poetrydb.org/${ifauthor}${iftitle}')
  .then(response => response.json())
  .then((data) => {
    console.log(data);
  })

// https://poetrydb.org/author,title/Shakespeare;Sonnet
// https://poetrydb.org/author/Emily Dickinson/title
// https://poetrydb.org/author