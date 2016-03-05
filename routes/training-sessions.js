var express = require('express');
var _ = require('underscore');
var RandomElements = require('random-elements');
var TrainingSessions = require('../models/training-sessions')
var router = express.Router();

const DEFAULT_COUNT = 20;
const DEFAULT_COLLECTION = _.range(99)

router.post('/', function(req, res, next) {
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
});

module.exports = router;
