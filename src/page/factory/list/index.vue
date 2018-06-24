<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>工厂名称</label>
              <input type="text" class="form-control" v-model="name" placeholder="请输入企业名称">
            </div>
            <div class="form-group col-md-4">
              <label>工厂类型</label>
              <select class="form-control" v-model="type">
                <option value="">请选择</option>
                <option v-for="(v,k) of plant_type" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label>审核状态</label>
              <select class="form-control" v-model="state">
                <option value="">请选择</option>
                <option v-for="(v,k) of Review_status" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-8">
              <label>区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域</label>
              <v-area :code="areaCode" :onAreaChanged="(code) => liveAddress = code"></v-area>
            </div>
            <div class="form-group col-md-8">
              <button type="button" class="btn btn-primary" @click="search">搜索</button>
              <button type="button" class="btn btn-primary" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <h4>工厂列表</h4>
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
  import area from '@/components/area';
  import { formatDate } from '@/config/utils';
  import { PLATFORM_FACTORY_QUERY, PLATFORM_FACTORY_QUERY_COUNT } from '@/config/env';

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
          state: null,
          name: null,
          type: null,
          areaCode: null,
          page: 1,
          rows: 20,
        },
        name: null,
        type: '',
        state: '',
        areaCode: null,
        plant_type: {
          1: '生产工厂',
          2: '赋码工厂',
        },
        Review_status: {
          pending: '待审核',
          passed: '通过审核',
          failed: '未通过审核',
          draft: '待提交',
        },
        typeObj: {
          1: '生产工厂',
          2: '赋码工厂',
        },
        stateObj: {
          pending: '待审核',
          passed: '通过审核',
          failed: '未通过审核',
          draft: '待提交',
        },
        liveAddress: '',
        dataUrl: PLATFORM_FACTORY_QUERY,
        countUrl: PLATFORM_FACTORY_QUERY_COUNT,
        columns: [{ field: 'id', header: '序号', sort: 'id', width: 100 },
          { field: 'name', header: '工厂名称', sort: 'name', width: 200 },
          {
            field: 'type',
            header: '工厂类型',
            width: 200,
            formatter: row => this.typeObj[row.type],
          },
          {
            field: 'state',
            header: '状态',
            width: 100,
            formatter: row => this.stateObj[row.state],
          },
          { field: 'phone', header: '工厂电话', width: 120 },
          { field: 'areaCode', header: '地址', width: 300 },
          {
            field: 'createTime',
            header: '创建时间',
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
              text: '【工厂详情】',
              show() {
                return true;
              },
              handler: (row) => {
                this.$router.push(`/factory/list/view/${row.id}`);
              },
            }],
          },
        ],
      };
    },
    components: {
      'v-datagrid': datagrid,
      'v-area': area,
    },
    methods: {
      search() {
        this.datagridParams = {
          state: this.state || null,
          name: this.name || null,
          type: this.type || null,
          areaCode: this.liveAddress || null,
          page: 1,
          rows: 20,
        };
      },
      clear() {
        this.areaCode = '';
        setTimeout(() => { this.areaCode = null; }, 10);
        this.state = '';
        this.name = null;
        this.type = '';
        this.datagridParams = {};
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>
