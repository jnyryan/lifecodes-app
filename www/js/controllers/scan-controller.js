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

.controller('QuickScanCtrl', function(
  $scope,
  $rootScope,
  ScanningService,
  ScanHistoryRepository
){
  $scope.qrCode = "";

  $scope.$on('$ionicView.afterEnter', function(){
    console.log("Fired afterENTER event on QuickScan");
    ScanningService.scan(function(data){
      //console.dir(data);
      //console.log(JSON.stringify(data));
      $scope.scanData = JSON.stringify(data);
      ScanHistoryRepository.insert(JSON.stringify(data))
        .then(function(res) {
          console.log('Saved new Scan to scan history');
        });

      console.log("JJJ" + data.format.replace("_","").toLowerCase());

      $scope.scancode = {
        type: data.format == "QR_CODE" ? "qrcode" : "barcode",
        format : data.format.replace("_","").toLowerCase(),
        data: data.text,
        height: data.format == "QR_CODE" ? "300" : 80,
        width: data.format == "QR_CODE" ? "300" : 3,
      };

      $scope.$apply();
      RefreshService.refresh();
    });
  });
})

.controller('ScanHistoryListCtrl', function(
  $scope,
  RefreshService,
  ScanHistoryRepository
) {

  $scope.delete = function(item) {
    console.dir(item.id);
    ScanHistoryRepository.delete(item.id).then(function(res) {
      $scope.scanHistory = res;
      $scope.$apply();
      RefreshService.refresh();
    });
  };

  $scope.$on('refresh', function(event, params){
    console.log("Refreshing View");
    ScanHistoryRepository.all().then(function(res) {
      $scope.scanHistoryList = res;
    });
  });

  ScanHistoryRepository.all().then(function(res) {
    $scope.scanHistoryList = res;
  });
})

.controller('ScanHistoryDisplayCtrl', function(
  $scope,
  $rootScope,
  $stateParams,
  ScanHistoryRepository
) {
  $scope.qrCode = "";

  ScanHistoryRepository.getById($stateParams.id).then(function(res) {
    $scope.scanHistory = res;
    $scope.qrCode = res.scanData.text;
    $scope.$apply();
  });
});
