import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import AboutView from '../views/AboutView.vue';
import EventLayout from '../views/event/EventLayout.vue';
import EventDetails from '../views/event/EventDetails.vue';
import EventRegister from '../views/event/EventRegister.vue';
import EventEdit from '../views/event/EventEdit.vue';

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page, 10) || 1 }),
  },
  {
    path: '/event/:id',
    name: 'event-layout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'event-details',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'event-register',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'event-edit',
        component: EventEdit,
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
