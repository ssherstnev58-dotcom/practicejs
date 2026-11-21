const prices = [100, 500, 250, 750, 300];

const priceList = document.getElementById('price-list');
const sortAscBtn = document.getElementById('sort-asc');
const sortDescBtn = document.getElementById('sort-desc');

function renderPrices() {
  priceList.innerHTML = '';
  for (let i = 0; i < prices.length; i++) {
    const li = document.createElement('li');
    li.textContent = prices[i];
    priceList.appendChild(li);
  }
}

function sortAsc() {
  prices.sort(function (a, b) {
    return a - b;
  });
}

function sortDesc() {
  prices.sort(function (a, b) {
    return b - a;
  });
}

sortAscBtn.addEventListener('click', function () {
  sortAsc();
  renderPrices();
});

sortDescBtn.addEventListener('click', function () {
  sortDesc();
  renderPrices();
});

renderPrices();
