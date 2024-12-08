const EFFECTS = [
  {
    name: 'none',
    style:'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style:'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style:'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style:'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style:'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style:'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },
];
const defEffect = EFFECTS[0];
let chosenEff = defEffect;
const image = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');
const isDefalt = () => chosenEff === defEffect;
const openSlider = () => {
  sliderContainer.classList.remove('hidden');
};
const closeSlider = () => {
  sliderContainer.classList.add('hidden');
};
const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
        min: chosenEff.min,
        max: chosenEff.max
    },
    step: chosenEff.step,
    start: chosenEff.max,
  });
  if (isDefalt()) {
    closeSlider();
  }
  else {
    openSlider();
  }
};
const effectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__redio')) {
    return;
  }
  chosenEff = EFFECTS.find((effect) => effect.name === evt.target.value);
  image.className = `effects__preview--$(chosenEff.name)`;
  updateSlider();
};
export const reset = () => {
  chosenEff = defEffect;
  updateSlider();
};
noUiSlider.create(slider, {
  range: {
    min: defEffect.min,
    max: defEffect.max,
  },
  start: defEffect.max,
  step: defEffect.step,
  connect: 'lower',
});
closeSlider();
effects.addEventListener('change', effectsChange);
slider.noUiSlider.on('update', updateSlider);
