<template>
  <div>
    <v-modal 
      :title="param.title"
      :errMsg="errMsg"
      :commit="commit"
      ref="modal">
       <div slot="body">
        <label>&#12288;分类名：</label> 
        <input type="text" v-model="param.name" class="form-control" />
       </div> 
    </v-modal>
  </div>
</template>

/**
* @author ： 秦超
*
* 入参：
* param:type   - add:新增， update:更新
* param:title   - 标题
* param:id   - 分类ID
* param:name   - 分类名
**/
<script>
import modal from '@/components/modal';
import { CATEGORY_TREE_ADD, CATEGORY_TREE_UPDATE } from '@/config/env';

export default {
  name: 'category',
  props: {
    param: {
      type: Object,
      default: null,
    },
    handler: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      errMsg: [],
    };
  },
  components: {
    'v-modal': modal,
  },
  methods: {
    val() {
      this.errMsg = [];
      if (!this.param.name) {
        this.errMsg.push('请输入分类名');
      }
    },
    async commit() {
      this.val();
      if (this.errMsg.length > 0) return;
      const param = {
        name: this.param.name,
      };
      let api;
      if (this.param.type === 'add') {
        api = CATEGORY_TREE_ADD;
        param.parentId = this.param.id;
      } else if (this.param.type === 'update') {
        api = CATEGORY_TREE_UPDATE;
        param.id = this.param.id;
      }
      const res = await this.$http.post(api, param);
      if (res.success) {
        window.console.log(this.api, '访问成功！！！', this.param);
        this.$refs.modal.toggle();
        this.handler(this.param.id);
      }
    },
  },
};
</script>

<style scoped>
</style>