<template>
  <div>
    <v-modal 
      :title="title"
      :errMsg="errMsg"
      :commit="commit"
      :mystyle="mystyle"
      ref="viewmodal">
       <div slot="body">
        <v-datagrid :columns="columns"
                    :checkable="checkable"
                    :singleCheck="singleCheck"
                    :onSelected="onSelected"
                    :data-url="dataUrl"
                    :count-url="countUrl">
        </v-datagrid>
       </div> 
    </v-modal>
    <v-successmodal ref="successmodal"></v-successmodal>
  </div>
</template>

<script>
import successmodal from '@/page/enterprise/collectting/successmodal';
import modal from '@/components/modal';
import datagrid from '@/components/datagrid';
import { formatDate } from '@/config/utils';
import { PLATFORM_AUTHOFFICER_QUERY, PLATFORM_AUTHOFFICER_QUERY_COUNT, PLATFORM_EP_AUTHOFFICER } from '@/config/env';

export default {
  name: 'viewModal',
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
      title: '认证官列表',
      PLATFORM_EP_AUTHOFFICER,
      errMsg: [],
      mystyle: {
        width: '800px',
      },
      onSelected: (row) => {
        this.authofficerId = row.id;
      },
      authofficerId: '',
      enterpriseId: this.$route.params.id,
      checkable: true,
      singleCheck: true,
      dataUrl: PLATFORM_AUTHOFFICER_QUERY,
      countUrl: PLATFORM_AUTHOFFICER_QUERY_COUNT,
      columns: [{ field: 'name', header: '姓名', width: 150 },
        { field: 'organizTel', header: '联系电话', width: 150 },
        { field: 'organiz', header: '服务中心', width: 300 },
        {
          field: 'createTime',
          header: '提交时间',
          sort: 'create_time',
          width: 200,
          formatter(row, index, value) {
            return formatDate(value);
          },
        },
      ],
    };
  },
  components: {
    'v-modal': modal,
    'v-datagrid': datagrid,
    'v-successmodal': successmodal,
  },
  watch: {
    goodsId() {
      this.init();
    },
  },
  methods: {
    async commit() {
      const param = {
        authofficerId: this.authofficerId,
      };
      const res = await this.$http.post(`${this.PLATFORM_EP_AUTHOFFICER}/${this.enterpriseId}`, param);
      if (res.success) {
        this.$refs.viewmodal.toggle();
        this.$refs.successmodal.$refs.successmodal.toggle();
        this.handler();
      }
    },
  },
};
</script>

<style scoped>
</style>