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

const defaultEffect = EFFECTS[0];
let chosenEffect = defaultEffect;
const image = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

const isDefalt = () => chosenEffect === defaultEffect;

const openSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const closeSlider = () => {
  sliderContainer.classList.add('hidden');
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if (isDefalt()) {
    closeSlider();
  } else {
    openSlider();
  }
};

const changeEffects = (evt) => {
  if (!evt.target.classList.contains('effects__redio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  image.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  if (isDefalt) {
    image.style.filter = defaultEffect.style;
  } else {
    image.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }
  effectLevel.value = sliderValue;
};

export const reset = () => {
  chosenEffect = defaultEffect;
  updateSlider();
};

noUiSlider.create(slider, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.max,
  step: defaultEffect.step,
  connect: 'lower',
});

closeSlider();
effects.addEventListener('change', changeEffects);
slider.noUiSlider.on('update', onSliderUpdate);
