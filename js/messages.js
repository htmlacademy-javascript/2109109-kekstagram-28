import { onDocumentKeydown } from './form.js';
import { isEscapeKey } from './util.js';

const createTemplate = (type) => {
  const result = {};
  result[`${type}Template`] = document
    .querySelector(`#${type}`)
    .content.querySelector(`.${type}`);
  result[`${type}Window`] = result[`${type}Template`].cloneNode(true);
  result[`${type}Btn`] = result[`${type}Window`].querySelector(
    `.${type}__button`,
  );
  result[`${type}Inner`] = result[`${type}Window`].querySelector(
    `.${type}__inner`,
  );

  return result;
};

const successTemplate = createTemplate('success');

const errorTemplate = createTemplate('error');

const closeSuccessWindow = () => {
  successTemplate.successWindow.remove();
  document.removeEventListener('keydown', onSuccessKeydown);
  document.removeEventListener('click', successClickHandler);
};

function onSuccessKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeSuccessWindow();
  }
}

// closing by clicking anywhere

function successClickHandler(evt) {
  if (evt.target !== successTemplate.successInner) {
    closeSuccessWindow();
  }
}

const showSuccessWindow = () => {
  document.body.append(successTemplate.successWindow);

  successTemplate.successBtn.addEventListener('click', () => {
    closeSuccessWindow();
  });

  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', successClickHandler);
};

const closeErrorWindow = () => {
  errorTemplate.errorWindow.remove();
  document.removeEventListener('keydown', errorKeydownHandler);
  document.removeEventListener('click', errorClickHandler);
  document.addEventListener('keydown', onDocumentKeydown);
};

function errorKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeErrorWindow();
  }
}

// closing by clicking anywhere

function errorClickHandler(evt) {
  if (evt.target !== errorTemplate.errorInner) {
    closeErrorWindow();
  }
}

const showErrorWindow = () => {
  document.body.append(errorTemplate.errorWindow);

  errorTemplate.errorBtn.addEventListener('click', () => {
    closeErrorWindow();
  });

  document.addEventListener('keydown', errorKeydownHandler);
  document.addEventListener('click', errorClickHandler);
  document.removeEventListener('keydown', onDocumentKeydown);
};

export { showSuccessWindow, showErrorWindow };
