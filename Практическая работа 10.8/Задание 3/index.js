const prices = [100, 500, 250, 750, 300];

const priceList = document.querySelector('.price-list');
const sortAscBtn = document.querySelector('.btn-sort-asc');
const sortDescBtn = document.querySelector('.btn-sort-desc');

const renderPrices = () => {
  priceList.innerHTML = '';
  prices.forEach((price) => {
    const li = document.createElement('li');
    li.textContent = price;
    priceList.appendChild(li);
  });
};

const sortAsc = () => {
  prices.sort();
};

const sortDesc = () => {
  prices.sort((a, b) => b - a);
};

sortAscBtn.addEventListener('click', () => {
  sortAsc();
  renderPrices();
});

sortDescBtn.addEventListener('click', () => {
  sortDesc();
  renderPrices();
});

renderPrices();
