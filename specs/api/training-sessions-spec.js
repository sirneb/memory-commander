require('../spec-helper');
var server = require('../../app');
var request = require('request');
var express = require('express');
var morgan = require('morgan');

describe('/training-sessions', function() {
  var app;

  context('#create', function() {
    before(function() {
      app = server.listen(port);
    });

    after(function() {
      app.close();
    });

    it('returns status code 201', function(done) {
      request.post(`${baseUrl}/training-sessions`, function(err, response, body) {
        expect(response.statusCode).to.eq(201);
        done();
      });
    });

    it('returns an id for the training session', function(done) {
      request.post(`${baseUrl}/training-sessions`, function(err, response, body) {
          var json = JSON.parse(body);
          expect(json.id).to.be.a('string');
          expect(json.id).to.match(/[a-z0-9]+/);
          done();
        })
    });

    it('returns an elements array', function(done) {
      var payload = {
        url: `${baseUrl}/training-sessions`,
        json: true
      };
      request.post(payload , function(err, response, json) {
        expect(json.elements).to.be.an('array');
        done();
      })
    });

    it('returns the number of elements based on what is passed', function(done) {
      var payload = {
        url: `${baseUrl}/training-sessions`,
        body: { count: 5 },
        json: true
      };
      request.post(payload, function(err, response, json) {
        expect(json.elements.length).to.eq(5);
        done();
      })
    });

    context('if count is not passed', function() {
      it('returns the default number', function(done) {
        var payload = {
          url: `${baseUrl}/training-sessions`,
          json: true
        };
        request.post(payload, function(err, response, json) {
          expect(json.elements.length).to.eq(20);
          done();
        })
      });
    })

    it('randomizes only the collection passed', function(done) {
      var payload = {
        url: `${baseUrl}/training-sessions`,
        body: { collection: ['hello', 2] },
        json: true
      };
      request.post(payload, function(err, response, json) {
        _.each(json.elements, function(element) {
          expect(element).to.be.oneOf(['hello', 2]);
        });
        done();
      })
    });

    context('if collection is not passed', function() {
      it('randomizes the default collection', function(done) {
        var payload = {
          url: `${baseUrl}/training-sessions`,
          json: true
        };
        request.post(payload, function(err, response, json) {
          _.each(json.elements, function(element) {
            expect(element).to.be.oneOf(_.range(0, 99));
          });
          done();
        })
      });
    })
  });
});
