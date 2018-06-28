<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <div class="text-right">
        <button class="btn" onclick="history.back(-1);">返回上一页<span
          class="glyphicon glyphicon-share-alt"></span></button>
      </div>
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>二维码编号</label>
              <input type="text" class="form-control" v-model="filter.no" placeholder="请输入二维码编号">
            </div>
            <div class="form-group col-md-6">
              <label>扫码时间</label>
              <el-date-picker v-model="filter.createTimeGE" type="date" value-format="yyyy-MM-dd" placeholder="起始时间"/>
              <span class="text-center">至</span>
              <el-date-picker v-model="filter.createTimeLE" type="date" value-format="yyyy-MM-dd" placeholder="结束时间"/>
            </div>
            <div class="form-group col-md-4">
              <label>扫码位置</label>
              <input type="text" class="form-control" v-model="filter.address" placeholder="请输入负责人姓名">
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="btn btn-primary" @click="search"><span
                class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="reset" class="btn btn-primary" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <h4>扫码情况</h4>
      <hr/>
      <v-datagrid :columns="columns" :data-url="dataUrl" :count-url="countUrl" :params="params"/>
    </div>
  </div>
</template>


<script>
  import { formatDate, reomveBlank } from '@/config/utils';
  import { PLATFORM_CODE_FRANCHISER_SCAN_QUERY, PLATFORM_CODE_FRANCHISER_SCAN_QUERY_COUNT } from '@/config/env';
  import { DatePicker } from 'element-ui';

  export default {
    name: 'franchiserScanHistory',
    data() {
      return {
        params: {},
        filter: {
          no: null,
          createTimeGE: null,
          createTimeLE: null,
          address: null,
        },
        dataUrl: PLATFORM_CODE_FRANCHISER_SCAN_QUERY,
        countUrl: PLATFORM_CODE_FRANCHISER_SCAN_QUERY_COUNT,
        columns: [{ field: 'franchiserName', header: '经销商', width: 300 },
          { field: 'charger', header: '操作人', width: 300 },
          { field: 'skuName', header: '扫码商品', width: 300 },
          { field: 'no', header: '二维码编号', sort: 'detail_id', width: 300 },
          { field: 'address', header: '扫码位置', sort: 'address', width: 300 },
          {
            field: 'createTime',
            header: '扫码时间',
            sort: 'create_time',
            width: 300,
            formatter(row, index, value) {
              return formatDate(value);
            },
          }],
      };
    },
    mounted() {
      this.search();
    },
    methods: {
      search() {
        this.params = Object.assign(reomveBlank(this.filter), { userId: this.$route.params.id });
      },
      clear() {
        this.filter = {};
        this.search();
      },
      back() {
        history.back(-1);
      },
    },
    components: {
      'v-datagrid': () => import('@/components/datagrid'),
      'el-date-picker': DatePicker,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';
</style>
