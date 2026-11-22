const cardInput = document.querySelector('.card-input');
const colorSelect = document.querySelector('.color-select');
const card = document.querySelector('.card');

card.style.backgroundColor = colorSelect.value;

cardInput.addEventListener('input', () => {
  card.textContent = cardInput.value;
});

cardInput.addEventListener('focus', () => {
  cardInput.style.borderColor = '#1976d2';
  cardInput.style.backgroundColor = '#e3f2fd';
});

cardInput.addEventListener('blur', () => {
  cardInput.style.borderColor = '';
  cardInput.style.backgroundColor = '';
});

colorSelect.addEventListener('change', () => {
  card.style.backgroundColor = colorSelect.value;
});
