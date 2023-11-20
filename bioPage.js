// log locallly stored data with key 'allData' to console
console.log(JSON.parse(localStorage.getItem("allData")));
// get query string from url
const queryString = window.location.search;
// get id from query string
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
// get data from local storage with key 'allData' and parse to JSON object and array of objects get character with id matching id from query string
const characterData = JSON.parse(localStorage.getItem("allData")).find(
  (char) => char.id == id
);
console.log(characterData);
document.getElementById("hero-name").innerText = characterData.name;
document.getElementById("hero-description").innerText = characterData.description;
document.getElementById("hero-image").src =
  characterData.thumbnail.path + "." + characterData.thumbnail.extension;
document.getElementById("hero-comics").innerText = characterData.comics.items.map(
  (comic) => comic.name
);
document.getElementById("hero-series").innerText = characterData.series.items.map(
  (series) => series.name
);
document.getElementById("hero-events").innerText = characterData.events.items.map(
  (event) => event.name
);
document.getElementById("hero-stories").innerText = characterData.stories.items.map(
  (story) => story.name
);
document.getElementById("hero-wiki").innerHTML = characterData.urls.map(
  (url) => `<a href=${url.url}>${url.type}</a>`
);

// close page on click of close button
let backArrow = document.querySelector(".close-icon");
backArrow.addEventListener("click", () => {
  window.close();
});