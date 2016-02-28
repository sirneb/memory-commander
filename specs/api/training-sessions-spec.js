var chakram = require('chakram');
var _ = require('underscore');
var expect = chakram.expect;
var baseUrl = "http://localhost:3000"
var context = describe


describe('Training Sessions', function() {

  context('#create', function() {

    it('returns status code 201', function() {
      var response = chakram.post(baseUrl + "/training-sessions");
      return expect(response).to.have.status(201);
    });

    it('returns an id for the training session', function() {
      var response = chakram.post(baseUrl + "/training-sessions");
      return expect(response).to.have.json('id', function(id) {
        expect(id).to.be.a('number');
      });
    });

    it('returns an elements array', function() {
      var response = chakram.post(baseUrl + "/training-sessions");
      return expect(response).to.have.json('elements', function(elements) {
        expect(elements).to.be.an('array');
      })
    });

    it('returns the number of elements based on what is passed', function() {
      var response = chakram.post(baseUrl + "/training-sessions", { count: 5 });
      return expect(response).to.have.json('elements', function(elements) {
        expect(elements.length).to.equal(5);
      })
    });

    context('if count is not passed', function() {
      it('returns the default number', function() {
        var response = chakram.post(baseUrl + "/training-sessions");
        return expect(response).to.have.json('elements', function(elements) {
          expect(elements.length).to.equal(20);
        })
      });
    })

    it('randomizes only the collection passed', function() {
      var response = chakram.post(baseUrl + "/training-sessions", { collection: ['hello', 2] });
      return expect(response).to.have.json('elements', function(elements) {
        _.each(elements, function(element) {
          expect(element).to.be.oneOf(['hello', 2]);
        });
      })
    });

    context('if collection is not passed', function() {
      it('randomizes the default collection', function() {
        var response = chakram.post(baseUrl + "/training-sessions");
        return expect(response).to.have.json('elements', function(elements) {
          _.each(elements, function(element) {
            expect(element).to.be.oneOf(_.range(0, 99));
          });
        })
      });
    })
  });
});
