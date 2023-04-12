const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const minifyImgBtn = document.querySelector('.scale__control--smaller');
const magnifyImgBtn = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

scaleValue.value = MAX_SCALE;

const setScale = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

minifyImgBtn.addEventListener('click', () => {
  const newValue =
    parseInt(scaleValue.value, 10) - SCALE_STEP >= MIN_SCALE
      ? parseInt(scaleValue.value, 10) - SCALE_STEP
      : MIN_SCALE;
  setScale(newValue);
});

magnifyImgBtn.addEventListener('click', () => {
  const newValue =
    parseInt(scaleValue.value, 10) + SCALE_STEP <= MAX_SCALE
      ? parseInt(scaleValue.value, 10) + SCALE_STEP
      : MAX_SCALE;
  setScale(newValue);
});

const resetScale = () => setScale(DEFAULT_SCALE);

export { resetScale, imageElement };
