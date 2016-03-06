'use strict';
var _ = require('underscore');
var ObjectId = require('mongodb').ObjectID;

const collectionName = 'training_sessions';

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
          db.collection(collectionName).insertOne(object).then(function(saved) {
            fulfill(_serialize(saved.ops[0]));
          });
        });
      } catch (err) {
        throw err;
      }
    });
  }

  static find(query) {
    return new Promise(function(fulfill, reject) {
      if (_.has(query, '_id')) {
        query._id = new ObjectId(query._id);
      }
      dbClient.then(function(db) {
        db.collection(collectionName)
          .find(query).limit(1).next().then(function(session) {
            if (session !== null) {
              fulfill(_serialize(session));
            } else {
              reject('Not Found');
            }
          });
      });
    });
  }

  static where(query, sort) {
    var sortQuery = sort || {};
    return new Promise(function(fulfill, reject) {
      dbClient.then(function(db) {
        db.collection(collectionName)
          .find(query)
          .sort(sortQuery)
          .toArray().then(function(results) {
            fulfill(_.map(results, _serialize));
          })
      })
    });
  }

};

module.exports = TrainingSessions
