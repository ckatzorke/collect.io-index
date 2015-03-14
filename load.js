'use strict';
var indexer = require('./index')();
var apikey = require('./apikey');
var gb = require('giantbomb-api')(apikey);

var platforms = {
    ps4: 146,
    ps3: 35,
    ps2: 19,
    ps1: 22,
    psvita: 129,
    psp: 18,
    psnPs3: 88,
    psnPsvita: 143,
    psnPsp: 116
};

var update = [platforms.ps2, platforms.psvita];
update.map(function (platform) {
    console.log('Loading games for ' + platform);
    gb.games({
        filter: {
            platforms: platform
        },
        limit: 100,
        offset: 0,
        paging: false
    }).then(function (result) {
        console.log('found ' + result.totalResults + ' games for ' + platform);
        indexer.add(result.results);
    }).
    catch(function (error) {
        console.error('Error during execution chain: ', error, error.stack);
    });
});