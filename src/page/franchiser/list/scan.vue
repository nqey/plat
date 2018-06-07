<template>
  <div class="content">
    <div class="content_con">
<div class="main_left_content">
  <div class="clearfix">
    <div class="pull-left">
      <p class="titstyle">筛选条件</p>
    </div>
    <div class="pull-right">
      <a class="btn btn-primary" href="javascript:history.back(-1);">返回上一页<span class="glyphicon glyphicon-share-alt"></span></a>
    </div>
  </div>
  <div class="filters datagrid-filter">
    <div class="form-inline row clearfix">
      <div class="form-group col-md-4">
        <label>二维码编号：</label>
        <input type="text" class="form-control" name="authCode" placeholder="请输入经销商授权码">
      </div>
      <div class="form-group col-md-4">
        <label>扫码时间：</label>
        <input type="text" class="form-control" name="name" placeholder="请输入经销商名称">
      </div>
      <div class="form-group col-md-4">
        <label>扫码位置：</label>
        <input type="text" class="form-control" name="charger" placeholder="请输入负责人姓名">
      </div>
      <div class="form-group col-md-4">
        <button type="button" class="search btn-primary btn datagrid-search"> <span class="glyphicon glyphicon-search"></span>搜索 </button>
        <button type="reset" class="search clear btn-primary btn datagrid-clear">清空</button>
      </div>
    </div>
  </div>
  <div class="main_left_content_section_tit clearfix">
<div class="datagrid-title">
              <v-datagrid :toolbar="toolbar" :columns="columns" :checkable="checkable"
                  :data-url="dataUrl" :count-url="countUrl" :load-data="data"></v-datagrid>
               </div>
       </div>
    </div>
  </div>
</div>
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
          sstel: '山东济南蓝翔技工',
          people: '张三',
          smcs: '',
          number: 'l3mcm9G_sAm0661n5AiXsQ',
          factory: '碧龙春赋码工厂',
          createTime: '2018-04-25',
        },
        {
          sstel: '山东济南蓝翔技工',
          people: '张三',
          smcs: '',
          number: 'l3mcm9G_sAm0661n5AiXsQ',
          factory: '碧龙春赋码工厂',
          createTime: '2018-04-25',
        }],
        dataUrl: '',
        countUrl: '',
        toolbar: [{
          title: '扫码情况',
          handler() {
            window.console.log('扫码情况');
          },
        }],
        checkable: true,
        columns: [{ field: 'sstel', header: '经销商', width: 300 },
          { field: 'people', header: '操作人', sort: 'name', width: 300 },
          { field: 'smcs', header: '扫码商品', width: 300 },
          { field: 'number', header: '二维码编号', width: 300 },
          { field: 'factory', header: '扫码位置', width: 300 },
          {
            field: 'createTime',
            header: '扫码时间',
            sort: 'create_time',
            width: 300,
            formatter(row, index, value) {
              return new Date(value).toUTCString();
            },
          }],
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
	min-width: 100px;
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

</style>