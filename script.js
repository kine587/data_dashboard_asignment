JSON;

movies = [];
series = [];

const title = document.getElementById("title");
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

function saveItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

saveItems("series", [{ id: "2", title: "Arcane" }]);
console.log(loadItems("series"));

function addItem(addMedia) {
  const newItems = {
    id: Date.now().toString(),
    title: title.value,
    autor: autor.value,
    genere: genere.value,
    episodes: episodes.value,
  };

  const items = loadItems("series");
  items = loadItems("movies");
  items.push(addMedia);

  saveItems("series", items);

  window.addEventListener("load", renderItems);
}

function renderItems() {
  const listItem = document.getElementById("seriesList");
  listItem.replaceChildren("");

  const items = loadItems("series");

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.title + " (" + item.genere + ") ";
    listItem.appendChild(li);

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteItem(item.id));

    li.appendChild(deleteBtn);
    listItem.appendChild(li);
  });
}

const deleteItem = (id) => {
  const items = loadItems("series");

  const updatedItems = items.filter((item) => item.id !== id);

  saveItems("series", updatedItems);

  renderItems();
};

const renderPage = () => {};

renderPage();
window.addEventListener("load", renderItems);
