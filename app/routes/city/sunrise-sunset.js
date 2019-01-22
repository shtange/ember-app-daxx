import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

export default Route.extend({
  api: service('api'),

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

      this.get('api').getSunriseSunsetInfoByCoords(currentCity.get('latitude'), currentCity.get('longitude')).then(data => {
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
