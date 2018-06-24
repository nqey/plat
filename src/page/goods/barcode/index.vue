<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <!--筛选条件-->
      <div class="form-inline">
        <div class="form-group">
            <label>条码</label>
            <input type="text" class="form-control" v-model="barcode" placeholder="请输入条码">
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary" @click="search">
            <span class="glyphicon glyphicon-search"></span>搜索
          </button>
          <button type="button" class="btn btn-primary" @click="clear">清空</button>
        </div>
      </div>
      <br/>
      <br/>
      <h4>条码列表</h4>
      <hr/>
      <v-datagrid :toolbar="toolbar" :columns="columns" :checkable="checkable"
                  :pageable="pageable" :params="datagridParams"
                  :data-url="dataUrl" :count-url="countUrl" ref="dg"
      ></v-datagrid>
      <v-excel-modal ref="excelModal" :handler="modalHandler"></v-excel-modal>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid';
import { formatDate } from '@/config/utils';
import excelModal from '@/page/goods/barcode/excelModal';
import { PLATFORM_BARCODE_QUERY, PLATFORM_BARCODE_QUERY_COUNT } from '@/config/env';

export default {
  name: 'barcode',
  data() {
    return {
      modalHandler: () => {
        this.datagridParams = {};
      },
      datagridParams: {
        barcode: null,
      },
      barcode: null,
      dataUrl: PLATFORM_BARCODE_QUERY,
      countUrl: PLATFORM_BARCODE_QUERY_COUNT,
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
          field: 'barcode',
          header: '条码',
          sort: 'bar_code',
          width: 230,
        },
        {
          field: 'createTime',
          header: '创建时间',
          sort: 'create_time',
          width: 230,
          formatter(row, index, value) {
            return formatDate(value);
          },
        },
        {
          field: 'json',
          header: '属性',
          sort: 'json',
          // width: 650,
        },
        {
          field: 'action',
          header: '操作',
          width: 230,
          actions: [{
            text: '【修改】',
            show() {
              return true;
            },
            handler: () => '',
          }],
        },
      ],
    };
  },
  computed: {
  },
  methods: {
    search() {
      this.datagridParams = { barcode: this.barcode };
    },
    clear() {
      this.barcode = null;
      this.datagridParams = {};
    },
  },
  components: {
    'v-datagrid': datagrid,
    'v-excel-modal': excelModal,
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>