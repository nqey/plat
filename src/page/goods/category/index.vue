<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <button type="button" class="btn btn-primary" @click="open = !open;">商品分类筛选+</button>
      <br/>
      <br/>
      <v-tree v-show="open" :nodes="treeNodes" :onSelectionChanged="onSelectionChanged" :selected="selected"/>
      <v-datagrid :toolbar="toolbar" :columns="columns" :params="params"
                  :data-url="dataUrl" :count-url="countUrl"/>

      <v-modal ref="excelModal" :title="'导入分类'" :ok="upload">
        <div slot="body">
          <div style="margin: 30px 20px" class="dialog-content">
            <table>
              <tbody>
              <tr>
                <td>导入Excel：</td>
                <td>
                  <input type="file" accept=".xls" @change="file = $event.target.files[0]">
                </td>
                <td>
                  <a download :href="EXCEL_SERVER_URL + '/template/category.xls'">【下载模板】</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </v-modal>

      <v-modal
        :title="edit.title"
        :ok="submit"
        ref="editModal">
        <div slot="body">
          <div class="form-group">
            <table>
              <tbody>
              <tr>
                <td>&#12288;分类名：</td>
                <td><input type="text" class="form-control" v-model="edit.name" val-required autofocus="">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </v-modal>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '@/config/utils';
  import {
    CATEGORY_TREE, CATEGORY_TREE_QUERY, CATEGORY_TREE_QUERY_COUNT, CATEGORY_UPLOAD,
    EXCEL_SERVER_URL, CATEGORY_TREE_ADD, CATEGORY_TREE_UPDATE,
  } from '@/config/env';

  export default {
    name: 'categoryMng',
    data() {
      return {
        EXCEL_SERVER_URL,
        file: null,
        open: false,
        treeNodes: [],
        onSelectionChanged: (selected) => {
          this.pageable = false;
          // tree只是单选可以, 所以这里使用selecte[0]
          this.params = { id: selected[0] };
        },
        modalHandler: (id) => {
          this.initTree();
          this.params = { id };
        },
        edit: {
          type: '',
          title: '',
          id: '',
          name: '',
        },
        params: {},
        selected: [],
        dataUrl: CATEGORY_TREE_QUERY,
        countUrl: CATEGORY_TREE_QUERY_COUNT,
        toolbar: [{
          title: '批量导入',
          handler: () => {
            this.$refs.excelModal.open();
          },
        }],
        columns: [
          {
            field: 'id',
            header: '序号',
            sort: 'id',
            width: 80,
          },
          {
            field: 'name',
            header: '分类名称',
            sort: 'name',
            width: 330,
          },
          {
            field: 'code',
            header: '分类编码',
            width: 200,
            sort: 'code',
            formatter(row, index, value) {
              return value === -1 ? '永久' : value;
            },
          },
          {
            field: 'createTime',
            header: '创建时间',
            sort: 'create_time',
            width: 330,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'leaf',
            header: '是否叶子节点',
            sort: 'is_leaf',
            width: 250,
            formatter(row, index, value) {
              return value ? '是' : '否';
            },
          },
          {
            field: 'action',
            header: '操作',
            width: 230,
            actions: [{
              // 显示内容，可以写html代码
              text: '【新增子节点】',
              // 处理器，参数：row-当前行数据，index当前行所属数据的第几行
              handler: (row) => {
                this.edit = { type: 'add', title: `为【${row.name}】添加子节点`, id: row.id };
                this.$refs.editModal.open();
              },
            }, {
              text: '【修改】',
              handler: (row) => {
                this.edit = { type: 'update', title: `修改分类【${row.name}】`, id: row.id, name: row.name };
                this.$refs.editModal.open();
              },
            }],
          },
        ],
      };
    },
    computed: {},
    methods: {
      async initTree() {
        const res = await this.$http.get(CATEGORY_TREE);
        if (res.success) {
          this.treeNodes = res.data;
          this.selected = [...this.selected];
        }
      },
      async upload() {
        const param = new FormData();
        param.append('file', this.file);
        const res = await this.$http.upload(CATEGORY_UPLOAD, param);
        return res.success;
      },
      async submit() {
        let api;
        const param = { name: this.edit.name };
        if (this.edit.type === 'add') {
          api = CATEGORY_TREE_ADD;
          param.parentId = this.edit.id;
        } else {
          api = CATEGORY_TREE_UPDATE;
          param.id = this.edit.id;
        }

        const res = await this.$http.post(api, param);

        this.params = Object.assign({ t: new Date().getTime() }, this.params);

        return res.success;
      },
    },
    components: {
      'v-tree': () => import('@/components/tree'),
      'v-datagrid': () => import('@/components/datagrid'),
      'v-modal': () => import('@/components/modal'),
    },
    mounted() {
      this.initTree();
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

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
