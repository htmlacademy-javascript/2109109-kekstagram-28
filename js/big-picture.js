import { isEscapeKey } from './util.js';

const COMMENTS_COUNT = 5;

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImg = bigPictureModal
  .querySelector('.big-picture__img')
  .querySelector('img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const btnCloseBigPicture = bigPictureModal.querySelector('.big-picture__cancel');
const socialCommentList = document.querySelector('.social__comments');
const socialComment = socialCommentList.querySelector('.social__comment');
const socialCommentCount = bigPictureModal.querySelector(
  '.social__comment-count',
);
const socialCaption = bigPictureModal.querySelector('.social__caption');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const body = document.querySelector('body');
let currentCommentsCount = COMMENTS_COUNT;
let updateLoadMoreClick;

// opening one photo

const openFullSizePhoto = () => {
  bigPictureModal.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentList.innerHTML = '';

  document.addEventListener('keydown', onDocumentKeydown);
  btnCloseBigPicture.addEventListener(
    'click',
    btnCloseFullSizePhotoClickHandler,
  );
};

// closing photo

const closeFullSizePhoto = () => {
  bigPictureModal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  btnCloseBigPicture.removeEventListener(
    'click',
    btnCloseFullSizePhotoClickHandler,
  );
};

function btnCloseFullSizePhotoClickHandler() {
  closeFullSizePhoto();
}

// closing modal with Esc button

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeFullSizePhoto();
  }
}

// creating a comment under the full size photo

const createCommentOnFullSizePhoto = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

// adding more comments

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.slice(0, currentCommentsCount).forEach((comment) => {
    commentsFragment.append(createCommentOnFullSizePhoto(comment));
  });
  socialCommentList.innerHTML = '';
  socialCommentList.append(commentsFragment);
  if (currentCommentsCount >= comments.length) {
    currentCommentsCount = comments.length;
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', updateLoadMoreClick);
  } else {
    commentsLoader.classList.remove('hidden');
  }
  socialCommentCount.textContent = `${currentCommentsCount} из ${comments.length} комментариев`;
};

// rendering full size pic

const renderFullSizePhoto = (picture) => {
  openFullSizePhoto();
  currentCommentsCount = COMMENTS_COUNT;
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.description;
  commentsCount.textContent = picture.comments.length;
  updateLoadMoreClick = () => {
    currentCommentsCount += COMMENTS_COUNT;
    renderComments(picture.comments);
  };
  commentsLoader.addEventListener('click', updateLoadMoreClick);
  renderComments(picture.comments);
};

export { renderFullSizePhoto };
