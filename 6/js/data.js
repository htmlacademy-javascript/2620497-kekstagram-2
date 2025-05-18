import { getId, getRandomInteger, getRandomArrayElement } from './utils.js';
import { MESSAGES,
  NAMES,
  DESCRIPTION,
  MAX_PHOTO_COMMENTS,
  MIN_NUMBER_LIKES,
  MAX_NUMBER_LIKES,
  MAX_NUMBER_PUBLISHED_PHOTOS } from './constants.js';

const getCommentId = getId();

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(MESSAGES)).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
  comments: Array.from({ length: getRandomInteger(0, MAX_PHOTO_COMMENTS) }, createComment),
});

export const createPhotos = () => Array.from({ length: MAX_NUMBER_PUBLISHED_PHOTOS }, (_, index) => createPhoto(index + 1));
