import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
