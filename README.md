# lifecodes

A wallet for your lifecodes.



## The Development Process

To build, install and run:
``` bash
npm install -g cordova ionic
npm install -g ios-sim
ionic start lifecodes-app sidemenu
cd lifecodes-app

bower install ngCordova
bower install underscore
bower install --save angular-qr
cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git
cordova plugin add https://github.com/wildabeast/BarcodeScanner.git

ionic platform add ios
ionic build ios
ionic emulate ios
```

## Developer Test

Download the PhoneGap Developer App

```
sudo npm install -g phonegap
phonegap serve
```

## Test on IOS

- Open XCODE project platform/ios/qr-keeper-app.xcodeproj
- Connect iPhone to mac with USB
- Register account with Apple
- Select target as your iPhone from Product>Destination>
- Build and Run

## Test on Ionic View

Ionic provide a free way to share the app

``` bash
 ionic login
 ionic upload
```

## References
- [ngCordova demo that shows all plugins](http://ngcordova.com/)
- [Camera Plugin](https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md)
- [Using the Cordova Camera API](http://learn.ionicframework.com/formulas/cordova-camera/)
- [Generate QR Codes](https://github.com/lrsjng/jquery-qrcode)
- [Generate QR Codes in Angular](https://github.com/monospaced/angular-qrcode)
- [Javascript QR Code Reader](https://github.com/LazarSoft/jsqrcode)
- [Camera Example](https://github.com/driftyco/ionic-example-cordova-camera)
- [Cordova Barcode Scanner](http://blog.nraboy.com/2014/09/implement-barcode-scanner-using-ionic-framework/)
- [QR in Angular Directive](https://github.com/janantala/angular-qr)
- [Ionic Framework Components](http://ionicframework.com/docs/components/)
- [Icons - Google](https://github.com/google/material-design-icons/releases/tag/1.0.0)
- [Icons - Ionic](http://ionicons.com/)
- [Icons - glyphsearch](http://glyphsearch.com/?)
- [Icons - webhostinghub](http://www.webhostinghub.com/glyphs/)
- [Ionic CodePen examples](http://codepen.io/ionic/public-list/)
- [Persistent Storage](http://docs.phonegap.com/en/1.2.0/phonegap_storage_storage.md.html)
- [Angularjs WebSQL](https://github.com/paulocaldeira17/angular-websql)
- [WebSQL gist](https://gist.github.com/jgoux/10738978)
- [ionic framework api](http://ionicframework.com/docs/api/)
- [SQLite Wrapper](https://github.com/driftyco/ng-cordova/blob/master/src/plugins/sqlite.js)
- [Sqlite example](https://github.com/brodysoft/Cordova-SQLitePlugin/issues/171)

## Troubleshooting

***Problem***: Build fails after camera plugin with exit code 65

***Solution***: Delete Platforms Folder and rebuild

***Problem***: Build fails after adding Cordova-SQLitePlugin

***Solution***: https://github.com/brodysoft/Cordova-SQLitePlugin/issues/132
```
cordova prepare ios
ionic platform rm ios
ionic platform add ios
ionic build ios
cordova platform update ios
```
