angular.module('app.controllers')

.controller('BarcodeDisplayCtrl', function(
  $scope,
  $stateParams,
  BarcodeRepository,
  PopupService
) {

  BarcodeRepository.all($stateParams.barcodeId).then(function(data){
    PopupService.Popup("Loaded!");
  });

  $scope.barcode = {
    id: $stateParams.barcodeId,
    name: "some name",
    format: "EAN TEST",
    data: "www.somewhere"
  };


});
