"use strict";
var express = require("express");
var path = require("path");
var engines = require('consolidate');
var mongo = require("./mongoUtils.js");

let app = express();
mongo.connect();

// Setup express to serve static content from client folder
app.use( express.static(__dirname + "/../client") );

app.get("/aliments", (req,res) => {
    // res.json(req.query)
    // res.json(req.query); 
    // let pag ={
    //     size: req.query.size = 10,
    //     page: req.query.page = 0    
    // };
    // res.json(pag);
    let pagination = {
        size: req.query.size ? parseInt(req.query.size) : 10,
        page: req.query.page ? parseInt(req.query.page) : 0
    };

    mongo.aliments().find()
        .skip(pagination.page*pagination.size)
        .limit(pagination.size)
        .toArray((err, result) => {
            if (err) {
                throw err;
            }
            res.json(result);
    })
});

app.listen(3000, function() {
    "use strict";
    console.log("Example app listening on port 3000!");
});
