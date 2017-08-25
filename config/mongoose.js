var mongoose    = require('mongoose');
    mongoose.Promise = global.Promise;
var log         = require('./log')(module);
var connections = require('./connections');
var Promise     = require('bluebird'),
    promisify   = Promise.promisify;

mongoose.connection.openUri(connections.mongoose.database)
    .then(function(){
        log.info('Connected to DB!');
    }).catch(function(error){
        log.error(error);
    });