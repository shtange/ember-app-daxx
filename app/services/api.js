import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  openStreetMapApi: service('open-street-map-api'),
  SunriseSunsetApi: service('sunrise-sunset-api'),

  getCityByName(cityName) {
    return this.get('openStreetMapApi').request(`/search?city=${cityName}&format=json`);
  },

  getSunriseSunsetInfoByCoords(lat, lng) {
    return this.get('SunriseSunsetApi').request(`/json?lat=${lat}&lng=${lng}&date=today`);
  }
});
