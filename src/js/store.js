import { cloneDeep } from 'lodash';
import Qty from 'js-quantities';
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
            let fullDatabase = newDatabase.map(aliment => {
                let temp = cloneDeep(aliment);
                temp.serving = new Qty(aliment.serving);
                return temp;
            });
            state.aliments = fullDatabase;
        },
        clearAlimentDatabase (state) {
            // if (this.debug) console.log('clearAlimentsAction triggered');
            state.aliments = [];
        },
        setMealsDatabase (state, newDatabase) {
            // if (this.debug) console.log('setMealsAction triggered with', newValue);
            let fullDatabase = newDatabase.map(meal => {
                let expandedMeal = meal;
                expandedMeal.content = meal.content.map(food => {
                    food.serving = Qty(food.serving);
                    return food;
                });
                return expandedMeal;
            });
            state.meals = fullDatabase;
        },
        deleteMeal (state, mealId) {

        }
    }
});


export default store;