const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const decreaseImgBtn = document.querySelector('.scale__control--smaller');
const increaseImgBtn = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

scaleValue.value = MAX_SCALE;

const setScale = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const imgIncreaseHandler = () => {
  const newValue = Math.max(
    MAX_SCALE,
    parseInt(scaleValue.value, 10) - SCALE_STEP,
  );
  setScale(newValue);
};

const imgDecreaseHandler = () => {
  const newValue = Math.max(
    MIN_SCALE,
    parseInt(scaleValue.value, 10) - SCALE_STEP,
  );
  setScale(newValue);
};

decreaseImgBtn.addEventListener('click', imgDecreaseHandler);
increaseImgBtn.addEventListener('click', imgIncreaseHandler);

const resetScale = () => setScale(DEFAULT_SCALE);

export {
  resetScale,
  imgDecreaseHandler,
  imgIncreaseHandler,
  imageElement,
  decreaseImgBtn,
  increaseImgBtn,
};
