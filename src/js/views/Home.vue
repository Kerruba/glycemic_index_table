<template>
    <div id="foods">
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
                    <th style="width: 10px"><button class="button is-danger" @click="delete_aliment(food._id)">X</button></th>
                    <td v-text="food.name"></td> 
                    <td v-text="food.glycemic_index"></td> 
                    <td v-text="food.glycemic_load"></td> 
                    <td v-text="food.carbs_percentual"></td> 
                    <td v-text="food.serving.toString()"></td>
                </tr>
            </tbody>
        </table> 
    </div>
</template>

<script>
let Qty = require('js-quantities');
    
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
        getFoodServing(food) {
            return food.serving.toString();
        }
    }
}
</script>