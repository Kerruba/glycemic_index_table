let fs = require('fs');
let path = require('path');

module.exports.loadDatabase = (filepath) => {
    let content = fs.readFileSync(path.resolve(filepath));
    return JSON.parse(content);
};

module.exports.saveDatabase = (db, filepath) => {
    fs.writeFile(filepath, JSON.stringify(db, null, 4), (err) => {
        if (err) {
            console.error(err);
        }
    });
};

