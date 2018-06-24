<template>
  <div>
    <v-modal 
      :title="title"
      :commit="commit"
      ref="nopassmodal">
        <div slot="body">
          <div style="text-align: center;font-size: 25px;">驳回请求！</div>
          <textarea class="the-input" type="text" v-model="text" placeholder="驳回原因"></textarea>
        </div>
        <slot name='footer'>
        </slot>
    </v-modal>
    <v-failuremodal ref="failuremodal"></v-failuremodal>
  </div>
</template>

<script>
import failuremodal from '@/page/enterprise/collectting/failuremodal';
import modal from '@/components/modal';
import { PLATFORM_EP_REJECT2 } from '@/config/env';

export default {
  name: 'nopassModal',
  props: {
    goodsId: {
      type: Number,
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
      enterpriseId: this.$route.params.id,
      text: null,
    };
  },
  components: {
    'v-modal': modal,
    'v-failuremodal': failuremodal,
  },
  watch: {},
  methods: {
    async commit() {
      const param = {
        enterpriseId: this.enterpriseId,
        mark: this.text,
      };
      const res = await this.$http.post(PLATFORM_EP_REJECT2, param);
      if (res.success) {
        this.$refs.nopassmodal.toggle();
        this.$refs.failuremodal.$refs.failuremodal.toggle();
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
}

</style>