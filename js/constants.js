export const NAMES = [
  'Роман',
  'Алексей',
  'Татьяна',
  'Илья',
  'Галина',
  'Дмитрий',
  'Анна',
  'Андрей',
  'Мария',
  'Николай'
];
export const DESCRIPTION = [
  'Крутая фота',
  'Просто улет',
  'Отвал башки',
  'Умопомрачительно',
  'Фи, какая гадость',
  'Могло быть и хуже',
  'Все в сад',
  'Бывают в жизни огорчения',
  'Превосходная фота',
  'Авации и аплодисменты'
];
export const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


export const MIN_SCALE = 25;
export const MAX_SCALE = 100;
export const STEP_SCALE = 25;

export const EFFECTS = {
  none:   { filter: 'none', unit: '', options:      { min: 0, max: 100, start: 100 } },
  chrome: { filter: 'grayscale', unit: '', options: { min: 0, max: 1, start: 1, step: 0.1 } },
  sepia:  { filter: 'sepia', unit: '', options:     { min: 0, max: 1, start: 1, step: 0.1 } },
  marvin: { filter: 'invert', unit: '%', options:   { min: 0, max: 100, start: 100, step: 1 } },
  phobos: { filter: 'blur', unit: 'px', options:    { min: 0, max: 3, start: 3, step: 0.1 } },
  heat:   { filter: 'brightness', unit: '', options:{ min: 1, max: 3, start: 3, step: 0.1 } },
};

export const MAX_PHOTO_COMMENTS = 30;
export const MAX_NUMBER_PUBLISHED_PHOTOS = 25;
export const MIN_NUMBER_LIKES = 15;
export const MAX_NUMBER_LIKES = 200;
export const PHOTO_COMMENTS_ADD = 5;

export const MAX_HASHTAGS = 5;
export const MAX_UPLOAD_FORM_COMMENT_LENGTH = 140;
export const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
export const UploadFormErrorMessage = {
  INVALID_HASHTAG: 'Неправильный формат хэштега',
  DUPLICATE_HASHTAG: 'Хэштеги повторяться',
  MAX_HASHTAGS: `Указано больше ${MAX_HASHTAGS} хэштегов`,
  MAX_UPLOAD_FORM_COMMENT_LENGTH: `Длина комментария не больше ${MAX_UPLOAD_FORM_COMMENT_LENGTH} символов`,
};

export const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
export const TIMEOUT = 5000;
