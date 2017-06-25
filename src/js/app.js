import Vue from 'vue';
import axios from 'axios';


Vue.prototype.$http = axios;

new Vue({
    el: "#app",
    data: {
        items: [],
        page: 1,
        size: 10
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
                    alert("Hello world")
                })
        },
        incrementSize() {
            "use strict";
            this.size = this.size < 500 ? this.size + 10 : 500;
        },
        decrementSize() {
            "use strict";
            this.size = this.size > 10 ? this.size + 10 : 10;
        },
        incrementPage() {
            "use strict";
            this.page = this.page < 100 ? this.page + 1 : 100;
        },
        decrementPage() {
            "use strict";
            this.page = this.page > 1 ? this.size - 1 : 1;
        },
    }

});
