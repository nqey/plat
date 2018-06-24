<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>姓名：</label>
              <input type="text" class="form-control" v-model="name" placeholder="请输入员工姓名">
            </div>
            <div class="form-group col-md-4">
              <label>手机号：</label>
              <input type="text" class="form-control" v-model="cellphone" placeholder="请输入员工手机号码">
            </div>
            <div class="form-group col-md-4">
              <label>职责：</label>
              <input type="text" class="form-control" v-model="duty" placeholder="请输入员工职责">
            </div>
            <div class="form-group col-md-4">
              <label>工厂：</label>
              <input type="text" class="form-control" v-model="factoryName" placeholder="请输员工所属工厂">
            </div>
            <div class="form-group col-md-8">
              <button type="button" class="btn btn-primary" @click="search">
                  <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="button" class="btn btn-primary" @click="clear">
                  <span class="glyphicon glyphicon-clear"></span>清空
              </button>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <h4>员工列表</h4>
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
  import { PLATFORM_EMPLOYEE_QUERY, PLATFORM_EMPLOYEE_QUERY_COUNT } from '@/config/env';
  import { formatDate } from '@/config/utils';

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
          duty: null,
          factoryName: null,
          page: 1,
          rows: 20,
        },
        name: null,
        cellphone: null,
        duty: null,
        factoryName: null,
        liveAddress: '',
        stateObj: {
          0: '不可用',
          1: '可用',
        },
        dataUrl: PLATFORM_EMPLOYEE_QUERY,
        countUrl: PLATFORM_EMPLOYEE_QUERY_COUNT,
        columns: [{ field: 'name', header: '姓名', sort: 'name', width: 100 },
          { field: 'cellphone', header: '手机号', width: 180 },
          { field: 'idNumber', header: '身份证号', width: 250 },
          { field: 'duty', header: '职责', width: 100 },
          {
            field: 'state',
            header: '状态',
            width: 100,
            formatter: row => this.stateObj[row.state],
          },
          { field: 'factoryName', header: '所属工厂', width: 300 },
          {
            field: 'createTime',
            header: '创建时间',
            sort: 'create_time',
            width: 200,
            formatter(row, index, value) {
              return value && formatDate(value);
            },
          },
          {
            field: 'number',
            header: '扫码总数',
            width: 120,
            formatter: row => (!row.number ? '——' : row.number),
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
          duty: this.duty || null,
          factoryName: this.factoryName || null,
          page: 1,
          rows: 20,
        };
      },
      clear() {
        this.name = null;
        this.cellphone = null;
        this.duty = null;
        this.factoryName = null;
        this.datagridParams = {};
      },
      setLiveAddress(d) {
        this.liveAddress = d;
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>