JSON;

movies = [];
series = [];

const title = document.getElementById("title");
const autor = document.getElementById("autor");
const genere = document.getElementById("genere");
const episodes = document.getElementById("episodes");
const addBtn = document
  .getElementById("addBtn")
  .addEventListener("click", addItem);

function loadItems(key) {
  const data = localStorage.getItem(key);

  if (!data) {
    return [];
  }
  return JSON.parse(data);
}

localStorage.setItem("movies", JSON.stringify([{ id: "1", title: "Dune" }]));
console.log(loadItems("movies"));

function saveItiems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

saveItiems("series", [{ id: "2", title: "Arcane" }]);
console.log(loadItems("series"));

const newItem = {
  id: Date.now().toString(),
  title: title.value,
  autor: autor.value,
  genere: genere.value,
  episodes: episodes.value,
};

function addItem(newItem) {
  loadItems.getItem(movies);
  loadItems.getItem(series);
}
