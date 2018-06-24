<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>支付方式列表</h4>
      <hr/>
      <v-datagrid :columns="columns" :data-url="dataUrl" :params="params" :pageable="pageable"/>
    </div>
  </div>
</template>

<script>
  import { ENTERPRISE_BASE_URL } from '@/config/env';
  import { PAY_METHOD } from '@/config/mapping';
  import { MessageBox } from 'element-ui';

  export default {
    name: 'user',
    data() {
      return {
        dataUrl: `${ENTERPRISE_BASE_URL}platform/paymethod/query`,
        params: {},
        pageable: false,
        columns: [{ field: 'id', header: '序号', width: 100 },
          {
            field: 'payMethod',
            header: '支付方式',
            width: 200,
            formatter(row, index, value) {
              return PAY_METHOD[value];
            },
          },
          {
            field: 'state',
            header: '状态',
            width: 200,
            formatter(row, index, value) {
              return value ? '已开启' : '已关闭';
            },
          },
          {
            field: 'action',
            header: '操作',
            width: 300,
            actions: [{
              show(row) {
                return !row.state;
              },
              text: '【开启】',
              handler: this.open,
            }, {
              show(row) {
                return row.state;
              },
              text: '【关闭】',
              handler: this.close,
            }],
          }],
      };
    },
    mounted() {
    },
    methods: {
      close(row) {
        this.setState(row.id, false);
      },
      open(row) {
        this.setState(row.id, true);
      },
      async setState(id, open) {
        MessageBox({
          title: '提示',
          message: open ? '你即将开启全额补贴方式，企业将免费入库，是否继续？' : '你即将关闭全额补贴方式，企业将入库将收取费用，是否继续？',
          showCancelButton: true,
          showConfirmButton: true,
          type: 'warning',
        }).then(async () => {
          const res = await this.$http.post(`${ENTERPRISE_BASE_URL}platform/paymethod/set`, { id, open });

          if (res.success) {
            // 重新加载datagrid
            this.params = Object.assign({ _: new Date().getTime() }, this.params);
          }
        }).catch(() => {
        });
      },
    },
    components: {
      'v-datagrid': () => import('@/components/datagrid'),
    },
  };
</script>

<style scoped>
</style>
