import './bootstrap';
import router from './router';

new Vue({
    el: '#app',
    router,
    mounted: function () { },

    methods: {
        getItems() {
            axios.get('http://localhost:3000/aliments')
                .then(response => {
                    'use strict';
                    this.items = response.data;
                });
        },
    }

});
