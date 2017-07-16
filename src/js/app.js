import './bootstrap';
import router from './router';


new Vue({
    el: '#app',
    router: router,
    mounted() { 
        this.$nextTick(() => {
            this.get_aliments();
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

        }
    }
});
