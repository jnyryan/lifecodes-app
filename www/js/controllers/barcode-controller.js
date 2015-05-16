angular.module('app.controllers')

.controller('BarcodeCtrl', function(
  $scope,
  $ionicTabsDelegate,
  PopupService,
  ScanningService,
  BarcodeRepository
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
    data: "www.somewhere"
  };

  $scope.save = function(){
    BarcodeRepository.insert($scope.barcode.name, $scope.barcode.format, $scope.barcode.data).then(function(data){
      PopupService.Popup("Saved!");
    });
  };

  $scope.cancel = function(){
    PopupService.Popup("Cancelled");
    $ionicTabsDelegate.select(0);
  };

});
