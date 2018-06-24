<template>
  <div>
    <v-modal 
      :title="title"
      ref="passmodal">
        <div slot="body">
          <div style="text-align: center;margin: 50px 0;font-size: 25px;">已通过！</div>
        </div>
        <div slot='footer'>
        </div> 
    </v-modal>
  </div>
</template>

<script>
import modal from '@/components/modal';

export default {
  name: 'passModal',
  props: {
    goodsId: {
      type: Number,
      default: null,
    },
    handler: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      title: '提示',
    };
  },
  components: {
    'v-modal': modal,
  },
  watch: {},
  methods: {},
};
</script>

<style scoped>
</style>