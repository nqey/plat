<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <div class="clearfix">
        <div class="pull-left">
          <h4 class="titstyle">筛选条件</h4>
        </div>
        <div class="pull-right">
          <a class="btn btn-primary" href="javascript:history.back(-1);">返回上一页<span class="glyphicon glyphicon-share-alt"></span>
          </a>
        </div>
      </div>
      <hr/>
      <br/>
      <br/>
      <div class="form-inline">
        <div class="form-group">
          <label>二维码编号：</label>
          <input type="text" class="form-control" v-model="authCode" placeholder="请输入经销商授权码">
        </div>
        <div class="form-group">
          <label>扫码时间：</label>
          <input type="text" class="form-control" v-model="name" placeholder="请输入经销商名称">
        </div>
        <div class="form-group">
          <label>扫码位置：</label>
          <input type="text" class="form-control" v-model="charger" placeholder="请输入负责人姓名">
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-search"></span>搜索</button>
          <button type="reset" class="btn btn-primary">清空</button>
        </div>
      </div>
      <br/>
      <br/>
      <h4>扫码情况</h4>
      <hr/>
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
  import { PLATFORM_CODE_FRANCHISER_SCAN_QUERY, PLATFORM_CODE_FRANCHISER_SCAN_QUERY_COUNT } from '@/config/env';

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
          userId: this.$route.params.id,
          page: 1,
          rows: 20,
        },
        status: {
          0: '',
          pending: '待审核',
          delayed: '延后',
          rejected: '未通过',
          passed: '通过',
        },
        authCode: null,
        name: null,
        charger: null,
        dataUrl: PLATFORM_CODE_FRANCHISER_SCAN_QUERY,
        countUrl: PLATFORM_CODE_FRANCHISER_SCAN_QUERY_COUNT,
        columns: [{ field: 'franchiserName', header: '经销商', width: 300 },
          { field: 'charger', header: '操作人', sort: 'name', width: 300 },
          { field: 'skuName', header: '扫码商品', width: 300 },
          { field: 'no', header: '二维码编号', width: 300 },
          { field: 'address', header: '扫码位置', width: 300 },
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
</style>