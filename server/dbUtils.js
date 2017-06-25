let fs = require('fs');
let path = require('path');

module.exports.loadDatabase = (filepath) => {
    let content = fs.readFileSync(path.resolve(filepath));
    return JSON.parse(content);
};