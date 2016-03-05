var fs = require('fs-extra');
var path = require('path');

config.mongoUrl = 'mongodb://localhost:27017/memorycommandertest';
config.logFile = fs.createWriteStream(path.join(config.loggingPath, 'test.log'), { flags: 'a' });
