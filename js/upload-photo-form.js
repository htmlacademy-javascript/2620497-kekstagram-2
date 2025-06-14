import {isEscapeKey} from './utils.js';
import { initScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = document.querySelector('#upload-file');
const photoEditorForm = document.querySelector('.img-upload__overlay');

const photoEditorResetBtn = document.querySelector('.img-upload__cancel');

const uploadInput = document.querySelector('.img-upload__input');
const previewImage = photoEditorForm.querySelector('.img-upload__preview img');

const onPhotoEditorResetBtnClick = () => closePhotoEditor();

let scaleModule = null;

export const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

export function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  resetEffects();
  scaleModule.resetScale();
  scaleModule.destroy();
  scaleModule = null;

  if (previewImage.src.startsWith('blob:')) {
    URL.revokeObjectURL(previewImage.src);
  }

  uploadForm.reset();
  uploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', closePhotoEditor);
}


export const inputUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    scaleModule = initScale();
    initEffects();
    photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};


