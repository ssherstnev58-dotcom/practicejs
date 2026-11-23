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

const getRandomGift = (gifts) => gifts[Math.floor(Math.random() * gifts.length)];

const createGiftPopup = (gift) => {
  const overlay = document.createElement('div');
  overlay.classList.add('popup-overlay');

  const card = document.createElement('div');
  card.classList.add('popup-card');

  const icon = document.createElement('img');
  icon.classList.add('popup-icon');
  icon.src = gift.icon;
  icon.alt = 'Подарок';

  const content = document.createElement('div');
  content.classList.add('popup-content');

  const title = document.createElement('h2');
  title.classList.add('popup-title');
  title.textContent = gift.title;

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('popup-button');
  closeButton.textContent = 'Отлично!';

  closeButton.addEventListener('click', () => {
    overlay.remove();
  });

  content.appendChild(title);
  content.appendChild(closeButton);

  card.appendChild(icon);
  card.appendChild(content);

  overlay.appendChild(card);

  return overlay;
};

setTimeout(() => {
  const randomGift = getRandomGift(giftArr);
  const popup = createGiftPopup(randomGift);
  document.body.appendChild(popup);
}, 3000);
