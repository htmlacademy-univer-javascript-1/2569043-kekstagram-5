export const getRandomInteger = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const createRandomId = (min, max) => {
  const prevValues = [];
  return function() {
    let currValue = getRandomInteger(min, max);
    if (prevValues.length >= (max - min + 1)) {
      return null;
    }
    while (prevValues.includes(currValue)) {
      currValue = getRandomInteger(min, max);
    }
    return currValue;
  };
};
