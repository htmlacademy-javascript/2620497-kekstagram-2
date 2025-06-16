import {
  MAX_UPLOAD_FORM_COMMENT_LENGTH,
  MAX_HASHTAGS,
  HASHTAG_REGEX,
  UploadFormErrorMessage
} from './constants.js';
import { onDocumentKeydown, onClosePhotoEditor} from './upload-photo-form.js';
import { isTextField, isEscapeKey} from './utils.js';
import { sendData } from './api.js';

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const normalizeHashtags = (value) =>
  value.trim() ? value.trim().split(/\s+/).filter(Boolean) : [];

const validateHashtagFormat = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = normalizeHashtags(value);

  return hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag));
};

const validateHashtagCount = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = normalizeHashtags(value);

  return hashtags.length <= MAX_HASHTAGS;
};

const checkDuplicateHashtags = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = normalizeHashtags(value);
  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);

  return uniqueHashtags.size === hashtags.length;
};

const showSuccessMessage = () => {
  const template = document.querySelector('#success').content.querySelector('.success');
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const successButton = message.querySelector('.success__button');
  successButton.addEventListener('click', () => message.remove());

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      message.remove();
    }
  }, { once: true });

  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      message.remove();
    }
  }, { once: true });
};

const validateComment = (value) =>
  !value || value.length <= MAX_UPLOAD_FORM_COMMENT_LENGTH;

const showErrorMessage = () => {
  const template = document.querySelector('#error').content.querySelector('.error');
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const errorButton = message.querySelector('.error__button');
  errorButton.addEventListener('click', () => message.remove());

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      message.remove();
    }
  }, { once: true });

  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      message.remove();
    }
  }, { once: true });
};


const initValidation = () => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'pristine-error',
  });

  pristine.addValidator(
    hashtagInput,
    validateHashtagFormat,
    UploadFormErrorMessage.INVALID_HASHTAG,
    1,
    true
  );

  pristine.addValidator(
    hashtagInput,
    validateHashtagCount,
    UploadFormErrorMessage.MAX_HASHTAGS,
    2,
    true
  );

  pristine.addValidator(
    hashtagInput,
    checkDuplicateHashtags,
    UploadFormErrorMessage.DUPLICATE_HASHTAG,
    3,
    true
  );

  pristine.addValidator(
    commentInput,
    validateComment,
    UploadFormErrorMessage.MAX_UPLOAD_FORM_COMMENT_LENGTH,
    1,
    true
  );

  form.addEventListener('focus', (evt) => {
    if (isTextField(evt.target)) {
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  }, true);


  form.addEventListener('blur', (evt) => {
    if (isTextField(evt.target)) {
      document.addEventListener('keydown', onDocumentKeydown);
    }
  }, true);

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    submitButton.disabled = true;
    try {
      const formData = new FormData(form);
      await sendData(formData);
      onClosePhotoEditor();
      showSuccessMessage();
    } catch (error) {
      showErrorMessage();
    } finally {
      submitButton.disabled = false;
    }

  });
};

export { initValidation };
