JSON;

movies = [];
series = [];

const title = document.getElementById("title");
const genere = document.getElementById("genere");
const episodes = document.getElementById("episodes");
const autor = document.getElementById("autor");
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => addItem("series"));
const genereFilter = document.getElementById("genereFilter");
genereFilter.addEventListener("change", renderPage);
const sortOrder = document.getElementById("sortOrder");
sortOrder.addEventListener("change", renderPage);

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
    favorite: false,
  };

  let items = loadItems(addMedia);
  items = loadItems("movies");
  items.push(newItem);

  saveItems(addMedia, items);
  renderPage(addMedia);

  window.addEventListener("load", renderItems);
}

const filterBtn = document.getElementById("filterBtn");
let showFavorites = false;

filterBtn.addEventListener("click", () => {
  showFavorites = !showFavorites;
  filterBtn.textContent = showFavorites ? "show all" : "show Favorites";
  renderPage();
});

function renderPage(addMedia) {
  const listItem = document.getElementById(addMedia + "List");
  listItem.replaceChildren();

  let items = loadItems(addMedia);

  if (showFavorites) {
    items = items.filter((item) => item.favorite);
  }
  // filter på genere
  const filterValue = document.getElementById("genereFilter").value;
  if (filterValue) {
    items = items.filter((item) => item.genere === filterValue);
  }
  // sorting
  const sortOrder = document.getElementById("sortOrder").value;
  items.sort((a, b) => a.title.localeCompare(b.title));

  if (sortOrder === "desc") {
    items.reverse();
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} (${item.genere})`;

    // favorite button
    const favBtn = document.createElement("button");
    favBtn.textContent = item.favorite ? "★" : "☆";
    favBtn.addEventListener("click", () => toggleFavorite(item.id, addMedia));
    li.appendChild(favBtn);

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteItem(item.id));

    li.appendChild(deleteBtn);
    listContainer.appendChild(li);
  });
}

function toggleFavorite(id, addMedia) {
  let items = loadItems(addMedia);
  items = items.map((item) => {
    if (item.id === id) {
      return { ...item, favorite: !item.favorite };
    }
    return item;
  });
  saveItems(addMedia, items);
  renderPage(addMedia);
}

const deleteItem = (id, addMedia) => {
  let items = loadItems(addMedia);

  items = items.filter((item) => item.id !== id);

  saveItems(addMedia, items);

  renderPage(addMedia);
};

renderPage();
window.addEventListener("load", renderPage);
