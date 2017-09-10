import { Food } from './Food.js';
import { Validation } from './Validation.js';
import _ from 'lodash';

let MealValidationRules = [
    {
        field: 'content',
        validation(val) { return _.isArray(val); },
        message: 'Meal content must be an array'
    }
];

let MealValidator = new Validation(MealValidationRules);

/**
 * Class representing a meal.
 */
class Meal {
    /**
     * 
     * @param {*} obj The meal object, containing an _id, a description and a content
     */
    constructor(obj) {
        let val = MealValidator.validate(obj);
        if (!val.any()) {
            let {_id, description = '', content, date } = obj;
            this._id = _id;
            this.description = description;
            this.content = [];
            this.date = date;
            content.forEach(food => this.addFood(food));
        }
    }

    addFood(obj) {
        let food = new Food(obj);
        this.content.push(food);
    }

    removeFood(index) {
        if (index >= 0 && index < this.content.length) {
            this.content = this.content.slice(index, 1);
        }
    }

    get id() {
        return this._id;
    }

    get totalLoad() {
        if (this.content.length === 0) {
            return 0;
        }
        return this.content.reduce((total, food) => { return total + food.glycemic_load; }, 0);
    }

}

class MealBuilder {
    constructor() {}

    static build(obj) {
        let meal = new Meal(obj);
        return Object.seal(meal);
    }
}

export { Meal, MealBuilder };