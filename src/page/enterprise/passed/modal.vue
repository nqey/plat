<template>
  <div>
    <v-modal 
      :title="title"
      :commit="commit"
      ref="modal">
        <div slot="body" class="number">
          <div><span>历史免费总数：</span><input type="text" v-model="znumber" disabled="disabled"></div>
          <div><span>剩余免费数：</span><input type="text" v-model="snumber"></div>
        </div>
    </v-modal>
    <v-promptmodal ref="promptmodal"></v-promptmodal>
  </div>
</template>

<script>
import modal from '@/components/modal';
import promptmodal from '@/page/enterprise/passed/promptmodal';
import { PLATFORM_FREECODE_GET, PLATFORM_FREECODE_SET } from '@/config/env';

export default {
  name: 'qrcode',
  props: {
    id: {
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
      znumber: null,
      snumber: null,
      title: '提示',
    };
  },
  components: {
    'v-modal': modal,
    'v-promptmodal': promptmodal,
  },
  watch: {
    id() {
      this.getData();
    },
  },
  methods: {
    async getData() {
      const param = {
        enterpriseId: this.id,
      };
      const res = await this.$http.get(PLATFORM_FREECODE_GET, param);
      if (res.success) {
        const data = res.data;
        this.znumber = data.total;
        this.snumber = data.remain;
      }
    },
    async commit() {
      const param = {
        enterpriseId: this.id,
        total: this.znumber,
        remain: this.snumber,
      };
      const data = await this.$http.post(PLATFORM_FREECODE_SET, param);
      if (data.success) {
        this.$refs.modal.toggle();
        this.getData();
        this.$refs.promptmodal.$refs.promptmodal.toggle();
      }
    },
    // val() {
    //   this.errMsg = [];
    //   if (!this.radius) {
    //     this.errMsg.push('请输入轴距');
    //   }
    //   if (!this.innerTimes) {
    //     this.errMsg.push('请输入扫码次数');
    //   }
    //   if (!this.outerChangeTimes) {
    //     this.errMsg.push('请输入位置变换次数');
    //   }
    // },
  },
};
</script>

<style scoped>

.number div{
  width: 300px;
  height: 40px;
  line-height: 40px;
  margin: 15px auto;
}
.number div span{
  width: 100px;
  display: inline-block;
}
.number div input{
  padding-left: 10px;
  float: right;
  width: 190px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #999;
}

</style>