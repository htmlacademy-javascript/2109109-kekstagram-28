import { renderThumbnails } from './thumbnail.js';
import { debounce, sortRandom } from './util.js';

const TIMEOUT = 500;
const PICTURES_COUNT = 10;
const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  topReviewed: 'filter-discussed',
};

const imgFilterContainer = document.querySelector('.img-filters');
const imgFilterForm = document.querySelector('.img-filters__form');
const filterBtns = imgFilterForm.querySelectorAll('.img-filters__button');

const showFilters = () =>
  imgFilterContainer.classList.remove('img-filters--inactive');

const removeThumbnails = (thumbnails) =>
  thumbnails.forEach((thumbnail) => thumbnail.remove());

const sortByCommentCount = (a, b) => b.comments.length - a.comments.length;

const filterPhotos = (photos, filter) => {
  switch (filter) {
    case FILTERS.random:
      return photos.slice().sort(sortRandom).slice(0, PICTURES_COUNT);
    case FILTERS.topReviewed:
      return photos.slice().sort(sortByCommentCount);
    default:
      return photos;
  }
};

const switchFilterClassNames = (filter) => {
  filterBtns.forEach((btn) => {
    if (btn.id === filter) {
      btn.classList.add('img-filters__button--active');
    } else {
      btn.classList.remove('img-filters__button--active');
    }
  });
};

const filterButtonClick = (filter, photos) => {
  const thumbnails = document.querySelectorAll('.picture');
  switchFilterClassNames(filter);
  removeThumbnails(thumbnails);
  renderThumbnails(filterPhotos(photos, filter));
};

const setUpFiltering = (photos) => {
  filterBtns.forEach((btn) => {
    btn.addEventListener(
      'click',
      debounce((event) => {
        filterButtonClick(event.target.id, photos);
      }, TIMEOUT),
    );
  });
};

export { setUpFiltering, showFilters };
