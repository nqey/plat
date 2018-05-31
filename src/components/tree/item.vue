<template>
  <div>
    <div @click='toggle' class="tree-node list-group-item" :tabindex="-1">
      <span :style="lsIndent" ref=""></span>
      <span v-if='isFolder' class="icon expand-icon glyphicon" :class="[open?'glyphicon-minus':'glyphicon-plus']" style="margin-right:3px;"></span>
      <span v-if='!isFolder' style="margin-right:21px;"></span>
      {{node.text}}
    </div>
    <div v-show="open" v-if='isFolder'>
      <items v-for='v of node.nodes' :node='v' :level="level+1" :key='v.id'></items>
    </div>
  </div>
</template>
<script>

export default {
  name: 'items',
  props: {
    node: {
      type: Object,
      default: null,
    },
    level: {
      type: Number,
      default: 1,
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
.tree-node:hover {
    background-color: #f5f7fa;
}
.tree-node:focus {
    color: #FFFFFF;
    background-color: #428bca;
}
.list-group-item {
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
}
</style>