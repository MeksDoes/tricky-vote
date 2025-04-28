import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreatePoll from '../views/CreatePoll.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/create-poll',
    name: 'create-poll',
    component: CreatePoll,
  },
  {
    path: '/poll/:pollId',
    name: 'show-poll',
    component: () => import('@/views/ShowPoll.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
