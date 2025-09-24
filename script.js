movies = [];
series = [];

const title = document.getElementById("title");
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addItem);
const genereFilter = document.getElementById("genereFilter");
genereFilter.addEventListener("change", renderAll);
const sortOrder = document.getElementById("sortOrder");
sortOrder.addEventListener("change", renderAll);
const mediaType = document.getElementById("mediaType");

function loadItems(key) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

function saveItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function addItem() {
  const addMedia = mediaType.value;

  const newItem = {
    id: Date.now().toString(),
    title: title.value,
    genere: genereFilter.value,
    favorite: false,
  };

  let items = loadItems(addMedia);
  items.push(newItem);

  saveItems(addMedia, items);
  renderAll();
}

const filterBtn = document.getElementById("filterBtn");
let showFavorite = false;

filterBtn.addEventListener("click", () => {
  showFavorite = !showFavorite;
  filterBtn.textContent = showFavorite ? "show All" : "show Favorites";
  renderAll();
});

function renderPage(addMedia) {
  const listContainer = document.getElementById(addMedia);
  listContainer.replaceChildren();

  let items = loadItems(addMedia);

  if (showFavorite) {
    items = items.filter((item) => item.favorite);
  }

  const selectedGenere = document.getElementById("genereFilter").value;
  if (selectedGenere) {
    items = items.filter((item) => item.genere === selectedGenere);
  }

  // sorting
  const sortOrder = document.getElementById("sortOrder").value;
  items.sort((a, b) => a.title.localeCompare(b.title));

  if (sortOrder === "desc") {
    items.reverse();
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    /* li.textContent = `${item.title} (${item.genere})`; */

    const textSpan = document.createElement("span");
    textSpan.textContent = item.title;

    const genreSpan = document.createElement("span");
    genreSpan.textContent = ` (${item.genere})`;

    const textGroup = document.createElement("div");
    textGroup.classList.add("text-group");
    textGroup.appendChild(textSpan);
    textGroup.appendChild(genreSpan);

    /*  li.appendChild(textGroup); */

    // favorite button
    const favBtn = document.createElement("button");
    favBtn.textContent = item.favorite ? "★" : "☆";
    favBtn.addEventListener("click", () => toggleFavorite(item.id, addMedia));

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteItem(item.id, addMedia));

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");
    buttonGroup.appendChild(favBtn);
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(textGroup);
    li.appendChild(buttonGroup);

    /*  li.appendChild(deleteBtn); */
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
  renderAll();
}

const deleteItem = (id, addMedia) => {
  let items = loadItems(addMedia);

  items = items.filter((item) => item.id !== id);

  saveItems(addMedia, items);

  renderAll();
};

window.addEventListener("load", renderAll);
function renderAll() {
  ["seriesList", "moviesList"].forEach((addMedia) => renderPage(addMedia));
}
