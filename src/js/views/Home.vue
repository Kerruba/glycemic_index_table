<template>
    <div id="foods" class="columns">
        <div class="column is-half">
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
                    <tr v-for="meal in shared.meals">
                        <td v-text="getMealDate(meal)"></td>
                        <td v-text="meal.description"></td>
                        <td v-text="meal.total_load"></td>
                        <td>
                            <button class="button is-info fa fa-search" aria-hidden="true" @click="goToMeal(meal._id)"></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="column is-half">
            <table class="table is-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Food</th>
                        <th>Glycemic index</th>
                        <th>Glycemic load</th>
                        <th>Carbs (%)</th>
                        <th>Serving</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(food,index) in shared.aliments">
                        <th style="width: 10px">
                            <button class="button is-danger" @click="delete_aliment(food._id)">X</button>
                        </th>
                        <td v-text="food.name"></td>
                        <td v-text="food.glycemic_index"></td>
                        <td v-text="food.glycemic_load"></td>
                        <td v-text="food.carbs_percentual"></td>
                        <td v-text="food.serving.toString()"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { Qty } from 'js-quantities';
import {format} from 'date-fns';
    
export default {
    data() {
        return {
            shared: store.state
        }
    },
    methods: {
        get_aliments() {
            axios.get('/aliments')
                .then(function (response) {
                    store.setAlimentsAction(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        delete_aliment(index) {
            axios.delete(`/aliments/${index}`)
                .then(function (response) {
                    store.setAlimentsAction(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getMealDate(meal) {
            return format(meal.date, 'DD/MM/YY');
        },
        goToMeal(id) {
            this.$router.push('/diary_entry');
        }
    }
}
</script>