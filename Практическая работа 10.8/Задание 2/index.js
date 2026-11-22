const list = document.querySelector('.list');
const addBtn = document.querySelector('.btn-add');
const removeBtn = document.querySelector('.btn-remove');

addBtn.addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = 'Новый элемент списка';
  list.appendChild(li);
});

removeBtn.addEventListener('click', () => {
  const lastItem = list.lastElementChild;
  if (lastItem) {
    lastItem.remove();
  }
});
