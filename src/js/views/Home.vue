<template>
    <div id="foods">
        <div v-for="(food,index) in aliments" class="columns is-gapless">
                <div class="column is-1">
                    <button class="button is-danger is-outlined" @click="delete_aliment(index)">Delete</button>
                </div>
                <h3 class="column is-3">{{food.name}}</h3>
                <ul class="column">
                    <li v-if="food.details">{{food.details}}</li>
                    <li>{{food.serving}}</li>
                    <li>{{food.gl}}</li>
                </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aliments: [ ]
        }
    },
    mounted() { 
        this.$nextTick(() => {
            this.get_aliments();
        })
    },
    methods: {
        get_aliments() {
            let vm = this;
            axios.get('/aliments')
                .then(function (response) {
                    vm.aliments = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        delete_aliment(index) {
            let vm = this;
            axios.delete(`/aliments/${index}`)
                .then(function (response) {
                    vm.aliments = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
}
</script>