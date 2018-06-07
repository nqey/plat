<template>
  <div class="content">
    <div class="content_con">
      <v-datagrid :toolbar="toolbar" :columns="columns" :data-url="dataUrl" :count-url="countUrl" ></v-datagrid>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import { BASE_URL } from '@/config/env';
  import { formatDate } from '@/config/utils';

  export default {
    name: 'role',
    data() {
      return {
        dataUrl: `${BASE_URL}platform/system/role/query`,
        countUrl: `${BASE_URL}platform/system/role/query/count`,
        toolbar: [{
          title: '新增角色',
          handler: this.add,
        }],
        checkable: true,
        columns: [{ field: 'id', header: '序号', sort: 'id', width: 100 },
          { field: 'name', header: '角色名称', sort: 'name', width: 230 },
          {
            field: 'createTime',
            header: '创建时间',
            sort: 'create_time',
            width: 230,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'modifyTime',
            header: '上次修改时间',
            sort: 'modify_time',
            width: 230,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'action',
            header: '操作',
            sort: 'id',
            width: 200,
            actions: [{
              text: '【编辑】',
              handler: this.edit,
            }],
          }],
      };
    },
    methods: {
      edit(row) {
        this.$router.push(`/system/role/edit/${row.id}`);
      },
      add() {
        this.$router.push('/system/role/edit');
      },
    },
    components: {
      'v-datagrid': datagrid,
    },
  };
</script>

<style scoped>


</style>
