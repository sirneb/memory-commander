var express = require('express');
var _ = require('underscore');
var RandomElements = require('random-elements');
var TrainingSessions = require('../models/training-sessions')
var router = express.Router();

const DEFAULT_COUNT = 20;
const DEFAULT_COLLECTION = _.range(99)

router.route('/')
  .post(function(req, res, next) {
    var count = req.body.count || DEFAULT_COUNT;
    var collection = req.body.collection || DEFAULT_COLLECTION;
    var elements = new RandomElements(collection, count).array();

    TrainingSessions.create({
      elements: elements,
      createdAt: Date.now(),
      userId: '1'
    }).then(function(saved) {
      res.status(201).send(saved);
    })
  })
  .get(function(req, res, next) {
    TrainingSessions.where({
      userId: '1'
    }, {
      createdAt: -1
    }).then(function(results) {
      res.status(200).send(results);
    })
  });

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  TrainingSessions.find({
    _id: id,
    userId: '1'
  }).then(function(result) {
    res.status(200).send(result);
  }, function(err) {
    res.status(404).send({ error: 'Not Found' });;
  });
});

module.exports = router;
