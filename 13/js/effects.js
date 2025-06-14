import '../vendor/nouislider/nouislider.css';
import { EFFECTS } from './constants.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');

let currentEffect = 'none';

const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });

  sliderContainer.classList.add('hidden');
};


const updateSlider = (effect) => {
  const { min, max, start, step } = EFFECTS[effect].options;
  sliderElement.noUiSlider.updateOptions({ range: { min, max }, start, step });
};

const applyEffect = (effect, value) => {
  if (effect === 'none') {
    imagePreview.style.filter = 'none';
    return;
  }

  const { filter, unit } = EFFECTS[effect];
  imagePreview.style.filter = `${filter}(${value}${unit})`;
};

const handleSliderUpdate = () => {
  const value = sliderElement.noUiSlider.get();
  applyEffect(currentEffect, value);
  effectValue.value = value;
};

function handleEffectChange(evt) {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }

  currentEffect = evt.target.value;
  const isNone = currentEffect === 'none';

  sliderContainer.classList.toggle('hidden', isNone);

  if (isNone) {
    applyEffect('none');
  } else {
    updateSlider(currentEffect);
  }
}

const resetEffects = () => {
  currentEffect = 'none';
  imagePreview.style.filter = 'none';
  document.querySelector('#effect-none').checked = true;
  sliderContainer.classList.add('hidden');
};

const initEffects = () => {
  initSlider();
  effectsList.addEventListener('change', handleEffectChange);
  sliderElement.noUiSlider.on('update', handleSliderUpdate);
  resetEffects();
};

export { initEffects, resetEffects };
