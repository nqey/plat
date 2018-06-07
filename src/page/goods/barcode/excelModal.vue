<template>
  <div>
    <v-modal 
      :title="title"
      :errMsg="errMsg"
      :commit="commit"
      ref="excelModal">
       <div slot="body">
       <div style="margin: 30px 20px" class="dialog-content">
          <table>
           <tbody>
             <tr>
               <td>导入Excel：</td>
               <td>
                 <input type="file" name="file" accept=".xls" ref="upBarcode">
               </td>
               <td>
                 <a download :href="excel_server_url + '/template/barcode.xls'">【下载模板】</a>
               </td>
             </tr>
           </tbody>
          </table>
        </div>
       </div> 
    </v-modal>
  </div>
</template>

<script>
import modal from '@/components/modal';
import { BARCODE_UPLOAD, EXCEL_SERVER_URL } from '@/config/env';

export default {
  name: 'excelModal',
  components: {
    'v-modal': modal,
  },
  props: {
    handler: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      excel_server_url: EXCEL_SERVER_URL,
      title: '批量导入',
      errMsg: [],
    };
  },
  methods: {
    async commit() {
      const file = this.$refs.upBarcode.files[0];
      const param = new FormData();
      param.append('file', file);
      const res = await this.$http.upload(BARCODE_UPLOAD, param);
      if (res.success) {
        this.handler();
        this.$refs.excelModal.toggle();
        window.console.log('导入成功！！！', res);
      }
    },
  },
};
</script>

<style scoped>
</style>