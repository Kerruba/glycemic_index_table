import {cloneDeep} from 'lodash';
import Qty from 'js-quantities';


let store = {
    debug: true,
    state: {
        aliments: [],
        meals: []
    },
    setAlimentsAction (newValue) {
        if (this.debug) console.log('setAlimentsAction triggered with', newValue);
        let newAliments = newValue.map(aliment => {
            let temp = cloneDeep(aliment);
            temp.serving = new Qty(aliment.serving);
            return temp;
        });
        this.state.aliments = newAliments;
    },
    clearAlimentsAction () {
        if (this.debug) console.log('clearAlimentsAction triggered');
        this.state.aliments = [];
    },
    setMealsAction (newValue) {
        if (this.debug) console.log('setMealsAction triggered with', newValue);
        newValue = newValue.map(meal => {
            let expandedMeal = meal;
            expandedMeal.content = meal.content.map(food => {
                food.serving = Qty(food.serving);
                return food;
            });
            return expandedMeal;
        });
        this.state.meals = newValue;
    },
    deleteMealAction(id) {
        
    }
};

export default store;