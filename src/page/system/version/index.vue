<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>版&nbsp;&nbsp;本&nbsp;&nbsp;号</label>
              <input type="text" class="form-control" v-model="filter.id" placeholder="输入版本号">
            </div>
            <div class="form-group col-md-4">
              <label>APP类型</label>
              <input type="text" class="form-control" v-model="filter.type" placeholder="输入APP类型">
            </div>
            <div class="form-group col-md-4">
              <label>版本描述</label>
              <input type="text" class="form-control" v-model="filter.description" placeholder="输入版本描述">
            </div>
            <div class="form-group col-md-4">
              <label>强制更新</label>
              <select class="form-control" v-model="filter.force">
                <option value="null">请选择</option>
                <option value="true">是</option>
                <option value="false">否</option>
              </select>
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

      <h4>APP版本列表</h4>
      <hr/>
      <v-datagrid :toolbar="toolbar" :columns="columns" :data-url="dataUrl" :count-url="countUrl" :params="params"/>
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
        dataUrl: `${BASE_URL}platform/app/version/query`,
        countUrl: `${BASE_URL}platform/app/version/query/count`,
        toolbar: [{
          title: '新增版本',
          handler: this.add,
        }],
        filter: {
          id: null,
          type: null,
          description: null,
          force: null,
        },
        params: {},
        columns: [
          { field: 'id', header: '版本号', sort: 'id', width: 100 },
          { field: 'type', header: 'APP类型', sort: 'type', width: 150 },
          {
            field: 'url',
            header: '下载地址',
            sort: 'url',
            width: 250,
            html: true,
            formatter(row, index, value) {
              return value.link(value);
            },
          },
          {
            field: 'description',
            header: '版本描述',
            sort: 'description',
            width: 250,
            html: true,
            formatter(row, index, value) {
              return (value || '').replace(/\n/g, '<br/>');
            },
          },
          {
            field: 'force',
            header: '是否强制更新',
            sort: 'force',
            width: 200,
            formatter(row, index, value) {
              return value ? '是' : '否';
            },
          },
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
            field: 'action',
            header: '操作',
            width: 150,
            actions: [{
              text: '【编辑】',
              handler: this.edit,
            }],
          }],
      };
    },
    methods: {
      edit(row) {
        this.$router.push(`/system/version/edit/${row.id}`);
      },
      add() {
        this.$router.push('/system/version/edit');
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
