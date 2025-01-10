import {pristine} from './pristine.js'

const MAX_SYMBOLS = 20;
const MAX_TAGS = 5;
const loadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('#upload-submit');
const descriptionInput = document.querySelector('.text__description');
const inputTags = document.querySelector('.text__hashtags');

let errorMessage = '';

const error = () => errorMessage;

const checkTags = (value) =>{
  errorMessage = '';
  const inputText = value.toLowerCase().trim();
  if(!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);
  if(inputArray.length === 0){
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не могут повторяться.',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_TAGS,
      error: `Нельзя указать больше ${MAX_TAGS} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    },
  ];
  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid){
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const validateInput = () =>{
  if(pristine.validate()){
    submitButton.disabled = false;
  } else{
    submitButton.disabled = true;
  }
};

pristine.addValidator(inputTags, checkTags, error, 2, false);
const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Не более 140 символов'
);

inputTags.addEventListener('input', validateInput);
descriptionInput.addEventListener('input', validateInput);
loadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
