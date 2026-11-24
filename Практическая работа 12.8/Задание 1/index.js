const giftArr = [
  {
    title: 'Скидка 20% на первую покупку в нашем магазине!',
    icon: './img/discount.png'
  },
  {
    title: 'Скидка 10% на всё!',
    icon: './img/discount_2.png'
  },
  {
    title: 'Подарок при первой покупке в нашем магазине!',
    icon: './img/gift.png'
  },
  {
    title: 'Бесплатная доставка для вас!',
    icon: './img/delivery.png'
  },
  {
    title: 'Сегодня день больших скидок!',
    icon: './img/discount_3.png'
  }
];

const popupOverlay = document.querySelector('.popup-overlay');
const popupCard = document.querySelector('.popup-card');

const getRandomGift = (gifts) => gifts[Math.floor(Math.random() * gifts.length)];

const showGiftPopup = (gift) => {
  popupCard.innerHTML = `
    <img class="popup-icon" src="${gift.icon}" alt="Подарок">
    <div class="popup-content">
      <h2 class="popup-title">${gift.title}</h2>
      <button type="button" class="popup-button">Отлично!</button>
    </div>
  `;

  popupOverlay.classList.remove('hidden');
};

popupOverlay.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup-button')) {
    popupOverlay.classList.add('hidden');
  }
});

setTimeout(() => {
  const randomGift = getRandomGift(giftArr);
  showGiftPopup(randomGift);
}, 3000);
