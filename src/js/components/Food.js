import Qty from 'js-quantities';
import { Validation } from './Validation.js';
import _ from 'lodash';

let FoodRulesGenerator = function() {
    let isValidNumber = function (num) {
        return _.isNumber(num) && num >= 0 && num <= 100;
    };
    let isValidQty = function (obj) {
        try {
            Qty(obj);
            return true;
        } catch (err) {
            return false;
        }

    };
    let rules = [
        {
            field: 'name',
            validation(obj) { return !_.isEmpty(obj); },
            message: 'The food need a name'
        },
        {
            field: 'glycemic_index',
            validation: isValidNumber,
            message: 'The glycemic index has to be a number between 0 and 100'
        },
        {
            field: 'glycemic_load',
            validation: isValidNumber,
            message: 'The glycemic load has to be a number between 0 and 100'
        },
        {
            field: 'carbs_percentual',
            validation: isValidNumber,
            message: 'The percentage of carbs in the food must be a number between 0 and 100'
        },
        {
            field: 'serving',
            validation: isValidQty,
            message: 'The serving must be a valid serving'
        }
    ];
    return Object.freeze(rules);
};

let FoodRules = FoodRulesGenerator();
let FoodValidator = new Validation(FoodRules);

class Food {
    constructor(food) {
        let validationErrors = FoodValidator.validate(food);
        if (!validationErrors.any()) {

            let { _id = undefined, name, description = '', glycemic_index, glycemic_load, carbs_percentual, serving } = food;
            this._id = _id;
            this.name = name;
            this.description = description;
            this.glycemic_index = glycemic_index;
            this.glycemic_load = glycemic_load;
            this.carbs_percentual = carbs_percentual;
            this.serving = Qty(serving);
        } else {
            throw Error(validationErrors);
        }
    }

    setServing(newServing) {
        try {
            this.serving = Qty(newServing);
        } catch (err) {
            console.error(`${newServing} is not a valid quantity`);
        }
    }
}

class FoodBuilder {
    constructor() {}

    static build(obj) {
        let food = new Food(obj);
        return Object.seal(food);
    }
}

export { Food, FoodBuilder, FoodRules, FoodValidator };