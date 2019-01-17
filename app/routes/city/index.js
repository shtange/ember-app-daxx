import Route from '@ember/routing/route';
import { run } from '@ember/runloop';
import RSVP from 'rsvp';
import $ from 'jquery';

const OSM_API_URL = 'https://nominatim.openstreetmap.org/search';

export default Route.extend({
  model() {
    return RSVP.hash({
      cities: this.store.peekAll('city'),
      newCity: {}
    })
  },

  actions: {
    preloadDefaultCities() {
      this.store.push({
        data: [
          {
            id: '198763125',
            type: 'city',
            attributes: {
              name: 'kharkiv',
              latitude: '49.99142545',
              longitude: '36.2722658'
            },
            relationships: {}
          },
          {
            id: '198168142',
            type: 'city',
            attributes: {
              name: 'sao paulo',
              latitude: '-23.5506507',
              longitude: '-46.6333824'
            },
            relationships: {}
          }
        ]
      });
    },
    addNewCity() {
      const existCities = this.controller.get('model.cities');
      const existCityNames = existCities.map(city => city.get('name'));
      const cityName = this.controller.get('model.newCity.name').toLowerCase();

      if (existCityNames.indexOf(cityName) !== -1) {
        alert('This City already exist.\nPlease, try again!');
        return false;
      }

      $.getJSON(`${OSM_API_URL}?city=${cityName}&format=json`).then(data => {
        const places = (data || []).filter(place => place.type === 'city');

        if (!places.length) {
          alert('The City ​​was not found.\nPlease, try again!');
          return false;
        }

        const place = places[0];

        run(() => {
          this.store.createRecord('city', {
            id: place.place_id,
            name: cityName,
            latitude: place.lat,
            longitude: place.lon
          });
        });
      });
    }
  }
});
