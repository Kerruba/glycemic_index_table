let fs = require('fs');
let path = require('path');
let Qty = require('js-quantities');

/**
 * Convert a food object to have a serving as js-quantities
 * @param {Object} food 
 */
function getFoodWithQuantity(food) {
    food.serving = Qty(food.serving);
    return food;
}

/**
 * Load database from a filepath
 */
module.exports.loadDatabase = (filepath) => {
    let content = fs.readFileSync(path.resolve(filepath));
    let db = JSON.parse(content);
    db= db.map(food => getFoodWithQuantity(food));
    return db;
};

/**
 * Save database to filepath
 */
module.exports.saveDatabase = (db, filepath) => {
    fs.writeFile(filepath, JSON.stringify(db, null, 4), (err) => {
        if (err) {
            console.error(err);
        }
    });
};




