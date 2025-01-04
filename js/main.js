import {createPhoto } from './photos.js';
import './post.js';
import './hashtags.js';
import './pristine.js';
import {openForm} from './form.js';
import {getData} from './api.js';
let photos = [];
const success = (data) => {
  photos = data.slice();
  createPhoto(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};
const fail = () =>{
  const errorMesage = document.createElement('div');
  errorMesage.style.position = 'absolute';
  errorMesage.style.left = 0;
  errorMesage.style.top = 0;
  errorMesage.style.right = 0;
  errorMesage.style.fontSize = '20px';
  errorMesage.style.backgroundColor = '#e1375f';
  errorMesage.style.padding = '15px';
  errorMesage.style.textAlign = 'center';
  errorMesage.textContent = 'Ошибка при загрузке изображений';
  document.body.append(errorMesage);
};
getData(success, fail);
openForm();
export {photos};
