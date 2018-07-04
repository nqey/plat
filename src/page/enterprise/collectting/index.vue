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
              <input type="text" class="form-control" v-model="filter.name" placeholder="请输入企业名称">
            </div>
            <div class="form-group col-md-4">
              <label>创建时间</label>
              <el-date-picker v-model="filter.createTimeGE" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="form-group col-md-4">
              <label>指派认证官</label>
              <select class="form-control" v-model="filter.assign">
                <option value="">请选择</option>
                <option v-for="(v,k) of mark" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label>区&#12288;域</label>
              <v-area :code="filter.areaCode" :onAreaChanged="(code) => filter.areaCode = code"></v-area>
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
      <br/>
      <br/>
      <h4>待认证官采集</h4>
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
  import area from '@/components/area';
  import datagrid from '@/components/datagrid';
  import { DatePicker } from 'element-ui';
  import { formatDate, getPictureUrl, reomveBlank } from '@/config/utils';
  import { PLATFORM_EP_QUERY, PLATFORM_EP_QUERY_COUNT } from '@/config/env';
  import { ENTERPRISE_STATE } from '@/config/mapping';

  export default {
    name: 'index',
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
          assign: '',
          areaCode: '',
        },
        params: {
          states: ['collectting'],
        },
        mark: {
          0: '未指定',
          1: '已指定',
        },
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
            field: 'state',
            header: '状态',
            width: 150,
            formatter: row => ENTERPRISE_STATE[row.state],
          },
          {
            field: 'authoName',
            header: '认证官',
            width: 130,
            html: true,
            formatter: row => (row.authoName ? row.authoName : '<span style="color:red;">未指定</span>'),
          },
          { field: 'license', header: '营业执照', width: 130 },
          {
            field: 'area',
            header: '地址',
            width: 400,
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
                this.$router.push(`/enterprise/collectting/view/${row.id}`);
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
        this.params = reomveBlank(this.filter);
        this.params.states = ['collectting'];
      },
      clear() {
        this.params = {
          states: 'collectting',
        };
        this.filter = {
          name: null,
          createTimeGE: null,
          assign: '',
          areaCode: '',
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

</style>
