angular.module('app.controllers')


.controller('DeveloperCtrl', function($scope, PopupService, BarcodeRepository,ScanHistoryRepository, RefreshService) {
  $scope.status = "working";
  $scope.barcode = {
    name: "faheys",
    description : "a shop",
    format: "EAN TEST",
    text: "www.ashoppe.com"
  }; 

  $scope.insert = function(){
    BarcodeRepository.insert($scope.barcode.name, $scope.barcode.description, $scope.barcode.format,$scope.barcode.text, $scope.barcode).then(function(results){
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

  $scope.insertScanHistory = function(){
    ScanHistoryRepository.insert(JSON.stringify($scope.barcode)).then(function(results){
      PopupService.Popup("Saved NEW Scan History!");
      RefreshService.refresh();
    });
  };

  $scope.getAllScanHistoryData = function() {
    ScanHistoryRepository.all().then(function(res) {
      $scope.scanHistory = res;
    })
  };

  $scope.getScanHistoryCount = function() {
    ScanHistoryRepository.size().then(function(res) {
      console.log(res);
      $scope.rowCountscanHistory = res.size;
    });
  };

});
