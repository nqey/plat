<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
            <div class="form-group col-md-4">
              <label>企业名称</label>
              <input type="text" class="form-control" v-model="name" placeholder="请输入企业名称">
            </div>
            <div class="form-group col-md-4">
              <label>支付方式</label>
              <select class="form-control" v-model="payMethod">
                <option value="">请选择</option>
                <option v-for="(v, k) of PAY_METHOD" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label>支付状态</label>
              <select class="form-control" v-model="payState">
                <option value="">请选择</option>
                <option v-for="(v, k) of ENTERPRISE_PAY_TYPE" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label>创建时间</label>
              <el-date-picker v-model="createTimeGE" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
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
      <br/>
      <br/>
      <h4>初审列表</h4>
      <hr/>
      <v-datagrid :columns="columns"
                  :data-url="dataUrl"
                  :count-url="countUrl"
                  :params="params">
      </v-datagrid>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { DatePicker } from 'element-ui';
  import { formatDate, getPictureUrl } from '@/config/utils';
  import { PLATFORM_EP_QUERY, PLATFORM_EP_QUERY_COUNT } from '@/config/env';
  import { PAY_METHOD, ENTERPRISE_PAY_TYPE, ENTERPRISE_STATE } from '@/config/mapping';

  export default {
    name: 'index',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        name: null,
        payMethod: '',
        payState: '',
        createTimeGE: null,
        params: {
          states: ['pending', 'wait', 'confirmFailed'],
        },
        PAY_METHOD,
        ENTERPRISE_PAY_TYPE,
        ENTERPRISE_STATE,
        dataUrl: PLATFORM_EP_QUERY,
        countUrl: PLATFORM_EP_QUERY_COUNT,
        columns: [{ field: 'id', header: '企业ID', sort: 'name', width: 200 },
          {
            field: 'logo',
            header: 'logo',
            width: 100,
            html: true,
            formatter(row, index, value) {
              return `<img src='${getPictureUrl(value, { f: 'png', w: 40, h: 40, q: 40 })}'>`;
            },
          },
          { field: 'name', header: '企业名称', width: 250 },
          { field: 'chargerName', header: '负责人', width: 120 },
          { field: 'chargerCellphone', header: '企业账号', width: 150 },
          {
            field: 'payState',
            header: '支付状态',
            width: 150,
            formatter: row => this.ENTERPRISE_PAY_TYPE[row.payState],
          },
          {
            field: 'state',
            header: '状态',
            width: 200,
            formatter: row => this.ENTERPRISE_STATE[row.state],
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
        this.params = {
          states: ['pending', 'wait', 'confirmFailed'],
          name: this.name,
          payMethod: this.payMethod || null,
          payState: this.payState || null,
          createTimeGE: this.createTimeGE,
        };
      },
      clear() {
        this.name = null;
        this.payMethod = '';
        this.payState = '';
        this.createTimeGE = null;
        this.params = {
          states: ['pending', 'wait', 'confirmFailed'],
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

</style>
