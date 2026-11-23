const promocodeObj = {
  promocode: 'PROM50',
  gift: 'Скидка 50%'
};

const form = document.querySelector('.promocode-form');
const promocodeInput = document.querySelector('.promocode-input');
const promocodeMessage = document.querySelector('.promocode-message');

const getCookie = () => {
  if (!document.cookie) {
    return {};
  }

  return document.cookie.split('; ').reduce((accumulator, item) => {
    const [name, value] = item.split('=');
    accumulator[name] = value ? decodeURIComponent(value) : '';
    return accumulator;
  }, {});
};

const applyPromocode = (gift) => {
  promocodeInput.classList.add('promocode-input-active');
  promocodeMessage.textContent = `Промокод применён. ${gift}`;
  promocodeMessage.classList.remove('hidden');
};

const resetPromocode = () => {
  promocodeInput.classList.remove('promocode-input-active');
  promocodeMessage.textContent = '';
  promocodeMessage.classList.add('hidden');
};

const cookie = getCookie();

if (cookie.promocode === promocodeObj.promocode) {
  promocodeInput.value = cookie.promocode;
  applyPromocode(promocodeObj.gift);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const enteredPromocode = formData.get('promocode').trim();

  if (enteredPromocode === promocodeObj.promocode) {
    applyPromocode(promocodeObj.gift);
    document.cookie = `promocode=${encodeURIComponent(enteredPromocode)}; max-age=604800`;
  } else {
    resetPromocode();
    document.cookie = 'promocode=; max-age=0';
  }
});
