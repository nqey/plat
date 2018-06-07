<template>
  <div>
    <div class="tree-node list-group-item"
      :class="{ active: selected.indexOf(node.id) > -1 }" :tabindex="-1" @click="getTreeNode(node)">
      <span :style="lsIndent"></span>
      <span v-if='isFolder' @click='toggle' class="icon expand-icon glyphicon" :class="[open?'glyphicon-minus':'glyphicon-plus']"></span>
      <span v-if='!isFolder' ></span>
      {{node.text}}
    </div>
    <div v-show="open" v-if='isFolder'>
      <items v-for='v of node.nodes' :node='v' :level="level+1" :key='v.id' :getTreeNode="getTreeNode" :selected="selected"></items>
    </div>
  </div>
</template>
<script>

export default {
  name: 'items',
  props: {
    node: {
      type: Object,
      default: {},
    },
    level: {
      type: Number,
      default: 1,
    },
    getTreeNode: {
      type: Function,
      default: null,
    },
    selected: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      open: false,
      indent: {
        'margin-left': '10px',
        'margin-right': '10px',
      },
    };
  },
  computed: {
    isFolder() {
      return this.node.nodes && this.node.nodes.length;
    },
    lsIndent() {
      this.indent['margin-left'] = `${18 * this.level}px`;
      return this.indent;
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.tree-node {
  padding: 5px 0px;
  line-height: 28px;
  outline: none;
}
/*.tree-node:hover {
    background-color: #f5f7fa;
}*/
.list-group-item {
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
}
.active {
    color: #FFFFFF;
    background-color: #428bca;
}
</style>