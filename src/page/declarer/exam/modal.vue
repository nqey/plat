<template>
  <div>
    <v-modal 
      :title="title"
      ref="modal">
      <div slot="body">
        <div class="form-group">
           <textarea class="form-control" placeholder="请输入不通过原因" v-model="reason"></textarea>
        </div>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-info" @click="$refs.modal.toggle();handler(reason)">确认</button>
        <button type="button" class="btn btn-default" @click="$refs.modal.toggle();">取消</button>
      </div>
    </v-modal>
  </div>
</template>

/**
* @author ： 秦超
*
* handler: 返回原因
**/
<script>
import modal from '@/components/modal';

export default {
  name: 'agencyModal',
  props: {
    handler: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      title: '不通过原因',
      reason: null,
    };
  },
  components: {
    'v-modal': modal,
  },
};
</script>

<style scoped>
</style>