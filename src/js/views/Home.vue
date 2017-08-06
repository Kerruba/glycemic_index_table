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
                    <th style="width: 10px"><button class="button is-danger" @click="delete_aliment(index)">X</button></th>
                    <td v-text="food.name"></td> 
                    <td v-text="food.gi"></td> 
                    <td v-text="food.gl"></td> 
                    <td v-text="food.carbs_perc"></td> 
                    <td v-text="food.serving.toString()"></td>
                </tr>
            </tbody>
        </table> 
         <!-- <div v-for="(food, index) in shared.aliments" class="columns">
                <div class="column is-1">
                </div>
                <h3 class="column is-3">{{food.name}}</h3>
                <ul class="column">
                    <li v-if="food.details">{{food.details}}</li>
                    <li>{{food.serving}}</li>
                    <li>{{food.gl}}</li>
                </ul>
        </div>  -->
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
    // mounted() { 
    //     this.$nextTick(() => {
    //         this.get_aliments();
    //     })
    // },
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