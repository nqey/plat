<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4 class="titstyle">筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
                <label>企业名称</label>
                <input type="text" class="form-control" v-model="name" placeholder="请输入企业名称">
            </div>
            <div class="form-group col-md-4">
                <label>入库时间</label>
                <el-date-picker v-model="createTimeGE" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="form-group col-md-8">
                <label>区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域</label>
                <v-area :code="areaCode" :onAreaChanged="(code) => liveAddress = code"></v-area>
            </div>
            <div class="form-group col-md-8">
              <button type="button" class="btn btn-primary" @click="search">
                  <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="reset" class="btn btn-primary" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <h4>已入库企业列表</h4>
      <hr/>
      <v-datagrid :columns="columns"
                  :data-url="dataUrl"
                  :count-url="countUrl"
                  :params="datagridParams">
      </v-datagrid>
      <v-modal ref="modal" :id="id"></v-modal>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import area from '@/components/area';
  import modal from '@/page/enterprise/passed/modal';
  import { DatePicker } from 'element-ui';
  import { formatDate } from '@/config/utils';
  import { PLATFORM_EP_QUERY_PASSED, PLATFORM_EP_QUERY_PASSED_COUNT } from '@/config/env';

  export default {
    name: '',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        datagridParams: {
          states: 'passed',
          name: null,
          areaCode: null,
          createTimeGE: null,
          page: 1,
          rows: 20,
        },
        id: null,
        name: null,
        areaCode: null,
        createTimeGE: null,
        state: 0,
        dataUrl: PLATFORM_EP_QUERY_PASSED,
        countUrl: PLATFORM_EP_QUERY_PASSED_COUNT,
        columns: [{ field: 'id', header: '企业ID', sort: 'name', width: 200 },
          { field: 'name', header: '企业名称', width: 250 },
          {
            field: 'address',
            header: '地址',
            width: 200,
          },
          { field: 'goodsCount', header: '商品(个)', width: 120 },
          { field: 'factoryCount', header: '工厂(个)', width: 120 },
          { field: 'franchiserCount', header: '经销商(个)', width: 120 },
          { field: 'codeCount', header: '二维码使用(个)', width: 180 },
          { field: 'paidAmount', header: '补贴金额(元)', width: 150 },
          {
            field: 'createTime',
            header: '入库时间',
            sort: 'create_time',
            width: 130,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'action',
            header: '操作',
            width: 200,
            actions: [{
              text: '【修改二维码数量】',
              show() {
                return true;
              },
              handler: (row) => {
                this.id = row.id;
                this.$refs.modal.$refs.modal.toggle();
              },
            }],
          },
        ],
      };
    },
    components: {
      'v-datagrid': datagrid,
      'el-date-picker': DatePicker,
      'v-area': area,
      'v-modal': modal,
    },
    methods: {
      search() {
        this.datagridParams = {
          states: 'passed',
          name: this.name || null,
          areaCode: this.liveAddress || null,
          createTimeGE: this.createTimeGE ? formatDate(this.createTimeGE, 'yyyy-MM-dd') : null,
          page: 1,
          rows: 20,
        };
      },
      clear() {
        this.areaCode = null;
        setTimeout(() => { this.areaCode = null; }, 10);
        this.name = null;
        this.createTimeGE = null;
        this.datagridParams = {
          states: 'passed',
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>
