import {debounce, shuffle} from './util.js';
import {photos} from './main.js';
import {createPhoto, removePhoto} from './photos.js';

const imageFilterElement = document.querySelector('.img-filters__form');
let activeFilter = document.querySelector('.img-filters__button--active');
const MAX_PHOTO_NUMBER = 10;

const mainFilters = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffle(photos.slice()).slice(0, MAX_PHOTO_NUMBER),
  'filter-discussed': () => photos.slice().sort((first, second) => second.comments.length - first.comments.length),
};

const apply = (id) =>{
  removePhoto();
  createPhoto(mainFilters[id]());
};

const toogleButton = (evt) => {
  activeFilter.classList.remove('img-filters__button--active');
  activeFilter = evt.target;
  activeFilter.classList.add('img-filters__button--active');
};

const onFilterClick = debounce((evt) => {
  evt.preventDefault();
  if(evt.target.type === 'button'){
    apply(evt.target.id);
    toogleButton(evt);
  }
});

export const initFilters = () => {
  imageFilterElement.addEventListener('click', onFilterClick);
};
