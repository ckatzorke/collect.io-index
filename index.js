/*jslint node: true, nomen: true  */
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});


var indexer = function () {
    'use strict';

    var elasticCB = function (error, response, resolve, reject) {
        if (error) {
            reject(error);
        } else {
            resolve(response);
        }
    };

    var deleteIndex = function () {
        return new Promise(function (resolve, reject) {
            client.indices.delete({
                index: 'games'
            }, function (error, response) {
                elasticCB(error, response, resolve, reject);
            });
        });
    };
    var add = function (entries) {
        var games = entries || [];
        for (var game of games) {
            client.create({
                index: 'games',
                type: 'game',
                id: game.id,
                body: game
            }, function (error, response) {
                //
            });
        }
    };

    var search = function (searchtext) {
        return new Promise(function (resolve, reject) {
            client.search({
                index: 'games',
                type: 'game',
                'q': 'name:' +  searchtext
            }, function (error, resp) {
                resolve(resp.hits.hits);
            });
        })
    };

    return {
        deleteIndex: deleteIndex,
        add: add,
        search: search
    };
}

module.exports = indexer;