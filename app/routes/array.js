import Route from '@ember/routing/route';

const getRandomInt = (min, max) => {
  let minValue = Math.ceil(min),
      maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

export default Route.extend({
  model() {
    return {};
  },

  actions: {
    generateButtonList() {
      const numberOfElements = parseInt(this.controller.get('model.numberOfElements'), 10);

      this.controller.set('outputButtonList', Array(numberOfElements).fill(null));
      this.controller.set('outputResultValue', null);
    },
    generateResultValue(itemIndex) {
      const baseValue = parseInt(this.controller.get('model.baseValue'), 10);
      const randomIntValue = getRandomInt(0, 2);

      this.controller.set('outputResultValue', (baseValue + itemIndex + randomIntValue));
    }
  }
});
