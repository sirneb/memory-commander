'use strict';
// db related
var MongoClient = require('mongodb').MongoClient;

class TrainingSessions {
  constructor() {
  }

  static create(object) {
    return new Promise(function(fulfill, reject) {
      try {
        MongoClient.connect(config.mongoUrl, function(err, db) {
          if (err) {
            reject(err);
          }
          db.collection('training_sessions').insertOne(object).then(function(saved) {
            db.close();
            fulfill(saved.ops[0]);
          });
        });
      } catch (err) {
        throw err;
      }
    });
  }
};

module.exports = TrainingSessions
