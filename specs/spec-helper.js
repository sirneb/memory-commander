// environment
process.env.NODE_ENV = 'test';
require('../initializers/application.js');

// globals
expect = require('chai').expect;
_ = require('underscore');
port = '3333'
baseUrl = `http://localhost:${port}`;

// db related
MongoClient = require('mongodb').MongoClient;
var DatabaseCleaner = require('database-cleaner');

// clean db per run
afterEach(function(done) {
  MongoClient.connect(config.mongoUrl, function(err, db) {
    new DatabaseCleaner('mongodb').clean(db, function() {
      db.close();
      done();
    });
  });
});
