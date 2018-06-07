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

</style>
