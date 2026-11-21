const thumbnails = document.querySelectorAll('.thumbnail');
const fullImageBlock = document.getElementById('full-image-block');

thumbnails.forEach(function (thumb) {
  thumb.addEventListener('click', function () {
    const imageUrl = thumb.getAttribute('src');
    fullImageBlock.innerHTML = `<img src="${imageUrl}" alt="Большое фото">`;
  });
});
