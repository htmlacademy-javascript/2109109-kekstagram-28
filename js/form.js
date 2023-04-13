import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showErrorWindow, showSuccessWindow } from './messages.js';
import { isEscapeKey } from './util.js';
import {
  resetScale,
  imageElement,
  imgDecreaseHandler,
  imgIncreaseHandler,
  decreaseImgBtn,
  increaseImgBtn,
} from './scale.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAG_COUNT = 5;
const DESCRIPTION_MAX_LENGTH = 140;

const UPLOAD_FILE_ID = 'upload-file';
const UPLOAD_SELECT_IMAGE_FORM_ID = 'upload-select-image';
const IMAGE_OVERLAY_CLASS = 'img-upload__overlay';
const UPLOAD_CANCEL_ID = 'upload-cancel';
const HASHTAG_INPUT_FIELD_CLASS = '.text__hashtags';
const COMMENT_INPUT_FIELD_CLASS = '.text__description';
const SUBMIT_BTN_CLASS = '.img-upload__submit';

const submitButtonTextOptions = {
  INITIAL: 'Опубликовать',
  PUBLICATION: 'Публикую...',
};

const uploadFileInput = document.querySelector(`#${UPLOAD_FILE_ID}`);
const uploadSelectImageForm = document.querySelector(
  `#${UPLOAD_SELECT_IMAGE_FORM_ID}`,
);
const imageOverlay = document.querySelector(`.${IMAGE_OVERLAY_CLASS}`);
const uploadCancel = imageOverlay.querySelector(`#${UPLOAD_CANCEL_ID}`);
const body = document.querySelector('body');
const hashtagInputField = document.querySelector(HASHTAG_INPUT_FIELD_CLASS);
const commentInputField = document.querySelector(COMMENT_INPUT_FIELD_CLASS);
const submitBtn = document.querySelector(SUBMIT_BTN_CLASS);

const pristine = new Pristine(
  document.getElementById(UPLOAD_SELECT_IMAGE_FORM_ID),
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  },
);

// Loading an image into the editing window

const previewImgHandler = () => {
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();
  const hasAllowedExtention = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (hasAllowedExtention) {
    imageElement.src = URL.createObjectURL(file);
  }
};

// Closing the window with an image
const closeModalHandler = () => {
  uploadSelectImageForm.reset();
  pristine.reset();
  resetEffects();
  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadCancel.removeEventListener('click', closeModalHandler);
  uploadSelectImageForm.removeEventListener('submit', submitForm);
  decreaseImgBtn.removeEventListener('click', imgDecreaseHandler);
  increaseImgBtn.removeEventListener('click', imgIncreaseHandler);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function initPhotoPostForm() {
  // Closing the window with the click on the x-button

  // Opening a window with an image
  const openModalHandler = () => {
    imageOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    resetScale();

    uploadCancel.addEventListener('click', closeModalHandler);
    document.addEventListener('keydown', onDocumentKeydown);
    decreaseImgBtn.addEventListener('click', imgDecreaseHandler);
    increaseImgBtn.addEventListener('click', imgIncreaseHandler);
  };
  uploadFileInput.addEventListener('change', openModalHandler);
  uploadFileInput.addEventListener('change', previewImgHandler);

  // A function that checks a hashtag
  const isValidHashtag = (string) => {
    const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
    return hashtagPattern.test(string);
  };

  // Checking strings for hashtags

  const removeSpaces = (string) =>
    string
      .trim()
      .split(' ')
      .filter((item) => item.length > 0);

  const checkStringValidHashtag = (string) =>
    removeSpaces(string).every(isValidHashtag);

  // Checking strings for duplicate hashtags

  const checkStringForDuplicateHashtags = (string) => {
    const stringAsAnArray = removeSpaces(string.toLowerCase());
    const uniqueElements = Array.from(new Set(stringAsAnArray));
    return uniqueElements.length === stringAsAnArray.length;
  };

  // Checking strings for the number of hashtags

  const checkHashtagsCount = (string) =>
    removeSpaces(string).length <= HASHTAG_COUNT;

  // Checking strings for the number of characters entered

  const checkInputCharsCount = (string) =>
    string.length <= DESCRIPTION_MAX_LENGTH;

  pristine.addValidator(
    hashtagInputField,
    checkStringValidHashtag,
    'Хэш-тег введен неправильно',
  );
  pristine.addValidator(
    hashtagInputField,
    checkHashtagsCount,
    'Количество хэш-тегов не должно быть больше пяти',
  );
  pristine.addValidator(
    hashtagInputField,
    checkStringForDuplicateHashtags,
    'Хэш-теги повторяются',
  );
  pristine.addValidator(
    commentInputField,
    checkInputCharsCount,
    'Длина комментария не может быть больше 140 символов',
  );
}

// Checking if input fields are active
const isInputFieldInFocus = () =>
  document.activeElement === hashtagInputField ||
  document.activeElement === commentInputField;

// Closing a window by pressing the Escape
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isInputFieldInFocus()) {
    evt.preventDefault();
    closeModalHandler();
  }
}

// Form validation

const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = submitButtonTextOptions.PUBLICATION;
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = submitButtonTextOptions.INITIAL;
};

function submitForm(evt) {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeModalHandler();
        showSuccessWindow();
      })
      .catch(() => {
        showErrorWindow();
      })
      .finally(unblockSubmitButton);
  }
}

const formSubmitHandler = () => {
  uploadSelectImageForm.addEventListener('submit', submitForm);
};

export { initPhotoPostForm, onDocumentKeydown, formSubmitHandler };
