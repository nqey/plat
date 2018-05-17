<template>
  <div id="app">
    <v-left-menu></v-left-menu>
    <router-view/>
  </div>
</template>

<script>
import vLeftMenu from '@/components/menu/leftMenu';

export default {
  name: 'app',
  components: {
    'v-left-menu': vLeftMenu,
  },
};
</script>

<style lang="scss">
@import 'assets/css/common.scss';

</style>
