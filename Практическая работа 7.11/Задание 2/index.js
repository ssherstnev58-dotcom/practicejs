const heights = [164, 157, 160, 143, 170];

const list = document.getElementById('list');
const addBtn = document.getElementById('add-btn');
const filterBtn = document.getElementById('filter-btn');

function renderHeights(arr) {
  list.innerHTML = '';

  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    li.textContent = `${i + 1}) ${arr[i]}`;
    list.appendChild(li);
  }
}

addBtn.addEventListener('click', function () {
  const value = prompt('Введите рост ученика:');

  if (!value || value.trim() === '' || isNaN(Number(value.trim()))) {
    alert('Рост не введён!');
    return;
  }

  heights.push(Number(value.trim()));
  renderHeights(heights);
});

filterBtn.addEventListener('click', function () {
  const value = prompt('Введите минимальный рост:');

  if (!value || value.trim() === '') {
    renderHeights(heights);
    return;
  }

  const min = Number(value.trim());

  if (isNaN(min)) {
    renderHeights(heights);
    return;
  }

  const filtered = heights.filter(function (height) {
    return height >= min;
  });

  renderHeights(filtered);
});

renderHeights(heights);
