<template>
  <div class="content">
    <div class="content_con">
      <div style="width: 100%;height: 300px;text-align: center;">
        <img :src="subsidies" style="width: 124px;height: 124px;margin: 125px auto 0;">
      </div>
      <div class="money center"><span v-for="money in moneys">{{money.amount}}</span>元</div>
      <div class="mx center">
        <router-link to="/subsidy/detail/list">
          查看补贴明细
        </router-link>
      </div>
      <router-link to="/subsidy/apply_subsidy" style="display: block;width: 300px; margin: 0 auto;">
        <div class="but center">
        申请提现
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import subsidies from '@/assets/img/subsidies.png';
  import { } from '@/config/env';

  export default {
    name: 'apply',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        lists: [],
        subsidies,
        moneys: '',
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        // const param = {
        //   param1: '',
        //   param2: '',
        //   param3: '',
        // };
        // const res = await this.$xhr('GET', APPLY_WITHDRAWALS_ADDRESS, param);
        // if (res.data.sucess) {
        //   this.list = res.data.data;
        // }
        this.moneys = [{
          amount: '15000,00',
        }];
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.center{
  text-align: center;
}
.money{
  font-size: 16px;
}
.money span{
  font-size:22px;
  font-weight: 600;
}
.mx{
  color: #337cfd;
  font-size: 16px;
  margin: 25px 0 50px 0;
}
.but{
  width: 300px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  letter-spacing: 2px;
  background-color: #337cfd;
}

</style>