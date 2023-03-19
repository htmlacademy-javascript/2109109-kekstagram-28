import { photoDescriptions } from './data.js';

const thumbnailsElement = document.querySelector('.pictures');
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImg = bigPictureModal
  .querySelector('.big-picture__img')
  .querySelector('img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const btnCloseBigPicture = bigPictureModal.querySelector('.big-picture__cancel');
const socialCommentList = document.querySelector('.social__comments');
const socialCommentCount = bigPictureModal.querySelector(
  '.social__comment-count',
);
const socialCaption = bigPictureModal.querySelector('.social__caption');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const body = document.querySelector('body');

// closing modal with Esc button

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeFullSizePhoto();
  }
};

//adding more comments

const onButtonLoadMoreClick = () => {
  let currentComment = socialCommentList.querySelector('.hidden');
  let currentCommentNumber = parseInt(
    socialCommentCount.querySelector('span').textContent,
    10,
  );
  for (let i = 1; i <= 5; i++) {
    currentComment.classList.remove('hidden');
    currentComment = socialCommentList.querySelector('.hidden');

    const counterSpan = socialCommentCount.querySelector('span');
    currentCommentNumber += 1;
    counterSpan.textContent = currentCommentNumber;

    if (!currentComment) {
      commentsLoader.classList.add('hidden');
      break;
    }
  }
};

// opening photo and adding comments

const openFullSizePhoto = (thumbnail) => {
  document.body.classList.add('modal-open');
  bigPictureModal.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  const pictureId = thumbnail.getAttribute('data-photo-id');
  const pictureData = photoDescriptions.find(
    // eslint-disable-next-line eqeqeq
    (element) => element.id == pictureId,
  );

  bigPictureImg.src = pictureData.url;
  likesCount.textContent = pictureData.likes;
  socialCaption.textContent = pictureData.description;
  socialCommentList.innerHTML = '';

  const commentsAmount = pictureData.comments.length;
  if (commentsAmount !== 0) {
    commentsCount.innerHTML = `
      <span>0</span>
      из
      <span class="comments-count">${commentsAmount}</span>
      комментариев`;
    pictureData.comments.forEach((comment) =>
      socialCommentList.insertAdjacentHTML(
        'beforeend',
        `
        <li class="social__comment hidden">
          <img
            class="social__picture"
            src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35"
          >
          <p class="social__text">${comment.message}</p>
        </li>
      `,
      ),
    );
    commentsLoader.addEventListener('click', onButtonLoadMoreClick);
    commentsLoader.click();
  } else {
    socialCommentCount.innerHTML = 'Нет комментариев';
    commentsLoader.classList.add('hidden');
  }
};

// closing photo

const closeFullSizePhoto = () => {
  bigPictureModal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onButtonLoadMoreClick);
};

// closing photo with a click on a close-button

btnCloseBigPicture.addEventListener('click', () => {
  closeFullSizePhoto();
});

//

thumbnailsElement.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    evt.preventDefault();
    openFullSizePhoto(thumbnail);
  }
});

export { openFullSizePhoto };
