import './bootstrap';
import router from './router';
import store from './store';


new Vue({
    el: '#app',
    store,
    router: router,
    created() {
        this.$nextTick(() => {
            this.getAliments();
            this.getMeals();
        });
    },
    methods: {
        getAliments() {
            axios.get('/aliments')
                .then(response => this.$store.commit('setAlimentsDatabase', response.data))
                .catch(error => console.log(error));
        },
        getMeals() {
            axios.get('/meals')
                .then(response => this.$store.commit('setMealsDatabase', response.data))
                .catch(error => console.error(error));
        }
    }
});
