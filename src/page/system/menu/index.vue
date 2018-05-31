<template>
  <div class="content">
    <div class="content_con">
      <datagrid :toolbar="toolbar" :columns="columns" :data-url="dataUrl" :count-url="countUrl"
                :checkable="checkable" ref="dg"></datagrid>
    </div>
  </div>
</template>

<script>
  import { BASE_URL } from '@/config/env';

  export default {
    name: 'user',
    data() {
      return {
        dataUrl: `${BASE_URL}platform/system/menu/list`,
        countUrl: `${BASE_URL}platform/system/menu/list/count`,
        toolbar: [{
          title: '新增菜单',
          handler: this.add,
        }],
        checkable: true,
        columns: [{ field: 'id', header: '序号', sort: 'id', width: 150 },
          { field: 'name', header: '菜单名称', sort: 'name', width: 250 },
          { field: 'hash', header: '访问链接', sort: 'hash', width: 250 },
          { field: 'icon', header: '菜单图标', sort: 'icon', width: 200 },
          { field: 'parentId', header: '父菜单序号', sort: 'fk_platform_menu_id', width: 150 },
          {
            field: 'action',
            header: '操作',
            width: 200,
            actions: [{
              text: '【编辑】',
              handler: this.edit,
            }],
          }],
      };
    },
    mounted() {
    },
    methods: {
      edit(row) {
        this.$router.push(`/system/menu/edit/${row.id}`);
      },
      add() {
        this.$router.push('/system/menu/edit');
      },
    },
    components: {
      datagrid: () => import('@/components/datagrid'),
    },
  };
</script>

<style scoped>


</style>
