const thumbnails = document.querySelector('.thumbnails');
const fullImageBlock = document.querySelector('.full-image-block');

thumbnails.addEventListener('click', (e) => {
  if (e.target.classList.contains('thumbnail')) {
    const imageUrl = e.target.getAttribute('src');
    fullImageBlock.innerHTML = `<img src="${imageUrl}" alt="Большое фото">`;
  }
});
