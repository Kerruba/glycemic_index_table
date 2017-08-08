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
    setMealsAction (newValue) {
        if (this.debug) console.log('setMealsAction triggered with', newValue);
        this.state.meals = newValue;
    },
    clearAlimentsAction () {
        if (this.debug) console.log('clearAlimentsAction triggered');
        this.state.aliments = [];
    }
};

export default store;