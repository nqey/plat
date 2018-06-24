<template>
<div class="plat-content">
    <div class="plat-content-con">
        <h4>通告详情</h4>
         <hr>
        <div class="container text-center">
          <div class="content2">
            <h3>{{title}}</h3>
            <span style="color: #888888;font-style: 12px;">{{createDate}}</span>
            <div style="margin: 20px 0 40px;" v-html="content"></div>
            <router-link to="/message/list"><button class="btn fh">返回</button></router-link>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import { PUBLICS_NOTICES_DETAILS } from '@/config/env';

export default {
  name: 'detail',
  data() {
    return {
      title: '',
      content: '',
      createDate: '',
    };
  },
  methods: {
    async init() {
      const res = await this.$http.get(`${PUBLICS_NOTICES_DETAILS}${this.$route.params.id}`);
      if (res.success) {
        this.title = res.data.title;
        this.content = res.data.content;
        this.createDate = res.data.showDate;
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.content2{
  h3 {
    margin-bottom: 20px;
  }
}
</style>