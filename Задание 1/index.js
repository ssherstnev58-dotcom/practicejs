const books = [
  'Мастер и Маргарита',
  'Гарри Поттер',
  'Над пропастью во ржи',
  'Властелин колец',
  'Дюна',
  'Отцы и дети'
];

const list = document.getElementById('list');
const addBtn = document.getElementById('add-btn');
const searchBtn = document.getElementById('search-btn');

let foundIndex = -1;

function renderBooks() {
  list.innerHTML = '';

  for (let i = 0; i < books.length; i++) {
    const li = document.createElement('li');
    li.textContent = `${i + 1}) ${books[i]}`;

    if (i === foundIndex) {
      li.classList.add('highlight');
    }

    list.appendChild(li);
  }
}

addBtn.addEventListener('click', function () {
  const bookName = prompt('Введите название книги:');

  if (!bookName || bookName.trim() === '') {
    alert('Название книги не введено!');
    return;
  }

  books.push(bookName.trim());
  foundIndex = -1;
  renderBooks();
});

searchBtn.addEventListener('click', function () {
  const searchName = prompt('Введите название книги для поиска:');

  if (searchName === null) {
    return;
  }

  const query = searchName.trim().toLowerCase();

  if (query === '') {
    alert('Книга не найдена!');
    return;
  }

  foundIndex = books.findIndex(function (book) {
    return book.toLowerCase() === query;
  });

  if (foundIndex === -1) {
    alert('Книга не найдена!');
  }

  renderBooks();
});

renderBooks();
