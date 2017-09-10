import Qty from 'js-quantities';
import { Food } from './components/Food.js';
import { Meal } from './components/Meal.js';
import Vuex from 'vuex';




const store = new Vuex.Store({
    state: {
        aliments: [],
        meals: []
    },
    getters: {
        getAlimentById: (state, getters) => (id) => {
            return state.aliments.find(aliment => aliment._id === id);
        },
        getMealById: (state, getters) => (id) => {
            return state.meals.find(meal => meal._id === id);
        }
    },
    mutations: {
        setAlimentsDatabase (state, newDatabase) {
            // if (this.debug) console.log('setAlimentsAction triggered with', newValue);
            // let fullDatabase = newDatabase.map(aliment => {
            //     let temp = cloneDeep(aliment);
            //     temp.serving = new Qty(aliment.serving);
            //     return temp;
            // });
            let fullDatabase = newDatabase.map(food => new Food(food));
            state.aliments = fullDatabase;
        },
        clearAlimentDatabase (state) {
            // if (this.debug) console.log('clearAlimentsAction triggered');
            state.aliments = [];
        },
        setMealsDatabase (state, newDatabase) {
            // if (this.debug) console.log('setMealsAction triggered with', newValue);
            let fullDatabase = newDatabase.map(entry => {
                let meal = new Meal(entry);
                // entry.content.forEach(food => meal.addFood(food));
                // meal._id = entry._id;
                // meal.description = entry.description;
                return meal;
            });
            state.meals = fullDatabase;
        },
        deleteMeal (state, mealId) {

        }
    }
});


export default store;