import { getData } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { showAlert } from './util.js';
import { initPhotoPostForm, formSubmitHandler } from './form.js';
import { setUpFiltering, showFilters } from './image-filters.js';

initPhotoPostForm();

getData()
  .then((photos) => {
    renderThumbnails(photos);
    showFilters();
    setUpFiltering(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

formSubmitHandler();
