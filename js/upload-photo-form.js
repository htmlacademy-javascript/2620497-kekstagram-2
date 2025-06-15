import {isEscapeKey} from './utils.js';
import { initScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';


const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const previewImage = uploadOverlay.querySelector('.img-upload__preview img');

let scaleModule = null;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleModule = initScale();
  initEffects();

  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancel.addEventListener('click', closePhotoEditor);
};

function closePhotoEditor () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  resetEffects();

  scaleModule.resetScale();
  scaleModule.destroy();
  scaleModule = null;

  form.reset();
  uploadInput.value = '';

  if (previewImage.src.startsWith('blob:')) {
    URL.revokeObjectURL(previewImage.src);
  }
}

const onFileInputChange = (evt) => {
  const file = evt.target.files[0];

  if (!file || !file.type.match('image.*')) {
    return;
  }

  const url = URL.createObjectURL(file);
  previewImage.src = url;

  openUploadForm();
};

const inputUploadModal = () => {
  uploadInput.addEventListener('change', onFileInputChange);
};

export { inputUploadModal, onDocumentKeydown, closePhotoEditor };
