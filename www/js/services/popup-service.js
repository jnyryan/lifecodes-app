angular.module('app.services')

.service('PopupService', function(
  $rootScope,
  $cordovaToast
) {

  this.Popup = function(text) {
    document.addEventListener("deviceready", function () {
      // cordova-HTTP code goes here
      $cordovaToast.showShortCenter(text).then(function(success) {
        // success
      }, function (error) {
        // error
      });
    }, false);
  };
});
