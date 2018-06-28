<template>
  <div>
    <v-modal
      :title="param.title"
      :ok="commit"
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
  components: {
    'v-modal': modal,
  },
  methods: {
    async commit() {
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
        this.$refs.modal.toggle();
        this.handler();
      }
    },
  },
};
</script>

<style scoped>
</style>
