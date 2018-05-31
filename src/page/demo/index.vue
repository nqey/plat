<template>
  <div class="content">
    <div class="content_con">
      <demo>
        <h1 slot="header">Here might be a page title</h1>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
        <p slot="footer">Here's some contact info</p>
      </demo>

      <div @click="onclick">点我获取datagrid的全局句柄</div>

      <v-datagrid :toolbar="toolbar" :columns="columns" :checkable="checkable"
                  :data-url="dataUrl" :count-url="countUrl" ref="dg"
                  :onBeforeLoad="onBeforeLoad" :onLoadSuccess="onLoadSuccess" :onBeforeRenderRow="onBeforeRenderRow"
      ></v-datagrid>
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
        dataUrl: 'http://g.cpsdb61.com/platform/goods/query',
        countUrl: 'http://g.cpsdb61.com/platform/goods/query/count',
        toolbar: [{
          title: 'toolbar标题',
          handler() {
          },
        }],
        checkable: true,
        onBeforeLoad(params) {
          window.console.log('加载数据之前：', params);
        },
        onLoadSuccess(rows) {
          window.console.log('加载数据成功：', rows);
        },
        onBeforeRenderRow(row, index) {
          window.console.log('渲染行之前：', row, index);
        },
        columns: [{ field: 'id', header: '序号', sort: 'id', width: 80 },
          { field: 'name', header: '商品名称', sort: 'name', width: 230 },
          {
            field: 'validPeriod',
            header: '保质期',
            width: 100,
            formatter(row, index, value) {
              return value === -1 ? '永久' : value;
            },
          },
          { field: 'categoryName', header: '分类', width: 130 },
          {
            field: 'createTime',
            header: '创建时间',
            sort: 'create_time',
            width: 330,
            formatter(row, index, value) {
              return new Date(value).toUTCString();
            },
          },
          {
            field: 'action',
            header: '操作',
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
                window.console.log(row, index);
              },
            }],
          }],
      };
    },
    methods: {
      onclick() {
        window.dg = this.$refs.dg;
      },
    },
    components: {
      'v-pager': pager,
      'v-datagrid': datagrid,
      demo: {
        template: `<div class="container">
                    <header>
                      <slot name="header"></slot>
                    </header>
                    <main>
                      <slot></slot>
                    </main>

                    <button type="submit">
                      <slot>Submit</slot>
                    </button>

                    <footer>
                      <slot name="footer"></slot>
                    </footer>
                  </div>`,
      },
    },
  }
  ;
</script>

<style scoped>


</style>
