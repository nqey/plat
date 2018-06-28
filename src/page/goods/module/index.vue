<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <!--筛选条件-->
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>模块名称</label>
              <input type="text" class="form-control" v-model="filter.name" placeholder="输入模块名称">
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
      <h4>模块列表</h4>
      <hr/>
      <v-datagrid :columns="columns" :toolbar="toolbar" :data-url="dataUrl" :count-url="countUrl" :params="params"/>

      <!-- 编辑或者新增对话框 -->
      <v-modal ref="modal" :ok="submit" :width="+700">
        <div slot="body" class="edit">
          <table>
            <tbody>
            <tr>
              <td style="width: 80px;">名称：</td>
              <td>
                <input type="text" v-model="edit.name" val-required class="form-control" autofocus></td>
            </tr>
            <tr>
              <td>内容：</td>
              <td>
                <textarea v-model="edit.content" class="form-control content" val-required></textarea>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </v-modal>

      <!-- 查看预览 -->
      <v-modal :title="'预览'" :okText="''" cancelText="'关闭'" ref="view">
        <div slot="body" v-html="view.content">
        </div>
      </v-modal>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '@/config/utils';
  import { PLATFORM_MODULE_QUERY, PLATFORM_MODULE_QUERY_COUNT, PLATFORM_MODULE_QUERY_UPDATE } from '@/config/env';

  export default {
    name: 'module',
    data() {
      return {
        params: {},
        edit: {
          id: null,
          name: null,
          content: null,
        },
        view: {
          content: '',
        },
        filter: {
          name: null,
        },
        goodsId: null,
        dataUrl: PLATFORM_MODULE_QUERY,
        countUrl: PLATFORM_MODULE_QUERY_COUNT,
        toolbar: [{
          title: '新增',
          handler: () => {
            this.edit = {};
            this.$refs.modal.open();
          },
        }],
        columns: [
          {
            field: 'id',
            header: '序号',
            sort: 'id',
            width: 70,
          },
          {
            field: 'name',
            header: '模块名',
            sort: 'name',
            width: 200,
          },
          {
            field: 'createTime',
            header: '创建时间',
            sort: 'create_time',
            width: 200,
            formatter: (row, index, value) => formatDate(value),
          },
          {
            field: 'content',
            header: '模块内容',
            sort: 'content',
            width: 300,
          },
          {
            field: 'action',
            header: '操作',
            width: 150,
            actions: [{
              text: '【修改】',
              handler: (row) => {
                this.edit = Object.assign({}, row);
                this.$refs.modal.open();
              },
            }, {
              text: '【预览】',
              handler: (row) => {
                this.view.content = row.content;
                this.$refs.view.open();
              },
            }],
          },
        ],
      };
    },
    methods: {
      async submit() {
        // TODO: HTTPS， POST 有个bug，提交的内容里面有 % 号的时候就提交不成功，待解决！
        const params = {
          id: this.edit.id,
          name: this.edit.name,
          content: this.edit.content,
        };
        const res = await this.$http.post(PLATFORM_MODULE_QUERY_UPDATE, params);
        if (res.success) {
          this.params = Object.assign({ _: new Date().getTime() }, this.filter);
        }
        return res.success;
      },
      search() {
        this.params = Object.assign({}, this.filter);
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

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

  .edit {
    line-height: 66px;
    .form-control {
      width: 500px;
    }

    .content {
      height: 300px;
      resize: none;
    }
  }


</style>
