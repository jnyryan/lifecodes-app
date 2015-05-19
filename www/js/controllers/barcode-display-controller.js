angular.module('app.controllers')

.controller('BarcodeDisplayCtrl', function(
  $scope,
  $rootScope,
  $stateParams,
  BarcodeRepository,
  PopupService
) {
  $scope.qrCode = "";
  BarcodeRepository.getById($stateParams.barcodeId).then(function(data){
    console.dir(data);
    $scope.barcode = {
      id: data.id,
      name: data.name,
      format: "EAN TEST",
      description: data.description,
      scanText: data.scanText,
      scanData: data.scanData
    };
    $scope.qrCode = $scope.barcode.scanData;
    $scope.$apply();
  });
})

.controller('BarcodeNewCtrl', function(
  $scope,
  $rootScope,
  BarcodeRepository,
  PopupService
) {
  $scope.name = "john";
  $scope.description = "gym";
});
