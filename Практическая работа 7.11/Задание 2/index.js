const heights = [164, 157, 160, 143, 170];

const list = document.querySelector('.list');
const addBtn = document.querySelector('.btn-add');
const filterBtn = document.querySelector('.btn-filter');

const renderHeights = (arr) => {
  list.innerHTML = '';
  arr.forEach((height, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}) ${height}`;
    list.appendChild(li);
  });
};

addBtn.addEventListener('click', () => {
  const value = prompt('Введите рост ученика:');

  if (!value || value.trim() === '' || isNaN(+value.trim())) {
    alert('Рост не введён!');
    return;
  }

  heights.push(+value.trim());

  const li = document.createElement('li');
  li.textContent = `${heights.length}) ${+value.trim()}`;
  list.appendChild(li);
});

filterBtn.addEventListener('click', () => {
  const value = prompt('Введите минимальный рост:');

  if (!value || value.trim() === '') {
    renderHeights(heights);
    return;
  }

  const min = +value.trim();

  if (isNaN(min)) {
    renderHeights(heights);
    return;
  }

  const filtered = heights.filter((height) => height >= min);
  renderHeights(filtered);
});

renderHeights(heights);
