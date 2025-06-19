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

const messageTemplates = {
  success: document.querySelector('#success').content.querySelector('.success'),
  error: document.querySelector('#error').content.querySelector('.error')
};

let pristine;

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

const showStatusMessage = (type) => {
  const template = messageTemplates[type];

  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const button = message.querySelector(`.${type}__button`);
  const innerSelector = `.${type}__inner`;

  const onEsc = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      removeMessage();
    }
  };
  const onClickOutside = (evt) => {
    if (!evt.target.closest(innerSelector)) {
      evt.preventDefault();
      evt.stopPropagation();
      removeMessage();
    }
  };
  const onButtonClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    removeMessage();
  };
  function removeMessage () {
    button.removeEventListener('click', onButtonClick);
    document.removeEventListener('keydown', onEsc, true);
    document.removeEventListener('click', onClickOutside, true);
    message.remove();
  }

  button.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onEsc, { once: true, capture: true });
  document.addEventListener('click', onClickOutside, { once: true, capture: true });
};

const validateComment = (value) =>
  !value || value.length <= MAX_UPLOAD_FORM_COMMENT_LENGTH;

export const resetValidation = () => {
  if (pristine) {
    pristine.reset();
  }
};

const initValidation = () => {
  pristine = new Pristine(form, {
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
      pristine.reset();
      onClosePhotoEditor();
      showStatusMessage('success');
    } catch (error) {
      showStatusMessage('error');
    } finally {
      submitButton.disabled = false;
    }
  });
};

export { initValidation };
