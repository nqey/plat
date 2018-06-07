
<template>
  <div class="content">
          <div class="content_con">
              <div class="export">导出</div>
              <v-datagrid :toolbar="toolbar" :columns="columns" :checkable="checkable"
                  :data-url="dataUrl" :count-url="countUrl"></v-datagrid>
          </div>
      </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import pager from '@/components/pager';

  export default {
    name: 'user',
    data() {
      return {
        dataUrl: '',
        countUrl: '',
        toolbar: [{
          title: '查询',
          handler() {
            window.console.log('查询');
          },
        }],
        checkable: true,
        columns: [{ field: 'id', header: '交易号', sort: 'id', width: 230 },
          {
            field: 'createTime',
            header: '申请时间',
            sort: 'create_time',
            width: 230,
            formatter(row, index, value) {
              return new Date(value).toUTCString();
            },
          },
          { field: 'amount', header: '申请金额', width: 230 },
          { field: 'cardNumber', header: '银行卡', width: 230 },
          { field: 'code', header: '补贴状态', width: 230 }],
      };
    },
    methods: {},
    components: {
      'v-pager': pager,
      'v-datagrid': datagrid,
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.export{
  width: 70px;
  height: 34px;
  line-height: 34px;
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  text-align: center;
  left: 1225px;
  color: #fff;
  margin: 15px 0;
  background-color: #4786ff;
}
</style>