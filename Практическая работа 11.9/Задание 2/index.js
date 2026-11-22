const form = document.querySelector('.delivery-form');
const nameInput = document.querySelector('.input-name');
const weightInput = document.querySelector('.input-weight');
const distanceInput = document.querySelector('.input-distance');
const errorMessage = document.querySelector('.error-message');
const tbody = document.querySelector('.product-table tbody');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const weight = +weightInput.value.trim();
  const distance = +distanceInput.value.trim();

  if (!name || !weightInput.value.trim() || !distanceInput.value.trim() || isNaN(weight) || weight <= 0 || isNaN(distance) || distance <= 0) {
    errorMessage.classList.remove('hidden');
    return;
  }

  errorMessage.classList.add('hidden');

  const cost = (weight * distance) / 10;

  const tr = document.createElement('tr');

  const tdName = document.createElement('td');
  tdName.textContent = name;

  const tdWeight = document.createElement('td');
  tdWeight.textContent = weight;

  const tdDistance = document.createElement('td');
  tdDistance.textContent = distance;

  const tdCost = document.createElement('td');
  tdCost.textContent = `${cost.toFixed(2)} руб.`;

  tr.appendChild(tdName);
  tr.appendChild(tdWeight);
  tr.appendChild(tdDistance);
  tr.appendChild(tdCost);

  tbody.appendChild(tr);

  form.reset();
});
