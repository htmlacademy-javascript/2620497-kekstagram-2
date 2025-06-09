export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

export const getId = () => {
  let lastId = 0;
  return () => {
    lastId += 1;
    return lastId;
  };
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const isTextField = (element) => (element.tagName === 'INPUT' && element.type === 'text')
  || element.tagName === 'TEXTAREA';

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
