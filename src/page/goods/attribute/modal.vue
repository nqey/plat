<template>
  <div>
    <v-modal 
      :title="param.title"
      :errMsg="errMsg"
      :commit="commit"
      ref="modal">
       <div slot="body">
        <label>SKU属性名 ：</label> 
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
import { PLATFORM_ATTRIBUTE_ADD, PLATFORM_ATTRIBUTE_UPDATE } from '@/config/env';

export default {
  name: 'attributeModal',
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
        this.errMsg.push('请输入SKU属性名');
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
        api = PLATFORM_ATTRIBUTE_ADD;
      } else if (this.param.type === 'update') {
        param.id = this.param.id;
        api = PLATFORM_ATTRIBUTE_UPDATE;
      }
      const res = await this.$http.post(api, param);
      if (res.success) {
        window.console.log(this.api, '访问成功！！！', this.param);
        this.$refs.modal.toggle();
        this.handler();
      }
    },
  },
};
</script>

<style scoped>
</style>