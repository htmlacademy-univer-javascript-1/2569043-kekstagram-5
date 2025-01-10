import {closeForm} from './form.js';
import {isKeyEsc} from './util.js';

const body = document.body;
const errorMessage = body.querySelector('#error').content.querySelector('section');
const successMessage = document.querySelector('#success').content.querySelector('section');

const mainClick = (evt) => {
  const clickElem = evt.target;
  if(clickElem.classList.contains('success__inner') || clickElem.classList.contains('error__inner')){
    return;
  }
  closeMessage();
};

const mainKeyDown = (evt) => {
  evt.preventDefault();
  if(isKeyEsc (evt)){
    closeMessage();
  }
};

function closeMessage () {
  body.removeEventListener('click', mainClick);
  document.removeEventListener('keydown', mainKeyDown);
  body.removeChild(body.lastChild);
}

const showMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(1);
  message.style.zIndex = 100;
  document.addEventListener('keydown', mainKeyDown);
  body.addEventListener('click', mainClick);
  body.appendChild(message);
};

export const formSuccess = () => {
  closeForm();
  showMessage(successMessage);
};

export const formFail = () => {
  showMessage(errorMessage);
};
