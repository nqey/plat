<template>
  <div>
    <button class="btn-add" style="margin-bottom: 20px;" @click="open = !open;">
      商品分类筛选
      <span class="icon expand-icon glyphicon glyphicon-plus"></span>
    </button>
    <v-item v-show="open" v-for="node of nodes" :node="node" :key="node.id"></v-item>
  </div>
</template>

<script>
import item from '@/components/tree/item';
import { CATEGORY_TREE } from '@/config/env';

export default {
  name: 'tree',
  data() {
    return {
      open: false,
      nodes: null,
    };
  },
  computed: {
  },
  methods: {
    async init() {
      const res = await this.$xhr('get', CATEGORY_TREE);
      if (res.data.success) {
        this.nodes = res.data.data;
      }
    },
    setOpen() {
      this.open = !this.open;
      if (this.open) {
        this.fl.height = window.getComputedStyle(this.$refs.unfold).height;
      } else {
        this.fl.height = '0px';
      }
    },
  },
  watch: {
  },
  components: {
    'v-item': item,
  },
  beforeCreate() {
  },
  cteated() {
  },
  beforeMount() {
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
};
</script>

<style lang='scss' scoped>
@import '../../assets/css/mixin.scss';

.btn-add {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
</style>