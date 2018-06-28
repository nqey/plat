<template>
  <div>
    <v-modal 
      :title="params.title"
      :width="width"
      :okText="okText"
      :cancelText="cancelText"
      ref="detailModal">
       <div slot="body">
          <v-datagrid :toolbar="toolbar"
                      :columns="columns" :checkable="false"
                      :pageable="true" :params="modalParams"
                      :data-url="dataUrl" :count-url="countUrl"
          ></v-datagrid>
       </div>
    </v-modal>
    <v-value-modal ref="valueModal" :params="valueModalParams" :handler="modalHandler"></v-value-modal>
  </div>
</template>

<script>
import modal from '@/components/modal';
import { formatDate } from '@/config/utils';
import datagrid from '@/components/datagrid';
import valueModal from '@/page/goods/attribute/valueModal';

export default {
  name: 'detailModal',
  components: {
    'v-modal': modal,
    'v-datagrid': datagrid,
    'v-value-modal': valueModal,
  },
  props: {
    params: {
      type: Object,
      default: null,
    },
    dataUrl: {
      type: String,
      default: null,
    },
    countUrl: {
      type: String,
      default: null,
    },
  },
  watch: {
    params() {
      this.modalParams = {
        attributeId: this.params.attributeId,
      };
    },
  },
  data() {
    return {
      okText: '',
      cancelText: '关闭',
      width: 720,
      modalParams: {},
      valueModalParams: {},
      modalHandler: () => {
        this.modalParams = {
          attributeId: this.params.attributeId,
        };
      },
      toolbar: [
        {
          title: '新增',
          handler: () => {
            this.valueModalParams = {
              type: 'add',
              title: '新增',
              attributeId: this.params.attributeId,
            };
            this.$refs.valueModal.$refs.valueModal.toggle();
          },
        },
      ],
      columns: [
        {
          field: 'id',
          header: '序号',
          sort: 'id',
          // width: '25%',
        },
        {
          field: 'name',
          header: 'SKU属性值',
          sort: 'name',
          // width: '25%',
        },
        {
          field: 'createTime',
          header: '创建时间',
          sort: 'create_time',
          // width: '25%',
          formatter(row, index, value) {
            return formatDate(value);
          },
        },
        {
          field: 'action',
          header: '操作',
          // width: '25%',
          actions: [{
            text: '【修改】',
            show() {
              return true;
            },
            handler: (row) => {
              this.valueModalParams = {
                type: 'update',
                title: `修改SKU属性值【${row.name}】`,
                name: row.name,
                id: row.id,
              };
              this.$refs.valueModal.$refs.valueModal.toggle();
            },
          }],
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>