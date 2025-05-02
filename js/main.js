const NAMES = [
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
const DESCRIPTION = [
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
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getId = () => {
  let lastId = 0;
  return () => {
    lastId += 1;
    return lastId;
  };
};

const getCommentId = getId();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
});

const createPhotos = () => Array.from({ length: 25 }, (_, index) => createPhoto(index + 1));

createPhotos();
