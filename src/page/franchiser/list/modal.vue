<template>
  <div>
    <v-modal 
      :title="title"
      ref="modal">
       <div slot="body" class="cen">
        <div>登录账号:  <span>{{cellphones}}</span></div>
        <div>登录密码:  <span>**************</span></div>
       </div> 
       <div slot='footer'>
       </div>
    </v-modal>
  </div>
</template>

<script>
import modal from '@/components/modal';

export default {
  name: 'franchiserModal',
  props: {
    goodsId: {
      type: Number,
      default: null,
    },
    cellphones: {
      type: String,
      default: null,
    },
    handler: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      radius: null,
      innerTimes: null,
      outerChangeTimes: null,
      title: '提示',
    };
  },
  components: {
    'v-modal': modal,
  },
  // watch: {
  //   goodsId() {
  //     this.init();
  //   },
  // },
  // methods: {
  //   async init() {},
  //   async commit() {},
  // },
};
</script>

<style scoped>

.cen{
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  padding: 40px 0;
}
.cen div span{
  color: #666;
}
</style>