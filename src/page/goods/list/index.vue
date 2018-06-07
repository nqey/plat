<template>
  <div class="content">
    <div class="content_con">
      <br/>
      <br/>
      <!--筛选条件-->
      <div class="filters">
          <div class="form-inline row clearfix">
              <div class="form-group col-md-4">
                  <label>商品名称</label>
                  <input type="text" class="form-control" v-model="myname" placeholder="请输入商品名称">
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
import { PLATFORM_GOODS_QUERY, PLATFORM_GOODS_QUERY_COUNT } from '@/config/env';

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
      myname: null,
      goodsId: null,
      dataUrl: PLATFORM_GOODS_QUERY,
      countUrl: PLATFORM_GOODS_QUERY_COUNT,
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
          header: '商品名称',
          sort: 'name',
          width: '200',
        },
        {
          field: 'enterpriseName',
          header: '所属企业',
          sort: 'enterprise_name',
          width: '200',
        },
        {
          field: 'validPeriod',
          header: '保质期',
          sort: 'valid_period',
          width: '200',
        },
        {
          field: 'introduction',
          header: '商品特点',
          sort: 'introduction',
          // width: '25%',
        },
        {
          field: 'categoryName',
          header: '分类',
          sort: 'category_name',
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
            text: '【设置规则】',
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
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>