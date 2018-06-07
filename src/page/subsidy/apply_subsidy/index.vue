<template>
  <div class="content">
      <div class="content_con">
          <div class="title">提现申请</div>
          <div class="box_left">
              <div class="entry">
                <span>提现金额</span>
                <div class="tx">
                  <input id="width" placeholder="请输入金额" />
                  <button style="color: #337cfd">全部提现</button>
                </div>
              </div>
              <div class="entry">
                <span>请选择银行</span>
                <select>
                  <option>请选择</option>
                  <option v-for="item in data">{{item.bankName}}</option>
                </select>
              </div>
              <div class="entry">
                <span>开户名</span>
                <input placeholder="请输入开户名"/>
              </div>
              <div class="entry">
                <span>开户行</span>
                <input placeholder="请精确到支行名称，否则无法到账" />
              </div>
              <div class="entry">
                <span>开户行账号</span>
                <input placeholder="请输入银行账号"/>
              </div>
              <div class="entry">
                <span>手机号码</span>
                <input placeholder="请输入手机号"/>
              </div>
              <div class="entry">
                <span>验证码</span>
                <input id="code" placeholder="请输入手机验证码" />
                <button class="paly_code">获取验证码</button>
              </div>
              <div class="entry">
                <router-link to="/subsidy/successful"  style="display: block;width: width: 80%; margin: 0 auto;">
                  <div class="but">确认提现</div>
                </router-link>
              </div>
          </div>
          <div class="box_right">
            <div>选择已添加银行卡</div>
              <div class="">
                <div class="card">
                  <div class="bank">
                    <img :src="bankCard1">
                  </div>
                  <div>
                    <div style="margin-top: 20px;">中国银行</div>
                    <div>储蓄卡</div>
                    <div style="font-size: 18px; margin-top: 20px;">**** **** **** 9876</div>
                  </div>
                </div>
                <div class="card">
                  <div class="bank">
                    <img :src="bankCard2">
                  </div>
                  <div>
                    <div style="margin-top: 20px;">农业银行</div>
                    <div>储蓄卡</div>
                    <div style="font-size: 18px; margin-top: 20px;">**** **** **** 6543</div>
                  </div>
                </div>
              </div>
            </div> 
          <div style="clear: both;"></div>
      </div>
  </div>
</template>

<script>
  import bankCard1 from '@/assets/img/bankcard1_2.png';
  import bankCard2 from '@/assets/img/bankcard2_2.png';
  // import { BANK_ADDRESS } from '@/config/env';

  export default {
    name: 'apply_subsidy',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        lists: [],
        bankCard1,
        bankCard2,
        data: [{
          bankId: 1,
          bankName: '中国银行',
          logo: 'http://pic.cpsdb61.com/7178a736b1af3fbd7836e74258510f7d',
        },
        {
          bankId: 2,
          bankName: '农业银行',
          logo: 'http://pic.cpsdb61.com/7178a736b1af3fbd7836e74258510f7d',
        }],
      };
    },
    computed: {
    },
    methods: {
      async getData() {
        // const param = {
        //   param1: '',
        //   param2: '',
        //   param3: '',
        // };
        // const res = await this.$http.get(BANK_ADDRESS, param);
        // if (res.sucess) {
        //   this.list = res;
        // }
        // 模拟请求的返回的数据
        // if (res.sucess) {
        // }
      },
    },
    watch: {
    },
    components: {
    },
    beforeCreate() {
    },
    cteated() {
    },
    beforeMount() {
    },
    mounted() {
      this.getData();
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.title{
  font-size: 20px;
  font-weight: 600;
  padding-left: 27px;
}
.box_left{
  width: 60%;
  line-height: 40px;
  float: left;
  display: inline-block;
  font-size: 16px;
}
.entry{
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 30px 0;
}
.entry span{
  width: 100px;
  height: 40px;
  display: inline-block;
  text-align: right;
  margin-right: 20px;
  font-family: "微软雅黑";
}
.tx{
  width: 80%;
  height: 40px;
  padding-left: 10px;
  display: inline-block;
  border:1px solid #dbe8ee;
}
.tx button{
  width: 19%;
  height: 38px;
  border: none;
  background: #fff;
}
#width{
  width: 80%;
  height: 36px;
  padding-left: 0px;
  display: inline-block;
  border:none;
}
.entry input{
  width: 80%;
  height: 40px;
  padding-left: 10px;
  border:1px solid #dbe8ee;
}
.entry select{
  width: 80%;
  height: 40px;
  padding-left: 10px;
  border:1px solid #dbe8ee;
}
#code{
  width: 50%;
  height: 40px;
  padding-left: 10px;
  border:1px solid #dbe8ee;
}
.paly_code{
  width: 25%;
  height: 40px;
  display: inline-block;
  margin-left: 3%;
  text-align: center;
  color: #327dfa;
  background-color: #eaf4fe;
  border:none;
}
.but{
  width: 80%;
  margin-top: 50px;
  margin-left: 125px;
  height: 40px;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  background-color: #337cfd;
}
.box_right{
  width: 38%;
  font-size: 16px;
  float: left;
}
.bank{
  width: 60px;
  height: 120px;
}
.card{
  width: 250px;
  height: 120px;
  display: block;
  border-radius: 5px;
  margin-top: 25px;
  background: green;
}
.card img{
  margin: 20px 0 0 20px;
}
.card > div{
  color: #fff;
  font-size: 14px;
  float: left;
}
.card > div > div{
  margin-left: 8px;
}
input, select, button{
  outline:none;
}
:-moz-placeholder {
    color: #aab0c0; 
}

::-moz-placeholder {
    color: #aab0c0;
}

input:-ms-input-placeholder{
    color: #aab0c0;
}

input::-webkit-input-placeholder{
    color: #aab0c0;
}

</style>