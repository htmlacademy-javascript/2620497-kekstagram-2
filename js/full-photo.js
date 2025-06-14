import {PHOTO_COMMENTS_ADD} from './constants.js';
import {isEscapeKey} from './utils.js';

const pictures = document.querySelector('.pictures');
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoCloseBtn = fullPhoto.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const socialComments = fullPhoto.querySelector('.social__comments');
const shownComments = fullPhoto.querySelector('.social__comment-shown-count');
const commentsCount = fullPhoto.querySelector('.social__comment-total-count');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const fullPhotoImg = fullPhoto.querySelector('.big-picture__img img');
const socialCaption = fullPhoto.querySelector('.social__caption');
const likesCount = fullPhoto.querySelector('.likes-count');

let currentComments = [];
let displayedComments = 0;
let photoDescriptions = [];

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

const renderComments = () => {
  const commentsToShow = Math.min(displayedComments + PHOTO_COMMENTS_ADD,
    currentComments.length);

  for (let i = displayedComments; i < commentsToShow; i++) {
    socialComments.appendChild(getCommentElement(currentComments[i]));
  }

  displayedComments = commentsToShow;
  shownComments.textContent = displayedComments;
  commentsCount.textContent = currentComments.length;

  commentsLoader.classList.toggle('hidden', displayedComments >= currentComments.length);
};

const loadMoreComments = () => {
  renderComments();
};

const openfullPhoto = (photo) => {

  fullPhotoImg.src = photo.url;
  fullPhotoImg.alt = photo.description;
  socialCaption.textContent = photo.description;
  likesCount.textContent = photo.likes;

  currentComments = photo.comments;
  displayedComments = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');

  renderComments();

  fullPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', loadMoreComments);
};

function closefullPhoto() {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');


  currentComments = [];
  displayedComments = 0;


  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', loadMoreComments);
}

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (!thumbnail) {
    return;
  }

  evt.preventDefault();

  const thumbnailPhotoId = thumbnail.dataset.photoId;
  const photoData = photoDescriptions.find((photo) => photo.id === Number(thumbnailPhotoId));


  if (photoData) {
    openfullPhoto(photoData);
  }
};

const initFullPhoto = (photos) => {
  photoDescriptions = photos;

  pictures.addEventListener('click', onThumbnailClick);
  fullPhotoCloseBtn.addEventListener('click', closefullPhoto);
};

export {initFullPhoto};
