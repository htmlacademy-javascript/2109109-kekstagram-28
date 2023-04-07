import { getData } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { showAlert } from './util.js';
import { initPhotoPostForm, onFormSubmit } from './form.js';
import { setupFiltering, showFilters } from './image-filters.js';

initPhotoPostForm();

getData()
  .then((photos) => {
    renderThumbnails(photos);
    showFilters();
    setupFiltering(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

onFormSubmit();
