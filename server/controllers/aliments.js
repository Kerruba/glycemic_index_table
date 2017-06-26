


exports.aliments_get = function(req,res, next, database) {
    res.json(database);
};

exports.aliments_post = function(req,res,next) {
    console.log(req.body);
}