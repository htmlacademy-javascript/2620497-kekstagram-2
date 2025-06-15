import {MIN_SCALE, MAX_SCALE, STEP_SCALE} from './constants.js';

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

export const initScale = () => {
  let currentScale = MAX_SCALE;

  function updateScale() {
    scaleValue.value = `${currentScale}%`;
    imgUploadPreview.style.transform = `scale(${currentScale / 100})`;
  }

  function handleSmallerClick() {
    currentScale = Math.max(MIN_SCALE, currentScale - STEP_SCALE);
    updateScale();
  }

  function handleBiggerClick() {
    currentScale = Math.min(MAX_SCALE, currentScale + STEP_SCALE);
    updateScale();
  }

  scaleSmaller.addEventListener('click', handleSmallerClick);
  scaleBigger.addEventListener('click', handleBiggerClick);

  updateScale();

  return {
    resetScale: () => {
      currentScale = MAX_SCALE;
      updateScale();
    },
    destroy: () => {
      scaleSmaller.removeEventListener('click', handleSmallerClick);
      scaleBigger.removeEventListener('click', handleBiggerClick);
    }
  };
};
