import {createPhotoDescr} from './data.js';
import {openPost} from './post.js';
const pictureContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const renderPhoto = (post) => {
  const newPhoto = photoTemplate.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = post.url;
  newPhoto.querySelector('.picture__comments').textContent = post.comments.length;
  newPhoto.querySelector('.picture__likes').textContent = post.likes;
  newPhoto.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPost();
  });
  return newPhoto;
};
export const renderPrew = function() {
  const photoFragment = document.createDocumentFragment();
  createPhotoDescr.forEach((pictureContainer) => {
    photoFragment.appendChild(renderPhoto(picture));
  });
  pictureContainer.appendChild(photoFragment);
};
