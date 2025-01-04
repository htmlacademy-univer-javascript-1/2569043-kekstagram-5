import {showBigPic} from './post.js';
const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('a');
const photoFragment = document.createDocumentFragment();
const renderPhoto = (picture) => {
  const newPhoto = photoTemplate.cloneNode(true);
  newPhoto.querySelector('img').src = picture.url;
  newPhoto.querySelector('img').alt = picture.description;
  newPhoto.querySelector('.picture__comments').textContent = picture.comments.length;
  newPhoto.querySelector('.picture__likes').textContent = picture.likes;
  const photoClick = (evt) => {
    evt.preventDefault();
    showBigPic(picture);
  };
  newPhoto.dataset.id = picture.id;
  newPhoto.addEventListener('click', photoClick);
  photoFragment.append(newPhoto);
};
export const createPhoto = function() {
  pictures.forEach((picture) => {
    renderPhoto(picture);
  });
  photoContainer.append(photoFragment);
};
export const removePhoto = () => {
  document.querySelectorAll('.picture').forEach((photo) => photo.remove());
};
