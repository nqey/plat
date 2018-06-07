<template>
  <div class="content">
    <div class="content_con">
      <v-tree :getTreeNode="getTreeNode" :nodes="treeNodes" :selected="selected"></v-tree>
      <v-datagrid :toolbar="toolbar" :columns="columns" :checkable="checkable"
                  :pageable="pageable" :params="datagridParams"
                  :data-url="dataUrl" :count-url="countUrl" ref="dg"
      ></v-datagrid>
      <v-modal ref="modal" :param="modalParams" :handler="modalHandler"></v-modal>
      <v-excel-modal ref="excelModal" :handler="modalHandler"></v-excel-modal>
    </div>
  </div>
</template>

<script>
import tree from '@/components/tree';
import datagrid from '@/components/datagrid';
import { formatDate } from '@/config/utils';
import modal from '@/page/goods/category/modal';
import excelModal from '@/page/goods/category/excelModal';
import { CATEGORY_TREE, CATEGORY_TREE_QUERY, CATEGORY_TREE_QUERY_COUNT } from '@/config/env';

export default {
  name: 'categoryMng',
  data() {
    return {
      treeNodes: [],
      getTreeNode: (node) => {
        this.pageable = false;
        this.datagridParams = { id: node.id };
        this.selected = [node.id];
      },
      modalHandler: (id) => {
        this.initTree();
        this.datagridParams = { id };
      },
      modalParams: {
        type: '',
        title: '',
        id: '',
        name: '',
      },
      datagridParams: {
        id: '',
      },
      selected: [],
      dataUrl: CATEGORY_TREE_QUERY,
      countUrl: CATEGORY_TREE_QUERY_COUNT,
      pageable: true,
      toolbar: [{
        title: '批量导入',
        handler: () => {
          this.$refs.excelModal.$refs.excelModal.toggle();
        },
      }],
      checkable: false,
      columns: [
        {
          field: 'id',
          header: '序号',
          sort: 'id',
          width: 80,
        },
        {
          field: 'name',
          header: '分类名称',
          sort: 'name',
          width: 330,
        },
        {
          field: 'code',
          header: '分类编码',
          width: 200,
          sort: 'code',
          formatter(row, index, value) {
            return value === -1 ? '永久' : value;
          },
        },
        {
          field: 'createTime',
          header: '创建时间',
          sort: 'create_time',
          width: 330,
          formatter(row, index, value) {
            return formatDate(value);
          },
        },
        {
          field: 'leaf',
          header: '是否叶子节点',
          sort: 'is_leaf',
          width: 250,
          formatter(row, index, value) {
            return value ? '是' : '否';
          },
        },
        {
          field: 'action',
          header: '操作',
          width: 230,
          actions: [{
            // 显示内容，可以写html代码
            text: '【新增子节点】',
            // return true 表示这个按钮要显示，否则不显示
            show() {
              return true;
            },
            // 处理器，参数：row-当前行数据，index当前行所属数据的第几行
            handler: (row) => {
              const title = `为【${row.name}】添加子节点`;
              this.openModal('add', title, row.id, '');
            },
          }, {
            text: '【修改】',
            show() {
              return true;
            },
            handler: (row) => {
              const title = `修改分类【${row.name}】`;
              this.openModal('update', title, row.id, row.name);
            },
          }],
        },
      ],
    };
  },
  computed: {
  },
  methods: {
    async initTree() {
      const res = await this.$http.get(CATEGORY_TREE);
      if (res.success) {
        this.treeNodes = res.data;
        this.selected = [...this.selected];
      }
    },
    openModal(type, title, id, name) {
      this.modalParams = { type, title, id, name };
      this.$refs.modal.$refs.modal.toggle();
    },
    copy(o) {
      return JSON.parse(JSON.stringify(o));
    },
  },
  components: {
    'v-tree': tree,
    'v-datagrid': datagrid,
    'v-modal': modal,
    'v-excel-modal': excelModal,
  },
  mounted() {
    this.initTree();
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>