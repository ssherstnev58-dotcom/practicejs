const promocodeArr = [
  {
    promocode: 'PROM10',
    gift: 'Скидка 10%'
  },
  {
    promocode: 'PROM50',
    gift: 'Скидка 50%'
  },
  {
    promocode: 'GIFT',
    gift: 'Подарок в корзине'
  }
];

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

const findPromocode = (value) => promocodeArr.find((item) => item.promocode === value);

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
const savedPromocode = findPromocode(cookie.promocode);

if (savedPromocode) {
  promocodeInput.value = savedPromocode.promocode;
  applyPromocode(savedPromocode.gift);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const enteredPromocode = formData.get('promocode').trim();
  const matchedPromocode = findPromocode(enteredPromocode);

  if (matchedPromocode) {
    applyPromocode(matchedPromocode.gift);
    document.cookie = `promocode=${encodeURIComponent(matchedPromocode.promocode)}; max-age=604800`;
  } else {
    resetPromocode();
    document.cookie = 'promocode=; max-age=0';
  }
});
