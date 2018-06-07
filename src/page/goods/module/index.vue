<template>
  <div class="content">
    <div class="content_con">
      <br/>
      <br/>
      <!--筛选条件-->
      <div class="filters">
          <div class="form-inline row clearfix">
              <div class="form-group col-md-4">
                  <label>模块名称</label>
                  <input type="text" class="form-control" v-model="myname" placeholder="请输入模块名称">
              </div>
              <div class="form-group col-md-4">
                  <button type="button" class="search btn-primary btn datagrid-search" @click="search">
                      <span class="glyphicon glyphicon-search"></span>搜索
                  </button>
                  <button type="reset" class="search clear btn-primary btn datagrid-clear" @click="clear">清空</button>
              </div>
          </div>
      </div>
      <br/>
      <br/>
      <br/>
      <v-datagrid :toolbar="toolbar" :columns="columns" :checkable="checkable"
                  :pageable="pageable" :params="datagridParams"
                  :data-url="dataUrl" :count-url="countUrl" ref="dg"
      ></v-datagrid>
      <v-modal ref="moduleModal" :params="modalParams" :handler="modalHandler"></v-modal>
      <v-view-modal ref="moduleModalView" :content="content"></v-view-modal>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid';
import { formatDate } from '@/config/utils';
import modal from '@/page/goods/module/modal';
import viewModal from '@/page/goods/module/viewModal';
import { PLATFORM_MODULE_QUERY, PLATFORM_MODULE_QUERY_COUNT } from '@/config/env';

export default {
  name: 'module',
  data() {
    return {
      content: '',
      modalHandler: () => {
        this.datagridParams = {};
      },
      datagridParams: {
        name: null,
      },
      modalParams: {
        id: null,
        name: null,
        content: null,
      },
      myname: null,
      goodsId: null,
      dataUrl: PLATFORM_MODULE_QUERY,
      countUrl: PLATFORM_MODULE_QUERY_COUNT,
      pageable: true,
      toolbar: [],
      checkable: false,
      columns: [
        {
          field: 'id',
          header: '序号',
          sort: 'id',
          width: '70',
        },
        {
          field: 'name',
          header: '模块名',
          sort: 'name',
          width: '200',
        },
        {
          field: 'createTime',
          header: '创建时间',
          sort: 'create_time',
          width: '200',
          formatter(row, index, value) {
            return formatDate(value);
          },
        },
        {
          field: 'content',
          header: '模块内容',
          sort: 'content',
          // width: '200',
        },
        {
          field: 'action',
          header: '操作',
          width: '150',
          actions: [{
            text: '【修改】',
            show() {
              return true;
            },
            handler: (row) => {
              this.modalParams = row;
              this.$refs.moduleModal.$refs.moduleModal.toggle();
            },
          },
          {
            text: '【预览】',
            show() {
              return true;
            },
            handler: (row) => {
              this.content = row.content;
              this.$refs.moduleModalView.$refs.moduleModalView.toggle();
            },
          }],
        },
      ],
    };
  },
  computed: {
  },
  methods: {
    search() {
      this.datagridParams = {
        name: this.myname,
      };
    },
    clear() {
      this.myname = null;
      this.datagridParams = {};
    },
  },
  components: {
    'v-datagrid': datagrid,
    'v-modal': modal,
    'v-view-modal': viewModal,
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>