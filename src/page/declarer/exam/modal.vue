<template>
  <div>
    <v-modal 
      :title="title"
      :ok="handler(reason)"
      ref="modal">
      <div slot="body">
        <div class="form-group">
           <textarea class="form-control" placeholder="请输入不通过原因" v-model="reason"></textarea>
        </div>
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