import {createPhotoDescr} from './data.js';
const pictureContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const photos = createPhotoDescr();
const photoFragment = document.createDocumentFragment();
photos.forEach(({url, description, likes, comments}) => {
  const newPhoto = photoTemplate.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = url;
  newPhoto.querySelector('.picture__img').alt = description;
  newPhoto.querySelector('.picture__img').textContent = likes;
  newPhoto.querySelector('.picture__img').textContent = comments.length;
  photoFragment.appendChild(newPhoto);
});
pictureContainer.appendChild(photoFragment);
