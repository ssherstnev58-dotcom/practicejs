const form = document.querySelector('.film-form');
const titleInput = document.querySelector('.input-title');
const genreInput = document.querySelector('.input-genre');
const yearInput = document.querySelector('.input-year');
const watchedInput = document.querySelector('.input-watched');
const submitButton = document.querySelector('.submit-button');
const cancelButton = document.querySelector('.cancel-button');
const errorMessage = document.querySelector('.error-message');
const sortSelect = document.querySelector('.sort-select');
const sortButton = document.querySelector('.sort-button');
const tableBody = document.querySelector('.film-tbody');

let films = JSON.parse(localStorage.getItem('films')) || [];
let editingFilmId = null;

const saveFilms = () => {
  localStorage.setItem('films', JSON.stringify(films));
};

const createFilmRow = (film) => {
  const row = document.createElement('tr');
  row.dataset.filmId = film.id;
  row.innerHTML = `
    <td>${film.title}</td>
    <td>${film.genre}</td>
    <td>${film.releaseYear}</td>
    <td>${film.isWatched ? 'Да' : 'Нет'}</td>
    <td>
      <button type="button" class="action-button edit-button">Редактировать</button>
      <button type="button" class="action-button delete-button">Удалить</button>
    </td>
  `;
  return row;
};

const renderTable = () => {
  tableBody.innerHTML = '';
  films.forEach((film) => {
    tableBody.appendChild(createFilmRow(film));
  });
};

const resetEditMode = () => {
  editingFilmId = null;
  form.reset();
  submitButton.textContent = 'Добавить';
  cancelButton.classList.add('hidden');
  errorMessage.classList.add('hidden');
};

const validateFields = (fields) => {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (!isNaN(field)) {
      if (!field || +field <= 0) {
        return false;
      }
    } else if (!field) {
      return false;
    }
  }

  return true;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const genre = formData.get('genre').trim();
  const releaseYear = formData.get('releaseYear').trim();
  const isWatched = Boolean(formData.get('isWatched'));

  const isValid = validateFields([title, genre, releaseYear]);

  if (!isValid) {
    errorMessage.classList.remove('hidden');
    return;
  }

  errorMessage.classList.add('hidden');

  if (editingFilmId !== null) {
    const updatedFilm = {
      id: editingFilmId,
      title,
      genre,
      releaseYear,
      isWatched
    };

    films = films.map((film) => (film.id === editingFilmId ? updatedFilm : film));
    saveFilms();

    const existingRow = tableBody.querySelector(`tr[data-film-id="${editingFilmId}"]`);
    if (existingRow) {
      existingRow.replaceWith(createFilmRow(updatedFilm));
    }

    resetEditMode();
    return;
  }

  const newFilm = {
    id: Date.now(),
    title,
    genre,
    releaseYear,
    isWatched
  };

  films.push(newFilm);
  saveFilms();
  tableBody.appendChild(createFilmRow(newFilm));
  form.reset();
});

cancelButton.addEventListener('click', () => {
  resetEditMode();
});

tableBody.addEventListener('click', (event) => {
  const row = event.target.closest('tr');
  if (!row) {
    return;
  }

  const filmId = +row.dataset.filmId;

  if (event.target.classList.contains('delete-button')) {
    films = films.filter((film) => film.id !== filmId);
    saveFilms();
    row.remove();

    if (editingFilmId === filmId) {
      resetEditMode();
    }
    return;
  }

  if (event.target.classList.contains('edit-button')) {
    const film = films.find((item) => item.id === filmId);
    if (!film) {
      return;
    }

    editingFilmId = filmId;
    titleInput.value = film.title;
    genreInput.value = film.genre;
    yearInput.value = film.releaseYear;
    watchedInput.checked = film.isWatched;
    submitButton.textContent = 'Обновить';
    cancelButton.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }
});

sortButton.addEventListener('click', () => {
  const sortField = sortSelect.value;

  films.sort((firstFilm, secondFilm) => {
    if (sortField === 'releaseYear') {
      return +firstFilm.releaseYear - +secondFilm.releaseYear;
    }
    return firstFilm[sortField].localeCompare(secondFilm[sortField]);
  });

  saveFilms();
  renderTable();
});

renderTable();
