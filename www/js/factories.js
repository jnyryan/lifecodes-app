angular.module('app.factories',[
  'ngCordova',
  'app.config'
])

.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});
