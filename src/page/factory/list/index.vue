<template>
  <div class="content">
    <div class="content_con">
      <p class="titstyle">筛选条件</p>
      <div class="filters">
        <div class="form-inline">
          <div class="form-group">
            <label>工厂名称</label>
            <input type="text" class="form-control" v-model="name" placeholder="请输入企业名称">
          </div>
          <div class="form-group">
            <label>工厂类型</label>
            <select class="form-control" v-model="type">
              <option value="">请选择</option>
              <option v-for="(v,k) of plant_type" :value="k">{{v}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>审核状态</label>
            <select class="form-control" v-model="state">
              <option value="">请选择</option>
              <option v-for="(v,k) of Review_status" :value="k">{{v}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>区域</label>
            <v-area :areacode="areaCode" @acceptData="setLiveAddress"></v-area>
          </div>
          <div class="bolck">
            <div class="conter">
              <button type="button" class="search btn-primary btn" @click="search">搜索</button>
              <button type="reset" class="search clear btn-primary btn" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <div class="datagrid-title">
        <p>工厂列表</p>
      </div>
      <div class="datagrid-title">
        <v-datagrid :columns="columns"
                    :data-url="dataUrl"
                    :count-url="countUrl"
                    :params="datagridParams">
        </v-datagrid>
      </div>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import area from '@/components/area/area';
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
      setLiveAddress(d) {
        this.liveAddress = d;
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.titstyle {
  font-size: 18px;
  margin: 0;
  padding: 0;
}
.filters input {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 0 3px;
  outline: none;
}
.filters select {
  width: 165px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 0 3px;
  outline: none;
  height: 34px;
}
.filters {
  width: 100%;
  padding: 40px 0;
  border-radius: 0 0 4px 4px;
  margin-bottom: 20px;
  min-width: 70%;
}
.filters .form-group {
  margin: 10px 0 !important;
  border-radius: 4px;
}
.form-inline {
  margin-bottom: 20px;}
.form-inline .form-control {
  min-width: 160px;
}
.bolck{
  width: 100%;
}
.conter{
  width: 260px;
}
.form-group {
  margin: 25px 0;
  border-radius: 4px;
}

.form-group label{
  width: 80px;
  text-align: right;
}
.form-control {
  margin-bottom: 5px;
  min-width: 200px;
}
.search, .clear {
  padding: 7px 20px;
}
.search span {
  margin-right: 10px;
}
.btn-primary {
  background: #327BFB;
}
.btn-primary:hover {
  background: #3171e2;
  border-color: #3171e2;
}
.btn {
  margin: 0 auto;
  width: 120px;
  outline: none;
  color: #fff;
  background: #337CFD;
  padding: 5px 25px;
  margin: 50px 3px 0 3px;
  outline: none;
}
.datagrid-title {
  padding-bottom: 15px;
}
.datagrid-title p, .titstyle {
  font-size: 18px;
  margin: 0;
  padding: 0;
}
.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
  vertical-align: inherit;
}

input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189);
    background-image: none;
    color: rgb(0, 0, 0);
}

@media (max-width: 1480px){
.search, .clear{ margin-top:22px;}
}

</style>