//const DEBOUNCE_TIMEOUT = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

const sortRandom = () => Math.random() - 0.5;

const isEscapeKey = (evt) => evt.key === 'Escape';

// const debounce = (callback, timeoutDelay = DEBOUNCE_TIMEOUT) => {
//   let timeoutId;
//   return (...rest) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       callback.apply(this, rest);
//     }, timeoutDelay);
//   };
// };

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export { showAlert, sortRandom, isEscapeKey, throttle };
