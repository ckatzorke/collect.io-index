'use strict';
var indexer = require('./index')();
var apikey = require('./apikey');
var gb = require('giantbomb-api')(apikey);
var inquirer = require("inquirer");


inquirer.prompt([{
    type: 'input',
    name: 'searchtext',
    message: 'Enter searchtext:'
}], function (answers) {
    indexer.search(answers.searchtext).then(function (hits) {
        console.log('Got ' + hits.length + ' hits');
        for (var game of hits) {
            console.log(' * ', game._source.name);
        }
    }, function (err) {
        console.trace(err.message);
    });
});