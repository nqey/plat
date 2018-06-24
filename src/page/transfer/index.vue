<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4 class="t_nav">&#12288;操作结果</h4>
      <hr>
      <div style="width: 100%;text-align: center; padding:7% 0;">
        <div style="display: inline-block;width: 50px;height: 50px;border-radius: 25px;border: #01c853 1px solid;">
          <span class="glyphicon glyphicon-ok" style="line-height: 45px;font-size: 20px; color:  #01c853"></span>
        </div>
        <br/>
        <br/>
        <p>{{ data.message || '操作成功！' }}</p>
        <br/>
        <br/>

        <a v-for="btn of data.buttons" :href="btn.link">
          <button class="btn btn-info" style="margin: 15px;">{{ btn.text }}</button>
        </a>
        <a @click="back">
          <button class="btn btn-info" style="margin: 15px;">{{ data.back || '返回' }}</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'transfer',
    data() {
      return {
        data: {
          message: '操作成功！',
          back: '返回',
          buttons: [{
            text: '',
            to: '',
          }],
        },
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
    },
    mounted() {
      try {
        const data = this.$route.params.data;
        if (data && typeof data === 'string') {
          this.data = JSON.parse(decodeURIComponent(data));
        } else {
          this.data = data || {};
        }
      } catch (e) {
        this.data = {};
      }
    },
  };
</script>

<style lang="scss" scoped>

</style>
