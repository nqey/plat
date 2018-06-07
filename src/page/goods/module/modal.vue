<template>
  <div>
    <v-modal 
      :title="title"
      :errMsg="errMsg"
      :commit="commit"
      ref="moduleModal">
        <div slot="body">
          <table>
            <tbody>
              <tr>
                <td>名称：</td>
                <td>
                  <input type="text" v-model="name"></td>
              </tr>
              <tr>
                <td>内容：</td>
                <td>
                  <textarea v-model="content" style="width: 500px; height: 300px;resize:none;"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
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
import { PLATFORM_TEMPLATE_QUERY_UPDATE } from '@/config/env';

export default {
  name: 'moduleModal',
  props: {
    params: {
      type: Object,
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
      title: '修改',
      id: '',
      name: '',
      content: '',
      errMsg: [],
    };
  },
  components: {
    'v-modal': modal,
  },
  watch: {
    params() {
      this.id = this.params.id;
      this.name = this.params.name;
      this.content = this.params.content;
    },
  },
  methods: {
    val() {
      this.errMsg = [];
      if (!this.name) {
        this.errMsg.push('请输入名称');
      }
      if (!this.content) {
        this.errMsg.push('请输入内容');
      }
    },
    async commit() {
      this.val();
      if (this.errMsg.length > 0) return;
      const params = {
        id: this.params.id,
        name: this.params.name,
        content: this.params.content,
      };
      const res = await this.$http.post(PLATFORM_TEMPLATE_QUERY_UPDATE, params);
      if (res.success) {
        window.console.log(this.api, '访问成功！！！', this);
        this.$refs.moduleModal.toggle();
        this.handler();
      }
    },
  },
};
</script>

<style scoped>
</style>