import { initScale, resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showErrorWindow, showSuccessWindow } from './messages.js';

const UPLOAD_FILE_ID = 'upload-file';
const UPLOAD_SELECT_IMAGE_FORM_ID = 'upload-select-image';
const IMAGE_OVERLAY_CLASS = 'img-upload__overlay';
const UPLOAD_CANCEL_ID = 'upload-cancel';
const BODY_TAG = 'body';
const HASHTAG_INPUT_FIELD_CLASS = '.text__hashtags';
const COMMENT_INPUT_FIELD_CLASS = '.text__description';
const SUBMIT_BTN_CLASS = '.img-upload__submit';

const submitButtonText = {
  INITIAL: 'Опубликовать',
  PUBLICATION: 'Публикую...',
};

const uploadFileInput = document.querySelector(`#${UPLOAD_FILE_ID}`);
const uploadSelectImageForm = document.querySelector(
  `#${UPLOAD_SELECT_IMAGE_FORM_ID}`,
);
const imageOverlay = document.querySelector(`.${IMAGE_OVERLAY_CLASS}`);
const uploadCancel = imageOverlay.querySelector(`#${UPLOAD_CANCEL_ID}`);
const body = document.querySelector(BODY_TAG);
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

// Closing the window with an image
const closeModal = () => {
  uploadSelectImageForm.reset();
  pristine.reset();
  resetEffects();
  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function initPhotoPostForm() {
  // Closing the window with the click on the x-button
  const onCancelButtonClick = () => {
    closeModal();
  };

  // Opening a window with an image
  const onOpenModal = () => {
    imageOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    initScale();
    resetScale();
    document.addEventListener('keydown', onDocumentKeydown);

    uploadCancel.addEventListener('click', closeModal);
    uploadCancel.addEventListener('click', onCancelButtonClick);
  };
  uploadFileInput.addEventListener('change', onOpenModal);

  // A function that checks a hashtag
  const isValidHashtag = (string) => {
    if (string.length === 0) {
      return true;
    }
    const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
    return hashtagPattern.test(string);
  };

  // Checking strings for hashtags

  const checkStringValidHashtag = (string) => {
    const stringAsAnArray = string.trim().split(' ');
    return stringAsAnArray.every(isValidHashtag);
  };

  // Checking strings for duplicate hashtags

  const checkStringForDuplicateHashtags = (string) => {
    const stringAsAnArray = string.trim().split(' ');
    const uniqueElements = Array.from(new Set(stringAsAnArray));
    return uniqueElements.length === stringAsAnArray.length;
  };

  // Checking strings for the number of hashtags

  const checkCountHashtags = (string) => {
    const stringAsAnArray = string.trim().split(' ');
    return stringAsAnArray.length <= 5;
  };

  // Checking strings for the number of characters entered

  const checkCountInputChars = (string) => string.length <= 140;

  pristine.addValidator(
    hashtagInputField,
    checkStringValidHashtag,
    'Хэш-тег введен неправильно',
  );
  pristine.addValidator(
    hashtagInputField,
    checkCountHashtags,
    'Количество хэш-тегов больше пяти',
  );
  pristine.addValidator(
    hashtagInputField,
    checkStringForDuplicateHashtags,
    'Хэш-теги повторяются',
  );
  pristine.addValidator(
    commentInputField,
    checkCountInputChars,
    'Превышено количество введенных символов',
  );
}

// Checking if input fields are active
const isInputFieldInFocus = () =>
  document.activeElement === hashtagInputField ||
  document.activeElement === commentInputField;

// Closing a window by pressing the Escape
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isInputFieldInFocus()) {
    evt.preventDefault();
    closeModal();
  }
}

// Form validation

const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = submitButtonText.PUBLICATION;
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = submitButtonText.INITIAL;
};

const onFormSubmit = () => {
  uploadSelectImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          closeModal();
          showSuccessWindow();
        })
        .catch(() => {
          showErrorWindow();
        })
        .finally(unblockSubmitButton);
    }
  });
};

export { initPhotoPostForm, onDocumentKeydown, onFormSubmit };
