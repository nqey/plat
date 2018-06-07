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
                <td>名称：</td>
                <td>
                  <input type="text" v-model="name"></td>
              </tr>
              <tr>
                <td>内容：</td>
                <td>
                  <textarea v-model="content" style="width: 600px; height: 300px;resize:none;"></textarea>
                </td>
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
import { PLATFORM_TEMPLATE_QUERY_UPDATE } from '@/config/env';

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
      name: '',
      content: '',
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
      if (!this.name) {
        this.errMsg.push('请输入名称');
      }
      if (!this.content) {
        this.errMsg.push('请输入内容');
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