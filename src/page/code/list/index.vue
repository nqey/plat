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
              <select class="form-control" name="type">
                <option value="">请选择</option>
                <option value="1">四川食品赋码有限公司</option>
                <option value="1">潍坊鑫汇彩印包装厂</option>
                <option value="2">特供酒赋码工厂</option>
                <option value="3">碧龙春赋码工厂</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label>二维码类型</label>
              <select class="form-control" name="type">
                <option value="">请选择</option>
                <option value="1">数据一物一码</option>
                <option value="2">图像一物一码</option>
                <option value="3">普通图像</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label>二维码编号</label>
              <input type="text" class="form-control" name="code" value="" placeholder="请输入二维码编号">
            </div>
            <div class="form-group col-md-4">
              <label>扫描次数</label>
              <input type="text" class="form-control" name="scanTimes" value="" placeholder="请输入扫描次数">
            </div>
            <div class="form-group col-md-4">
              <label>二维码状态</label>
              <select class="form-control" name="state">
                <option value="">请选择</option>
                <option value="normal">正常</option>
                <option value="highRisk">异常</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="search btn-primary btn datagrid-search">
                <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="reset" class="search clear btn-primary btn datagrid-clear">清空</button>
            </div>
          </div>
        </div>
      </div>
          <div class="datagrid-title">
            <v-datagrid :toolbar="toolbar" :columns="columns" :checkable="checkable"
                  :data-url="dataUrl" :count-url="countUrl" :load-data="data"></v-datagrid>
          </div>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';

  export default {
    name: 'index',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        amountObj: {},
        status: {
          0: '',
          pending: '待审核',
          delayed: '延后',
          rejected: '未通过',
          passed: '通过',
        },
        state: 0,
        data: [{
          number: 'l3mcm9G_sAm0661n5AiXsQ',
          type: '图像一物一码',
          name: '━(*｀∀´*)ノ亻!',
          responsibilities: '李银测试使用诸城市碧龙春茶业有限公司',
          factory: '碧龙春赋码工厂',
          createTime: '2018-04-25',
          sstel: '山东济南蓝翔技工',
          smcs: '20',
          code: '正常',
          category: '查看',
        },
        {
          number: 'l3mcm9G_sAm0661n5AiXsQ',
          type: '图像一物一码',
          name: '━(*｀∀´*)ノ亻!',
          responsibilities: '李银测试使用诸城市碧龙春茶业有限公司',
          factory: '碧龙春赋码工厂',
          createTime: '2018-04-25',
          sstel: '山东济南蓝翔技工',
          smcs: '20',
          code: '正常',
          category: '查看',
        }],
        dataUrl: '',
        countUrl: '',
        toolbar: [{
          title: '二维码列表',
          handler() {
            window.console.log('二维码列表');
          },
        }],
        checkable: true,
        columns: [{ field: 'number', header: '二维码编号', width: 200 },
          { field: 'type', header: '类型', sort: 'name', width: 220 },
          { field: 'name', header: '商品名称', sort: 'name', width: 220 },
          { field: 'responsibilities', header: '所属企业', width: 400 },
          { field: 'factory', header: '赋码工厂', width: 300 },
          {
            field: 'createTime',
            header: '生产时间',
            sort: 'create_time',
            width: 200,
            formatter(row, index, value) {
              return new Date(value).toUTCString();
            },
          },
          { field: 'sstel', header: '经销商', width: 300 },
          { field: 'smcs', header: '扫描次数', width: 150 },
          { field: 'code', header: '状态', width: 100 },
          { field: 'category', header: '详情', width: 100 }],
      };
    },
    components: {
      'v-datagrid': datagrid,
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        // const param = {
        //   param1: '',
        //   param2: '',
        //   param3: '',
        // };
        // const res = await this.$http.get(THE_TOTAL_ADDRESS, param);
        // if (res.success) {
        //   this.list = res.data;
        // }
        // 模拟请求的返回的数据
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