// get favourites from local storage
favourites = JSON.parse(localStorage.getItem("favourites"));

const favHeroElement = (hero) => {
  return `
    <li class="fav-hero">
      <a href="./bioPage.html?id=${hero.id}" target="_blank">
        <div class="favourites-list_hero-card" id="${hero.id}">
          <div>
            <img id="favourites-list_hero-card_image" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
          </div>
          <div class="favourites-list_hero-card_body">
            <div class="favourites-list_hero-card_name-and-fav">
              <h3 class="hero-card_name">${hero.name}</h3>
              <button id="unfavorite">Remove from favourites</button>
            </div>
            <p class="favourites-list_hero-card_description">${hero.description}</p>
          </div>
        </div>
      </a>
    </li>
  `;
};

var initialise = () => {
  console.log("initialise");
  // get all characters from local storage
  let allCharacters = JSON.parse(localStorage.getItem("allData"));
  console.log(allCharacters);
  let favourites = JSON.parse(localStorage.getItem("favourites"));
  console.log(favourites);
  // filter all characters to only include those with ids in favourites array
  let favCharacters = allCharacters.filter((char) =>
    favourites.includes((char.id).toString())
  );
  console.log(favCharacters);
  for (let hero of favCharacters) {
    let favHero = favHeroElement(hero);
    document.getElementById("favourites-list").innerHTML += favHero;
  }
};

// Call the initialise function
initialise();

// Add event listener to the remove from favourites button
let removeFavButtons = document.querySelectorAll(".favourites-list_hero-card_name-and-fav button");
removeFavButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    favourites = JSON.parse(localStorage.getItem("favourites")); // Get the favoritedHeroes array from local storage
    let heroId = button.closest('.favourites-list_hero-card').id; // Get the ID of the clicked hero
    // Remove the hero from the favourites array
    favourites = favourites.filter(id => id !== heroId);
    // save the updated favourites array to local storage
    localStorage.setItem('favourites', JSON.stringify(favourites));
    // Remove the hero from the favourites list
    button.closest('.fav-hero').remove();
  });
});

// go back to previous page on click of back button with class 'back-arrow
let backArrow = document.querySelector(".back-arrow");
backArrow.addEventListener("click", (event) => {
  event.stopPropagation();
  event.preventDefault();
  window.history.back();
});
