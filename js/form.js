import {isKeyEsc} from './util.js';
import {pristine} from './pristine.js';
import {reset} from './effects.js';
import {postData} from './api.js';
import {formSuccess, formFail } from './submit-form.js';

const FILES = ['gif', 'jpg', 'jpeg', 'png'];

const loadForm = document.querySelector('.img-upload__form');
const loadOverlay = document.querySelector('.img-upload__overlay');
const loadFile = document.querySelector('#upload-file');

const imagePreview = document.querySelector('.img-upload__preview img');
const mainImage = document.querySelector('.img-upload__preview img');
const effects = document.querySelectorAll('.effects__preview');
const closeButton = document.querySelector('#upload-cancel');

const bigButton = document.querySelector('.scale__control--bigger');
const smallButton = document.querySelector('.scale__control--smaller');
const scaleControl = document.querySelector('.scale__control--value');

const Zoom = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

function changeZoom (element = 1) {
  let size = parseInt(scaleControl.value, 10) + (Zoom.STEP * element);
  if(size < Zoom.MIN){
    size = Zoom.MIN;
    return;
  }
  if(size > Zoom.MAX){
    size = Zoom.MAX;
    return;
  }
  scaleControl.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
}

function clickSmallButton () {
  changeZoom(-1);
}

function clickBigButton () {
  changeZoom(1);
}

function clickButton () {
  smallButton.addEventListener('click', clickSmallButton);
  bigButton.addEventListener('click', clickBigButton);
}

function submitForm (evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  postData(formSuccess, formFail, 'POST', formData);
}

export const openForm = () => {
  closeButton.addEventListener('click', closingFormButton);
  document.addEventListener('keydown', closingFormByEsc);
  loadFile.addEventListener('change', loadFormChange);
  scaleControl.value = '100%';
  loadForm.addEventListener('submit', submitForm);
};

export const closeForm = () => {
  loadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeEvents();
  loadForm.reset();
  pristine.reset();
  scaleControl.value = '100%';
  imagePreview.style.transform = 'scale(100%)';

  reset();
};

function closingFormButton (evt) {
  evt.preventDefault();
  closeForm();
}

function closingFormByEsc (evt) {
  if(isKeyEsc(evt) &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description') &&
  !document.querySelector('body').querySelector('.error')) {
    evt.preventDefault();
    closeForm();
  }
}

function removeEvents () {
  closeButton.removeEventListener('click', closingFormButton);
  document.removeEventListener('keydown', closingFormByEsc);
  loadForm.removeEventListener('submit', submitForm);
  smallButton.removeEventListener('click', clickSmallButton);
  bigButton.removeEventListener('click', clickBigButton);
}

function applyFilters () {
  const file = loadFile.files[0];
  const fileName = file.name.toLowerCase();

  if(FILES.some((it) => fileName.endsWith(it))){
    mainImage.src = URL.createObjectURL(file);

    effects.forEach((effect) => {
      effect.style.backgroundImage = `url('${mainImage.src}')`;
    });
  }
}

function loadFormChange () {
  loadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  openForm();
  applyFilters();
  clickButton();
}
