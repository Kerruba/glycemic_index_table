"use strict";

let mongo = require("mongodb");
let client = mongo.MongoClient;
let _db;

module.exports = {
    connect() {
        if (_db) {
            return _db;
        } else {
            client.connect("mongodb://localhost:27017/glycemic_index", (err, db) => {
                if (err) {
                    console.log("Error connecting to Mongo - check mongo connection");
                    process.exit(1);
                }
                _db = db;
                console.log('Connected to mongo');
            })
        }
    },
    aliments() {
        return _db.collection('aliments');
    }
}