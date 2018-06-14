<template>
  <div class="content">
    <div class="content_con">
      <div style="width: 1250px;">
          <div class="hos height">公告列表</div>
        <div class="hos" style="text-align: right;">
          <button class="export">导出</button>
        </div>
      </div>
      <v-datagrid :columns="columns"
                  :data-url="dataUrl"
                  :count-url="countUrl">
      </v-datagrid>
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
        columns: [{ field: 'name', header: '标题', sort: 'name', width: 230 },
          { field: 'enterprise', header: '企业', sort: 'name', width: 230 },
          { field: 'code', header: '状态', sort: 'name', width: 230 },
          {
            field: 'createTime',
            header: '发布时间',
            sort: 'create_time',
            width: 330,
            formatter(row, index, value) {
              return new Date(value).toUTCString();
            },
          },
          {
            field: 'action',
            header: '公告详情',
            width: 230,
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
  height: 34px;
  line-height: 34px;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  border: none;
  margin: 15px 0;
  background-color: #4786ff;
}
.hos{
  width: 50%;
  height: 64px;
  float: left;
}
.height{
  line-height: 64px;
  font-size: 25px;
}
</style>