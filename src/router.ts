import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Gastos from './views/Gastos.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gastos',
    name: 'Gastos',
    component: Gastos
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
