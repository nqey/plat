<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <!--筛选条件-->
      <div class="form-inline">
          <div class="form-group">
              <label>起始时间</label>
              <el-date-picker v-model="createTimeGE" type="date" placeholder="选择日期">
              </el-date-picker>
          </div>
          <div class="form-group">
              <label>结束时间</label>
              <el-date-picker v-model="createTimeLE" type="date" placeholder="选择日期">
              </el-date-picker>
          </div>
          <div class="form-group">
              <label>标题</label>
              <input type="text" class="form-control" v-model="title" placeholder="请输入标题">
          </div>
          <div class="form-group">
              <label>公告所属</label>
              <select class="form-control" v-model="type">
                <option v-for="(v, k) of typeObj" :value="k">{{v}}</option>
              </select>
          </div>
          <div class="form-group">
              <button type="button" class="btn btn-primary" @click="search">
                  <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="reset" class="btn btn-primary" @click="clear">清空</button>
          </div>
      </div>
      <br/>
      <br/>
      <h4>公告列表</h4>
      <hr>
      <v-datagrid :columns="columns" :data-url="dataUrl" :count-url="countUrl" :params="datagridParams" />
    </div>
  </div>
</template>

<script>
// import pagination from '@/components/pagination';
import { PUBLICS_NOTICES_LISTING, PUBLICS_NOTICES_COUNTS } from '@/config/env';
import { formatDate } from '@/config/utils';
import datagrid from '@/components/datagrid';
import { DatePicker } from 'element-ui';

export default {
  name: 'sysmsglist',
  props: {
    value: {
      type: String,
    },
  },
  components: {
    'v-datagrid': datagrid,
    'el-date-picker': DatePicker,
  },
  data() {
    return {
      typeObj: {
        null: '请选择',
        authOfficer: '认证官系统',
        declare: '申报系统',
        enterprise: '企业平台系统',
      },
      datagridParams: {
        type: null,
      },
      createTimeGE: null,
      createTimeLE: null,
      title: null,
      type: null,
      page: 1,
      rows: 10,
      pages: 0,
      news: [],
      dataUrl: PUBLICS_NOTICES_LISTING,
      countUrl: PUBLICS_NOTICES_COUNTS,
      columns: [
        {
          field: 'title',
          header: '标题',
          sort: 'title',
          // width: 200,
          formatter(row, index, value) {
            return value;
          },
        },
        {
          field: 'showDate',
          header: '发布时间',
          sort: 'modify_time',
          // width: 120,
          formatter(row, index, value) {
            return value;
          },
        },
        {
          field: 'type',
          header: '公告所属',
          sort: 'type',
          // width: 120,
          formatter: row => this.typeObj[row.type],
        },
        {
          field: 'action',
          header: '操作',
          // width: 120,
          actions: [{
            // 显示内容，可以写html代码
            text: '【查看】',
            // return true 表示这个按钮要显示，否则不显示
            show() {
              return true;
            },
            // 处理器，参数：row-当前行数据，index当前行所属数据的第几行
            handler: (row) => {
              this.$router.push(`/message/detail/${row.id}`);
            },
          },
          {
            // 显示内容，可以写html代码
            text: '【修改】',
            // return true 表示这个按钮要显示，否则不显示
            show() {
              return true;
            },
            // 处理器，参数：row-当前行数据，index当前行所属数据的第几行
            handler: (row) => {
              this.$router.push(`/message/create/${row.id}`);
            },
          }],
        },
      ],
    };
  },
  methods: {
    search() {
      this.datagridParams = {
        createTimeGE: this.createTimeGE ? formatDate(this.createTimeGE, 'yyyy-MM-dd') : null,
        createTimeLE: this.createTimeLE ? formatDate(this.createTimeLE, 'yyyy-MM-dd') : null,
        title: this.title,
        type: this.type,
      };
    },
    clear() {
      this.title = null;
      this.createTimeGE = null;
      this.createTimeLE = null;
      this.type = null;
      this.datagridParams = {};
    },
  },
  mounted() {
    this.search();
  },
};
</script>

<style lang="scss" scoped>
.t_nav {
  border-left: #4786ff solid 3px;
  font-size: 18px;
}
a {
  text-decoration: none;
}
.news {
  height: 80px;
  line-height: 80px;
  position: relative;
  list-style-type: disc;
  margin-left: 15px;
  a{
    font-size: 16px;
    color: #505050;
  }
}
.news_new {
  background-color: #fdc5d0;color: #fa607e;font-weight: bold;    font-size: 0.1em;
    padding: 1px 3px;
    border-radius: 2px;
    margin-left: 15px;
}
.news_time {
  position: absolute;right: 0;    color: #888888;
    font-size: 12px;
}
</style>
