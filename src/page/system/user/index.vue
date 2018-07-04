<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>用户名称</label>
              <input type="text" class="form-control" v-model="filter.username" placeholder="输入用户名称">
            </div>
            <div class="form-group col-md-4">
              <label>用户类型</label>
              <select class="form-control" v-model="filter.type">
                <option value="">请选择</option>
                <option v-for="(v,k) of PLATFORM_USER_TYPE" :value="k">{{ v }}</option>
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
      <h4>用户列表</h4>
      <hr/>
      <v-datagrid :toolbar="toolbar" :columns="columns" :data-url="dataUrl" :count-url="countUrl" :params="params"/>
    </div>
  </div>
</template>

<script>
  import { BASE_URL } from '@/config/env';
  import { formatDate, getPictureUrl, reomveBlank } from '@/config/utils';
  import { PLATFORM_USER_TYPE } from '@/config/mapping';

  export default {
    name: 'user',
    data() {
      return {
        filter: {
          username: null,
          type: '',
        },
        PLATFORM_USER_TYPE,
        dataUrl: `${BASE_URL}platform/system/user/query`,
        countUrl: `${BASE_URL}platform/system/user/query/count`,
        toolbar: [{
          title: '新增用户',
          handler: this.add,
        }],
        params: {},
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
      search() {
        this.params = reomveBlank(this.filter);
      },
      clear() {
        this.params = {};
        this.filter = { type: '' };
      },
    },
    components: {
      'v-datagrid': () => import('@/components/datagrid'),
    },
  };
</script>

<style scoped>


</style>
