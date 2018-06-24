<template>
  <div>
    <div v-for="node of nodes">
      <div class="tree-node list-group-item"
           :class="{ active: isSelected(node) }" :tabindex="-1" @click="onClick(node)">
        <span :style="lsIndent"></span>
        <span @click='toggle($event, node)' class="icon expand-icon glyphicon"
              :class="[ node.open ? 'glyphicon-minus' : 'glyphicon-plus' ]"
              :style="{ 'visibility' : isFolder(node) ? 'visible' : 'hidden' }"></span>
        <span v-if='!isFolder'></span>
        {{node.text}}
      </div>

      <items :nodes='node.nodes' :selected="selected" :multiple="multiple" :level="level + 1" v-show="node.open"
             v-if='isFolder(node)'></items>
    </div>
  </div>
</template>
/**
* @author ： 李银 on 2018年5月24日 23:55:12
*
* 入参：
* multiple:Boolean    - 是否支持数据多行被选中， 默认为false（单选）
* nodes:Array         - 数据， 格式为：{id : '主键', text : '显示的内容'}
* selected:Array      - 初始选中数据， 格式为：[1,2,3,4, '主键id']
*
* 回调：
* onSelected(node, selected)    - 某个节点被选中回调，不设置则不触发，node为选中节点数据, selected当前已经选中的节点id
* onUnselected(node, selected)  - 某个节点被取消选中回调，不设置则不触发，node为取消选中节点数据, selected当前已经选中的节点id
* onSelectionChanged(selected)  - 选中项改变了触发，selected当前已经选中的节点id
**/
<script>
  export default {
    name: 'items',
    props: {
      multiple: {
        type: Boolean,
        default: false,
      },
      nodes: {
        type: Array,
        default: () => [],
      },
      // 私有参数
      level: {
        type: Number,
        default: 1,
      },
      onSelected: {
        type: Function,
        default: null,
      },
      onUnselected: {
        type: Function,
        default: null,
      },
      onSelectionChanged: {
        type: Function,
        default: null,
      },
      selected: {
        type: Array,
        default: () => [],
      },
    },
    mounted() {
      if (!this.selected) {
        this.selected = [];
      }
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
      lsIndent() {
        this.indent['margin-left'] = `${18 * this.level}px`;
        return this.indent;
      },
    },
    methods: {
      isFolder(node) {
        return node.nodes && node.nodes.length;
      },
      toggle(event, node) {
        if (this.isFolder(node)) {
          this.$set(node, 'open', !node.open);
        }
        event.stopPropagation();
      },
      isSelected(node) {
        return this.selected.indexOf(node.id) > -1;
      },
      onClick(node) {
        // 此行被选择时，则再点击取消选择
        if (this.isSelected(node)) {
          const index = this.selected.indexOf(node.id);
          if (index > -1) {
            this.$set(this.selected, index, null);

            // 执行取消选择回调
            if (this.onUnselected) {
              this.onUnselected(node, this.selected.filter(s => s != null));
            }
          }
        } else {
          // 未被选中，则选中此行；
          // 多选的时push一条进去，单选时覆盖之前的。
          if (this.multiple) {
            const index = this.selected.indexOf(node.id);
            // 存在空的数组
            if (index > -1) {
              this.$set(this.selected, index, node.id);
            } else {
              this.selected.push(node.id);
            }
          } else {
            this.$set(this.selected, 0, node.id);
          }

          // 执行选择回调
          if (this.onSelected) {
            this.onSelected(node, this.selected.filter(s => s != null));
          }
        }

        // 执行选中项修改了
        if (this.onSelectionChanged) {
          this.onSelectionChanged(this.selected.filter(s => s != null));
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin.scss';

  .tree-node {
    line-height: 22px;
    outline: none;
  }

  /*.tree-node:hover {
      background-color: #f5f7fa;
  }*/
  .list-group-item {
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  .list-group-item:not(.node-disabled):hover {
    background-color: #F5F5F5;
    border: 1px solid #ddd;
  }

  .list-group-item:focus {
    border: 1px solid #ddd;
    background-color: #F5F5F5;
  }

  .active {
    border: 1px solid #ddd;
    color: #FFFFFF !important;
    background-color: #428bca !important;
  }

  .icon {
    margin-right: 5px;
  }
</style>
