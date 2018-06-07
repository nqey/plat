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
                <div class="form-inline row clearfix">
                    <div class="form-group col-md-4">
                        <label>姓名</label>
                        <input type="text" class="form-control" name="name" placeholder="请输入经销商名称">
                    </div>
                    <div class="form-group col-md-4">
                        <label>手机号码</label>
                        <input type="text" class="form-control" name="cellphone" placeholder="请输入手机号码">
                    </div>
                    <div class="form-group col-md-4">
                        <label>机构</label>
                        <input type="text" class="form-control" name="organiz" placeholder="请输入隶属机构">
                    </div>
                    <div class="form-group col-md-4">
                        <button type="button" class="search btn-primary btn datagrid-search">
                            <span class="glyphicon glyphicon-search"></span>搜索
                        </button>
                        <button type="reset" class="search clear btn-primary btn datagrid-clear">清空</button>
                    </div>
                </div>
               </div>
              <!--列表详情-->
              <div class="main_left_section_content">
                  <div id="authofficer-list-datagrid" class="Datagrid">

              <div class="datagrid-title">
              <p>认证官列表</p>
              </div>

              <div class="datagrid-title">
              <v-datagrid :toolbar="toolbar" :columns="columns" :checkable="checkable"
                  :data-url="dataUrl" :count-url="countUrl" :load-data="data"></v-datagrid>
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
        data: [{
          name: '王麻子',
          tel: '13588888888',
          center: '四川省服务中心',
          code: '通过',
          createTime: '2018-04-25',
          editor: '',
        },
        {
          name: '张三',
          tel: '13588888888',
          center: '四川省服务中心',
          code: '不通过',
          createTime: '2018-04-25',
          editor: '',
        }],
        dataUrl: '',
        countUrl: '',
        toolbar: [{
          title: '添加认证官',
          handler() {
            window.console.log('添加认证官');
          },
        }],
        checkable: true,
        columns: [{ field: 'name', header: '姓名', sort: 'name', width: 260 },
          { field: 'tel', header: '联系电话', width: 260 },
          { field: 'center', header: '服务中心', width: 260 },
          {
            field: 'createTime',
            header: '提交时间',
            sort: 'create_time',
            width: 260,
            formatter(row, index, value) {
              return new Date(value).toUTCString();
            },
          },
          { field: 'code', header: '状态', width: 260 },
          {
            field: 'editor',
            header: '编辑',
            width: 150,
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
      handler() {

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
.tab-nav {
  border-bottom: 2px solid #EDF2F5;
  margin: 0;
}
.filters .form-group {
  margin: 10px 0 !important;
  border-radius: 4px;
}
.form-group {
  margin: 25px 0;
  border-radius: 4px;
}
.btn {
  margin-right: 30px;
  /*width: 100px;*/
  outline: none;
  color: #fff;
}
.bcgg {
  padding: 40px;
}
.bcgg .btn {
  min-width: 180px;
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
.datagrid-title {
  padding-bottom: 15px;
}
.datagrid-title p, .titstyle {
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