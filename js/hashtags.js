const maxSymbol = 20;
const maxTags = 5;
const loadForm = document.querySelector('.img-upload__form');
const submitBtn = document.querySelector('#upload-submit');
const descrInput = document.querySelector('.text__description');
export const pristine = new Pristine(loadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
}, true);
const inputTags = document.querySelector('.text__hashtags');
let errorMessage = '';
const error = () => errorMessage;
const tagsCheck = (value) =>{
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
      error: 'Хэш-теги разделяются пробелами.',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с #.',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не могут повторяться.',
    },
    {
      check: inputArray.some((item) => item.length > maxSymbol),
      error: `Максимальная длина одного хэш-тега ${maxSymbol} символов, включая решётку.`,
    },
    {
      check: inputArray.length > maxTags,
      error: `Нельзя указать больше ${maxTags} хэш-тегов.`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы.',
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
    submitBtn.disabled = false;
  } else{
    submitBtn.disabled = true;
  }
};
pristine.addValidator(inputTags, tagsCheck, error, 2, false);
const validateDescr = (value) => value.length <= 140;
pristine.addValidator(
  descrInput,
  validateDescr,
  'Не более 140 символов'
);
inputTags.addEventListener('input', validateInput);
descrInput.addEventListener('input', validateInput);
loadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
