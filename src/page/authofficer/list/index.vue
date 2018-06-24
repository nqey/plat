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
              <input type="text" class="form-control" v-model="name" placeholder="请输入经销商名称">
            </div>
            <div class="form-group col-md-4">
                <label>手机号码</label>
                <input type="text" class="form-control" v-model="cellphone" placeholder="请输入手机号码">
            </div>
            <div class="form-group col-md-4">
                <label>机构</label>
                <input type="text" class="form-control" v-model="organiz" placeholder="请输入隶属机构(服务中心)">
            </div>
            <div class="form-group col-md-8">
                <button type="button" class="btn btn-primary" @click="search">
                    <span class="glyphicon glyphicon-search"></span>搜索
                </button>
                <button type="reset" class="btn btn-primary" @click="claer">清空</button>
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
                  :params="datagridParams">
      </v-datagrid>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { formatDate } from '@/config/utils';
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
        datagridParams: {
          name: null,
          cellphone: null,
          organiz: null,
          page: 1,
          rows: 20,
        },
        stateObj: {
          true: '通过',
          false: '不通过',
        },
        name: null,
        cellphone: null,
        organiz: null,
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
            formatter: row => this.stateObj[row.state],
          },
          {
            field: 'action',
            header: '编辑',
            width: 150,
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
        this.datagridParams = {
          name: this.name || null,
          cellphone: this.cellphone || null,
          organiz: this.organiz || null,
          page: 1,
          rows: 20,
        };
      },
      claer() {
        this.name = null;
        this.cellphone = null;
        this.organiz = null;
        this.datagridParams = {};
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>