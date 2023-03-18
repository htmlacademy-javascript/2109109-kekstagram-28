import { renderBigPictureFullScreen } from './big-picture.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

// creating one thumbnail

const createThumbnail = (picture) => {
  const thumbnail = photoTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = picture.url;
  thumbnail.querySelector('.picture__likes').textContent = picture.likes;
  thumbnail.querySelector('.picture__comments').textContent =
    picture.comments.length;
  thumbnail.dataset.thumbnailId = picture.id;

  thumbnail.addEventListener('click', () => {
    renderBigPictureFullScreen(picture);
  });
  return thumbnail;
};

// generating thumbnails

const renderThumbnails = (pictures) => {
  const photoGalleryFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    photoGalleryFragment.append(createThumbnail(picture));
  });
  photoContainer.append(photoGalleryFragment);
};

export { renderThumbnails };
