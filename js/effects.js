const EFFECTS = {
  default: {
    filter: 'none',
    range: { min: 0, max: 100 },
    step: 1,
    start: 100,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    range: { min: 0, max: 100 },
    step: 1,
    start: 100,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    range: { min: 0, max: 3 },
    step: 0.1,
    start: 3,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    range: { min: 1, max: 3 },
    step: 0.1,
    start: 3,
    unit: '',
  },
};

const DEFAULT_EFFECT = EFFECTS.default;

const imageElement = document.querySelector('.img-upload__preview img');
const sliderContainerElement = document.querySelector('.img-upload__effects');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.img-upload__effect-level');

// Set the default effect
let chosenEffect = DEFAULT_EFFECT;

// Function to check if the chosen effect is the default effect
const isDefault = () => chosenEffect === DEFAULT_EFFECT;

// Functions to show/hide the slider and update the slider
const showSlider = () => {
  effectLevel.classList.remove('hidden');
};

const hideSlider = () => {
  effectLevel.classList.add('hidden');
  sliderContainerElement.removeEventListener('change', sliderChangeHandler);
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: chosenEffect.range,
    step: chosenEffect.step,
    start: chosenEffect.start,
  });
  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

// Function to reset the effects to the default effect
const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

// Create the slider
const slider = noUiSlider.create(sliderElement, {
  range: DEFAULT_EFFECT.range,
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.start,
  connect: 'lower',
  format: {
    to: (value) =>
      Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

// Hide the slider initially
hideSlider();

// Add event listeners
function sliderChangeHandler(evt) {
  if (evt.target.classList.contains('effects__radio')) {
    chosenEffect = EFFECTS[evt.target.value];
    imageElement.className = `effects__preview--${evt.target.value}`;
    updateSlider();
  }
}

slider.on('update', (sliderValues) => {
  sliderContainerElement.addEventListener('change', sliderChangeHandler);
  const sliderValue = sliderValues[0];
  effectValue.value = sliderValue;
  if (isDefault()) {
    imageElement.style.filter = DEFAULT_EFFECT.filter;
  } else {
    imageElement.style.filter = `${chosenEffect.filter}(${sliderValue}${chosenEffect.unit})`;
  }
});

export { resetEffects };
