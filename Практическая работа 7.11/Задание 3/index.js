const products = ['Хлеб', 'Молоко', 'Яблоки', 'Сыр', 'Бананы', 'Арбуз'];

const list = document.getElementById('list');
const addBtn = document.getElementById('add-btn');

function sortProducts() {
  products.sort(function (a, b) {
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    return 0;
  });
}

function renderProducts() {
  list.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const li = document.createElement('li');
    li.textContent = `${i + 1}) ${products[i]}`;
    list.appendChild(li);
  }
}

addBtn.addEventListener('click', function () {
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
