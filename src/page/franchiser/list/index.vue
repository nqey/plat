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
            <label>授权码</label>
            <input type="text" class="form-control" name="authCode" placeholder="请输入经销商授权码">
        </div>
        <div class="form-group col-md-4">
            <label>名称</label>
            <input type="text" class="form-control" name="name" placeholder="请输入经销商名称">
        </div>
        <div class="form-group col-md-4">
            <label>负责人</label>
            <input type="text" class="form-control" name="charger" placeholder="请输入负责人姓名">
        </div>
        <div class="form-group col-md-4">
            <label>电话号码</label>
            <input type="text" class="form-control" name="cellphone" placeholder="请输入负责人手机号码">
        </div>
        <div class="form-group col-md-6">
            <label>按地区查找</label>

        </div>
        <div class="form-group col-md-4">
            <button type="button" class="search btn-primary btn datagrid-search" @click="search">
                <span class="glyphicon glyphicon-search"></span>搜索
            </button>
            <button type="reset" class="search clear btn-primary btn datagrid-clear" @click="clear">清空</button>
        </div>
    </div>
</div>

<!--列表详情-->
<div class="main_left_section_content">
       <div id="franchiser-list-datagrid" class="Datagrid">
        <div class="datagrid-title">
           <p>经销商列表</p>
        </div>
          <div class="datagrid-title">
              <v-datagrid :columns="columns"
                          :data-url="dataUrl"
                          :count-url="countUrl"
                          >
              </v-datagrid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { PLATFORM_FRANCHISER_QUERY, PLATFORM_FRANCHISER_QUERY_COUNT } from '@/config/env';

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
        dataUrl: PLATFORM_FRANCHISER_QUERY,
        countUrl: PLATFORM_FRANCHISER_QUERY_COUNT,
        columns: [{ field: 'id', header: '二维码编号', width: 200 },
          { field: 'name', header: '经销商名称', width: 260 },
          { field: 'state', header: '状态', width: 180 },
          { field: 'charger', header: '负责人', width: 120 },
          { field: 'cellphone', header: '手机号码', width: 100 },
          { field: 'areaCode', header: '营业地址', width: 400 },
          { field: 'skuList', header: '授权商品', width: 180, height: 100 },
          { field: 'authorized_account', header: '授权账号', width: 150 },
          {
            field: 'sweep_code',
            header: '扫码情况',
            width: 150,
            actions: [{
              text: '【查看】',
              show() {
                return true;
              },
              handler: (row) => {
                this.$router.push(`/factory/pending/view/${row.id}`);
              },
            }],
          },
          {
            field: 'action',
            header: '操作',
            width: 200,
            actions: [{
              text: '【查看】',
              show() {
                return true;
              },
              handler: (row) => {
                this.$router.push(`/factory/pending/view/${row.id}`);
              },
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
          type: this.type || null,
          areaCode: this.liveAddress || null,
          page: 1,
          rows: 20,
        };
      },
      clear() {
        this.areaCode = '';
        setTimeout(() => { this.areaCode = null; }, 10);
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