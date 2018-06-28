<template>
  <div>
    <v-modal
      :title="title"
      :ok="confirm"
      ref="nopassmodal">
        <div slot="body">
          <div style="text-align: center;font-size: 25px;">确认不通过！</div>
          <textarea class="the-input" type="text" v-model="text" placeholder="录入不通过备注"></textarea>
        </div>
    </v-modal>
  </div>
</template>
<script>
import modal from '@/components/modal';
import { PLATFORM_FACTORY_REJECT } from '@/config/env';

export default {
  name: 'nopassmodal',
  props: {
    factoryId: {
      type: String,
      default: null,
    },
    handler: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      title: '提示',
      text: null,
    };
  },
  components: {
    'v-modal': modal,
  },
  watch: {},
  methods: {
    async confirm() {
      const param = {
        factoryId: this.factoryId,
        mark: this.text,
      };
      const res = await this.$http.post(PLATFORM_FACTORY_REJECT, param);
      if (res.success) {
        this.$transfer({
          back: false,
          buttons: [{
            text: '返回列表',
            link: '/factory/pending',
          }],
        });
      }
    },
  },
};
</script>

<style scoped>

.the-input{
  max-width: 100%;
  min-width: 100%;
  height: 150px;
  padding: 6px 10px;
  font-size: 15px;
}

</style>
