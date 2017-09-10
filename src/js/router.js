import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./views/Home.vue')
    },
    {
        path: '/aliment',
        component: require('./views/NewFood.vue'),
        name: 'aliment',
        props: true
    },
    // {
    //     path: '/aliment/:id',
    //     component: require('./views/NewFood.vue')
    // },
    {
        path: '/meal',
        component: require('./views/NewMeal.vue'),
        name: 'meal',
        props: true
    },
    // {
    //     path: '/meal/:id',
    //     component: require('./views/NewMeal.vue')
    // }
];

export default new VueRouter({
    routes
});
