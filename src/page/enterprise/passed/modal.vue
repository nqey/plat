<template>
  <div>
    <v-modal
      :title="title"
      :ok="confirm"
      ref="modal">
      <div slot="body" class="number">
        <div>
          <span>历史免费总数：</span>
          <input type="text" v-model="znumber" class="form-control" disabled="disabled">
        </div>
        <div>
          <span>剩余免费数：</span>
          <input type="text" v-model="snumber" class="form-control" val-required no-validate-pass-tip>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
  import modal from '@/components/modal';
  import { PLATFORM_FREECODE_GET, PLATFORM_FREECODE_SET } from '@/config/env';
  import { Notification } from 'element-ui';

  export default {
    name: 'qrcode',
    props: {
      id: {
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
        znumber: null,
        snumber: null,
        title: '提示',
      };
    },
    components: {
      'v-modal': modal,
    },
    watch: {
      id() {
        this.getData();
      },
    },
    methods: {
      async getData() {
        const param = {
          enterpriseId: this.id,
        };
        const res = await this.$http.get(PLATFORM_FREECODE_GET, param);
        if (res.success) {
          const data = res.data;
          this.znumber = data.total;
          this.snumber = data.remain;
        }
      },
      async confirm() {
        const param = {
          enterpriseId: this.id,
          total: this.znumber,
          remain: this.snumber,
        };
        const data = await this.$http.post(PLATFORM_FREECODE_SET, param);
        if (data.success) {
          this.getData();
          Notification({
            type: 'success',
            position: 'bottom-right',
            message: data.message || '操作成功！',
            title: '成功',
          });
          return true;
        }
        return false;
      },
    },
  };
</script>

<style scoped>

  .number div {
    width: 300px;
    height: 40px;
    line-height: 40px;
    margin: 15px auto;
  }

  .number div span {
    width: 100px;
    display: inline-block;
  }

  .number div input {
    padding-left: 10px;
    float: right;
    width: 190px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #999;
  }

</style>
