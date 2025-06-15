export const renderThumbnails = (photoDescriptions) => {
  const template = document.querySelector('#picture').content;
  const templateContent = template.querySelector('.picture');
  const pictures = document.querySelector('.pictures');
  pictures.querySelectorAll('.picture').forEach((element) => element.remove());
  const photoFragment = document.createDocumentFragment();

  photoDescriptions.forEach(({id, url, description, likes, comments}) => {
    const thumbnail = templateContent.cloneNode(true);
    const image = thumbnail.querySelector('.picture__img');
    const contentLikes = thumbnail.querySelector('.picture__likes');
    const contentCommentsLength = thumbnail.querySelector('.picture__comments');

    thumbnail.dataset.photoId = id;
    image.src = url;
    image.alt = description;
    contentLikes.textContent = likes;
    contentCommentsLength.textContent = comments.length;
    photoFragment.appendChild(thumbnail);
  });

  pictures.appendChild(photoFragment);
};
