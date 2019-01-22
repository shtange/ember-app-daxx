import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: 'https://nominatim.openstreetmap.org',
  contentType: 'application/json; charset=utf-8'
});
