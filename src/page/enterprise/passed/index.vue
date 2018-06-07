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
            <div class="form-group col-md-3">
                <label>企业名称</label>
                <input type="text" class="form-control" v-model="name" placeholder="请输入企业名称">
            </div>
            <div class="form-group col-md-3">
                <label>入库时间</label>
                <el-date-picker v-model="createTimeGE" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="form-group col-md-6">
                <label>区域</label>
                <v-area :areacode="areaCode" @acceptData="setLiveAddress"></v-area>
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
<div class="main_left_section_content">
    <div id="enterprise-passed-datagrid" class="Datagrid">
         <div class="datagrid-title">
            <v-datagrid :columns="columns"
                        :data-url="dataUrl" 
                        :count-url="countUrl"
                        :params="datagridParams">
            </v-datagrid>
          </div>


    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import area from '@/components/area/area';
  import { DatePicker } from 'element-ui';
  import { formatDate } from '@/config/utils';
  import { PLATFORM_EP_QUERY_PASSED, PLATFORM_EP_QUERY_PASSED_COUNT } from '@/config/env';

  export default {
    name: '',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        datagridParams: {
          states: 'passed',
          name: null,
          areaCode: null,
          createTimeGE: null,
          page: 1,
          rows: 20,
        },
        name: null,
        areaCode: null,
        createTimeGE: null,
        state: 0,
        dataUrl: PLATFORM_EP_QUERY_PASSED,
        countUrl: PLATFORM_EP_QUERY_PASSED_COUNT,
        columns: [{ field: 'id', header: '企业ID', sort: 'name', width: 200 },
          { field: 'name', header: '企业名称', width: 250 },
          {
            field: 'address',
            header: '地址',
            width: 200,
          },
          { field: 'goodsCount', header: '商品(个)', width: 120 },
          { field: 'factoryCount', header: '工厂(个)', width: 120 },
          { field: 'franchiserCount', header: '经销商(个)', width: 120 },
          { field: 'codeCount', header: '二维码使用(个)', width: 180 },
          { field: 'paidAmount', header: '补贴金额(元)', width: 150 },
          {
            field: 'createTime',
            header: '入库时间',
            sort: 'create_time',
            width: 130,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'action',
            header: '操作',
            width: 200,
            actions: [{
              text: '【修改二维码数量】',
              show() {
                return true;
              },
              handler: (row) => {
                this.$router.push(`/enterprise/passed/view/${row.id}`);
              },
            }],
          },
        ],
      };
    },
    components: {
      'v-datagrid': datagrid,
      'el-date-picker': DatePicker,
      'v-area': area,
    },
    methods: {
      search() {
        this.datagridParams = {
          states: 'passed',
          name: this.name || null,
          areaCode: this.liveAddress || null,
          createTimeGE: this.createTimeGE ? formatDate(this.createTimeGE, 'yyyy-MM-dd') : null,
          page: 1,
          rows: 20,
        };
      },
      clear() {
        this.areaCode = null;
        setTimeout(() => { this.areaCode = null; }, 10);
        this.name = null;
        this.createTimeGE = null;
        this.datagridParams = {
          states: 'passed',
        };
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
.filters {
  margin: 10px 0 !important;
  border-radius: 4px;
}
.content_con {
  margin: 25px 0;
  border-radius: 4px;
}
.btn {
  min-width: 120px;
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
  margin: 30px 3px;
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