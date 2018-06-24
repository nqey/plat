<template>
  <div id="app">
    <v-top-header v-if="isShow"></v-top-header>
    <v-left-menu v-if="isShow"></v-left-menu>
    <router-view/>
  </div>
</template>

<script>
  import vLeftMenu from '@/components/menu/leftMenu';
  import vTopHeader from '@/components/header/topHeader';

  export default {
    name: 'app',
    components: {
      'v-left-menu': vLeftMenu,
      'v-top-header': vTopHeader,
    },
    watch: {
      $route: 'isLogin',
    },
    data() {
      return {
        isShow: false,
      };
    },
    methods: {
      isLogin() {
        this.isShow = !window.location.hash.match('login');
      },
    },
  };
</script>

<style lang="scss">
  @import 'assets/css/common.scss';

  /*datagrid filter样式相关*/
  .filters {
    padding: 20px 0;
    border-radius: 0 0 4px 4px;
    margin-bottom: 20px;
    width: 85%;
    .form-group {
      margin: 10px 0 !important;
      border-radius: 4px;
    }
    .form-control {
      width: 220px;
    }

    .form-inline label {
      margin-right: 10px;
    }
  }

  .btn-primary {
    background: #327BFB;
    padding: 7px 20px;
    margin: 0 3px;
    :hover {
      background-color: rgba(50, 123, 251, 0.30);
    }
  }
</style>
