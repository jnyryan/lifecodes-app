angular.module('app.controllers')

.controller('BarcodeDisplayCtrl', function(
  $scope,
  $stateParams,
  BarcodeRepository,
  PopupService
) {

  BarcodeRepository.getById($stateParams.barcodeId).then(function(data){
    PopupService.Popup("Loaded!");
    console.dir(data);
    $scope.barcode = {
      id: data.id,
      name: data.name,
      format: "EAN TEST",
      data: data.data
    };
  });



});
