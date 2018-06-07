<template>
  <div class="left_nodes">
    <div class="left_nodes2">
      <div class="logo">
        <img src="//pic.cpsdb.com/72747ee92c3fdf007ae76c8e259f46cf?w=120&f=png">
        <h3>
          中国商品诚信数据库
          <br>
          <span>管理后台</span>
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
import { MENU_MINE } from '@/config/env';

export default {
  name: 'leftMemu',
  data() {
    return {
      selected: [],
      nodes: null,
    };
  },
  methods: {
    handler(id) {
      this.selected = [id];
    },
    async initMenu() {
      const res = await this.$http.get(MENU_MINE);
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
.logo h3,  .logo h3 > span{
  color: #fff;
  line-height: 35px;
  font-size: 20px;
  font-weight: bold;
}
.left-nav{
  padding: 20px 0 60px 0;
  margin-top: 250px;
  width: 240px;
}
</style>