// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('app', ['ionic',
  'ngCordova',
  'app.controllers',
  'app.services'
])

.run(function($ionicPlatform, DataFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    DataFactory.init();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.dashboard', {
    url: "/dashboard",
    views: {
      'menuContent': {
        templateUrl: "templates/dashboard.html",
        controller: "DashboardCtrl"
      }
    }
  })

  .state('app.barcode-display', {
    url: "/barcode-display/:barcodeId",
    views: {
      'menuContent': {
        templateUrl: "templates/barcode-display.html",
        controller: 'BarcodeDisplayCtrl'
      }
    }
  })

  .state('app.barcode-new', {
    url: "/barcode-new",
    views: {
      'menuContent': {
        templateUrl: "templates/barcode-new.html",
        controller: 'BarcodeNewCtrl'
      }
    }
  })

  .state('app.quick-scan', {
    url: "/quick-scan",
    views: {
      'menuContent': {
        templateUrl: "templates/quick-scan.html",
        controller: 'QuickScanCtrl'
      }
    }
  })

  .state('app.scan-history-list', {
    url: "/scan-history-list",
    views: {
      'menuContent': {
        templateUrl: "templates/scan-history-list.html",
        controller: 'ScanHistoryListCtrl'
      }
    }
  })

  .state('app.scan-history-display', {
    url: "/scan-history-display/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/scan-history-display.html",
        controller: 'ScanHistoryDisplayCtrl'
      }
    }
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })

  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.developer', {
    url: "/developer",
    views: {
      'menuContent': {
        templateUrl: "templates/developer.html",
        controller: 'DeveloperCtrl'
      }
    }
  })

  .state('app.playlists', {
    url: "/playlists",
    views: {
      'menuContent': {
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
});
