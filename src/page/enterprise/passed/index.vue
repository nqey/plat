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
                <input type="text" class="form-control" v-model="filter.name" placeholder="请输入企业名称">
            </div>
            <div class="form-group col-md-4">
                <label>入库时间</label>
                <el-date-picker v-model="filter.createTimeGE" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="form-group col-md-6">
                <label>区&#12288;&#12288;域</label>
                <v-area :code="filter.areaCode" :onAreaChanged="(code) => filter.areaCode = code"></v-area>
            </div>
            <div class="form-group col-md-4">
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
                  :params="params">
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
  import { formatDate, reomveBlank } from '@/config/utils';
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
        filter: {
          name: null,
          createTimeGE: null,
          areaCode: null,
        },
        params: {
          states: 'passed',
          sort: 'a.id',
          order: 'desc',
        },
        id: null,
        state: 0,
        dataUrl: PLATFORM_EP_QUERY_PASSED,
        countUrl: PLATFORM_EP_QUERY_PASSED_COUNT,
        columns: [{ field: 'id', header: '企业ID', sort: 'name', width: 120 },
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
          {
            field: 'look',
            header: '详情',
            width: 100,
            actions: [{
              text: '【查看】',
              handler: row => this.$router.push(`/enterprise/passed/view/${row.id}`),
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
        this.params = reomveBlank(this.filter);
      },
      clear() {
        this.params = {};
        this.filter = {};
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>
