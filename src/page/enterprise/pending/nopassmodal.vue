<template>
  <div>
    <v-modal 
      :title="title"
      :ok="submit"
      ref="nopassmodal">
        <div slot="body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">原因</label>
              <div class="col-sm-10">
                <textarea rows="10" class="form-control" v-model="mark"></textarea>
              </div>
            </div>
          </form>
        </div>
    </v-modal>
  </div>
</template>

<script>
import modal from '@/components/modal';
import { PLATFORM_EP_REJECT } from '@/config/env';

export default {
  name: 'nopassModal',
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      mark: null,
      title: '不通过',
    };
  },
  components: {
    'v-modal': modal,
  },
  watch: {},
  methods: {
    async submit() {
      const params = {
        enterpriseId: this.id,
        mark: this.mark,
      };
      const res = await this.$http.post(PLATFORM_EP_REJECT, params);
      if (res.success) {
        this.$transfer({
          buttons: [{
            text: '去列表',
            link: '/enterprise/pending',
          }],
        });
      }
    },
  },
};
</script>

<style scoped>
</style>