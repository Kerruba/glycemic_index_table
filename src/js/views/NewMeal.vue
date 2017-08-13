<template>
    <div id="new_meal_page">
        <div id="food_list">
            <p class="panel-heading">Food list</p>
            <div class="panel-block">
                <p class="control has-icons-left">
                    <input class="input is-small" type="text" placeholder="Search" v-model="filter.key">
                    <span class="icon is-small is-left">
                        <i class="fa fa-search"></i>
                    </span>
                </p>
            </div>
            <a v-for="food in foodList" class="panel-block" v-text="food.name" @click="changeSelected(food)">
            </a>
            <!-- <div class="field">
                        <label class="label" for="search">Search</label>
                        <p class="control">
                            <input class="input" type="text" id="search" name="search" />
                        </p>
                    </div> -->
    
            <!-- Food list -->
        </div>
        <div id="food_details">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Food details
                    </p>
                    <a class="card-header-icon">
                        <span class="icon">
                            <i class="fa fa-angle-down"></i>
                        </span>
                    </a>
                </header>
                <div class="card-content" v-if="isSelected">
    
                    <p class="title" v-text="selected.name"></p>
                    <p class="subtitle is-small" v-text="selected.details" v-if="selected.details"></p>
                    <p class="field is-grouped is-grouped-multiline">
                        <div class="tags has-addons">
                            <span>GL</span>
                            <span class="tag" v-text="selected.glycemic_load"></span>
                            <span>GI</span>
                            <span class="tag" v-text="selected.glycemic_index"></span>
                        </div>
                    </p>
                </div>
                <div class="card-content" v-else>
                    No food selected
                </div>
            </div>
            <div>
                <div class="field">
                    <label class="label" for="serving">Serving size</label>
                    <p class="control">
                        <input class="input" type="text" id="serving" name="serving" v-model="food_serving" />
                    </p>
                </div>
                <button class="button is-primary" @click="addToMeal()">Add to meal</button>
            </div>
        </div>
    
        <div id="meal_food_composition">
                <p class="panel-heading">Meal</p>
                <div v-if="foodInMeal">
                    <div v-for="(food,index) in meal.content" class="panel-block" @click="changeSelected(food)">
                        <div class="level" style="width:100%">
                            <div class="level-left">
                                <button class="level-item button is-small is-danger" @click="removeFromMeal(index)"> X </button>
                                <p class="level-item" v-text="food.name"></p>
                                <p class="level-item" v-text="food.serving.toString()"></p>
                            </div>
                            <div class="level-right">
                                <p class="level-item" v-text="food.glycemic_load"></p>
                            </div>
                        </div>
                    </div>
                    <div class="panel-block">
                        <div class="level" style="width:100%">
                            <div class="level-left">
                                <p class="level-item">Total load</p>
                            </div>
                            <div class="level-right" v-text="totalLoad">
                            </div>
                        </div>
                    </div>
                </div>
                <p class="panel-block" v-else> No food yet</p>
                <p class="panel-block panel-block__no-bottom-border"><label class="label" for="details">Description</label></p>
                <p class="panel-block">
                    <input class="input" type="text" id="description" name="description" v-model="meal.description" placeholder="Meal description"/> 
                    <button class="button is-primary" @click="saveMealEntry()" :disabled="!foodInMeal">Save meal</button> 
                </p>
                
            </p>
        </div>
    </div>
</template>

<script>

import _ from 'lodash';
import { format } from 'date-fns';
import Qty from 'js-quantities'
import { mapMutations } from 'vuex';

function getGlycemicLoad(food) {
    let serving = parseServing(food.serving);
    return food.glycemic_load * serving / 100;
}

function parseServing(servingString) {
    return parseInt(servingString.substr(0, servingString.length - 1));
}

export default {
    data() {
        return {
            // shared: store.state,
            selected: {},
            food_serving: "",
            isUpdate: false,
            filter: {
                key: ""
            },
            meal: {
                date: new Date(),
                content: [],
                description: "" 
            },
        }
    },
    computed: {
        isSelected() {
            return !_.isEmpty(this.selected);
        },
        foodInMeal() {
            return this.meal.content.length > 0;
        },
        totalLoad() {
            return this.meal.content.reduce((total, food) => {
                // TODO need proper conversion, ok now as a temporary solution
                return total + food.glycemic_load;
            }, 0)
        },
        foodList() {
            if (!_.isEmpty(this.filter.key)) {
                return this.$store.aliments.filter(value => _.startsWith(value.name.toLowerCase(), this.filter.key.toLowerCase()));
            }
            return this.$store.aliments;

        }
    },
    created() {
        this.$nextTick(() => {
            if (this.$route.params.id) {
                let updateMeal = this.$store.getters.getMealById(this.$route.params.id);
                if (!_.isEmpty(updateMeal)) {
                    this.isUpdate = true;
                    this.meal = updateMeal[0];
                }
            }
        });
    },
    methods: {
        changeSelected(food) {
            this.selected = food;
            this.food_serving = food.serving;
        },
        addToMeal() {
            if (!_.isEmpty(this.selected)) {
                let newFood = _.cloneDeep(this.selected);
                newFood.serving = Qty(this.food_serving);
                newFood.glycemic_load = Math.round(this.selected.glycemic_load * newFood.serving.div(this.selected.serving));
                this.meal.content.push(newFood);
                this.selected = {};
            }
        },
        removeFromMeal(index) {
            this.meal.content.splice(index, 1);
        },
        saveMealEntry() {
            let mealToSave = this.meal;
            mealToSave.total_load = this.totalLoad;
            axios({
                method: this.isUpdate ? 'put' : 'post',
                url: this.isUpdate ? `/meals/${this.meal._id}` : '/meals',
                data: mealToSave
            })
            .then(response =>  {
                this.$store.commit('setMealsDatabase', response.data);
                this.$router.push('/')
            })
            .catch(error =>  console.error(error));
        },
        // ...mapMutations([
        //     'setMealsDatabase'
        // ])
    }
}
</script>
