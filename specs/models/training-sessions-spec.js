require('../spec-helper');
var TrainingSessions = require('../../models/training-sessions');

describe('TrainingSessions', function() {
  context('#create', function() {
    var trainingSession;

    beforeEach(function() {
      trainingSession = TrainingSessions.create({ elements: [1,2,3], createdAt: new Date(2016, 12, 1) });
    })
    it('returns a promise', function() {
      expect(trainingSession).to.be.a('promise');
    });

    it('adds a training session into persistance', function(done) {
      trainingSession.then(function() {
        MongoClient.connect(config.mongoUrl, function(err, db) {
          var collection = db.collection('training_sessions');
          collection.count({ createdAt: new Date(2016, 12, 1) }).then(function(count) {
            expect(count).to.eq(1);
          }).finally(function() {
            done();
          });
        });
      });
    });

    it('has an id returned', function(done) {
      trainingSession.then(function(saved) {
        expect(saved._id).to.not.be.undefined;
      }).finally(function () {
        done();
      });
    });
  });
});
