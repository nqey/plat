<template>
  <div>
    <v-modal 
      :title="title"
      ref="moduleModalView">
        <div slot="body" v-html="content">
          <!-- <div v-html="html"></div> -->
        </div> 
        <div slot='footer'>
          <button slot="footer" type="button" class="btn btn-primary" @click="close">确认</button>
        </div>
    </v-modal>
  </div>
</template>

/**
* @author ： 秦超
*
**/
<script>
import modal from '@/components/modal';

export default {
  name: 'moduleModalView',
  props: {
    content: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      title: '预览',
    };
  },
  components: {
    'v-modal': modal,
  },
  methods: {
    close() {
      this.$refs.moduleModalView.toggle();
    },
  },
};
</script>

<style scoped>
</style>