<template>
  <div>
    <v-modal
      :title="title"
      :width="width"
      ref="abnormalmodal">
        <div slot="body">
          <img :src="warn" style="display: block;margin: 30px auto 0;">
          <div style="text-align: center; margin: 10px 0; font-size: 25px;">二维码异常！</div>
          <div style="text-align: center;padding:0 40px; margin-bottom: 20px;line-height: 20px;">该二维码于{{data.createTime && formatDate(data.createTime)}}在{{data.address}}被扫描，{{data.reason}}</div>
        </div>
        <div slot='footer'>
        </div>
    </v-modal>
  </div>
</template>

<script>
import { formatDate } from '@/config/utils';
import modal from '@/components/modal';
import warn from '@/assets/img/warn.png';
import { PLATFORM_CODE_GET_LOG } from '@/config/env';

export default {
  name: 'abnormalModal',
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      formatDate,
      warn,
      data: {
        createTime: null,
        address: null,
        reason: null,
      },
      title: '异常原因',
      width: 500,
    };
  },
  components: {
    'v-modal': modal,
  },
  watch: {
    id() {
      this.getData();
    },
  },
  methods: {
    async getData() {
      const param = {
        logId: this.id,
      };
      const res = await this.$http.get(PLATFORM_CODE_GET_LOG, param);
      if (res.success) {
        this.data = res.data;
      }
    },
  },
};
</script>

<style scoped>

</style>
