<template>
  <div class="content">
    <div class="content_con">
      <v-datagrid :toolbar="toolbar" :columns="columns" :data-url="dataUrl" :count-url="countUrl"></v-datagrid>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { BASE_URL } from '@/config/env';
  import { formatDate, getPictureUrl } from '@/config/utils';
  import { PLATFORM_USER_TYPE } from '@/config/mapping';

  export default {
    name: 'user',
    data() {
      return {
        dataUrl: `${BASE_URL}platform/system/user/query`,
        countUrl: `${BASE_URL}platform/system/user/query/count`,
        toolbar: [{
          title: '新增用户',
          handler: this.add,
        }],
        checkable: true,
        columns: [{ field: 'id', header: '序号', sort: 'id', width: 100 },
          {
            field: 'logo',
            header: 'logo',
            width: 70,
            html: true,
            formatter(row, index, value) {
              return `<img src='${getPictureUrl(value, { w: 40, h: 40, q: 40 })}'>`;
            },
          },
          { field: 'username', header: '用户名称', sort: 'username', width: 150 },
          {
            field: 'type',
            header: '账户类型',
            sort: 'type',
            width: 150,
            formatter(row, index, value) {
              return PLATFORM_USER_TYPE[value];
            },
          },
          { field: 'chargeAddress', header: '负责区域', width: 250 },
          {
            field: 'createTime',
            header: '添加时间',
            sort: 'create_time',
            width: 200,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'modifyTime',
            header: '上次修改时间',
            sort: 'modify_time',
            width: 200,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'action',
            header: '操作',
            width: 200,
            actions: [{
              text: '【编辑】',
              show(row) {
                // 不可编辑admin。
                return row.username !== 'admin';
              },
              handler: this.edit,
            }],
          }],
      };
    },
    methods: {
      edit(row) {
        this.$router.push(`/system/user/edit/${row.id}`);
      },
      add() {
        this.$router.push('/system/user/edit');
      },
    },
    components: {
      'v-datagrid': datagrid,
    },
  };
</script>

<style scoped>


</style>
