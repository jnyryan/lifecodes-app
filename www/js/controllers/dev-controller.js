angular.module('app.controllers')


.controller('DeveloperCtrl', function($scope, PopupService, BarcodeRepository, RefreshService) {
  $scope.status = "working";

  $scope.insert = function(){
    $scope.barcode = {
      name: "faheys",
      description : "a shop",
      format: "EAN TEST",
      scanData: "www.ashoppe.com"
    };

    BarcodeRepository.insert($scope.barcode.name, $scope.barcode.description, $scope.barcode.format, $scope.barcode.scanData).then(function(results){
      PopupService.Popup("Saved NEW!");
      RefreshService.refresh();
    });
  };

  $scope.getAllBarcodeData = function() {
    BarcodeRepository.all().then(function(res) {
      $scope.barcodes = res;
    })
  };

  $scope.getBarcodeCount = function() {
    BarcodeRepository.size().then(function(res) {
      console.log(res);
      $scope.rowCount = res.size;
    });
  };

});
