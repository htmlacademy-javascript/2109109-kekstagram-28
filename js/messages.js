import { onDocumentKeydown } from './form.js';

const successTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const successWindow = successTemplate.cloneNode(true);
const successBtn = successWindow.querySelector('.success__button');
const successInner = successWindow.querySelector('.success__inner');

const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const errorWindow = errorTemplate.cloneNode(true);
const errorBtn = errorWindow.querySelector('.error__button');
const errorInner = errorWindow.querySelector('.error__inner');

const closeSuccessWindow = () => {
  successWindow.remove();
  document.removeEventListener('keydown', onSuccessKeydown);
  document.removeEventListener('click', onSuccessClick);
};

function onSuccessKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closeSuccessWindow();
  }
}

// closing by clicking anywhere

function onSuccessClick(evt) {
  if (evt.target !== successInner) {
    closeSuccessWindow();
  }
}

const showSuccessWindow = () => {
  document.body.append(successWindow);

  successBtn.addEventListener('click', () => {
    closeSuccessWindow();
  });

  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessClick);
};

const closeErrorWindow = () => {
  errorWindow.remove();
  document.removeEventListener('keydown', onErrorKeydown);
  document.removeEventListener('click', onErrorClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onErrorKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closeErrorWindow();
  }
}

// closing by clicking anywhere

function onErrorClick(evt) {
  if (evt.target !== errorInner) {
    closeErrorWindow();
  }
}

const showErrorWindow = () => {
  document.body.append(errorWindow);

  errorBtn.addEventListener('click', () => {
    closeErrorWindow();
  });

  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

export { showSuccessWindow, showErrorWindow, errorWindow };
