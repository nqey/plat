<template>
  <div>
    <div class="header">
      <a style="display: block;height: 40px;width: 65px;" href="javascript:void 0">
        <img src="//pic.cpsdb.com/72747ee92c3fdf007ae76c8e259f46cf?w=40&amp;h=40&amp;f=png" style="height: 40px;">
        <div class="caret"></div>
      </a>
      <div class="userModal">
        <img src="//pic.cpsdb.com/72747ee92c3fdf007ae76c8e259f46cf?">
        <h5>{{username}}</h5>
        <button class="btn" @click="$store.commit('isModalVisible')">修改密码</button>
        <button class="btn" @click="logout">退出登录</button>
      </div>
    </div>
    <div class="bj"></div>
  </div>
</template>

<script>
import { delCookie } from '@/config/cookie';

export default {
  name: 'topHeader',
  data() {
    return {
      username: window.sessionStorage.getItem('username'),
    };
  },
  methods: {
    logout() {
      delCookie('platform_user');
      window.sessionStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

a:focus + div, .userModal:hover {
  background: #fff;
  height: 260px;
  padding: 25px;
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  border: 1px solid rgba(0,0,0,.15);
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

</style>