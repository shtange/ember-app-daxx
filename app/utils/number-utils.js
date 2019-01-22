const getRandomInt = (min, max) => {
  let minValue = Math.ceil(min),
      maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

export default {
  getRandomInt
};
