angular.module('app.controllers')

.controller('BarcodeDisplayCtrl', function(
  $scope,
  $rootScope,
  $stateParams,
  BarcodeRepository,
  PopupService
) {
  $scope.qrCode = "XXXXXXXXXXXXXXXXXXXXXXXXXX";
  BarcodeRepository.getById($stateParams.barcodeId).then(function(data){
    console.dir(data);
    $scope.barcode = {
      id: data.id,
      name: data.name,
      format: "EAN TEST",
      description: data.description,
      scanData: data.scanData
    };
    $scope.qrCode = $scope.barcode.scanData;
    $scope.$apply();
  });
});
