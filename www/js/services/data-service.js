angular.module('app.services')

.service('DataService', function(
  $rootScope,
  $cordovaSQLite,
  _
){

  var db = null;

  // Initialize all database objects
  this.initDB = function() {
    document.addEventListener("deviceready", function() {
      db = window.sqlitePlugin.openDatabase({name: "lifecodes.db"});

      db.transaction(function(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS barcode');
        tx.executeSql('CREATE TABLE IF NOT EXISTS barcode (id INTEGER PRIMARY KEY, name TEXT, format TEXT, scan_code TEXT, created_date DATETIME DEFAULT CURRENT_TIMESTAMP)');

        // demonstrate PRAGMA:
        db.executeSql("pragma table_info (barcode);", [], function(res) {
          console.log("PRAGMA res: " + JSON.stringify(res));
        });
      });
    }, false);
  }

  this.insert = function(name, format, scan_data, callback) {
    document.addEventListener("deviceready", function () {
      db = window.sqlitePlugin.openDatabase({name: "lifecodes.db"});
      db.transaction(function(tx) {
        tx.executeSql("INSERT INTO barcode (name, format, scan_code) VALUES (?,?,?)", ["tesco", "EAN1", "www.google.com"], function(tx, res) {
          console.log("insertId: " + res.insertId + " -- probably 1");
          console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
          callback(res.insertId);
        }, function(e) {
          console.log("ERROR: " + e.message);
        });
      });
    }, false);
  };

  this.getRowCount = function(callback) {
    document.addEventListener("deviceready", function () {
      db = window.sqlitePlugin.openDatabase({name: "lifecodes.db"});
      db.transaction(function (tx) {
        tx.executeSql("select count(id) as cnt from barcodes;", [], function (tx, res) {
          console.log("ROWCOUNT: " + res.rows.item(0).cnt);
          callback( res.rows.item(0).cnt);
        }, function (e) {
          console.log("ERROR: " + e.message);
        });
      });
    }, false);
  };

  this.all = function(callback) {
    document.addEventListener("deviceready", function () {
      db = window.sqlitePlugin.openDatabase({name: "lifecodes.db"});
      db.transaction(function (tx) {
        tx.executeSql("select * from barcode;", [], function (tx, result) {
          rows = [];
          if (result != null && result.rows != null) {
            for (var i = 0; i < result.rows.length; i++) {
              var row = result.rows.item(i);
              rows.push(
                {
                  id: row.id,
                  name: row.name,
                  format: row.format,
                  scan_data: row.scan_code,
                  created_date: row.created_date
                });
            }
          }
          console.log("Retrieved Rows Count: " + result.rows.length);
          console.log(rows);
          callback(rows);
        }, function (e) {
          console.log("ERROR: " + e.message);
        });
      });
    }, false);
  };

  this.empty = function(name, format, scan_data, callback) {
    document.addEventListener("deviceready", function () {

    }, false);
  };

  this.testDB = function() {
    document.addEventListener("deviceready", function() {
      var db = window.sqlitePlugin.openDatabase({name: "my.db"});

      db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS test_table');
        tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

        // demonstrate PRAGMA:
        db.executeSql("pragma table_info (test_table);", [], function(res) {
          console.log("PRAGMA res: " + JSON.stringify(res));
        });

        tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
          console.log("insertId: " + res.insertId + " -- probably 1");
          console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

          db.transaction(function(tx) {
            tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
              console.log("res.rows.length: " + res.rows.length + " -- should be 1");
              console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
            });
          });

        }, function(e) {
          console.log("ERROR: " + e.message);
        });
      });
    }, false);
  }

});
