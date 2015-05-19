angular.module('app.controllers')

.controller('BarcodeCtrl', function(
  $scope,
  $ionicTabsDelegate,
  PopupService,
  ScanningService,
  BarcodeRepository,
  ScanHistoryRepository
) {

  ScanningService.scan(function(data){
    $scope.barcode = {
      format: data.format,
      data: data.text
    };
  });

  $scope.barcode = {
    name: "some name",
    format: "EAN TEST",
    text: "www.somewhere"
  };

  $scope.save = function(){
    BarcodeRepository.insert($scope.barcode.name, $scope.barcode.format, $scope.barcode.text, $scope.barcode).then(function(data){
      PopupService.Popup("Saved!");
    });
  };

  $scope.cancel = function(){
    PopupService.Popup("Cancelled");
    $ionicTabsDelegate.select(0);
  };

})

.controller('ScanHistoryCtrl', function(
  $scope,
  ScanHistoryRepository
) {
  ScanHistoryRepository.all().then(function(res) {
    $scope.scanHistory = res;
  });
})

.controller('ScanHistoryDisplayCtrl', function(
  $scope,
  $stateParams,
  ScanHistoryRepository
) {
  ScanHistoryRepository.getById($stateParams.id).then(function(res) {
    $scope.scanHistory = res;
  });
});
