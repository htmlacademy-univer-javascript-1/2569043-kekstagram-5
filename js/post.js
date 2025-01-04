import {isKeyEsc} from './util.js';
const bigPic = document.querySelector('.big-picture');
const bigPicImg = bigPic.querySelector('.big-picture__img img');
const bigPicLikes = bigPic.querySelector('.big-picture__social .likes-count');
const bigPicDescr = bigPic.querySelector('.big-picture__social .social__caption');
const bigPicCommCnt = bigPic.querySelector('.social__comment-count');
const bigPicCancel = document.querySelector('#picture-cancel');
const social = document.querySelector('.social__comments');
const commTemplate = document.querySelector('#comments').content.querySelector('li');
const step = 5;
const commLoader = document.querySelector('.comments-loader');
let currComm = [];
let visualCommCnt;
const createComments = (comment) => {
  const commBlock = commTemplate.cloneNode(true);
  commBlock.querySelector('.social__picture').src = comment.avatar;
  commBlock.querySelector('.social__picture').alt = comment.name;
  commBlock.querySelector('.social__text').textContent = comment.message;
  return commBlock;
};
const createFragment = (comments) => {
  const commFraments = document.createDocumentFragment();
  comments.forEach((element) => {
    commFraments.append(createComments(element));
  });
  return commFraments;
};
const newComments = () => {
  social.innerHTML = '';
  visualCommCnt = Math.min(visualCommCnt, currComm.length);
  const commentsSelected = currComm.slice(0, visualCommCnt);

  if (currComm.length <= step || visualCommCnt >= currComm.length){
    commLoader.classList.add('hidden');
  } else {
    commLoader.classList.remove('hidden');
  }
  bigPicCommCnt.textContent = `${visualCommCnt} из ${currComm.length} комментариев`;
  social.append(createFragment(commentsSelected));
};
const loadNewComments = (evt) => {
  evt.preventDefault();
  visualCommCnt += step;
  newComments();
};
const renderBigPic = (data) =>{
  bigPicImg.src = data.url;
  bigPicLikes.textContent = data.likes;
  bigPicDescr.textContent = data.description;
  bigPicCommCnt.textContent = data.comments.length;
};
const closeBigPic = () => {
  bigPic.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', escKeyDown);
  commLoader.removeEventListener('click', loadNewComments);
};
const escKeyDown = (evt) => {
  if (isKeyEsc(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
};
const display = (data) => {
  renderBigPic(data);
  newComments();
};
export const showBigPic = (picture) => {
  bigPic.classList.remove('hidden');
  body.classList.add('modal-open');
  currComm = picture.comments.slice();
  visualCommCnt = step;
  display(picture);
  document.addEventListener('keydown', escKeyDown);
  bigPicCancel.addEventListener('click', closeBigPicture);
  commLoader.addEventListener('click', loadNewComments);
};
