const products = ['Хлеб', 'Молоко', 'Яблоки', 'Сыр', 'Бананы', 'Арбуз'];

const list = document.querySelector('.list');
const addBtn = document.querySelector('.btn-add');

const renderProducts = () => {
  list.innerHTML = '';
  products.forEach((product, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}) ${product}`;
    list.appendChild(li);
  });
};

const sortProducts = () => {
  products.sort((a, b) => a.localeCompare(b));
};

addBtn.addEventListener('click', () => {
  const productName = prompt('Введите название товара:');

  if (!productName || productName.trim() === '') {
    alert('Название товара не введено!');
    return;
  }

  products.push(productName.trim());
  sortProducts();
  renderProducts();
});

sortProducts();
renderProducts();
