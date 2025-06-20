import {renderThumbnails} from './thumbnail.js';
import {initFullPhoto} from './full-photo.js';
import {inputUploadModal} from './upload-photo-form.js';
import {initValidation} from './validation.js';
import {getData} from './api.js';
import {showDataErrorMessage} from './utils.js';
import {configFilter} from './filter.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initFullPhoto(photos);
    configFilter(photos);
  })
  .catch(() => {
    showDataErrorMessage();
  });

inputUploadModal();

initValidation();
