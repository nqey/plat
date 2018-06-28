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
              <input type="text" class="form-control" v-model="filter.name" placeholder="请输入企业名称">
            </div>
            <div class="form-group col-md-4">
              <label>工厂类型</label>
              <select class="form-control" v-model="filter.type">
                <option value="">请选择</option>
                <option v-for="(v,k) of plant_type" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label>区&#12288;&#12288;域</label>
              <v-area :code="filter.areaCode" :onAreaChanged="(code) => filter.areaCode = code"></v-area>
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="search btn-primary btn" @click="search">搜索</button>
              <button type="reset" class="search clear btn-primary btn" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <h4>待审核列表</h4>
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
  import area from '@/components/area';
  import { formatDate, reomveBlank } from '@/config/utils';
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
        filter: {
          name: null,
          type: '',
          areaCode: '',
        },
        params: {
          states: 'pending',
        },
        name: null,
        type: '',
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
        toolbar: [{
          title: '工厂列表',
          handler() {
            window.console.log('工厂列表');
          },
        }],
        checkable: true,
        columns: [{ field: 'id', header: '序号', sort: 'id', width: 100 },
          { field: 'name', header: '工厂名称', sort: 'name', width: 200 },
          {
            field: 'type',
            header: '工厂类型',
            width: 100,
            formatter: row => this.typeObj[row.type],
          },
          {
            field: 'state',
            header: '状态',
            width: 150,
            formatter: row => this.stateObj[row.state],
          },
          {
            field: 'phone',
            header: '工厂电话',
            width: 200,
            formatter(row) {
              return `${row.areaCode === undefined ? '' : `${row.areaCode}-`}${row.phone}${row.extendNumber === undefined ? '' : `(${row.extendNumber})`}`;
            },
          },
          {
            field: 'areaCode',
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
            width: 180,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'action',
            header: '操作',
            width: 150,
            actions: [{
              text: '【审核】',
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
        this.params = reomveBlank(this.filter);
        this.params = {
          states: 'pending',
        };
      },
      clear() {
        this.params = {
          states: 'pending',
        };
        this.filter = {
          type: '',
          areaCode: '',
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>
