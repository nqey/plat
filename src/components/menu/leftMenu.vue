<template>
  <div class="left_nodes">
    <div class="left_nodes2">
      <div class="logo">
        <img :src="getPictureUrl(avatar, {f:'png',w:120,h:120})">
        <h3 v-if="type === '1'">
          中国商品诚信数据库
          <br>
          <span>管理后台</span>
        </h3>
        <h3 v-if="type !== '1'">
          {{username}}
        </h3>
      </div>
      <div class="left-nav">
        <nav>
          <ul>
            <v-item v-for="(m, i) of nodes" :node="m" :key="i" :selected="selected" :handler="handler"></v-item>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
  import item from '@/components/menu/item';
  import { getPictureUrl } from '@/config/utils';
  import { MENU_MINE } from '@/config/env';

  export default {
    name: 'leftMemu',
    data() {
      return {
        getPictureUrl,
        username: window.sessionStorage.getItem('username'),
        avatar: window.sessionStorage.getItem('avatar'),
        type: window.sessionStorage.getItem('type'),
        selected: [],
        nodes: null,
      };
    },
    methods: {
      handler(id) {
        this.selected = [id];
      },
      async initMenu() {
        const res = await this.$http.get(MENU_MINE, {}, { cache: true });
        if (res.success) {
          this.nodes = res.data;
        }
      },
    },
    components: {
      'v-item': item,
    },
    mounted() {
      this.initMenu();
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin.scss';

  * {
    font-size: 16px;
  }

  .left_nodes {
    width: 240px;
    min-width: 240px;
    height: 100%;
    position: fixed;
    left: 0;
    background: #fff;
    background-size: 100% 100%;
    text-align: center;
    z-index: 101;
    overflow: hidden;
  }

  .left_nodes2 {
    width: 257px;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }

  .logo {
    width: 240px;
    min-width: 240px;
    height: 250px;
    padding-top: 40px;
    text-align: center;
    display: list-item;
    background: #4063FF;
    position: fixed;
    z-index: 102;
  }

  .logo h3, .logo h3 > span {
    color: #fff;
    line-height: 35px;
    font-size: 20px;
    font-weight: bold;
  }

  .left-nav {
    padding: 20px 0 60px 0;
    margin-top: 250px;
    width: 240px;
  }
</style>
