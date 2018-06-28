<template>
  <div>
    <v-modal
      title="补贴审核"
      :ok="commit"
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
                <option v-for="(v, k) of SUBSIDY_STATE" :value="k">{{v}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">备注</label>
            <div class="col-sm-10">
              <textarea type="text" class="form-control" v-model="reason" :val-required="state!='passed'"
                        style="resize: none;height: 200px;" placeholder="录入备注（*必填）"></textarea>
            </div>
          </div>
        </form>
      </div>
    </v-modal>
  </div>
</template>

<script>
  import modal from '@/components/modal';
  import { PLATFORM_SUBSIDY_PASS, SUBSIDY_REJECTED, PLATFORM_SUBSIDY_DELAYED } from '@/config/env';
  import { Notification } from 'element-ui';

  export default {
    name: 'attributeModal',
    props: {
      param: {
        type: Object,
        default: null,
      },
      callback: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        state: 'passed',
        reason: '',
        SUBSIDY_STATE: {
          passed: '通过',
          rejected: '不通过',
          delayed: '延后',
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
          Notification({
            type: 'success',
            position: 'bottom-right',
            message: res.message || '操作成功！',
            title: '成功',
          });
          this.callback();
          return true;
        }
        return false;
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
