
var superHeroModule = (function superHeroInit() {
  var a = 10;
  let publicKey = "b5271717dc6929f46119ac271a16792a";
  var characters = [];
  var favourites = JSON.parse(localStorage.getItem('favourites')) || []; // Load the favoritedHeroes array from the local storage
  var fetchCharacters = async () => {
    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=1914&apikey=b5271717dc6929f46119ac271a16792a&hash=9c086e347a478c1e16ae237216a23c42`
      );
      const data = await response.json();
      return data.data.results;
    } catch (error) {
      console.log(error);
    }
  };

  var heroCardElement = (hero) => {
    return `
    <a href="./bioPage.html?id=${hero.id}" target="_blank">
      <div class="hero-card" id=${hero.id}>
        <div class="hero-card_image-and-favicon">
          <img class="hero-card_thumbnail" src=${
            hero.thumbnail.path + "." + hero.thumbnail.extension
          } alt=${hero.name}>
          <i class="far fa-heart hero-card_fav"></i>
        </div>
        <div class="hero-details">
          <h3>${hero.name}</h3>
          <p class="hero-card_description">${hero.description ? hero.description : 'No description available'}</p>
        </div>
      </div>
    </a>
  `;
  };

  var setupFavIcons = () => {
    let favIcons = document.querySelectorAll(".hero-card_fav");
    favIcons.forEach((icon) => {
      let heroId = icon.closest('.hero-card').id; // Get the ID of the clicked hero
      if (favourites.includes(heroId)) {
        // If the hero is already favorited, change the icon to solid heart
        icon.className = 'fas fa-heart hero-card_fav'; // Change the icon to solid heart
      }
      icon.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (favourites.includes(heroId)) {
          // If the hero is already favorited, remove it from the array and change the icon to outline heart
          favourites = favourites.filter(id => id !== heroId);
          icon.className = 'far fa-heart hero-card_fav'; // Change the icon to outline heart
          icon.style.color = 'black';
        } else {
          // If the hero is not favorited, add it to the array and change the icon to solid heart
          favourites.push(heroId);
          icon.className = 'fas fa-heart hero-card_fav'; // Change the icon to solid heart
          icon.style.color = 'red';
        }
        localStorage.setItem('favourites', JSON.stringify(favourites)); // Store the favoritedHeroes array in the local storage
      });
    });
  };
  
  var initialise = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        characters = await fetchCharacters();
        for (let hero of characters) {
          let heroCard = heroCardElement(hero);
          document.getElementById("homepage_body").innerHTML += heroCard;
        }
        // Add the event listener for the hero-card_fav icons here
        setupFavIcons();
        resolve(characters);
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    initialise: initialise,
    getCharacters: () => characters,
    heroCardElement: heroCardElement,
    setupFavIcons: setupFavIcons,
  };
})();

//  take input from search bar and filter characters by name
//  if input matches character name, display character
//  if input does not match character name, do not display character
//  if input is empty, display all characters

document.getElementById("search").addEventListener("keyup", (event) => {
  let searchInput = event.target.value.toLowerCase();
  let characters = superHeroModule.getCharacters();
  let filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchInput)
  );
  document.getElementById("homepage_body").innerHTML = "";
  for (let hero of filteredCharacters) {
    let heroCard = superHeroModule.heroCardElement(hero);
    document.getElementById("homepage_body").innerHTML += heroCard;
  }
  superHeroModule.setupFavIcons();
});
