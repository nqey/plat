<template>
  <div class="content">
    <div class="content_con">
      <div class="clearfix">
        <div class="pull-left">
          <p class="header">筛选条件</p>
        </div>
      </div>
      <!--筛选条件-->
      <div class="filters datagrid-filter">
        <div class="form-inline row clearfix">
          <div class="form-group col-md-4">
            <label >投诉人</label>
            <input type="text" class="form-control" v-model="name" placeholder="请输入投诉人姓名">
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
        <div id="authofficer-list-datagrid" class="Datagrid">
          <div class="datagrid-title">
            <p class="font">投诉列表</p>
          </div>
          <v-datagrid :columns="columns"
                      :data-url="dataUrl"
                      :count-url="countUrl"
                      :params="datagridParams">
          </v-datagrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { formatDate } from '@/config/utils';
  import { PLATFORM_COMPLAINT_LISTING, PLATFORM_COMPLAINT_COUNT } from '@/config/env';

  export default {
    name: '',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        stateObj: {
          1: '待处理',
          2: '已处理',
          3: '已关闭',
        },
        datagridParams: {
          name: null,
        },
        name: null,
        dataUrl: PLATFORM_COMPLAINT_LISTING,
        countUrl: PLATFORM_COMPLAINT_COUNT,
        columns: [{ field: 'name', header: '投诉人', sort: 'id', width: 250 },
          { field: 'cellphone', header: '电话', sort: 'name', width: 250 },
          {
            field: 'createTime',
            header: '提交时间',
            sort: 'create_time',
            width: 250,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          { field: 'waiterName', header: '处理人', width: 250 },
          {
            field: 'state',
            header: '状态',
            width: 250,
            formatter: row => this.stateObj[row.state],
          },
          {
            field: 'action',
            header: '编辑',
            width: 250,
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
    },
    methods: {
      search() {
        this.datagridParams = {
          name: this.name || null,
          page: 1,
          rows: 20,
        };
      },
      clear() {
        this.name = null;
        this.datagridParams = {};
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.header{
  font-size: 26px;
  margin: 30px 0;
}
.font{
  font-size: 18px;
  margin: 30px 0 10px 0;
}
.btn{
  width: 150px;
}

</style>