<template>
  <div class="content">
    <div class="content_con">
      <br/>
      <br/>
      <!--筛选条件-->
      <div class="filters">
          <div class="form-inline row clearfix">
              <div class="form-group col-md-4">
                  <label>条码</label>
                  <input type="text" v-qc-validator="validator" class="form-control" v-model="barcode" placeholder="请输入条码">
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
      validator: {
        type: ['required', 'maxlen'],
        message: {
          required: 'aaa',
          maxlen: 'bbb',
        },
        length: 2,
      },
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