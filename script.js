JSON;

movies = [];
series = [];

const title = document.getElementById("title");
const genere = document.getElementById("genere");
const episodes = document.getElementById("episodes");
const addBtn = document
  .getElementById("addBtn")
  .addEventListener("click", addItem);
const genereFilter = document
  .getElementById("genereFilter")
  .addEventListener("change", renderPage);
const sortOrder = document
  .getElementById("sortOrder")
  .addEventListener("change", renderPage);
let sortAscending = true;

function loadItems(key) {
  const data = localStorage.getItem(key);

  if (!data) {
    return [];
  }
  return JSON.parse(data);
}

function saveItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function addItem(addMedia) {
  const newItem = {
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

function renderPage() {
  const listItem = document.getElementById("seriesList");
  listItem.replaceChildren();

  let items = loadItems("series").filter((item) => item.genere === "Fantasy");

  const filterValue = document.getElementById("genereFilter").value;
  if (filterValue) {
    items = items.filter((item) => item.genere === filterValue);
  }

  const sortOrder = document.getElementById("sortOrder").value;
  items.sort((a, b) => a.title.localeCompare(b.title));

  if (sortOrder === "desc") {
    items.reverse();
  }

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

  renderPage();
};

renderPage();
window.addEventListener("load", renderPage);
sortBtn.textContent = "A-Å";
