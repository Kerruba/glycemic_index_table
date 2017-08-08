import './bootstrap';
import router from './router';


new Vue({
    el: '#app',
    router: router,
    mounted() {
        this.$nextTick(() => {
            this.get_aliments();
            this.get_meals();
        });
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
        get_meals() {
            axios.get('/meals')
                .then(response => store.setMealsAction(response.data))
                .catch(error => console.error(error));
        }
    }
});
