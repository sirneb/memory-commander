'use strict';
// db related

var _serialize = function(persisted) {
  persisted.id = persisted._id;
  delete persisted['_id'];
  return persisted;
};

class TrainingSessions {
  constructor() {
  }

  static create(object) {
    return new Promise(function(fulfill, reject) {
      try {
        dbClient.then(function(db) {
          db.collection('training_sessions').insertOne(object).then(function(saved) {
            fulfill(_serialize(saved.ops[0]));
          });
        });
      } catch (err) {
        throw err;
      }
    });
  }

};

module.exports = TrainingSessions
