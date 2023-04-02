import { getData } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { showAlert } from './util.js';
import { initPhotoPostForm, onFormSubmit } from './form.js';

initPhotoPostForm();

getData()
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

onFormSubmit();
