const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = [
  "Артём",
  "Ирина",
  "Дмитрий",
  "Екатерина",
  "Алексей",
  "Мария",
  "Иван",
  "Павел",
  "Виктория"
];
const descr = [
  "Утренний кофе с видом на город.",
  "Портрет любимого питомца.",
  "Культурное событие в центре города.",
  "Летнее утро в цветущем саду.",
  "Архитектурные детали красивого здания.",
  "Кадр уличного искусства в старом районе."
];
const photoId = 25;
const getRandomInteger = (min, max) => {
  if (min > max) {
    [min, max] = [max, min]
  };
  return Math.floor(Math.random() * (max - min +1) + min);
};
const createRandomId = (min, max) => {
  const prevValues = [];
  return function() {
    let currValue = getRandomInteger(min, max);
    if (prevValues.length >= (max-min+1)) {
      return null;
    };
    while (prevValues.includes(currValue)) {
      currValue = getRandomInteger(min, max);
    };
    return currValue;
  };
};
const createComments = () => ({
  id: createRandomId(1,1000),
  avatar: 'img/avatar-${getRandomInteger(1, 6)}.svg',
  message: comments[getRandomInteger(0, comments.length-1)],
  name: names[getRandomInteger(0,names.length-1)],
});
const createPhotoDescr = () => ({
  id: createRandomId(1,25),
  avatar: 'photos/${getRandomInteger(1, 25)}.jpg',
  description: descr[getRandomInteger(0, descr.length-1)],
  likes: createRandomId(15,200),
  comments: Array.from({length: getRandomInteger(0,30)}, createComments)
});
const photos = Array.from({length:photoId}, createPhotoDescr);
