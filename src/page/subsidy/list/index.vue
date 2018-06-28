<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>补贴明细</h4>
      <hr/>
      <v-datagrid :columns="columns" :data-url="dataUrl" :count-url="countUrl"/>
      <br/>
      <br/>
      <button type="button" class="btn" onclick="history.back(-1);">返回上一页
        <span class="glyphicon glyphicon-share-alt"></span>
      </button>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { PLATFORM_SUBSIDY_PROVINCE_DETAIL_QUERY, PLATFORM_SUBSIDY_PROVINCE_DETAIL_COUNT } from '@/config/env';
  import { SUBSIDY_FEE_TYPE } from '@/config/mapping';

  export default {
    name: 'subsidyList',
    data() {
      return {
        dataUrl: PLATFORM_SUBSIDY_PROVINCE_DETAIL_QUERY,
        countUrl: PLATFORM_SUBSIDY_PROVINCE_DETAIL_COUNT,
        columns: [{ field: 'enterpriseName', header: '企业名称', sort: 'name', width: 400 },
          {
            field: 'type',
            header: '补贴类型',
            width: 300,
            formatter: row => SUBSIDY_FEE_TYPE[row.type],
          },
          { field: 'paidQuantity', header: '补贴数量', width: 300 },
          { field: 'amount', header: '补贴金额', width: 300 },
        ],
      };
    },
    components: {
      'v-datagrid': datagrid,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';
</style>
