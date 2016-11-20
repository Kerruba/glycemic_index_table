import Vue from 'vue';
import axios from 'axios';


Vue.prototype.$http = axios;

new Vue({
    el: "#app",
    data: {
        items: []
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getItems();
        })
    },

    methods: {
        getItems() {
            this.$http.get("http://localhost:3000/aliments")
                .then(response => {
                    "use strict";
                    this.items = response.data;
                })
        }
    }

});
