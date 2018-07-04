<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>角色名称</label>
              <input type="text" class="form-control" v-model="filter.name" placeholder="输入角色名称">
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="btn btn-primary" @click="search">
                <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="button" class="btn btn-primary" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <h4>角色列表</h4>
      <hr/>
      <v-datagrid :toolbar="toolbar" :columns="columns" :params="params" :data-url="dataUrl" :count-url="countUrl"/>
    </div>
  </div>
</template>

<script>
  import { BASE_URL } from '@/config/env';
  import { formatDate, reomveBlank } from '@/config/utils';

  export default {
    name: 'role',
    data() {
      return {
        filter: {
          name: null,
        },
        dataUrl: `${BASE_URL}platform/system/role/query`,
        countUrl: `${BASE_URL}platform/system/role/query/count`,
        toolbar: [{
          title: '新增角色',
          handler: this.add,
        }],
        params: {},
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
      search() {
        this.params = reomveBlank(this.filter);
      },
      clear() {
        this.params = {};
        this.filter = {};
      },
    },
    components: {
      'v-datagrid': () => import('@/components/datagrid'),
    },
  };
</script>

<style scoped>


</style>
