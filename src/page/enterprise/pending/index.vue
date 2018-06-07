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
        <div id="pending-list-filter">
          <div class="form-inline">
            <div class="row clearfix sssrk">
              <div class="form-group col-md-4">
                <label>企业名称</label>
                <input type="text" class="form-control" v-model="name" placeholder="请输入企业名称">
              </div>
              <div class="form-group col-md-4">
                <label>支付方式</label>
                <select class="form-control" v-model="payMethod">
                  <option value="">请选择</option>
                  <option v-for="(v, k) of payMethodObj" :value="k">{{v}}</option>
                </select>
              </div>
              <div class="form-group col-md-4">
                <label>支付状态</label>
                <select class="form-control" v-model="payState">
                  <option value="">请选择</option>
                  <option v-for="(v, k) of payStateObj" :value="k">{{v}}</option>
                </select>
              </div>
              <div class="form-group col-md-4">
                <label>创建时间</label>
                <el-date-picker v-model="createTimeGE" type="date" placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="form-group col-md-4">
                <button type="button" class="search btn-primary btn datagrid-search" @click="search">
                  <span class="glyphicon glyphicon-search"></span>搜索
                </button>
                <button type="reset" class="search clear btn-primary btn datagrid-clear" @click="clear">清空
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main_left_section_content">
        <div id="enterprise-pending-datagrid" class="Datagrid">
          <div class="datagrid-title">
            <p>初审列表</p>
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
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { DatePicker } from 'element-ui';
  import { formatDate, getPictureUrl } from '@/config/utils';
  import { PLATFORM_EP_QUERY, PLATFORM_EP_QUERY_COUNT } from '@/config/env';

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
          states: 'pending',
          name: null,
          payMethod: null,
          payState: null,
          createTimeGE: null,
          page: 1,
          rows: 20,
        },
        payMethod: '',
        payMethodObj: {
          alipayWeb: '支付宝',
          wechatpayQrcode: '微信',
          free: '全额补贴',
        },
        payState: '',
        payStateObj: {
          wait: '待支付',
          success: '支付成功',
          failed: '支付失败',
        },
        stateObj: {
          wait: '待支付',
          pending: '待初审',
          collectting: '待采',
          confirmFailed: '初审未通过',
          reject2: '采集未通',
          pending2: '待复审',
          confirm2Failed: '复审未通过',
          passed: '通过审',
        },
        amountObj: {},
        status: {
          0: '',
          pending: '待审核',
          delayed: '延后',
          rejected: '未通过',
          passed: '通过',
        },
        state: 0,
        name: null,
        createTimeGE: null,
        dataUrl: PLATFORM_EP_QUERY,
        countUrl: PLATFORM_EP_QUERY_COUNT,
        columns: [{ field: 'id', header: '企业ID', sort: 'name', width: 200 },
          {
            field: 'logo',
            header: 'logo',
            width: 100,
            html: true,
            formatter(row, index, value) {
              return `<img src='${getPictureUrl(value, { w: 40, h: 40, q: 40 })}'>`;
            },
          },
          { field: 'name', header: '企业名称', width: 250 },
          { field: 'chargerName', header: '负责人', width: 120 },
          { field: 'chargerCellphone', header: '企业账号', width: 200 },
          {
            field: 'payState',
            header: '支付状态',
            width: 130,
            formatter: row => this.payStateObj[row.payState],
          },
          {
            field: 'state',
            header: '状态',
            width: 200,
            formatter: row => this.stateObj[row.state],
          },
          {
            field: 'clicense',
            header: '营业执照',
            width: 130,
            html: true,
            formatter(row, index, value) {
              return `<img src='${getPictureUrl(value, { w: 40, h: 40, q: 40 })}'>`;
            },
          },
          {
            field: 'area',
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
            width: 150,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'action',
            header: '操作',
            width: 200,
            actions: [{
              text: '【查看详情】',
              show() {
                return true;
              },
              handler: (row) => {
                this.$router.push(`/enterprise/pending/view/${row.id}`);
              },
            }],
          },
        ],
      };
    },
    components: {
      'v-datagrid': datagrid,
      'el-date-picker': DatePicker,
    },
    methods: {
      search() {
        this.datagridParams = {
          states: 'pending',
          name: this.name || null,
          payMethod: this.payMethod || null,
          payState: this.payState || null,
          createTimeGE: this.createTimeGE ? formatDate(this.createTimeGE, 'yyyy-MM-dd') : null,
          page: 1,
          rows: 20,
        };
      },
      clear() {
        this.name = null;
        this.payMethod = '';
        this.payState = '';
        this.createTimeGE = null;
        this.datagridParams = {
          states: 'pending',
        };
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
  /*width: 100px;*/
  outline: none;
  color: #fff;
}
.btn {
  min-width: 130px;
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