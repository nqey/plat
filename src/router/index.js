import Vue from 'vue';
import Router from 'vue-router';
import { getCookie } from '@/config/cookie';


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/demo',
      name: 'demo',
      // r => resolve
      // [] => dependencies 依赖别的js会先被加载, 没有可以不写
      // 'demo' => chunkName: 异步加载这个组件时，浏览器请求的js名称，另外多个组件相同chunkName时会打包打在一起（即一次请求多个模块）
      component: r => require.ensure([], require => r(require('@/page/demo')), 'demo'),
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: r => require.ensure([], require => r(require('@/page/login')), 'login'),
    },
    // 中转
    {
      path: '/transfer/:data',
      name: 'transferData',
      component: r => require.ensure([], require => r(require('@/page/transfer')), 'transfer'),
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: r => require.ensure([], require => r(require('@/page/transfer')), 'transfer'),
    },
    // 首页
    {
      path: '/index',
      name: 'index',
      component: r => require.ensure([], require => r(require('@/page/index')), 'index'),
    },

    // 系统管理
    {
      path: '/system/role',
      name: 'role',
      component: r => require.ensure([], require => r(require('@/page/system/role/index')), 'roleList'),
    },
    {
      path: '/system/role/edit/:id',
      name: 'roleEditId',
      component: r => require.ensure([], require => r(require('@/page/system/role/edit')), 'roleEdit'),
    },
    {
      path: '/system/role/edit',
      name: 'roleEdit',
      component: r => require.ensure([], require => r(require('@/page/system/role/edit')), 'roleEdit'),
    },
    {
      path: '/system/menu',
      name: 'menu',
      component: r => require.ensure([], require => r(require('@/page/system/menu/index')), 'menuList'),
    },
    {
      path: '/system/user',
      name: 'sysuser',
      component: r => require.ensure([], require => r(require('@/page/system/user/index')), 'userList'),
    },
    {
      path: '/system/user/edit/:id',
      name: 'userEditId',
      component: r => require.ensure([], require => r(require('@/page/system/user/edit')), 'userEdit'),
    },
    {
      path: '/system/user/edit',
      name: 'userEdit',
      component: r => require.ensure([], require => r(require('@/page/system/user/edit')), 'userEdit'),
    },
    {
      path: '/system/paymethod',
      name: 'paymethod',
      component: r => require.ensure([], require => r(require('@/page/system/paymethod/index')), 'paymethod'),
    },
    {
      path: '/system/version',
      name: 'version',
      component: r => require.ensure([], require => r(require('@/page/system/version/index')), 'version'),
    },
    {
      path: '/system/version/edit/:id',
      name: 'versionEdit',
      component: r => require.ensure([], require => r(require('@/page/system/version/edit')), 'versionEdit'),
    },
    {
      path: '/system/version/edit',
      name: 'versionInsert',
      component: r => require.ensure([], require => r(require('@/page/system/version/edit')), 'versionEdit'),
    },
    // 补贴路由路径
    {
      path: '/subsidy/pending',
      name: 'subsidyPending',
      component: r => require.ensure([], require => r(require('@/page/subsidy/pending')), 'subsidyPending'),
    },
    {
      path: '/subsidy/apply_subsidy',
      name: 'subsidyApplySubsidy',
      component: r => require.ensure([], require => r(require('@/page/subsidy/apply_subsidy')), 'subsidyApplySubsidy'),
    },
    {
      path: '/subsidy/apply',
      name: 'subsidyApply',
      component: r => require.ensure([], require => r(require('@/page/subsidy/apply')), 'subsidyApply'),
    },
    {
      path: '/subsidy/record',
      name: 'subsidyRecord',
      component: r => require.ensure([], require => r(require('@/page/subsidy/record')), 'subsidyRecord'),
    },
    {
      path: '/subsidy/list',
      name: 'subsidyList',
      component: r => require.ensure([], require => r(require('@/page/subsidy/list')), 'subsidyList'),
    },
    // 系统消息路由路径
    {
      path: '/message/create',
      name: 'messageCreate',
      component: r => require.ensure([], require => r(require('@/page/message/create')), 'messageCreate'),
    },
    // 系统消息路由路径
    {
      path: '/message/create/:id',
      name: 'messageCreateId',
      component: r => require.ensure([], require => r(require('@/page/message/create')), 'messageCreateId'),
    },
    {
      path: '/message/list',
      name: 'messageList',
      component: r => require.ensure([], require => r(require('@/page/message/list')), 'messageList'),
    },
    // 申报管理路由路径
    {
      path: '/declarer/officer',
      name: 'declarerOfficer',
      component: r => require.ensure([], require => r(require('@/page/declarer/officer')), 'declarerOfficer'),
    },
    {
      path: '/declarer/officer/view/:id',
      name: 'declarerOfficerView',
      component: r => require.ensure([], require => r(require('@/page/declarer/officer/view')), 'declarerOfficerView'),
    },
    {
      path: '/declarer/agency',
      name: 'declarerAgency',
      component: r => require.ensure([], require => r(require('@/page/declarer/agency')), 'declarerAgency'),
    },
    {
      path: '/declarer/agency/view/:id',
      name: 'declarerAgencyView',
      component: r => require.ensure([], require => r(require('@/page/declarer/agency/view')), 'declarerAgencyView'),
    },
    {
      path: '/declarer/enterprise',
      name: 'declarerEnterprise',
      component: r => require.ensure([], require => r(require('@/page/declarer/enterprise')), 'declarerEnterprise'),
    },
    {
      path: '/declarer/enterprise/view/:id',
      name: 'declarerEnterpriseView',
      component: r => require.ensure([], require => r(require('@/page/declarer/enterprise/view')), 'declarerEnterpriseView'),
    },
    {
      path: '/declarer/exam',
      name: 'declarerExam',
      component: r => require.ensure([], require => r(require('@/page/declarer/exam')), 'declarerExam'),
    },
    {
      path: '/declarer/exam/the_test',
      name: 'declarerExamTest',
      component: r => require.ensure([], require => r(require('@/page/declarer/exam/the_test')), 'declarerExamTest'),
    },
    {
      path: '/declarer/exam/edit/:id',
      name: 'declarerExamEdit',
      component: r => require.ensure([], require => r(require('@/page/declarer/exam/edit')), 'declarerExamEdit'),
    },
    {
      path: '/declarer/exam/view/:id',
      name: 'declarerExamView',
      component: r => require.ensure([], require => r(require('@/page/declarer/exam/view')), 'declarerExamView'),
    },
    // 企业管理路由路径
    {
      path: '/factory/list',
      name: 'factoryList',
      component: r => require.ensure([], require => r(require('@/page/factory/list')), 'factoryList'),
    },
    {
      path: '/factory/list/view/:id',
      name: 'factoryView',
      component: r => require.ensure([], require => r(require('@/page/factory/list/view')), 'factoryView'),
    },
    {
      path: '/factory/pending',
      name: 'factoryPending',
      component: r => require.ensure([], require => r(require('@/page/factory/pending')), 'factoryPending'),
    },
    {
      path: '/employee/list',
      name: 'employeeList',
      component: r => require.ensure([], require => r(require('@/page/employee/list')), 'employeeList'),
    },
    {
      path: '/employee/list/view/:id:employeeId',
      name: 'employeeListView',
      component: r => require.ensure([], require => r(require('@/page/employee/list/view')), 'employeeListView'),
    },
    // 二维码管理路由路径
    {
      path: '/code/list',
      name: 'codeList',
      component: r => require.ensure([], require => r(require('@/page/code/list')), 'codeList'),
    },
    {
      path: '/code/list/log/:type:id',
      name: 'codeLog',
      component: r => require.ensure([], require => r(require('@/page/code/list/log')), 'codeLog'),
    },
    // 认证官管理路由路径
    {
      path: '/authofficer/list',
      name: 'authofficerList',
      component: r => require.ensure([], require => r(require('@/page/authofficer/list')), 'authofficerList'),
    },
    {
      path: '/authofficer/entry',
      name: 'authofficerEntry',
      component: r => require.ensure([], require => r(require('@/page/authofficer/list/entry')), 'authofficerEntry'),
    },
    {
      path: '/authofficer/edit/:id',
      name: 'authofficereEdit',
      component: r => require.ensure([], require => r(require('@/page/authofficer/list/edit')), 'authofficereEdit'),
    },
    {
      path: '/authofficer/list/view/:id',
      name: 'authofficerView',
      component: r => require.ensure([], require => r(require('@/page/authofficer/list/view')), 'authofficerView'),
    },
    {
      path: '/franchiser/list',
      name: 'franchiserList',
      component: r => require.ensure([], require => r(require('@/page/franchiser/list')), 'franchiserList'),
    },
    {
      path: '/franchiser/list/scan/:id',
      name: 'franchiserScan',
      component: r => require.ensure([], require => r(require('@/page/franchiser/list/scan')), 'franchiserScan'),
    },
    {
      path: '/franchiser/list/view/:id',
      name: 'franchiserView',
      component: r => require.ensure([], require => r(require('@/page/franchiser/list/view')), 'franchiserView'),
    },
    {
      path: '/enterprise/pending',
      name: 'enterprisePending',
      component: r => require.ensure([], require => r(require('@/page/enterprise/pending')), 'enterprisePending'),
    },
    {
      path: '/enterprise/pending/view/:id',
      name: 'enterpriseView',
      component: r => require.ensure([], require => r(require('@/page/enterprise/pending/view')), 'enterpriseView'),
    },
    {
      path: '/enterprise/pending/edit/:id',
      name: 'enterpriseedit',
      component: r => require.ensure([], require => r(require('@/page/enterprise/pending/edit')), 'enterpriseedit'),
    },
    {
      path: '/enterprise/collectting',
      name: 'enterpriseCollectting',
      component: r => require.ensure([], require => r(require('@/page/enterprise/collectting')), 'enterpriseCollectting'),
    },
    {
      path: '/enterprise/collectting/view/:id',
      name: 'enterpriseCollecttingView',
      component: r => require.ensure([], require => r(require('@/page/enterprise/collectting/view')), 'enterpriseCollecttingView'),
    },
    {
      path: '/enterprise/pending2',
      name: 'enterprisePending2',
      component: r => require.ensure([], require => r(require('@/page/enterprise/pending2')), 'enterprisePending2'),
    },
    {
      path: '/enterprise/pending2/edit/:id',
      name: 'enterprisePending2Edit',
      component: r => require.ensure([], require => r(require('@/page/enterprise/pending2/edit')), 'enterprisePending2Edit'),
    },
    {
      path: '/enterprise/pending2/view/:id',
      name: 'enterprisePending2View',
      component: r => require.ensure([], require => r(require('@/page/enterprise/pending2/view')), 'enterprisePending2View'),
    },
    {
      path: '/enterprise/passed',
      name: 'enterprisePassed',
      component: r => require.ensure([], require => r(require('@/page/enterprise/passed')), 'enterprisePassed'),
    },
    {
      path: '/enterprise/passed/view/:id',
      name: 'enterprisePassedView',
      component: r => require.ensure([], require => r(require('@/page/enterprise/passed/view')), 'enterprisePassedView'),
    },
    // 条码管理
    {
      path: '/goods/barcode',
      name: 'goodsbarcode',
      component: r => require.ensure([], require => r(require('@/page/goods/barcode')), 'goodsbarcode'),
    },
    // 销售属性管理

    {
      path: '/goods/attribute',
      name: 'goodsattribute',
      component: r => require.ensure([], require => r(require('@/page/goods/attribute')), 'goodsattribute'),
    },
    // 商品列表
    {
      path: '/goods/list',
      name: 'goodslist',
      component: r => require.ensure([], require => r(require('@/page/goods/list')), 'goodslist'),
    },
    {
      path: '/goods/list/view/:id',
      name: 'goodsDetail',
      component: r => require.ensure([], require => r(require('@/page/goods/list/view')), 'goodsDetail'),
    },
    {
      path: '/goods/category',
      name: 'category',
      component: r => require.ensure([], require => r(require('@/page/goods/category')), 'category'),
    },
    // 模块列表, 模版列表
    {
      path: '/template/module',
      name: 'goodsmodule',
      component: r => require.ensure([], require => r(require('@/page/goods/module')), 'goodsmodule'),
    },
    {
      path: '/template/list',
      name: 'goodstemplate',
      component: r => require.ensure([], require => r(require('@/page/goods/template')), 'goodstemplate'),
    },
    // 投诉列表
    {
      path: '/complaint/list',
      name: 'complaintList',
      component: r => require.ensure([], require => r(require('@/page/complaint/list')), 'complaintList'),
    },
    {
      path: '/message/detail/:id',
      name: 'messageDetail',
      component: r => require.ensure([], (require) => {
        r(require('@/page/message/list/detail'));
      }, 'messageDetail'),
    },
    {
      path: '/exam/edit/:id',
      name: 'examEdit',
      component: r => require.ensure([], require => r(require('@/page/declarer/exam/edit')), 'examEdit'),
    },
    {
      path: '/exam/view/:id',
      name: 'examView',
      component: r => require.ensure([], require => r(require('@/page/declarer/exam/view')), 'examView'),
    },
    {
      path: '/exam/detail/:id',
      name: 'examDetail',
      component: r => require.ensure([], require => r(require('@/page/declarer/exam/detail')), 'examDetail'),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isLogin = !!getCookie('platform_user');
  // 不是去登录页，而且没登录，那就去登录页；
  if (to.path !== '/login' && !isLogin) {
    next({ path: '/login' });
  } else if (to.path === '/') {
    // 空链接，去首页
    next({ path: '/index' });
  } else {
    // 如果去登录页，随便你； 或者只要登录了，随便你去哪；
    next();
  }
});

export default router;
