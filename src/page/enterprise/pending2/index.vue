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
              <label>认证官</label>
              <input type="text" class="form-control" v-model="authoName" placeholder="请输入认证官姓名">
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="search btn-primary btn datagrid-search" @click="search"><span
                class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="reset" class="search clear btn-primary btn datagrid-clear" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <h4>复审列表</h4>
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
  import area from '@/components/area';
  import { formatDate, getPictureUrl } from '@/config/utils';
  import { PLATFORM_EP_QUERY, PLATFORM_EP_QUERY_COUNT } from '@/config/env';
  import { ENTERPRISE_STATE, ENTERPRISE_PAY_TYPE } from '@/config/mapping';

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
        authoName: null,
        params: {
          states: ['pending2', 'confirm2Failed'],
          name: null,
          authoName: null,
          page: 1,
          rows: 20,
        },
        mark: {
          0: '已指定',
          1: '未指定',
        },
        ENTERPRISE_STATE,
        ENTERPRISE_PAY_TYPE,
        state: 0,
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
          { field: 'chargerCellphone', header: '企业账号', width: 200 },
          {
            field: 'payState',
            header: '支付状态',
            width: 200,
            formatter: row => (this.ENTERPRISE_PAY_TYPE[row.payState] ? this.ENTERPRISE_PAY_TYPE[row.payState] : '未支付'),
          },
          {
            field: 'state',
            header: '状态',
            width: 150,
            formatter: row => this.ENTERPRISE_STATE[row.state],
          },
          { field: 'authoName', header: '认证官', width: 120 },
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
                this.$router.push(`/enterprise/pending2/view/${row.id}`);
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
    },
    methods: {
      search() {
        this.params = {
          states: ['pending2', 'confirm2Failed'],
          name: this.name || null,
          authoName: this.authoName || null,
        };
      },
      clear() {
        this.name = null;
        this.authoName = null;
        this.params = {
          states: ['pending2', 'confirm2Failed'],
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

</style>
