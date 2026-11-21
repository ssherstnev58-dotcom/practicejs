const list = document.getElementById('list');
const addBtn = document.getElementById('add-btn');
const removeBtn = document.getElementById('remove-btn');

addBtn.addEventListener('click', function () {
  const li = document.createElement('li');
  li.textContent = 'Новый элемент списка';
  list.appendChild(li);
});

removeBtn.addEventListener('click', function () {
  const lastItem = list.lastElementChild;
  if (lastItem) {
    lastItem.remove();
  }
});
