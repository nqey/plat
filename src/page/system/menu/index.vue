<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>菜单名称</label>
              <input type="text" class="form-control" v-model="filter.name" placeholder="输入菜单名称">
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
      <h4>菜单列表</h4>
      <hr/>
      <v-datagrid :toolbar="toolbar" :columns="columns" :data-url="dataUrl" :count-url="countUrl" :params="params"/>
    </div>

    <v-modal
      :title="modalTitle"
      :mystyle="{width:'550px'}"
      :ok="commit"
      ref="editModal">
      <div slot="body">
        <div class="form-group">
          <table>
            <tbody>
            <tr>
              <td>菜单名称：</td>
              <td><input type="text" class="form-control" v-model="editParams.name" val-required autofocus="">
              </td>
            </tr>
            <tr>
              <td>访问链接：</td>
              <td><input type="text" class="form-control" v-model="editParams.hash" val-required></td>
            </tr>
            <tr>
              <td>菜单图标：</td>
              <td><input type="text" class="form-control" v-model="editParams.icon"></td>
            </tr>
            <tr>
              <td>父菜单序号：</td>
              <td><input type="text" class="form-control" v-model="editParams.parentId"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
  import { BASE_URL } from '@/config/env';
  import { reomveBlank } from '@/config/utils';

  export default {
    name: 'user',
    data() {
      return {
        filter: {
          name: null,
        },
        dataUrl: `${BASE_URL}platform/system/menu/list`,
        countUrl: `${BASE_URL}platform/system/menu/list/count`,
        toolbar: [{
          title: '新增菜单',
          handler: this.add,
        }],
        params: {},
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
        editParams: {},
        modalTitle: null,
      };
    },
    mounted() {
    },
    methods: {
      edit(row) {
        this.modalTitle = '编辑菜单';
        this.editParams = Object.assign({}, row);
        this.$refs.editModal.open();
      },
      add() {
        this.modalTitle = '新增菜单';
        this.editParams = {};
        this.$refs.editModal.open();
      },
      async commit() {
        let res;
        if (this.editParams.id) {
          res = await this.$http.put(`${BASE_URL}platform/system/menu/${this.editParams.id}`, {
            name: this.editParams.name,
            hash: this.editParams.hash,
            icon: this.editParams.icon,
            parentId: this.editParams.parentId,
          });
        } else {
          res = await this.$http.post(`${BASE_URL}platform/system/menu`, Object.assign({}, this.editParams));
        }

        if (res.success) {
          // 重新加载datagrid
          this.params = Object.assign({ _: new Date().getTime() }, this.params);
          return true;
        }
        return false;
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
      'v-modal': () => import('@/components/modal'),
    },
  };
</script>

<style scoped>
  table {
    width: 100%;
    border-spacing: 10px;
    border-collapse: separate;
  }

  .form-group {
    margin: 15px;
  }

  .form-control {
    width: 260px;
    display: inline;
  }
</style>
