import { isEscapeKeydown } from './util.js';

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

// opening photo

const openFullSizePhoto = () => {
  bigPictureModal.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentList.innerHTML = '';

  document.addEventListener('keydown', onDocumentKeydown);
};

// closing photo

const closeFullSizePhoto = () => {
  bigPictureModal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

// closing photo by clicking close-btn

btnCloseBigPicture.addEventListener('click', () => {
  closeFullSizePhoto();
});

// closing modal with Esc button

function onDocumentKeydown(evt) {
  if (isEscapeKeydown) {
    evt.preventDefault();

    closeFullSizePhoto();
  }
}

// creating a comment under the full size photo

const createCommentOnFullSizePhoto = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

// adding more comments

const renderComments = (comments) => {
  socialCommentList.innerHTML = '';

  comments.slice(0, currentCommentsCount).forEach((comment) => {
    socialCommentList.innerHTML += createCommentOnFullSizePhoto(
      comment,
    ).outerHTML;
  });

  currentCommentsCount = Math.min(currentCommentsCount, comments.length);
  const isAllCommentsDisplayed = currentCommentsCount >= comments.length;

  commentsLoader.classList.toggle('hidden', isAllCommentsDisplayed);

  if (isAllCommentsDisplayed) {
    commentsLoader.removeEventListener('click', updateLoadMoreClick);
  }

  socialCommentCount.textContent = `${currentCommentsCount} из ${comments.length} комментариев`;
};

// rendering full size pic

const renderFullSizePhoto = (picture) => {
  openFullSizePhoto();
  const { url, likes, description, comments } = picture;
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
  commentsCount.textContent = comments.length;

  const onLoadMoreClick = () => {
    currentCommentsCount += COMMENTS_COUNT;
    renderComments(comments);
  };

  commentsLoader.addEventListener('click', onLoadMoreClick);
  renderComments(comments);
};

export { renderFullSizePhoto };
