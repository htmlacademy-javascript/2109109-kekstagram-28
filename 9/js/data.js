import { getRandomInteger, createIdGenerator } from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Это мы с друзьями играем в настолки',
  'Кот подозрительно долго смотрит на рыбку',
  'Отдыхаем в горах',
  '#livefast #dieyoung',
  'Праздуем День Рождения! Ура!',
  'Забрели в старый книжный магазин в Тбилиси',
  '#icanteatanymore #help',
  'подруга набивает мне татуировку хендпоуком',
  'Music is your only friend until the end #JimMorrison',
];

const NAMES = ['Нина', 'Соня', 'Максим', 'Стася', 'Вато', 'Саша'];

const generatePhotoDescriptionId = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const createPhotoDescription = () => {
  const photoId = generatePhotoDescriptionId();
  const commentArray = Array.from(
    { length: getRandomInteger(0, 16) },
    createComment,
  );
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: DESCRIPTIONS[photoId - 1],
    likes: getRandomInteger(15, 200),
    comments: commentArray,
  };
};

const photoDescriptions = Array.from({ length: 25 }, createPhotoDescription);

export { photoDescriptions };
