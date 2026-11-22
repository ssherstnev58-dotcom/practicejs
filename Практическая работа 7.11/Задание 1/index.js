const books = [
  'Мастер и Маргарита',
  'Гарри Поттер',
  'Над пропастью во ржи',
  'Властелин колец',
  'Дюна',
  'Отцы и дети'
];

const list = document.querySelector('.list');
const addBtn = document.querySelector('.btn-add');
const searchBtn = document.querySelector('.btn-search');

books.forEach((book, i) => {
  const li = document.createElement('li');
  li.classList.add('book-item');
  li.textContent = `${i + 1}) ${book}`;
  list.appendChild(li);
});

addBtn.addEventListener('click', () => {
  const bookName = prompt('Введите название книги:');

  if (!bookName || bookName.trim() === '') {
    alert('Название книги не введено!');
    return;
  }

  books.push(bookName.trim());

  const li = document.createElement('li');
  li.classList.add('book-item');
  li.textContent = `${books.length}) ${bookName.trim()}`;
  list.appendChild(li);
});

searchBtn.addEventListener('click', () => {
  const searchName = prompt('Введите название книги для поиска:');

  if (searchName === null) {
    return;
  }

  const query = searchName.trim().toLowerCase();

  if (query === '') {
    alert('Книга не найдена!');
    return;
  }

  const foundIndex = books.findIndex((book) => book.toLowerCase() === query);

  if (foundIndex === -1) {
    alert('Книга не найдена!');
    return;
  }

  const items = document.querySelectorAll('.book-item');
  items.forEach((item) => item.classList.remove('highlight'));
  items[foundIndex].classList.add('highlight');
});
