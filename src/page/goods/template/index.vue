<template>
  <div class="content">
    <div class="content_con">
      <br/>
      <br/>
      <!--筛选条件-->
      <div class="filters">
          <div class="form-inline row clearfix">
              <div class="form-group col-md-4">
                  <label>模板名称</label>
                  <input type="text" class="form-control" v-model="name" placeholder="请输入模板名称">
              </div>
              <div class="form-group col-md-4">
                <label>模板类型</label>
                <select v-model="type" validtype="required" class="form-control">
                    <option value="">请选择</option>
                    <option value="goods">商品模板</option>
                    <option value="push">推送模板</option>
                </select>
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
      <v-modal ref="modal" :goodsId="goodsId" :handler="modalHandler"></v-modal>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid';
import { formatDate } from '@/config/utils';
import modal from '@/page/goods/list/modal';
import { PLATFORM_TEMPLATE_QUERY, PLATFORM_TEMPLATE_QUERY_COUNT } from '@/config/env';

export default {
  name: 'attribute',
  data() {
    return {
      modalHandler: () => {
        this.datagridParams = {};
      },
      datagridParams: {
        name: null,
      },
      name: null,
      type: null,
      goodsId: null,
      dataUrl: PLATFORM_TEMPLATE_QUERY,
      countUrl: PLATFORM_TEMPLATE_QUERY_COUNT,
      pageable: true,
      toolbar: [{
        title: '新增',
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
          width: '70',
        },
        {
          field: 'type',
          header: '模板类型',
          sort: 'type',
          width: '200',
        },
        {
          field: 'name',
          header: '模板名称',
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
          field: 'action',
          header: '操作',
          width: '150',
          actions: [{
            text: '【修改】',
            show() {
              return true;
            },
            handler: (row) => {
              this.goodsId = row.id;
              this.$refs.modal.$refs.modal.toggle();
            },
          },
          {
            text: '【删除】',
            show() {
              return true;
            },
            handler: (row) => {
              this.goodsId = row.id;
              this.$refs.modal.$refs.modal.toggle();
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
        name: this.name,
        type: this.type,
      };
    },
    clear() {
      this.name = null;
      this.type = null;
      this.datagridParams = {};
    },
  },
  components: {
    'v-datagrid': datagrid,
    'v-modal': modal,
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>