import { renderThumbnails } from './thumbnail.js';
import { debounce, sortRandom } from './util.js';

const TIMEOUT = 500;
const NUMBER_OF_PICTURES_TO_SHOW = 10;

const imgFilterContainer = document.querySelector('.img-filters');
const imgFilterForm = document.querySelector('.img-filters__form');
const imgFilterDefaultBtn = document.querySelector('#filter-default');
const imgFilterRandomBtn = document.querySelector('#filter-random');
const imgFilterDiscussedBtn = document.querySelector('#filter-discussed');

const showFilters = () =>
  imgFilterContainer.classList.remove('img-filters--inactive');

const removeThumbnails = (thumbnails) =>
  thumbnails.forEach((thumbnail) => thumbnail.remove());

const sortByCommentCount = (a, b) => b.comments.length - a.comments.length;

const filterPhotos = (photos, filterBtn) => {
  if (filterBtn === imgFilterDefaultBtn) {
    return photos;
  } else if (filterBtn === imgFilterRandomBtn) {
    return photos.slice().sort(sortRandom).slice(0, NUMBER_OF_PICTURES_TO_SHOW);
  } else if (filterBtn === imgFilterDiscussedBtn) {
    return photos.slice().sort(sortByCommentCount);
  }
};

const handleFilterButtonClick = (event, photos) => {
  const thumbnails = document.querySelectorAll('.picture');
  const filterBtn = event.target;
  imgFilterDefaultBtn.classList.remove('img-filters__button--active');
  imgFilterRandomBtn.classList.remove('img-filters__button--active');
  imgFilterDiscussedBtn.classList.remove('img-filters__button--active');
  filterBtn.classList.add('img-filters__button--active');
  removeThumbnails(thumbnails);
  renderThumbnails(filterPhotos(photos, filterBtn));
};

const setupFiltering = (photos) => {
  imgFilterForm.addEventListener(
    'click',
    debounce((event) => {
      handleFilterButtonClick(event, photos);
    }, TIMEOUT),
  );
};

export { setupFiltering, showFilters };
