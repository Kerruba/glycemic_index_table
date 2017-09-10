<template>
    <div id="homepage">
        <div class="meals">
            <table class="table is-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="meal in meals">
                        <td v-text="getMealDate(meal)"></td>
                        <td v-text="meal.description"></td>
                        <td v-text="meal.totalLoad"></td>
                        <td style="text-align:right">
                            <button class="button is-info fa fa-search" aria-hidden="true" @click="goToMeal(meal)"></button>
                            <button class="button is-danger" @click="deleteMeal(meal._id)">X</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="aliments">
            <table class="table is-striped">
                <thead>
                    <tr>
                        <th>Food</th>
                        <th>Glycemic index</th>
                        <th>Glycemic load</th>
                        <th>Carbs (%)</th>
                        <th>Serving</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(food,index) in aliments">
                        <td v-text="food.name"></td>
                        <td v-text="food.glycemic_index"></td>
                        <td v-text="food.glycemic_load"></td>
                        <td v-text="food.carbs_percentual"></td>
                        <td v-text="food.serving.toString()"></td>
                        <td style="text-align:right">
                            <button class="button is-info fa fa-search" @click="goToAliment(food)"></button>
                            <button class="button is-danger" @click="deleteAliment(food._id)">X</button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { Qty } from 'js-quantities';
import { format } from 'date-fns';
// import { mapMutations } from 'vuex';
    
export default {
    computed: {
        meals() {
            return this.$store.state.meals;
        },
        aliments() {
            return this.$store.state.aliments;
        }
    },
    methods: {
        deleteAliment(index) {
            axios.delete(`/aliments/${index}`)
                .then(function (response) {
                    this.$store.commit('setAlimentsDatabase',response.data);
                    // this.setAlimentsDatabase(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getMealDate(meal) {
            return format(meal.date, 'DD/MM/YY');
        },
        goToAliment(aliment) {
            this.$router.push({name: 'aliment', params: { aliment: aliment, isUpdate: true}});
        },
        goToMeal(meal) {
            this.$router.push({ name: 'meal', params: { meal: meal, isUpdate: true}});
        },
        deleteMeal(id) {
            axios.delete(`/meals/${index}`)
            .then(res => {
                // this.setMealsDatabase(res.data)
                this.$store.commit('setMealsDatabase', res.data);
            })
            .catch(err => console.log(err));
        }
    }
}
</script>