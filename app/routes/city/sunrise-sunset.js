import Route from '@ember/routing/route';
import { run } from '@ember/runloop';
import $ from 'jquery';

const SUNRISE_SUNSET_API_URL = 'https://api.sunrise-sunset.org/json';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    const cityName = model.cityName;
    const existCities = this.store.peekAll('city');
    const currentCity = existCities.find(city => city.get('name') === cityName);

    if (!existCities.length || !currentCity) {
      this.replaceWith('city.index');
    }

    const sunriseSunset = currentCity.get('sunriseSunset');

    if (!sunriseSunset.content) {
      const existSunriseSunsetRecords = this.store.peekAll('sunrise-sunset');

      $.getJSON(`${SUNRISE_SUNSET_API_URL}?lat=${currentCity.get('latitude')}&lng=${currentCity.get('longitude')}&date=today`).then(data => {
        if (!data.results) {
          return false;
        }

        run(() => {
          this.store.createRecord('sunrise-sunset', {
            id: (existSunriseSunsetRecords.length + 1),
            city: currentCity,
            sunrise: data.results.sunrise,
            sunset: data.results.sunset
          });

          controller.set('sunriseSunset', currentCity.get('sunriseSunset'));
        });
      });
    } else {
      controller.set('sunriseSunset', currentCity.get('sunriseSunset'));
    }

    controller.set('cityName', cityName);
  },

  model(params) {
    return {
      cityName: params.city_name
    };
  }
});
