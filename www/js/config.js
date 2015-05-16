angular.module('app.config', [])
.constant('DB_CONFIG', {
    name: 'lifecodes.db',
    tables: [
        {
              name: 'barcodes',
              columns: [
                  {name: 'id', type: 'integer primary key'},
                  {name: 'name', type: 'text'},
                  {name: 'description', type: 'text'},
                  {name: 'format', type: 'text'},
                  {name: 'data', type: 'integer'},
                  {name: 'created_date', type: 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
              ]
          }
    ]
});
