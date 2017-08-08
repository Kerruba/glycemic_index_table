import './bootstrap';
import router from './router';


new Vue({
    el: '#app',
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
                .then(response => store.setAlimentsAction(response.data))
                .catch(error => console.log(error));
        },
        getMeals() {
            axios.get('/meals')
                .then(response => store.setMealsAction(response.data))
                .catch(error => console.error(error));
        }
    }
});
