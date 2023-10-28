import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/pages/Home.vue'

const routes = [
    { paths: '/', component: Home },
    { paths: '/login', component: () => import('../components/pages/Login.vue') },
    { paths: '/register', component: () => import('../components/pages/Register.vue') },
];

const router = createRouter(
    {
        history: createWebHistory(),
        routes,
    }
);

export default router;