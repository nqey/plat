<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>企业名称</label>
              <input type="text" class="form-control" v-model="name" placeholder="请输入企业名称">
            </div>
            <div class="form-group col-md-4">
              <label>支付方式</label>
              <select class="form-control" v-model="payMethod">
                <option value="">请选择</option>
                <option v-for="(v, k) of payMethodObj" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label>支付状态</label>
              <select class="form-control" v-model="payState">
                <option value="">请选择</option>
                <option v-for="(v, k) of payStateObj" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label>创建时间</label>
              <el-date-picker v-model="createTimeGE" type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="btn btn-primary" @click="search">
                <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="reset" class="btn btn-primary" @click="clear">清空
              </button>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <h4>初审列表</h4>
      <hr/>
      <v-datagrid :columns="columns"
                  :data-url="dataUrl" 
                  :count-url="countUrl"
                  :params="datagridParams">
      </v-datagrid>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { DatePicker } from 'element-ui';
  import { formatDate, getPictureUrl } from '@/config/utils';
  import { PLATFORM_EP_QUERY, PLATFORM_EP_QUERY_COUNT } from '@/config/env';

  export default {
    name: 'index',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        datagridParams: {
          states: 'pending',
          name: null,
          payMethod: null,
          payState: null,
          createTimeGE: null,
          page: 1,
          rows: 20,
        },
        payMethod: '',
        payMethodObj: {
          alipayWeb: '支付宝',
          wechatpayQrcode: '微信',
          free: '全额补贴',
        },
        payState: '',
        payStateObj: {
          wait: '待支付',
          success: '支付成功',
          failed: '支付失败',
        },
        stateObj: {
          wait: '待支付',
          pending: '待初审',
          collectting: '待采',
          confirmFailed: '初审未通过',
          reject2: '采集未通',
          pending2: '待复审',
          confirm2Failed: '复审未通过',
          passed: '通过审',
        },
        amountObj: {},
        status: {
          0: '',
          pending: '待审核',
          delayed: '延后',
          rejected: '未通过',
          passed: '通过',
        },
        state: 0,
        name: null,
        createTimeGE: null,
        dataUrl: PLATFORM_EP_QUERY,
        countUrl: PLATFORM_EP_QUERY_COUNT,
        columns: [{ field: 'id', header: '企业ID', sort: 'name', width: 200 },
          {
            field: 'logo',
            header: 'logo',
            width: 100,
            html: true,
            formatter(row, index, value) {
              return `<img src='${getPictureUrl(value, { w: 40, h: 40, q: 40 })}'>`;
            },
          },
          { field: 'name', header: '企业名称', width: 250 },
          { field: 'chargerName', header: '负责人', width: 120 },
          { field: 'chargerCellphone', header: '企业账号', width: 200 },
          {
            field: 'payState',
            header: '支付状态',
            width: 130,
            formatter: row => this.payStateObj[row.payState],
          },
          {
            field: 'state',
            header: '状态',
            width: 200,
            formatter: row => this.stateObj[row.state],
          },
          { field: 'license', header: '营业执照', width: 130 },
          {
            field: 'area',
            header: '地址',
            width: 300,
            formatter(row) {
              return `${row.area}${row.address}`;
            },
          },
          {
            field: 'createTime',
            header: '创建时间',
            sort: 'create_time',
            width: 150,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'action',
            header: '操作',
            width: 200,
            actions: [{
              text: '【查看详情】',
              show() {
                return true;
              },
              handler: (row) => {
                this.$router.push(`/enterprise/pending/view/${row.id}`);
              },
            }],
          },
        ],
      };
    },
    components: {
      'v-datagrid': datagrid,
      'el-date-picker': DatePicker,
    },
    methods: {
      search() {
        this.datagridParams = {
          states: 'pending',
          name: this.name || null,
          payMethod: this.payMethod || null,
          payState: this.payState || null,
          createTimeGE: this.createTimeGE ? formatDate(this.createTimeGE, 'yyyy-MM-dd') : null,
          page: 1,
          rows: 20,
        };
      },
      clear() {
        this.name = null;
        this.payMethod = '';
        this.payState = '';
        this.createTimeGE = null;
        this.datagridParams = {
          states: 'pending',
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>