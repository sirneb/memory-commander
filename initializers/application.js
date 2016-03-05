Promise = require('bluebird');
var fs = require('fs-extra');
var path = require('path');

config = {}

// setup logs directory
config.loggingPath = path.join(__dirname, '../logs')
fs.ensureDirSync(config.loggingPath);

if (process.env.NODE_ENV === 'test') {
  require('./test.js');
} else {
  config.mongoUrl = 'mongodb://localhost:27017/memorycommander';
}
