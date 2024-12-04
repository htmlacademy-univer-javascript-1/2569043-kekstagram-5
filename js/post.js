import {isKeyEsc} from './util.js'
const bigPic = document.querySelector('.big-picture');
const bigPicCancel = document.querySelector('.big-picture__cancel');
const social = bigPic.querySelector('.social');
const commTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const socialComm = social.querySelector('.social__comments');
const socialCommCount = social.querySelector('.social__comments-count');
const overlay = document.querySelector('overlay');
const createComments = (comment) => {
  const commBlock = commTemplate.cloneNode(true);
  commBlock.querySelector('.social__picture').src = comment.avatar;
  commBlock.querySelector('.social__picture').alt = comment.name;
  commBlock.querySelector('.social__text').textContent = comment.message;
  return commBlock;
};
const createFragment = (comments) => {
  const commFraments = document.createDocumentFragment();
  comments.forEach((comment) => {
    commFraments.appendChild(createComments(comment));
  });
  return commFraments;
}
const closeBigPic = () => {
  bigPic.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPicCancel.removeEventListener('click', closeBigPic);
  document.removeEventListener('keydown', escKeyDown);
  overlay.removeEventListener('click', overlayClick);
}
const escKeyDown = (evt) => {
  if (isKeyEsc(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
}
const overlayClick = (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    closeBigPic;
  }
}
const render = (post) => {
  bigPic.querySelector('.big-picture__img img').src = post.url;
  socialComm.innerHTML = '';
  socialCommCount.querySelector('.comments-count').textContent = post.comments.length;
  social.querySelector('.likes-count').textContent = post.likes;
  social.querySelector('.social__caption').textContent = post.description;
  socialComm.appendChild(createFragment(post.comments));
}
export const openPost = (post) => {
  render(post);
  bigPic.classList.remove('hidden');
  bigPicCancel.addEventListener('click', closeBigPic);
  socialCommCount.classList.add('hidden');
  document.querySelector('.comment-loader').classList.add('hidden');
  document.querySelector('.body').classList.add('modal-open');
  document.addEventListener('keydown', escKeyDown);
  overlay.addEventListener('click', overlayClick)
}
