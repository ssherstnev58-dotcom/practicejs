const form = document.querySelector('.survey-form');
const nameInput = document.querySelector('.input-name');
const emailInput = document.querySelector('.input-email');
const ratingInput = document.querySelector('.input-rating');
const ratingDisplay = document.querySelector('.rating-display');
const commentsInput = document.querySelector('.input-comments');
const errorName = document.querySelector('.error-name');
const errorEmail = document.querySelector('.error-email');
const resultBlock = document.querySelector('.result-block');

const validateName = () => {
  if (!nameInput.value.trim()) {
    errorName.textContent = 'Имя обязательно для заполнения';
    return false;
  }
  errorName.textContent = '';
  return true;
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    errorEmail.textContent = 'Email обязателен для заполнения';
    return false;
  }
  if (!emailRegex.test(emailInput.value.trim())) {
    errorEmail.textContent = 'Некорректный формат email';
    return false;
  }
  errorEmail.textContent = '';
  return true;
};

nameInput.addEventListener('input', () => {
  validateName();
});

emailInput.addEventListener('input', () => {
  validateEmail();
});

ratingInput.addEventListener('input', () => {
  ratingDisplay.textContent = ratingInput.value;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();

  if (!isNameValid || !isEmailValid) {
    return;
  }

  const genderRadio = document.querySelector('.gender-radio:checked');
  const gender = genderRadio ? genderRadio.value : 'Не указан';

  const interestCheckboxes = document.querySelectorAll('.interest-checkbox:checked');
  const interests = [];
  interestCheckboxes.forEach((cb) => {
    interests.push(cb.value);
  });

  resultBlock.style.display = 'block';
  resultBlock.innerHTML = `
    <h2>Данные пользователя:</h2>
    <p><strong>Имя:</strong> ${nameInput.value.trim()}</p>
    <p><strong>Email:</strong> ${emailInput.value.trim()}</p>
    <p><strong>Пол:</strong> ${gender}</p>
    <p><strong>Оценка сервиса:</strong> ${ratingInput.value}</p>
    <p><strong>Интересы:</strong> ${interests.length ? interests.join(', ') : 'Не выбрано'}</p>
    <p><strong>Комментарии:</strong> ${commentsInput.value.trim() || 'Нет'}</p>
  `;
});
