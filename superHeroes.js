let publicKey = "b5271717dc6929f46119ac271a16792a";
// Your private key
// c5f5521bdc7991680d36f6999052b731af5bcc78
var characters = [];
// 9c086e347a478c1e16ae237216a23c42
// console.log(md5("1914c5f5521bdc7991680d36f6999052b731af5bcc78b5271717dc6929f46119ac271a16792a").toString())
var fetchCharacters = async () => {
  try {
    await fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=1914&apikey=b5271717dc6929f46119ac271a16792a&hash=9c086e347a478c1e16ae237216a23c42`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data.results);
        characters = data.data.results;
      });
  } catch (error) {
    console.log(error);
  }
};

let heroCardElement = (hero) => {
  return `
    <div class="hero-card">
      <img class="hero-card_thumbnail" src=${
        hero.thumbnail.path + "." + hero.thumbnail.extension
      } alt=${hero.name}>
      <div class="hero-details">
        <h3>${hero.name}</h3>
        <p class="hero-card_description">${hero.description}</p>
      </div>
    </div>
  `;
};

try {
  fetchCharacters().then(async () => {
    for (let hero of characters) {
      console.log(hero);
      let heroCard = heroCardElement(hero);
      document.getElementById("homepage_body").innerHTML += heroCard;
    }
  });
} catch (error) {}

var searchCharaters = () => {
  let searchTerm = document.getElementById("searchField").innerText;
  console.log(searchTerm)
  let filteredChars = characters.filter((char) => {
    return char.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  document.getElementById("homepage_body").innerHTML = "";
  for (let hero of filteredChars) {
    let heroCard = heroCardElement(hero);
    document.getElementById("homepage_body").innerHTML += heroCard;
  }
};

// Add event listener for search input as user types
document.getElementById("search").addEventListener("input", () => {
  searchCharaters();
});
// Add submit event listener for search form
document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  searchCharaters();
});
