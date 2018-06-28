<template>
  <div>
    <v-modal 
      :title="title"
      :cancelText="cancelText"
      :okText="okText"
      ref="modal">
      <div slot="body">
        <form class="form-inline">
          <div class="form-group">
            <img :src="qrCode" />
            <a :href="downloadqrcode + id" class="btn btn-primary">下载二维码</a>
          </div>
          <div class="form-group">
            <input id="con_url"  type="text"  class="form-control" :value="url" readonly></input>
            <button type="button" id="copyBT" class="btn btn-success" @click="copyUrl">复制链接</button>
          </div>
        </form>
      </div>
    </v-modal>
  </div>
</template>

/**
* @author ： 秦超
*
* handler: 返回原因
**/
<script>
import modal from '@/components/modal';
import { PLATFORM_POST_EXAMS_EXAMINEE_PUBLICATIONIMAGE, PLATFORM_POST_EXAMS_EXAMINEE_PUBLICATIONURL,
PLATFORM_POST_EXAMS_EXAMINEE_DOWNLOADQRCODE } from '@/config/env';

export default {
  name: 'sendModal',
  props: {
    state: {
      type: String,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      cancelText: '关闭',
      okText: null,
      qrCode: null,
      url: null,
      title: '请选择发送方式',
      reason: null,
      downloadqrcode: PLATFORM_POST_EXAMS_EXAMINEE_DOWNLOADQRCODE,
    };
  },
  components: {
    'v-modal': modal,
  },
  methods: {
    copyUrl() {
      document.getElementById('con_url').focus();
      document.getElementById('con_url').select();
      document.execCommand('copy', false, null);
    },
    async initSend() {
      if (!this.id) return;
      if (this.state !== 'doing') return;
      this.qrCode = `${PLATFORM_POST_EXAMS_EXAMINEE_PUBLICATIONIMAGE}${this.id}`;
      const res = await this.$http.get(`${PLATFORM_POST_EXAMS_EXAMINEE_PUBLICATIONURL}${this.id}`);
      if (res.success) {
        this.url = res.data;
      }
    },
  },
  watch: {
    id() {
      this.initSend();
    },
  },
};
</script>

<style scoped>
</style>