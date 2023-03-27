import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const uploadFileInput = document.querySelector('#upload-file');
const uploadSelectImageForm = document.querySelector('#upload-select-image');
const imageOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = imageOverlay.querySelector('#upload-cancel');
const body = document.querySelector('body');
const hashtagInputField = document.querySelector('.text__hashtags');
const commentInputField = document.querySelector('.text__description');

const pristine = new Pristine(uploadSelectImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

function initPhotoPostForm() {
  // Opening a window with an image

  const onOpenModal = () => {
    imageOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    resetScale();

    document.addEventListener('keydown', onDocumentKeydown);
  };

  // Closing the window with an image

  const сloseModal = () => {
    uploadSelectImageForm.reset();
    pristine.reset();
    resetEffects();
    imageOverlay.classList.add('hidden');
    body.classList.remove('modal-open');

    uploadCancel.removeEventListener('click', сloseModal);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  // closing the window with the click on the x-button

  const onCancelButtonClick = () => {
    сloseModal();
  };

  // Checking if input fields are active

  const isInputFieldInFocus = () =>
    document.activeElement === hashtagInputField ||
    document.activeElement === commentInputField;

  // Closing a window by pressing the Escape

  function onDocumentKeydown(evt) {
    if (evt.key === 'Escape' && !isInputFieldInFocus()) {
      evt.preventDefault();

      сloseModal();
    }
  }

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

  const checkStringForDublicateHashtags = (string) => {
    const stringAsAnArray = string.trim().split(' ');
    const uniqueElements = [];
    for (let i = 0; i < stringAsAnArray.length; i++) {
      if (!uniqueElements.includes(stringAsAnArray[i])) {
        uniqueElements.push(stringAsAnArray[i]);
      }
    }
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
    checkStringForDublicateHashtags,
    'Хэш-теги повторяются',
  );
  pristine.addValidator(
    commentInputField,
    checkCountInputChars,
    'Превышено количество введенных символов',
  );

  // Form validation

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      uploadSelectImageForm.submit();
    }
  };

  uploadFileInput.addEventListener('change', onOpenModal);
  uploadCancel.addEventListener('click', сloseModal);
  uploadCancel.addEventListener('click', onCancelButtonClick);
  uploadSelectImageForm.addEventListener('submit', onFormSubmit);
}

export { initPhotoPostForm };
