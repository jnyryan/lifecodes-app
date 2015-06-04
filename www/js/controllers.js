angular.module('app.controllers', [
  'ngCordova',
  'app.config',
  'app.factories',
  'app.services'
])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('DashboardCtrl', function($scope, BarcodeRepository, RefreshService, $ionicModal) {
  $scope.status="working";
  BarcodeRepository.all().then(function(res) {
    $scope.barcodes = res;
  });
  $scope.$on('refresh', function(event, params){
    console.log("Refreshing View");
    BarcodeRepository.all().then(function(res) {
      $scope.barcodes = res;
    });
  });
  /*$ionicModal.fromTemplateUrl('templates/view-barcode.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.close = function(){
    $scope.modal.hide();
  };
  */
})

.controller('SettingsCtrl', function($scope, $cordovaPreferences) {

    $scope.defaultHomeScreenPreference = $cordovaPreferences.get('DefaultHomeScreenPreference').then(function (name) {
      $scope.defaultHomeScreenPreference = name;
      alert(name);
    })

  $scope.setDefaultHomeScreenPreference = function () {
    alert("Set");
    $cordovaPreferences.set('DefaultHomeScreenPreference', 'true').then(function () {
      console.log('successfully saved!');
    })
  };
})

.controller('MenuTestCtrl', function($scope,$ionicModal){
  $scope.click = function(){alert("cool");};


})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
