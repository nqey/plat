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
        columns: [{ field: 'name', header: '企业名称', sort: 'name', width: 300 },
          { field: 'cardNumber', header: '数码量', width: 300 },
          { field: 'amount', header: '补贴金额', width: 300 },
          {
            field: 'action',
            header: '补贴状态',
            width: 300,
            actions: [{
              // 显示内容，可以写html代码
              text: '【查看1】',
              // return true 表示这个按钮要显示，否则不显示
              show(row) {
                window.console.log(row);
                return true;
              },
              // 处理器，参数：row-当前行数据，index当前行所属数据的第几行
              handler(row, index) {
                window.console.log(row, index);
              },
            }, {
              text: '【查看2】',
              show(row) {
                return row.id % 2 === 0;
              },
              handler(row, index) {
                window.console.log(index, row);
              },
            }],
          }],
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
  height: 30px;
  line-height: 30px;
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  text-align: center;
  left: 1150px;
  color: #337cfd;
  background-color: #eaf4fe;
}
</style>