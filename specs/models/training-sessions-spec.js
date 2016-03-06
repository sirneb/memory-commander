require('../spec-helper');
var TrainingSessions = require('../../models/training-sessions');

describe('TrainingSessions', function() {
  context('#create', function() {
    var trainingSession;

    beforeEach(function() {
      trainingSession = TrainingSessions.create({ elements: [1,2,3], createdAt: new Date(2016, 12, 1), userId: '1' });
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
            done();
          });
        });
      });
    });

    it('has an id returned', function(done) {
      trainingSession.then(function(saved) {
        expect(saved.id).to.be.not.undefined;
        expect(saved.id).to.match(/[a-z0-9]+/);
        done();
      });
    });

    it('has an user id returned', function(done) {
      trainingSession.then(function(saved) {
        expect(saved.userId).to.be.a('string');
        expect(saved.userId).to.match(/[a-z0-9]+/);
        done();
      });
    });
  });

  context('#find', function() {
    var session;

    beforeEach(function(done) {
      TrainingSessions.create({ elements: [1,2,3], createdAt: new Date(2016, 12, 1), userId: '1' }).then(function(result) {
        session = result;
        done();
      })
    });

    it('returns one session by query', function(done) {
      TrainingSessions.find({ _id: session.id, userId: '1' }).then(function(result) {
        expect(result).to.deep.eq(session);
        done();
      });
    });

    it("fails to return when it doesn't exist", function(done) {
      TrainingSessions.find({ _id: session.id, userId: '2' })
        .then(function() {
          throw 'should not be here!';
        }, function(err) {
          expect(err).to.eq('Not Found');
          done();
        });
    });
  });

  context('#where', function() {
    var firstCreated;

    beforeEach(function(done) {
      var session1 = TrainingSessions.create({ elements: [1,2,3], createdAt: new Date(2016, 12, 1), userId: '1' })
      var session2 = TrainingSessions.create({ elements: [3,4], createdAt: new Date(2015, 12, 5), userId: '2' })
      Promise.all([session1, session2]).then(function(created) {
        firstCreated = created[0];
        done();
      });
    });

    it('returns a promise', function(done) {
      trainingSessions = TrainingSessions.where({ userId: '1' });
      expect(trainingSessions).to.be.a('promise');
      done();
    });

    it('resolves to an array', function(done) {
      trainingSessions = TrainingSessions.where({ userId: '1' });
      trainingSessions.then(function(result) {
        expect(result).to.be.an('array');
        done();
      });
    });

    it('returns the right results', function(done) {
      trainingSessions = TrainingSessions.where({ userId: '1' });
      trainingSessions.then(function(result) {
        expect(result.length).to.eq(1);
        _.each(result, function(session) {
          expect(session.userId).to.eq('1');
        });
        done();
      });
    });

    it('has id on the results', function(done) {
      trainingSessions = TrainingSessions.where({ userId: '1' });
      trainingSessions.then(function(result) {
        _.each(result, function(session) {
          expect(session.id).to.be.not.undefined;
          expect(session.id).to.match(/[a-z0-9]+/);
        });
        done();
      });
    });

    context('when no results', function() {
      it('results with an empty array', function(done) {
        trainingSessions = TrainingSessions.where({ userId: 'tom' });
        trainingSessions.then(function(result) {
          expect(result).to.be.an('array');
          expect(result).to.be.empty;
          done();
        });
      });
    });

    context('sort parameter', function() {
      it('takes a sort parameter', function(done) {
        var newSession;
        TrainingSessions.create({ elements: [1,2], createdAt: new Date(2017, 12, 1), userId: '1' }).then(function(created) {
          newSession = created;
          return TrainingSessions.where({ userId: '1' }, { createdAt: 1 });
        }).then(function(result) {
          expect(result).to.deep.equal([firstCreated, newSession]);
          done();
        });
      })
    });
  });
});
