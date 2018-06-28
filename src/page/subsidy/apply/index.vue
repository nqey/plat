<template>
  <div class="plat-content">
    <div class="plat-content-con" style="text-align: center;">
      <img :src="subsidies" style="width: 124px;height: 124px;">
      <br/>
      <div class="money"><span>{{money}}</span>元</div>
      <br/>
      <router-link to="/subsidy/list">查看补贴明细</router-link>
      <br/>
      <br/>
      <button class="btn btn-primary" style="width: 350px;height: 35px;" @click="apply" :disabled="applyBtnDisabled">
        申请补贴
      </button>
    </div>
  </div>
</template>

<script>
  import subsidies from '@/assets/img/subsidies.png';
  import { PLATFORM_SUBSIDY_PROVINCE_AMOUNT } from '@/config/env';

  export default {
    name: 'apply',
    data() {
      return {
        subsidies,
        lists: [],
        money: 0,
        applyBtnDisabled: false,
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      apply() {
        this.$router.push('/subsidy/apply_subsidy');
      },
      async getData() {
        const res = await this.$http.get(PLATFORM_SUBSIDY_PROVINCE_AMOUNT);
        if (res.success) {
          this.money = res.data;
          // 金额不大于0，按钮置灰
          this.applyBtnDisabled = !(this.money > 0);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

  .index_more {
    background: #f6f7fb;
    height: 100%;
    padding-bottom: 200px;
    width: 100%;
  }

  .index_chunk {
    position: relative;
    top: 120px;
    left: 19%;
    margin: 0;
    width: 78%;
    background: #fff;
    padding: 40px 70px 55px;
    border-radius: 4px;
    box-shadow: 0px 20px 20px -20px #ddd;
  }

  .money {
    font-size: 16px;
  }

  .money span {
    font-size: 22px;
    font-weight: 600;
  }
</style>
