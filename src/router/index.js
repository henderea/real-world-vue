import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import EventService from '@/services/EventService';
import GStore from '@/store';
import EventList from '../views/EventList.vue';
import NotFound from '../views/NotFound.vue';
import NetworkError from '../views/NetworkError.vue';

const AboutView = () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue');
const EventLayout = () => import(/* webpackChunkName: "event" */ '../views/event/EventLayout.vue');
const EventDetails = () => import(/* webpackChunkName: "event" */ '../views/event/EventDetails.vue');
const EventRegister = () => import(/* webpackChunkName: "event" */ '../views/event/EventRegister.vue');
const EventEdit = () => import(/* webpackChunkName: "event" */ '../views/event/EventEdit.vue');

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page, 10) || 1 }),
  },
  {
    path: '/events/:id',
    name: 'event-layout',
    props: true,
    component: EventLayout,
    beforeEnter: (to) => EventService.getEvent(to.params.id)
      .then((response) => {
        GStore.event = response.data;
      })
      .catch((error) => {
        if (error.response && error.response.status == 404) {
          return {
            name: '404-resource',
            params: { resource: 'event' },
          };
        }
        return { name: 'network-error' };
      }),
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
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => ({ path: `/events/${to.params.afterEvent}` }),
  },
  {
    path: '/about-us',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/about',
    redirect: () => ({ name: 'about' }),
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404-resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'network-error',
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from) => {
  NProgress.start();
  const notAuthorized = true;
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page';

    setTimeout(() => {
      GStore.flashMessage = '';
    }, 3000);

    if (from.href) {
      return false;
    }
    return '/';
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
