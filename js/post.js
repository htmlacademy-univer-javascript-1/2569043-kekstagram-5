import {isKeyEsc} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.big-picture__social .likes-count');
const bigPictureDescription = bigPicture.querySelector('.big-picture__social .social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCancel = document.querySelector('#picture-cancel');

const social = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comments').content.querySelector('li');
const commentLoader = document.querySelector('.comments-loader');
let currentComment = [];
let visualCommentsCount;
const STEP = 5;

const createComments = (comment) =>{
  const commentBlock = commentTemplate.cloneNode(true);
  commentBlock.querySelector('.social__picture').src = comment.avatar;
  commentBlock.querySelector('.social__picture').alt = comment.name;
  commentBlock.querySelector('.social__text').textContent = comment.message;
  return(commentBlock);
};

const createFragment = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach((element) => {
    commentFragment.append(createComments(element));
  });
  return commentFragment;
};

const newComments = () => {
  social.innerHTML = '';
  visualCommentsCount = Math.min(visualCommentsCount, currentComment.length);
  const commentsSelected = currentComment.slice(0, visualCommentsCount);

  if (currentComment.length <= STEP || visualCommentsCount >= currentComment.length){
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
  }
  bigPictureCommentsCount.textContent = `${visualCommentsCount} из ${currentComment.length} комментариев`;
  social.append(createFragment(commentsSelected));
};

const loadNewComments = (evt) => {
  evt.preventDefault();
  visualCommentsCount += STEP;
  newComments();
};

const renderBigPicture = (data) =>{
  bigPictureImage.src = data.url;
  bigPictureLikes.textContent = data.likes;
  bigPictureDescription.textContent = data.description;
  bigPictureCommentsCount.textContent = data.comments.length;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escKeyDown);
  commentLoader.removeEventListener('click', loadNewComments);
};

function escKeyDown (evt) {
  if(isKeyEsc(evt)){
    evt.preventDefault();
    closeBigPicture();
  }
}

const display = (data) => {
  renderBigPicture(data);
  newComments();
};

export const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  currentComment = picture.comments.slice();
  visualCommentsCount = STEP;

  display(picture);

  document.addEventListener('keydown', escKeyDown);
  bigPictureCancel.addEventListener('click', closeBigPicture);
  commentLoader.addEventListener('click', loadNewComments);
};
