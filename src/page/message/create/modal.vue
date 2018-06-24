<template>
  <div>
    <v-modal 
      title="发布公告"
      ref="modal">
       <div slot="body">
         发布成功！！！
       </div> 
       <div slot="footer">
         <button slot="footer" type="button" class="btn btn-primary" @click="close">确认</button>
       </div> 
    </v-modal>
  </div>
</template>

/**
* @author ： 秦超
*
* 入参：
**/
<script>
import modal from '@/components/modal';

export default {
  name: 'msg',
  components: {
    'v-modal': modal,
  },
  methods: {
    close() {
      this.$refs.modal.toggle();
    },
  },
};
</script>

<style scoped>
</style>