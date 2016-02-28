var express = require('express');
var _ = require('underscore');
var RandomElements = require('random-elements');
var router = express.Router();

var DEFAULT_COUNT = 20;
var DEFAULT_COLLECTION = _.range(99)

router.post('/', function(req, res, next) {
  var count = req.body.count || DEFAULT_COUNT;
  var collection = req.body.collection || DEFAULT_COLLECTION;
  var elements = new RandomElements(collection, count);
  var response = {
    id: 1,
    elements: elements.array()
  };
  res.status(201).send(response);
});

module.exports = router;
