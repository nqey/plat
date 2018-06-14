<template>
  <div class="content">
    <div class="content_con">
      <div class="clearfix">
      <div class="pull-left">
        <p class="titstyle">筛选条件</p>
      </div>
    </div>
    <!--筛选条件-->
    <div class="filters datagrid-filter">
      <div class="form-inline">
        <div class="row clearfix">
            <div class="form-group col-md-4">
              <label>工厂名称</label>
              <select class="form-control" v-model="factoryName">
                <option value="">请选择</option>
                <option v-for="item in list" value="id">{{item.text}}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label>二维码类型</label>
              <select class="form-control" v-model="type">
                <option value="">请选择</option>
                <option v-for="(v,k) of typeObj" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label>二维码编号</label>
              <input type="text" class="form-control" v-model="code" value="" placeholder="请输入二维码编号">
            </div>
            <div class="form-group col-md-4">
              <label>扫描次数</label>
              <input type="text" class="form-control" v-model="scanTimes" value="" placeholder="请输入扫描次数">
            </div>
            <div class="form-group col-md-4">
              <label>二维码状态</label>
              <select class="form-control" v-model="state">
                <option value="">请选择</option>
                <option v-for="(v,k) of stateObj" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="search btn-primary btn datagrid-search" @click="search">
                <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="reset" class="search clear btn-primary btn datagrid-clear" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <div class="datagrid-title">
         <p>二维码列表</p>
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
  import { formatDate } from '@/config/utils';
  import { PLATFORM_STATISTICAL_CODE_QUERY, PLATFORM_STATISTICAL_CODE_QUERY_COUNT, PLATFORM_FACTORY_USABLE } from '@/config/env';

  export default {
    name: 'index',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        list: '',
        datagridParams: {
          factoryName: '',
          type: '',
          code: null,
          scanTimes: null,
          state: '',
        },
        stateObj: {
          normal: '正常',
          highRisk: '异常',
        },
        typeObj: {
          1: '数据一物一码',
          2: '图像一物一码',
          3: '普通图像',
        },
        factoryName: '',
        type: '',
        code: null,
        scanTimes: null,
        state: '',
        dataUrl: PLATFORM_STATISTICAL_CODE_QUERY,
        countUrl: PLATFORM_STATISTICAL_CODE_QUERY_COUNT,
        toolbar: [{
          title: '二维码列表',
          handler() {
            window.console.log('二维码列表');
          },
        }],
        checkable: true,
        columns: [{ field: 'code', header: '二维码编号', width: 200 },
          {
            field: 'type',
            header: '类型',
            sort: 'name',
            width: 220,
            formatter: row => this.typeObj[row.type],
          },
          { field: 'goodsName', header: '商品名称', sort: 'name', width: 220 },
          { field: 'enterpriseName', header: '所属企业', width: 400 },
          { field: 'factoryName', header: '赋码工厂', width: 300 },
          {
            field: 'factoryTime',
            header: '生产时间',
            sort: 'create_time',
            width: 200,
            formatter(row, index, value) {
              return value && formatDate(value);
            },
          },
          { field: 'franchiserName', header: '经销商', width: 300 },
          { field: 'scanTimes', header: '扫描次数', width: 150 },
          {
            field: 'state',
            header: '状态',
            width: 100,
            html: true,
            formatter: (row) => {
              if (this.stateObj[row.state] === '正常') {
                return `${this.stateObj[row.state]}`;
              }
              return `<span style='color:red'>${this.stateObj[row.state]}</span><a>(查看详情)</a>`;
            },
          },
          {
            field: 'action',
            header: '详情',
            width: 120,
            actions: [{
              text: '【查看】',
              show() {
                return true;
              },
              handler: () => this.$router.push('/code/list/log'),
            }],
          },
        ],
      };
    },
    components: {
      'v-datagrid': datagrid,
    },
    mounted() {
      this.getData();
    },
    methods: {
      search() {
        this.datagridParams = {
          factoryName: this.factoryName || '',
          type: this.type || '',
          code: this.code || null,
          scanTimes: this.scanTimes || null,
          state: this.state || '',
        };
      },
      clear() {
        this.factoryName = '';
        this.type = '';
        this.code = null;
        this.scanTimes = null;
        this.state = '';
        this.datagridParams = {};
      },
      async getData() {
        const param = {
          type: '2',
        };
        const res = await this.$http.get(PLATFORM_FACTORY_USABLE, param);
        if (res.success) {
          this.list = res.data;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

img {
  max-width: 100%;
}
ul li {
  list-style-type: none;
}
.filters {
  padding: 40px 0;
  border-radius: 0 0 4px 4px;
  margin-bottom: 20px;
  width: 85%;
}
.filters .form-group {
  margin: 10px 0 !important;
  border-radius: 4px;
}
.form-group {
  margin: 25px 0;
  border-radius: 4px;
}
.form-control {
  margin-bottom: 5px;
}
.btn {
  margin-right: 30px;
  outline: none;
  color: #fff;
}
.btn {
  min-width: 137px;
  background: #337CFD;
  color: #fff;
}
select {
  background-color: #fff;
  height: 30px;
  line-height: 30px;
  padding: 4px 6px;
  color: #666666;
  border-radius: 3px;
  outline: none;
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
h1 a {
  display: block;
  height: 50px;
  /* width: 398px; */
  margin: auto;
  overflow: hidden;
  color: #fff;
  font-size: 30px;
  /* font-weight: normal; */
  text-align: center;
  text-decoration: none; /* line-height: 50px; */
}
.placeholder {
  color: #999;
}
a:hover {
  color: #33a8ff;
}
.btn-primary {
  background: #327BFB;
}
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
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 0 3px;
  outline: none;
  height: 34px;
}
.btn {
  padding: 5px 25px;
  margin: 0 3px;
  outline: none;
}
.search, .clear {
  padding: 7px 20px;
}
.search span {
  margin-right: 10px;
}
.btn-primary:hover {
  background: #3171e2;
  border-color: #3171e2;
}
.form-inline {
  margin-bottom: 20px;
}
.form-inline .form-control {
  min-width: 200px;
}
.form-inline label {
  margin-right: 10px;
}
.datagrid-title{
  margin-top: 50px;
}

</style>