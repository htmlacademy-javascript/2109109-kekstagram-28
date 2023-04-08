const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const minifyImgBtn = document.querySelector('.scale__control--smaller');
const magnifyImgBtn = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

function initScale() {
  const minifyImage = () => {
    const currentValue = parseInt(scaleInputElement.value, 10);
    let newValue = currentValue - SCALE_STEP;
    if (newValue < MIN_SCALE) {
      newValue = MIN_SCALE;
    }
    scaleImage(newValue);
  };

  const magnifyImage = () => {
    const currentValue = parseInt(scaleInputElement.value, 10);
    let newValue = currentValue + SCALE_STEP;
    if (newValue < MAX_SCALE) {
      newValue = MAX_SCALE;
    }
    scaleImage(newValue);
  };

  minifyImgBtn.addEventListener('click', minifyImage);
  magnifyImgBtn.addEventListener('click', magnifyImage);
}

const resetScale = () => scaleImage(DEFAULT_SCALE);

export { initScale, resetScale, imageElement };
