import { renderFullSizePhoto } from './big-picture.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesTitle = photoContainer.querySelector('.pictures__title');

picturesTitle.classList.remove('visually-hidden');

// generating one miniature

const createThumbnail = (picture) => {
  const thumbnail = photoTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = picture.url;
  thumbnail.querySelector('.picture__likes').textContent = picture.likes;
  thumbnail.querySelector('.picture__comments').textContent =
    picture.comments.length;

  thumbnail.addEventListener('click', () => {
    renderFullSizePhoto(picture);
  });
  return thumbnail;
};

// generating miniatures

const renderThumbnails = (pictures) => {
  const photoGalleryFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    photoGalleryFragment.append(createThumbnail(picture));
  });
  photoContainer.append(photoGalleryFragment);
};

export { renderThumbnails };
