import {getPhotoDescriptions} from './thumbnail.js';

const isEscapeKey = (evt) => evt.key === 'Escape';
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoCancel = fullPhoto.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const socialComments = fullPhoto.querySelector('.social__comments');
const shownComments = fullPhoto.querySelector('.social__comment-shown-count');
const commentsCount = fullPhoto.querySelector('.social__comment-total-count');
const socialCommentCount = fullPhoto.querySelector('.social__comment-count');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const fullPhotoImg = fullPhoto.querySelector('.big-picture__img img');
const socialCaption = fullPhoto.querySelector('.social__caption');
const likesCount = fullPhoto.querySelector('.likes-count');

const getCommentElement = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.src = avatar;
  avatarImg.alt = name;
  avatarImg.width = 35;
  avatarImg.heigh = 35;

  const userComment = document.createElement('p');
  userComment.classList.add('social__text');
  userComment.textContent = message;

  comment.append(avatarImg, userComment);

  return comment;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closefullPhoto();
  }
};

const renderComments = (comments) => {
  const maxComments = comments.length;

  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(getCommentElement(comment));
  });

  socialComments.append(fragment);

  shownComments.textContent = maxComments;
  commentsCount.textContent = maxComments;

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const openfullPhoto = (photo) => {

  fullPhotoImg.src = photo.url;
  fullPhotoImg.alt = photo.description;
  socialCaption.textContent = photo.description;
  likesCount.textContent = photo.likes;

  renderComments(photo.comments);

  fullPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function closefullPhoto() {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (!thumbnail) {
    return;
  }

  evt.preventDefault();

  const thumbnailPhotoId = thumbnail.dataset.photoId;
  const photoData = getPhotoDescriptions().find((photo) => photo.id === Number(thumbnailPhotoId));

  if (photoData) {
    openfullPhoto(photoData);
  }
};

const initFullPhoto = () => {
  document.querySelector('.pictures')
    .addEventListener('click', onThumbnailClick);
  fullPhotoCancel.addEventListener('click', closefullPhoto);
};

export {initFullPhoto};
