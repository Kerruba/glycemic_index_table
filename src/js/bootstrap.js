import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
// import store from './store';


window.Vue = Vue;
Vue.use(VueRouter);
Vue.use(Vuex);
window.axios = axios;
// window.store = store;

window.axios.defaults.headers.common = {
    'X-Request-with': 'XMLHttpRequest'
};
