<template>
  <div>
    <v-modal
      title="未通过原因"
      ref="nopassmodal"
      :width="width">
      <div slot="body">
        <div style="text-align: center;">{{instructions}}</div>
      </div>
      <div slot='footer'>
      </div>
    </v-modal>
  </div>
</template>

<script>
  import modal from '@/components/modal';

  export default {
    name: 'nopassmodal',
    props: {
      width: {
        type: Number,
        default: 400,
      },
      reason: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        instructions: this.reason,
      };
    },
    components: {
      'v-modal': modal,
    },
    methods: {},
    watch: {},
  };
</script>

<style scoped>
</style>
