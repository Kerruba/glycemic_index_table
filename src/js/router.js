import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./views/Home.vue')
    },
    {
        path: '/add',
        component: require('./views/NewFood.vue')
    }
];

export default new VueRouter({
    routes
});
