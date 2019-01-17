import DS from 'ember-data';

export default DS.Model.extend({
  sunrise: DS.attr('string'),
  sunset: DS.attr('string'),
  city: DS.belongsTo('city')
});
