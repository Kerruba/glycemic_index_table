<template>
    <div class="columns">
        <div class="column is-one-quarter panel">
            <p class="panel-heading">Food list</p>
            <div class="panel-block">
                <p class="control has-icons-left">
                    <input class="input is-small" type="text" placeholder="Search">
                    <span class="icon is-small is-left">
                        <i class="fa fa-search"></i>
                    </span>
                </p>
            </div>
            <a v-for="food in shared.aliments" class="panel-block" v-text="food.name" @click="changeSelected(food)">
            </a>
            <!-- <div class="field">
                    <label class="label" for="search">Search</label>
                    <p class="control">
                        <input class="input" type="text" id="search" name="search" />
                    </p>
                </div> -->
    
            <!-- Food list -->
        </div>
        <div class="column is-quater" v-if="isSelected">
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
                <div class="card-content">
                    <p class="content" v-text="selected.details" v-if="selected.details"></p>
                    <p class="content" v-else>No further details</p>
                </div>
            </div>
        </div>
    
        <div class="column is-one-quarter" v-if="isSelected">
            <div class="field">
                <label class="label" for="serving">Serving size</label>
                <p class="control">
                    <input class="input" type="text" id="serving" name="serving" v-model="selected.serving"/>
                </p>
            </div>
            <button class="button is-primary" @click="addToMeal()">Add to meal</button>
        </div>
        <div class="column is-one-quarter">
            <p class="panel-heading">Meal</p>
            <div v-if="foodInMeal">
                <div v-for="food in meal" class="panel-block">
                     <div class="level" style="width:100%">
                            <div class="level-left">
                                <button class="level-item button is-small is-danger"> X </button>
                                <p class="level-item" v-text="food.name"></p>
                            </div>
                            <div class="level-right">
                                <p class="level-item" v-text="food.gl"></p>
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
            <!-- <table class="table panel-block">
                <tbody v-if="foodInMeal">
                    <tr v-for="food in meal">
                        <td v-text="food.name"></td>
                        <td>
                            <button class="button is-danger">X</button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td>No food</td>
                    </tr>
                </tbody>
            </table> -->
        </div>
    </div>
</template>

<script>

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function getGlycemicLoad(food) {
    let serving = parseServing(food.serving);
    return food.gl * serving / 100;
}

function parseServing(servingString) {
    return parseInt(servingString.substr(0, servingString.length - 1));
}

export default {
    data() {
        return {
            shared: store.state,
            selected: {},
            meal: [],
        }
    },
    computed: {
        isSelected() {
            return !isEmpty(this.selected);
        },
        foodInMeal() {
            return this.meal.length > 0;
        },
        totalLoad() {
            return this.meal.reduce((total, food)=> {
                // TODO need proper conversion, ok now as a temporary solution
                return total + food.gl;
            }, 0)
        }
    },
    methods: {
        changeSelected(food) {
            this.selected = food;
        },
        addToMeal() {
            if (!isEmpty(this.selected)) {
                let newFood = Object.assign({}, this.selected);
                newFood.gl = getGlycemicLoad(newFood);
                this.meal.push(newFood);
                this.selected = {};
            }
        }
    }
}
</script>
