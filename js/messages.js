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

const templates = {
  success: createTemplate('success'),
  error: createTemplate('error'),
};

const closeWindow = (template) => {
  template[`${template.type}Window`].remove();
  document.removeEventListener('keydown', template.keydownHandler);
  document.removeEventListener('click', template.clickHandler);
  document.addEventListener('keydown', onDocumentKeydown);
};

const keydownHandler = (template) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeWindow(template);
  }
};

const clickHandler = (template) => (evt) => {
  if (evt.target !== template[`${template.type}Inner`]) {
    closeWindow(template);
  }
};

const showWindow = (template) => {
  document.body.append(template[`${template.type}Window`]);

  template[`${template.type}Btn`].addEventListener('click', () => {
    closeWindow(template);
  });

  template.keydownHandler = keydownHandler(template);
  template.clickHandler = clickHandler(template);

  document.addEventListener('keydown', template.keydownHandler);
  document.addEventListener('click', template.clickHandler);

  document.removeEventListener('keydown', onDocumentKeydown);
};

const showSuccessWindow = () => {
  showWindow({ type: 'success', ...templates.success });
};

const showErrorWindow = () => {
  showWindow({ type: 'error', ...templates.error });
};

export { showSuccessWindow, showErrorWindow };
