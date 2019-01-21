import numberUtils from 'ember-app-daxx/utils/number-utils';
import { module, test } from 'qunit';

module('Unit | Utility | number-utils', function() {

  test('it works', function(assert) {
    let result = numberUtils.getRandomInt(0, 2);
    assert.ok(result);
  });
});
