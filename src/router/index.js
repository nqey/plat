import Vue from 'vue';
import Router from 'vue-router';
import { getCookie } from '@/config/cookie';

const login = r => require.ensure([], (require) => { r(require('@/page/login')); }, 'login');
const index = r => require.ensure([], (require) => { r(require('@/page/index')); }, 'index');
const user = r => require.ensure([], (require) => { r(require('@/page/user')); }, 'user');
const demo = r => require.ensure([], (require) => { r(require('@/page/demo')); }, 'demo');
const category = r => require.ensure([], (require) => { r(require('@/page/goods/category')); }, 'category');
const userList = r => require.ensure([], (require) => { r(require('@/page/system/user/index')); }, 'userList');
const userEdit = r => require.ensure([], (require) => { r(require('@/page/system/user/edit')); }, 'userEdit');
const menuList = r => require.ensure([], (require) => { r(require('@/page/system/menu/index')); }, 'menuList');
const menuEdit = r => require.ensure([], (require) => { r(require('@/page/system/menu/edit')); }, 'menuEdit');
const roleList = r => require.ensure([], (require) => { r(require('@/page/system/role/index')); }, 'roleList');
const roleEdit = r => require.ensure([], (require) => { r(require('@/page/system/role/edit')); }, 'roleEdit');
const subsidyPending = r => require.ensure([], (require) => { r(require('@/page/subsidy/pending')); }, 'subsidyPending');
const subsidyApply = r => require.ensure([], (require) => { r(require('@/page/subsidy/apply')); }, 'subsidyApply');
const subsidyApplySubsidy = r => require.ensure([], (require) => { r(require('@/page/subsidy/apply_subsidy')); }, 'subsidyApplySubsidy');
const subsidySuccessful = r => require.ensure([], (require) => { r(require('@/page/subsidy/successful')); }, 'subsidySuccessful');
const subsidyRecord = r => require.ensure([], (require) => { r(require('@/page/subsidy/record')); }, 'subsidyRecord');
const subsidyDetailList = r => require.ensure([], (require) => { r(require('@/page/subsidy/detail/list')); }, 'subsidyDetailList');
const messageCreate = r => require.ensure([], (require) => { r(require('@/page/message/create')); }, 'messageCreate');
const messageList = r => require.ensure([], (require) => { r(require('@/page/message/list')); }, 'messageList');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/system/role',
      name: 'role',
      component: roleList,
    },
    {
      path: '/system/role/edit',
      name: 'roleEdit',
      component: roleEdit,
    },
    {
      path: '/system/menu',
      name: 'menu',
      component: menuList,
    },
    {
      path: '/system/menu/edit',
      name: 'menuEdit',
      component: menuEdit,
    },
    {
      path: '/system/user',
      name: 'sysuser',
      component: userList,
    },
    {
      path: '/system/user/edit',
      name: 'userEdit',
      component: userEdit,
    },
    {
      path: '/user',
      name: 'user',
      component: user,
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/goods/category',
      name: 'category',
      component: category,
    },
    {
      path: '/subsidy/pending',
      name: 'subsidyPending',
      component: subsidyPending,
    },
    {
      path: '/subsidy/apply_subsidy',
      name: 'subsidyApplySubsidy',
      component: subsidyApplySubsidy,
    },
    {
      path: '/subsidy/successful',
      name: 'subsidySuccessful',
      component: subsidySuccessful,
    },
    {
      path: '/subsidy/apply',
      name: 'subsidyApply',
      component: subsidyApply,
    },
    {
      path: '/subsidy/record',
      name: 'subsidyRecord',
      component: subsidyRecord,
    },
    {
      path: '/subsidy/detail/list',
      name: 'subsidyDetailList',
      component: subsidyDetailList,
    },
    {
      path: '/message/create',
      name: 'messageCreate',
      component: messageCreate,
    },
    {
      path: '/message/list',
      name: 'messageList',
      component: messageList,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const platformUser = getCookie('platform_user');
  if (to.name === 'login' && !platformUser) {
    next();
  } else if (!platformUser) {
    next({
      path: '/login',
    });
  } else {
    next();
  }
});

export default router;
