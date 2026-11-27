const API_URL = 'https://sb-film.skillbox.cc/films';
const USER_EMAIL = 'ssherstnev58@gmail.com';

const form = document.querySelector('.film-form');
const errorMessage = document.querySelector('.error-message');
const filterForm = document.querySelector('.filter-form');
const deleteAllButton = document.querySelector('.delete-all-button');
const tableBody = document.querySelector('.film-tbody');

const validateFields = (fields) => {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (!field) {
      return false;
    }

    if (!isNaN(field) && +field <= 0) {
      return false;
    }
  }

  return true;
};

const getFilterQuery = () => {
  const formData = new FormData(filterForm);
  const searchParams = new URLSearchParams();

  [...formData.entries()].forEach(([key, value]) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      searchParams.append(key, trimmedValue);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
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
      <button type="button" class="delete-button">Удалить</button>
    </td>
  `;
  return row;
};

const renderTable = async () => {
  const query = getFilterQuery();
  const response = await fetch(`${API_URL}${query}`, {
    headers: {
      email: USER_EMAIL
    }
  });
  const films = await response.json();

  tableBody.innerHTML = '';
  films.forEach((film) => {
    tableBody.appendChild(createFilmRow(film));
  });
};

const addFilm = async (film) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      email: USER_EMAIL
    },
    body: JSON.stringify(film)
  });

  form.reset();
  await renderTable();
};

const deleteFilm = async (filmId, row) => {
  await fetch(`${API_URL}/${filmId}`, {
    method: 'DELETE',
    headers: {
      email: USER_EMAIL
    }
  });

  row.remove();
};

const deleteAllFilms = async () => {
  await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      email: USER_EMAIL
    }
  });

  tableBody.innerHTML = '';
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const genre = formData.get('genre').trim();
  const releaseYear = formData.get('releaseYear').trim();
  const isWatched = Boolean(formData.get('isWatched'));

  if (!validateFields([title, genre, releaseYear])) {
    errorMessage.classList.remove('hidden');
    return;
  }

  errorMessage.classList.add('hidden');

  await addFilm({
    title,
    genre,
    releaseYear,
    isWatched
  });
});

filterForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

filterForm.addEventListener('input', () => {
  renderTable();
});

tableBody.addEventListener('click', (event) => {
  if (!event.target.classList.contains('delete-button')) {
    return;
  }

  const row = event.target.closest('tr');
  if (!row) {
    return;
  }

  deleteFilm(row.dataset.filmId, row);
});

deleteAllButton.addEventListener('click', () => {
  deleteAllFilms();
});

renderTable();
