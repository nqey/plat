<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>姓名</label>
              <input type="text" class="form-control" v-model="filter.name" placeholder="请输入经销商名称">
            </div>
            <div class="form-group col-md-4">
                <label>手机号码</label>
                <input type="text" class="form-control" v-model="filter.cellphone" placeholder="请输入手机号码">
            </div>
            <div class="form-group col-md-4">
                <label>机构</label>
                <input type="text" class="form-control" v-model="filter.organiz" placeholder="请输入隶属机构(服务中心)">
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
      <h4>认证官列表</h4>
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
  import { formatDate, reomveBlank } from '@/config/utils';
  import { PLATFORM_AUTHOFFICER_QUERY, PLATFORM_AUTHOFFICER_QUERY_COUNT } from '@/config/env';

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
          cellphone: null,
          organiz: null,
        },
        params: {},
        stateObj: {
          true: '通过',
          false: '不通过',
        },
        dataUrl: PLATFORM_AUTHOFFICER_QUERY,
        countUrl: PLATFORM_AUTHOFFICER_QUERY_COUNT,
        columns: [{ field: 'name', header: '姓名', sort: 'name', width: 260 },
          { field: 'organizTel', header: '联系电话', width: 260 },
          { field: 'organiz', header: '服务中心', width: 260 },
          {
            field: 'createTime',
            header: '提交时间',
            sort: 'create_time',
            width: 260,
            formatter(row, index, value) {
              return value && formatDate(value);
            },
          },
          {
            field: 'state',
            header: '状态',
            width: 260,
            formatter: row => (row.state ? '通过' : '待审核'),
          },
          {
            field: 'action',
            header: '编辑',
            width: 200,
            actions: [{
              text: '【查看详情】',
              show() {
                return true;
              },
              handler: row => this.$router.push(`/authofficer/list/view/${row.id}`),
            }],
          },
        ],
      };
    },
    components: {
      'v-datagrid': datagrid,
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
