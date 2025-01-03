const photoNum = 10;
const imgFilterElement = document.querySelector('.img-filters');
const defaultBtn = imgFilterElement.querySelector('#filter-default');
const discussedBtn = imgFilterElement.querySelector('#filter-discussed');
const randomBtn = imgFilterElement.querySelector('#filter-random');
const setActive = (btn) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  btn.classList.add('img-filters__button--active');
};
const compareThumbnails = (photoA, photoB) => {
  const A = photoA.comments.length;
  const B = photoB.comments.length;
  return B - A;
};
const thumbnailShuffle = () => Math.random() - 0.5;
export const initFilter = (photos, showThumbnails) => {
  defaultBtn.addEventListener('click', (evt) => {
    showThumbnails(photos);
    setActive(evt.target);
  });
  randomBtn.addEventListener('click', (evt) => {
    showThumbnails(photos
      .slice()
      .sort(thumbnailShuffle)
      .slice(0, photoNum));
    setActive(evt.target);
  });
  discussedBtn.addEventListener('click', (evt) => {
    showThumbnails(photos
      .slice()
      .sort(compareThumbnails));
    setActive(evt.target);
  });
};
