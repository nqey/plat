<template>
  <div class="content">
    <div class="content_con">
      <br/>
      <br/>
      <!--筛选条件-->
      <div class="filters">
          <div class="form-inline row clearfix">
              <div class="form-group col-md-4">
                  <label>SKU属性</label>
                  <input type="text" class="form-control" v-model="id" placeholder="请输入SKU属性">
              </div>
              <div class="form-group col-md-4">
                  <button type="button" class="search btn-primary btn datagrid-search" @click="search">
                      <span class="glyphicon glyphicon-search"></span>搜索
                  </button>
                  <button type="reset" class="search clear btn-primary btn datagrid-clear" @click="clear">清空</button>
              </div>
          </div>
      </div>
      <br/>
      <br/>
      <br/>
      <v-datagrid :toolbar="toolbar" :columns="columns" :checkable="checkable"
                  :pageable="pageable" :params="datagridParams"
                  :data-url="dataUrl" :count-url="countUrl" ref="dg"
      ></v-datagrid>
      <v-modal ref="modal" :param="modalParams" :handler="modalHandler"></v-modal>
      <v-excel-modal ref="excelModal" :handler="modalHandler"></v-excel-modal>
      <v-detail-modal ref="detailModal" :params="detailParams" :data-url="detailDataUrl" :count-url="detailCountUrl"></v-detail-modal>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid';
import { formatDate } from '@/config/utils';
import excelModal from '@/page/goods/attribute/excelModal';
import detailModal from '@/page/goods/attribute/detailModal';
import modal from '@/page/goods/attribute/modal';
import { PLATFORM_ATTRIBUTE_QUERY, PLATFORM_ATTRIBUTE_QUERY_COUNT, PLATFORM_ATTRIBUTE_VALUE_QUERY, PLATFORM_ATTRIBUTE_VALUE_QUERY_COUNT } from '@/config/env';

export default {
  name: 'attribute',
  data() {
    return {
      modalHandler: () => {
        this.datagridParams = {};
      },
      datagridParams: {
        id: null,
      },
      detailParams: {
        attributeId: null,
      },
      modalParams: {
        type: null,
        title: null,
      },
      id: null,
      dataUrl: PLATFORM_ATTRIBUTE_QUERY,
      countUrl: PLATFORM_ATTRIBUTE_QUERY_COUNT,
      detailDataUrl: PLATFORM_ATTRIBUTE_VALUE_QUERY,
      detailCountUrl: PLATFORM_ATTRIBUTE_VALUE_QUERY_COUNT,
      pageable: true,
      toolbar: [
        {
          title: '新增',
          handler: () => {
            this.modalParams = {
              type: 'add',
              title: '新增',
            };
            this.$refs.modal.$refs.modal.toggle();
          },
        },
        {
          title: '批量导入',
          handler: () => {
            this.$refs.excelModal.$refs.excelModal.toggle();
          },
        },
      ],
      checkable: false,
      columns: [
        {
          field: 'id',
          header: '序号',
          sort: 'id',
          // width: '25%',
        },
        {
          field: 'name',
          header: 'SKU属性名',
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
              this.modalParams = {
                type: 'update',
                title: `修改SKU属性【${row.name}】`,
                name: row.name,
                id: row.id,
              };
              this.$refs.modal.$refs.modal.toggle();
            },
          },
          {
            text: '【查看属性值】',
            show() {
              return true;
            },
            handler: (row) => {
              this.detailParams = {
                attributeId: row.id,
                title: `【${row.name}】的属性值`,
              };
              this.$refs.detailModal.$refs.detailModal.toggle();
            },
          }],
        },
      ],
    };
  },
  computed: {
  },
  methods: {
    search() {
      this.datagridParams = { id: this.id };
    },
    clear() {
      this.id = null;
      this.datagridParams = {};
    },
  },
  components: {
    'v-datagrid': datagrid,
    'v-excel-modal': excelModal,
    'v-detail-modal': detailModal,
    'v-modal': modal,
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>