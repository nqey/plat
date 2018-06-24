<template>
  <div>
    <v-modal 
      :title="title"
      :mystyle="mystyle"
      ref="failuremodal">
        <div slot="body">
          <div style="text-align: center;font-size: 25px;margin: 30px 0;">驳回成功！</div>
        </div>
        <div slot="footer">
        </div>
    </v-modal>
  </div>
</template>

<script>
import modal from '@/components/modal';

export default {
  name: 'failureModal',
  props: {
    handler: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      title: '提示',
      mystyle: {
        width: '400px',
      },
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