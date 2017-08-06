import {cloneDeep} from 'lodash';
import Qty from 'js-quantities';

let store = {
    debug: true,
    state: {
        aliments: []
    },
    setAlimentsAction (newValue) {
        if (this.debug) console.log('setAlimentsAction triggered with', newValue);
        debugger;
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
    }
};

export default store;