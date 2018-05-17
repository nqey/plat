import Vue from 'vue';
import Router from 'vue-router';

const login = r => require.ensure([], (require) => { r(require('@/page/login')); }, 'login');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({
      path: '/login',
    });
  } else {
    next();
  }
});

export default router;
