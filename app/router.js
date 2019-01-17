import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('city', function() {
    this.route('sunrise-sunset', { path: '/:city_name/sunrise-sunset' });
    this.route('index', { path: '/' });
  });
  this.route('array');
  this.route('homepage', { path: '/' });
});

export default Router;
