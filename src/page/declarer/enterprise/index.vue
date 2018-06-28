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
              <input type="text" class="form-control" v-model="filter.name" placeholder="输入负责人姓名">
            </div>
            <div class="form-group col-md-4">
              <label>机构名称</label>
              <input type="text" class="form-control" v-model="filter.organizName" placeholder="输入机构名称">
            </div>
            <div class="form-group col-md-4">
              <label>状&#12288;&#12288;态</label>
              <select class="form-control" v-model="filter.state">
                <option value="">请选择</option>
                <option v-for="(v,k) of ORGANIZ_ENTERPRISE_STATE" :value="k">{{ v.name }}</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label>时&#8194;间&#8194;段</label>
              <el-date-picker v-model="filter.startTime" type="date" value-format="yyyy-MM-dd" placeholder="起始时间"/>
              <span class="text-center">至</span>
              <el-date-picker v-model="filter.endTime" type="date" value-format="yyyy-MM-dd" placeholder="结束时间"/>
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="btn btn-primary" @click="search">
                <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="button" class="btn btn-primary" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <h4>企业列表</h4>
      <hr/>
      <v-datagrid :columns="columns" :data-url="dataUrl" :count-url="countUrl" :params="params"></v-datagrid>
    </div>
  </div>
</template>

<script>
  import { DECLARE_BASE_URL } from '@/config/env';
  import { ORGANIZ_ENTERPRISE_STATE } from '@/config/mapping';
  import { formatDate, reomveBlank } from '@/config/utils';
  import { DatePicker } from 'element-ui';

  export default {
    name: 'enterprise',
    data() {
      return {
        ORGANIZ_ENTERPRISE_STATE,
        filter: {
          name: null,
          startTime: null,
          endTime: null,
          state: '',
          organizName: null,
        },
        dataUrl: `${DECLARE_BASE_URL}platform/declare/enterprise/query`,
        countUrl: `${DECLARE_BASE_URL}platform/declare/enterprise/count`,
        params: {},
        columns: [{ field: 'id', header: '序号', sort: 'id', width: 100 },
          { field: 'name', header: '企业名称', sort: 'name', width: 230 },
          { field: 'organizName', header: '申报机构', sort: 'organiz_name', width: 230 },
          { field: 'declarerName', header: '申报官', sort: 'declarer_name', width: 230 },
          {
            field: 'state',
            header: '状态',
            sort: 'state',
            width: 160,
            html: true,
            formatter(row, index, value) {
              const s = ORGANIZ_ENTERPRISE_STATE[value];
              return s.name.fontcolor(s.color);
            },
          },
          {
            field: 'createTime',
            header: '提交时间',
            sort: 'create_time',
            width: 200,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'action',
            header: '操作',
            width: 200,
            actions: [{
              show(row) {
                // 不等于基本资料待填写和已删除可以查看详情
                return row.state !== 'baseWaitSubmit' && row.state !== 'deleted';
              },
              text: '【查看详情】',
              handler: this.view,
            }],
          }],
      };
    },
    methods: {
      view(row) {
        this.$router.push(`/declarer/enterprise/view/${row.id}`);
      },
      search() {
        this.params = reomveBlank(this.filter);
      },
      clear() {
        this.filter = { state: '' };
        this.params = {};
      },
    },
    components: {
      'v-datagrid': () => import('@/components/datagrid'),
      'el-date-picker': DatePicker,
    },
  };
</script>

<style lang="scss" scoped>
</style>
