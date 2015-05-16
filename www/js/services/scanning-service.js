angular.module('app.services')

.service('ScanningService', function(
  $rootScope,
  $cordovaBarcodeScanner
) {

  this.scan = function(callback) {
    document.addEventListener("deviceready", function () {
      $cordovaBarcodeScanner
        .scan()
        .then(function(result) {
          //alert("Yaee" + JSON.stringify(result));
          callback(result);
        }, function(err) {
          $scope.scanResult = 'SCAN ERROR (see console)';
          alert("Booo:" + JSON.stringify(err));
          console.error(err);
      });
    });
  };
});
