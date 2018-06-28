<template>
  <div>
    <div class="header">
      <a style="display: block;height: 40px;width: 65px;" href="javascript:void 0">
        <img :src="getPictureUrl(avatar, {f:'png',w:40,h:40})" style="height: 40px;">
        <div class="caret"></div>
      </a>
      <div class="userModal">
        <img style="height: 100px;" :src="getPictureUrl(avatar, {f:'png'})">
        <h5>{{username}}</h5>
        <button class="btn" @click="open">修改密码</button>
        <button class="btn" @click="logout">退出登录</button>
      </div>
    </div>
    <div class="bj"></div>
    <v-modal :title="'修改密码'"
             :ok="commit"
             ref="modal">
      <div slot="body">
        <div class="jg">
          <label>当前密码：<input type="password" v-model="param.originPassword" val-required val-password
                             class="form-control input-w-250"/></label>
        </div>
        <div class="jg">
          <label>修改密码：<input type="password" v-model="param.newPassword" val-required val-password
                             class="form-control input-w-250"/></label>
        </div>
        <div class="jg">
          <label>确认密码：<input type="password" v-model="confirmPassword" val-required val-password
                             class="form-control input-w-250"/></label>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
  import { delCookie } from '@/config/cookie';
  import { getPictureUrl } from '@/config/utils';
  import { UPDATE_PASSWORD } from '@/config/env';
  import { Message } from 'element-ui';

  export default {
    name: 'topHeader',
    data() {
      return {
        getPictureUrl,
        username: window.sessionStorage.getItem('username'),
        avatar: window.sessionStorage.getItem('avatar'),
        confirmPassword: null,
        param: {
          originPassword: null,
          newPassword: null,
        },
      };
    },
    methods: {
      logout() {
        delCookie('platform_user');
        window.sessionStorage.clear();
        this.$router.push('/login');
      },
      open() {
        this.$refs.modal.open();
      },
      async commit() {
        if (this.param.newPassword !== this.confirmPassword) {
          Message.error('输入密码不一致');
          return false;
        }

        const res = await this.$http.put(UPDATE_PASSWORD, this.param);
        return res.success;
      },
    },
    components: {
      'v-modal': () => import('@/components/modal'),
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin.scss';

  a:focus + div, .userModal:hover {
    background: #fff;
    height: 260px;
    padding: 25px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    border: 1px solid rgba(0, 0, 0, .15);
  }

  .userModal {
    position: absolute;
    width: 180px;
    height: 0px;
    padding: 0px;
    border-radius: 4px;
    right: 110px;
    top: 80px;
    text-align: center;
    overflow: hidden;
    transition: all 0.2s linear;
  }

  h5 {
    font-weight: 600;
    line-height: 25px;
    padding: 10px 0;
  }

  button {
    background: none;
    border: 1px solid #ccc;
    border-radius: 45px;
    padding: 4px 20px;
    color: #949494;
    font-size: 12px;
  }

  .header {
    position: fixed;
    z-index: 100;
    background: #4063FF;
    height: 90px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 25px 160px 0px 0px;
  }

  .caret {
    margin-left: 10px;
    border-top: 4px solid #fff;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }

  .bj {
    background: #4063FF;
    height: 300px;
    position: fixed;
    width: 100%;
  }

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
