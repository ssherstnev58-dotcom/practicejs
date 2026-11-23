const form = document.querySelector('.survey-form');
const ratingInput = document.querySelector('.input-rating');
const ratingDisplay = document.querySelector('.rating-display');
const errorName = document.querySelector('.error-name');
const errorEmail = document.querySelector('.error-email');
const resultBlock = document.querySelector('.result-block');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (value, errorText, errorElement, pattern = null) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    errorElement.textContent = errorText;
    return false;
  }

  if (pattern && !pattern.test(trimmedValue)) {
    errorElement.textContent = 'Некорректный формат email';
    return false;
  }

  errorElement.textContent = '';
  return true;
};

ratingInput.addEventListener('input', () => {
  ratingDisplay.textContent = ratingInput.value;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const gender = formData.get('gender') || 'Не указан';
  const rating = formData.get('rating');
  const interests = formData.getAll('interests');
  const comments = formData.get('comments');

  const isNameValid = validateField(name, 'Имя обязательно для заполнения', errorName);
  const isEmailValid = validateField(email, 'Email обязателен для заполнения', errorEmail, emailRegex);

  if (!isNameValid || !isEmailValid) {
    return;
  }

  resultBlock.style.display = 'block';
  resultBlock.innerHTML = `
    <h2>Данные пользователя:</h2>
    <p><strong>Имя:</strong> ${name.trim()}</p>
    <p><strong>Email:</strong> ${email.trim()}</p>
    <p><strong>Пол:</strong> ${gender}</p>
    <p><strong>Оценка сервиса:</strong> ${rating}</p>
    <p><strong>Интересы:</strong> ${interests.length ? interests.join(', ') : 'Не выбрано'}</p>
    <p><strong>Комментарии:</strong> ${comments.trim() || 'Нет'}</p>
  `;
});
