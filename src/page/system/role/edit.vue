<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <section>
        <h4 class="title"><span>{{ title }}</span></h4>
        <form class="form-horizontal body">
          <div class="form-group">
            <label for="name" class="col-sm-2 control-label">名称：</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="data.name" val-required placeholder="请输入角色名称">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">权限：</label>
            <div class="col-sm-3 menu-tree-container">
              <v-tree :nodes="menuNodes" :selected="data.menuIdList" :onSelectionChanged="onSelectionChanged"
                      :multiple="true"></v-tree>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-3">
              <button type="button" class="btn btn-default" @click="save" :disabled="disabled">
                {{ disabled ? '正在保存…' : '&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存&nbsp;&nbsp;' }}
              </button>
              <button class="btn" onclick="history.back(-1);">返回上一页<span
                class="glyphicon glyphicon-share-alt"></span></button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
  import { BASE_URL } from '@/config/env';
  import { validate } from '@/config/validator';

  export default {
    name: 'roleEdit',
    data() {
      return {
        title: '',
        menuNodes: [],
        disabled: false,
        data: {
          name: null,
          menuIdList: [],
        },
        config: ({
          insert: {
            init() {
              this.title = '新增角色';
            },
            save() {
              return this.$http.post(`${BASE_URL}platform/system/role`, this.data);
            },
            transfer() {
              this.$transfer({
                back: '继续添加',
                buttons: [{
                  text: '去列表',
                  link: '#/system/role',
                }],
              });
            },
          },
          update: {
            async init() {
              this.title = '修改角色';
              const res = await this.$http.get(`${BASE_URL}platform/system/role/${this.$route.params.id}`);
              this.data = Object.assign({}, res.data);
            },
            save() {
              return this.$http.put(`${BASE_URL}platform/system/role/${this.$route.params.id}`, this.data);
            },
            transfer() {
              this.$transfer({
                buttons: [{
                  text: '去列表',
                  link: '#/system/role',
                }],
              });
            },
          },
          // id不为空表示编辑，否则表示新增
        })[this.$route.params.id ? 'update' : 'insert'],
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      onSelectionChanged(selected) {
        this.data.menuIdList = selected;
      },
      async init() {
        // 加载菜单树
        const tree = await this.$http.get(`${BASE_URL}platform/system/menu/tree`);
        this.menuNodes = tree.data;

        // 获取配置初始化
        this.config.init.call(this);
      },
      @validate()
      async save() {
        this.disabled = true;

        const res = await this.config.save.call(this);

        if (res.success) {
          this.config.transfer.call(this);
        }

        this.disabled = false;
      },
    },
    components: {
      'v-tree': () => import('@/components/tree'),
    },
  };
</script>

<style scoped>
  .form-control {
    width: 50%;
  }

  .title {
    border-bottom: 2px solid #EDF2F5;
    margin: 0;
  }

  .title span {
    display: block;
    width: 120px;
    text-align: center;
    border-bottom: 2px solid #015FE5;
    padding: 28px 0 15px 0;
  }

  .body {
    padding: 20px 30px;
  }

  .menu-tree-container {
    max-height: 500px;
    overflow: auto;
    padding-right: 0;
  }

  .menu-tree-container::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .menu-tree-container::-webkit-scrollbar-thumb {
    background: rgba(68, 54, 54, 0.1);
  }
</style>
