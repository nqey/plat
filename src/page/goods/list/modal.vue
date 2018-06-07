<template>
  <div>
    <v-modal 
      :title="title"
      :errMsg="errMsg"
      :commit="commit"
      ref="modal">
       <div slot="body">
        <table>
            <tbody>
            <tr>
                <td>轴距：</td>
                <td><input v-model="radius" class="form-control" type="text"></td>
            </tr>
            <tr>
                <td></td>
                <td style="color: darkgray;">获取轴距(单位：米)，不填表示无限</td>
            </tr>
            <tr>
                <td>扫码次数：</td>
                <td><input v-model="innerTimes" class="form-control" type="text"></td>
            </tr>
            <tr>
                <td></td>
                <td style="color: darkgray;">轴距内可扫码次数，不填表示无限</td>
            </tr>
            <tr>
                <td>位置变换次数：</td>
                <td><input v-model="outerChangeTimes" class="form-control" type="text"></td>
            </tr>
            <tr>
                <td></td>
                <td style="color: darkgray;">轴距之外能发生扫码的次数，当发生的时候，轴距中心更改，不填表示无限</td>
            </tr>
            </tbody>
        </table>
       </div> 
    </v-modal>
  </div>
</template>

/**
* @author ： 秦超
*
**/
<script>
import modal from '@/components/modal';
import { PLATFORM_GOODS_RULES } from '@/config/env';

export default {
  name: 'attributeModal',
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
      radius: null,
      innerTimes: null,
      outerChangeTimes: null,
      title: '设置规则',
      errMsg: [],
    };
  },
  components: {
    'v-modal': modal,
  },
  watch: {
    goodsId() {
      this.init();
    },
  },
  methods: {
    val() {
      this.errMsg = [];
      if (!this.radius) {
        this.errMsg.push('请输入轴距');
      }
      if (!this.innerTimes) {
        this.errMsg.push('请输入扫码次数');
      }
      if (!this.outerChangeTimes) {
        this.errMsg.push('请输入位置变换次数');
      }
    },
    async init() {
      const api = `${PLATFORM_GOODS_RULES}${this.goodsId}`;
      const res = await this.$http.get(api);
      if (res.success) {
        const data = JSON.parse(res.data);
        this.radius = data.radius;
        this.innerTimes = data.innerTimes;
        this.outerChangeTimes = data.outerChangeTimes;
      }
    },
    async commit() {
      this.val();
      if (this.errMsg.length > 0) return;
      const o = {
        radius: this.radius,
        innerTimes: this.innerTimes,
        outerChangeTimes: this.outerChangeTimes,
      };
      const params = {};
      params.rules = JSON.stringify(o);
      const api = `${PLATFORM_GOODS_RULES}${this.goodsId}`;
      const res = await this.$http.xhr('put', api, params);
      if (res.success) {
        window.console.log(this.api, '访问成功！！！', this);
        this.$refs.modal.toggle();
        this.handler();
      }
    },
  },
};
</script>

<style scoped>
</style>