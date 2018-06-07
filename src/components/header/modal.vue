<template>
  <div>
    <v-modal 
      :title="tiile"
      :errMsg="errMsg"
      :commit="commit"
      ref="modal">
      <div style="position: relative; width: 440px; margin: 0px auto;" slot="body">
       <div class="jg">
        <small>不能使用特殊字符，长度在8-10之间</small> 
        <label>&#12288;原密码：　　</label> 
        <input type="password" v-model="param.originPassword" class="form-control input-w-250" />
       </div> 
       <div class="jg">
        <small>不能使用特殊字符，长度在8-10之间</small> 
        <label>输入密码：　　</label> 
        <input type="password" v-model="param.newPassword" class="form-control input-w-250" />
       </div> 
       <div class="jg">
        <small>请再次输入密码</small> 
        <label>确认密码：　　</label> 
        <input type="password" v-model="confirmPassword" class="form-control input-w-250" />
       </div> 
      </div>
    </v-modal>
  </div>
</template>

<script>
import modal from '@/components/modal';
import { UPDATE_PASSWORD } from '@/config/env';

export default {
  name: 'modalPassword',
  data() {
    return {
      api: UPDATE_PASSWORD,
      tiile: '修改密码',
      errMsg: [],
      confirmPassword: null,
      param: {
        originPassword: null,
        newPassword: null,
      },
    };
  },
  components: {
    'v-modal': modal,
  },
  methods: {
    val() {
      this.errMsg = [];
      if (!this.param.originPassword) {
        this.errMsg.push('请输入原密码');
      }
      if (!this.param.newPassword) {
        this.errMsg.push('请输入新密码');
      }
      if (!this.confirmPassword) {
        this.errMsg.push('请输入确认密码');
      } else if (this.param.newPassword !== this.confirmPassword) {
        this.errMsg.push('输入密码不一致');
      }
    },
    async commit() {
      this.val();
      if (this.errMsg.length > 0) return;
      const res = await this.$http.xhr('put', this.api, this.param);
      if (res.success) {
        window.console.log(this.api, '访问成功！！！');
        this.$refs.modal.toggle();
      }
    },
  },
};
</script>

<style scoped>

.input-w-250 {
  width: 320px;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  background: #f7f7f7;
  border: none;
  display: inline;
}
label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
    font-size: 14px;
}
small {
    position: absolute;
    top: 40px;
    left: 105px;
    color: #999;
    font-size: 85%;
}
.jg {
    position: relative;
    height: 90px;
}
</style>