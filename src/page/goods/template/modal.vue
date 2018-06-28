<template>
  <div>
    <v-modal 
      :title="title"
      :ok="commit"
      ref="modal">
        <div slot="body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">名称：</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="请输入名称" v-model="name" val-required>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">内容：</label>
              <div class="col-sm-10">
                <textarea v-model="content"  row="5" placeholder="请输入内容" class="form-control" val-required></textarea>
              </div>
            </div>
          </form>
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
      const o = {
        radius: this.radius,
        innerTimes: this.innerTimes,
        outerChangeTimes: this.outerChangeTimes,
      };
      const params = {};
      params.rules = JSON.stringify(o);
      const api = `${PLATFORM_TEMPLATE_QUERY_UPDATE}${this.goodsId}`;
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