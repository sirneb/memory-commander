// start the db connection
var MongoClient = require('mongodb').MongoClient;

dbClient = MongoClient.connect(config.mongoUrl)
