<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <section>
        <h4 class="title"><span>{{ title }}</span></h4>
        <div class="form-horizontal body">

          <div class="form-group">
            <label for="name" class="col-sm-2 control-label">APP类型：</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="data.type" val-required placeholder="请输入APP类型">
            </div>
          </div>
          <div class="form-group">
            <label for="name" class="col-sm-2 control-label">下载地址：</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="data.url" val-required placeholder="请输入下载地址">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">强制更新：</label>
            <div class="col-sm-6">
              <select name="type" v-model="data.force" class="form-control" val-required>
                <option value="">请选择</option>
                <option value="true">是</option>
                <option value="false">否</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">版本描述：</label>
            <div class="col-sm-6">
              <textarea type="text" class="form-control" v-model="data.description" placeholder="请输入版本描述"
                        val-required style="height: 253px;"></textarea>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="content_left">
              <p></p>
            </div>
            <div class="content_right">

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
        </div>
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
          type: null,
          url: null,
          force: '',
          description: null,
        },
        config: ({
          insert: {
            init() {
              this.title = '新增版本';
            },
            save() {
              return this.$http.post(`${BASE_URL}platform/app/version`, this.data);
            },
            transfer() {
              this.$transfer({
                back: '继续添加',
                buttons: [{
                  text: '去列表',
                  link: '#/system/version',
                }],
              });
            },
          },
          update: {
            async init() {
              this.title = '修改版本';
              const res = await this.$http.get(`${BASE_URL}platform/app/version/${this.$route.params.id}`);
              this.data = Object.assign({}, res.data);
            },
            save() {
              return this.$http.put(`${BASE_URL}platform/app/version/${this.$route.params.id}`, this.data);
            },
            transfer() {
              this.$transfer({
                buttons: [{
                  text: '去列表',
                  link: '#/system/version',
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
    components: {},
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
</style>
