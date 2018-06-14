<template>
  <div>
    <v-modal 
      title="补贴审核"
      :commit="commit"
      :mystyle="sty"
      ref="modal"
      >
        <div slot="body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">金额</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" :value="param.amount" disabled>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">操作</label>
              <div class="col-sm-10">
                <select class="form-control" v-model="state">
                  <option value="">请选择</option>
                  <option v-for="(v, k) of status" :value="k">{{v}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">备注</label>
              <div class="col-sm-10">
                <textarea type="text" class="form-control" v-model="reason"></textarea>
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
* 入参：
* param:type   - add:新增， update:更新
* param:title   - 标题
* param:id   - 分类ID
* param:name   - 分类名
**/
<script>
import modal from '@/components/modal';
import { PLATFORM_SUBSIDY_PASS, SUBSIDY_REJECTED, PLATFORM_SUBSIDY_DELAYED } from '@/config/env';

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
  data() {
    return {
      state: '',
      reason: '',
      sty: { width: '350px' },
      status: {
        delayed: '延后',
        rejected: '未通过',
        passed: '通过',
      },
      apiObj: {
        delayed: PLATFORM_SUBSIDY_DELAYED,
        rejected: SUBSIDY_REJECTED,
        passed: PLATFORM_SUBSIDY_PASS,
      },
    };
  },
  components: {
    'v-modal': modal,
  },
  methods: {
    async commit() {
      const param = {
        reason: this.reason,
      };
      const api = this.apiObj[this.state];
      const res = await this.$http.post(`${api}${this.param.id}`, param);
      if (res.success) {
        window.console.log(this.api, '访问成功！！！', this.param);
        this.$refs.modal.toggle();
        this.handler();
      }
    },
  },
  watch: {
    param() {
      this.reason = this.param.reason;
    },
  },
};
</script>

<style scoped>
</style>