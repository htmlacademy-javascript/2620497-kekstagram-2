import {MIN_SCALE, MAX_SCALE, STEP_SCALE} from './constants.js';

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgElement = document.querySelector('.img-upload__preview img');

export const initScale = () => {
  let currentScale = MAX_SCALE;

  function updateScale() {
    scaleValue.value = `${currentScale}%`;
    imgElement.style.transform = `scale(${currentScale / 100})`;
  }

  function onHandleSmallerClick() {
    currentScale = Math.max(MIN_SCALE, currentScale - STEP_SCALE);
    updateScale();
  }

  function onHandleBiggerClick() {
    currentScale = Math.min(MAX_SCALE, currentScale + STEP_SCALE);
    updateScale();
  }

  scaleSmaller.addEventListener('click', onHandleSmallerClick);
  scaleBigger.addEventListener('click', onHandleBiggerClick);

  updateScale();

  return {
    resetScale: () => {
      currentScale = MAX_SCALE;
      updateScale();
    },
    destroy: () => {
      scaleSmaller.removeEventListener('click', onHandleSmallerClick);
      scaleBigger.removeEventListener('click', onHandleBiggerClick);
    }
  };
};
