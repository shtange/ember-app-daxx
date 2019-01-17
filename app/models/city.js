import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  latitude: DS.attr('string'),
  longitude: DS.attr('string'),
  sunriseSunset: DS.belongsTo('sunrise-sunset')
});
