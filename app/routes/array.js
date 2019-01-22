import Route from '@ember/routing/route';
import numberUtils from '../utils/number-utils';

export default Route.extend({
  model() {
    return {};
  },

  actions: {
    generateFunctionList() {
      const baseValue = parseInt(this.controller.get('model.baseValue'), 10);
      const numberOfElements = parseInt(this.controller.get('model.numberOfElements'), 10);

      const newFunction = (funcIndex) => {
        this.controller.set('outputResultValue', (baseValue + funcIndex + numberUtils.getRandomInt(0, 2)));
      };

      this.controller.set('outputFunctionList', Array(numberOfElements).fill(null).map((item, index) => newFunction.bind(null, index)));
      this.controller.set('outputResultValue', null);
    }
  }
});
