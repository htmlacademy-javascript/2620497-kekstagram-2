import {createPhotos} from './data.js';


export const renderThumbnails = () => {
  const template = document.querySelector('#picture').content;
  const templateContent = template.querySelector('.picture');
  const pictures = document.querySelector('.pictures');
  const photoDescriptions = createPhotos();
  const photoFragment = document.createDocumentFragment();

  photoDescriptions.forEach(({url, description, likes, comments}) => {
    const thumbnail = templateContent.cloneNode(true);
    const image = thumbnail.querySelector('.picture__img');
    image.src = url;
    image.alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    photoFragment.appendChild(thumbnail);
  });

  pictures.appendChild(photoFragment);
};
