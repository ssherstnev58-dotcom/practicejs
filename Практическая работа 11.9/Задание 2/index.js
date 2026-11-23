const form = document.querySelector('.delivery-form');
const errorMessage = document.querySelector('.error-message');
const tableBody = document.querySelector('.product-table tbody');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const fields = [...formData.values()];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i].trim();

    if (!isNaN(field)) {
      if (!field || +field <= 0) {
        errorMessage.classList.remove('hidden');
        return;
      }
    } else if (!field) {
      errorMessage.classList.remove('hidden');
      return;
    }
  }

  errorMessage.classList.add('hidden');

  const weight = +formData.get('weight');
  const distance = +formData.get('distance');
  const cost = (weight * distance) / 10;

  const row = document.createElement('tr');

  fields.forEach((value) => {
    const cell = document.createElement('td');
    cell.textContent = value.trim();
    row.appendChild(cell);
  });

  const costCell = document.createElement('td');
  costCell.textContent = `${cost.toFixed(2)} руб.`;
  row.appendChild(costCell);

  tableBody.appendChild(row);

  form.reset();
});
