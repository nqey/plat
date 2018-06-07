<template>
  <div>
    <v-modal 
      :title="params.title"
      :errMsg="errMsg"
      :commit="commit"
      ref="valueModal">
       <div slot="body">
        <label>SKU属性值 ：</label> 
        <input type="text" v-model="params.name" class="form-control" />
       </div> 
    </v-modal>
  </div>
</template>

/**
* @author ： 秦超
*
* 入参：
* params:type   - add:新增， update:更新
* params:title   - 标题
* params:id   - 分类ID
* params:name   - 分类名
**/
<script>
import modal from '@/components/modal';
import { PLATFORM_ATTRIBUTE_VALUE_QUERY_ADD, PLATFORM_ATTRIBUTE_VALUE_QUERY_UPDATE } from '@/config/env';

export default {
  name: 'valueModal',
  props: {
    params: {
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
      if (!this.params.name) {
        this.errMsg.push('请输入SKU属性值');
      }
    },
    async commit() {
      this.val();
      if (this.errMsg.length > 0) return;
      const params = {
        name: this.params.name,
        attributeId: this.params.attributeId,
      };
      let api;
      if (this.params.type === 'add') {
        api = PLATFORM_ATTRIBUTE_VALUE_QUERY_ADD;
      } else if (this.params.type === 'update') {
        params.id = this.params.id;
        api = PLATFORM_ATTRIBUTE_VALUE_QUERY_UPDATE;
      }
      const res = await this.$http.post(api, params);
      if (res.success) {
        window.console.log(this.api, '访问成功！！！', this.params);
        this.$refs.valueModal.toggle();
        this.handler();
      }
    },
  },
};
</script>

<style scoped>
</style>