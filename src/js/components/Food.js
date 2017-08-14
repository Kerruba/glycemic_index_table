import Qty from 'js-quantities';
import { Validation } from './Validation.js';
import _ from 'lodash';

class Food {
    constructor(food) {
        let validationErrors = this.getValidator().validate(food);
        if (!validationErrors.any()) {
            let { name, description = '', glycemic_index, glycemic_load, carbs_percentual, serving } = food;
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

    getValidator() {
        let isValidNumber = function(num) {
            return _.isNumber(num) && num >= 0 && num <= 100;
        };
        let isValidQty = function(obj) {
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
        return new Validation(rules);
    }
}

export { Food };