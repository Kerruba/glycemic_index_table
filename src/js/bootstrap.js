import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import store from './store';


window.Vue = Vue;
Vue.use(VueRouter);
window.axios = axios;
window.store = store;

window.axios.defaults.headers.common = {
    'X-Request-with': 'XMLHttpRequest'
};
