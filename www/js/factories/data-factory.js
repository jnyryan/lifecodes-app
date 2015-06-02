angular.module('app.factories')

// DB wrapper
.factory('DataFactory', function($q, DB_CONFIG) {
    var self = this;
    //self.db = null;

    self.init = function() {
      document.addEventListener("deviceready", function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        db = window.sqlitePlugin.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
            //self.executeSQL('DROP TABLE IF EXISTS ' + table.name);
            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.executeSQL(query);
            console.log('Table ' + table.name + ' initialized');
        });
      },true);
    };

    self.executeSQL = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
          document.addEventListener("deviceready", function() {
            db.transaction(function(transaction) {
              transaction.executeSql(query, bindings, function(transaction, result) {
                  deferred.resolve(result);
              }, function(transaction, error) {
                  deferred.reject(error);
                  console.log(error);
              });
          });
        }, true);
        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
})
// Barcode Repositories
.factory('BarcodeRepository', function(DataFactory) {
    var self = this;

    self.all = function() {
        return DataFactory.executeSQL('SELECT * FROM barcodes')
        .then(function(result){
            return DataFactory.fetchAll(result);
        });
    };

    self.getById = function(id) {
        return DataFactory.executeSQL('SELECT * FROM barcodes WHERE id = ?', [id])
        .then(function(result){
            return DataFactory.fetch(result);
        }
        ,function(reason) {
          console.log('Failed: ' + reason);
        })
    };

    self.insert = function(name, description, format, scanText, scanData) {
        return DataFactory.executeSQL('INSERT INTO barcodes (name, description, format, scanText, scanData) VALUES (?,?,?,?,?)', [name, description, format, scanText,scanData])
        .then(function(result){
            return DataFactory.fetchAll(result);
        });
    };

    self.size = function() {
        return DataFactory.executeSQL('select count(id) as size from barcodes;', [])
        .then(function(result){
            return DataFactory.fetch(result);
        });
    };

    return self;
})

// Scan_History Repositories
.factory('ScanHistoryRepository', function(DataFactory) {
    var self = this;

    self.all = function() {
        return DataFactory.executeSQL('SELECT * FROM scan_history ORDER BY createDate DESC')
        .then(function(result){
            return DataFactory.fetchAll(result);
        });
    };

    self.getById = function(id) {
        return DataFactory.executeSQL('SELECT * FROM scan_history WHERE id = ?', [id])
        .then(function(result){
            return DataFactory.fetch(result);
        }
        ,function(reason) {
          console.log('Failed: ' + reason);
        })
    };

    self.insert = function(scanData) {
        return DataFactory.executeSQL('INSERT INTO scan_history (scanData) VALUES (?)', [scanData])
        .then(function(result){
            return DataFactory.fetchAll(result);
        });
    };

    self.size = function() {
        return DataFactory.executeSQL('select count(id) as size from scan_history;', [])
        .then(function(result){
            return DataFactory.fetch(result);
        });
    };

    self.delete = function(id) {
        return DataFactory.executeSQL('DELETE FROM scan_history WHERE id = ?', [id])
        .then(function(result){
            return DataFactory.fetch(result);
        }
        ,function(reason) {
          console.log('Failed: ' + reason);
        })
    };


    return self;
});
