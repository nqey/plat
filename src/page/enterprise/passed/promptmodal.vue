<template>
  <v-modal :title="title"
           :commit="commit"
           ref="promptmodal">
            <div slot="body" style="padding: 40px 0;">
              <div style="text-align: center;font-size: 20px;">修改成功！</div>
            </div>
            <div slot='footer'>
            </div>
  </v-modal>
</template>

<script>
import modal from '@/components/modal';

export default {
  name: 'pormptmodal',
  props: {
    value: {
      type: String,
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
  methods: {
    async commit() {
      // const param = {
      //   enterpriseId: this.id,
      //   total: this.znumber,
      //   remain: this.snumber,
      // };
      // const data = await this.$http.post(PLATFORM_FREECODE_SET, param);
      // if (data.success) {
      //   this.$refs.modal.toggle();
      //   this.getData();
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>