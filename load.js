'use strict';
var indexer = require('./index')();
var apikey = require('./apikey');
var gb = require('giantbomb-api')(apikey);


console.log('Getting all games for Playstation...');
gb.games({
    filter: {
        platforms: 129
    },
    limit: 100,
    offset: 0,
    paging: false
}).then(function (result) {
    console.log('found ' + result.totalResults + ' games for ps3');
    indexer.add(result.results);
}).
catch(function (error) {
    console.error('Error during execution chain: ', error, error.stack);
});