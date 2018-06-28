<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>条&#12288;&#12288;码</label>
              <input type="text" class="form-control" v-model="filter.barcode" placeholder="请输入条码">
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="btn btn-primary" @click="search">
                <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="button" class="btn btn-primary" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>

      <h4>条码列表</h4>
      <hr/>
      <v-datagrid :toolbar="toolbar" :columns="columns" :params="params" :data-url="dataUrl" :count-url="countUrl"/>

      <v-modal ref="excelModal" :title="'导入条码'" :ok="commit">
        <div slot="body">
          <div style="margin: 30px 20px" class="dialog-content">
            <table>
              <tbody>
              <tr>
                <td>导入Excel：</td>
                <td>
                  <input type="file" accept=".xls" @change="file = $event.target.files[0]">
                </td>
                <td>
                  <a download :href="EXCEL_SERVER_URL + '/template/barcode.xls'">【下载模板】</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </v-modal>
    </div>
  </div>
</template>

<script>
  import { formatDate, reomveBlank } from '@/config/utils';
  import { PLATFORM_BARCODE_QUERY, PLATFORM_BARCODE_QUERY_COUNT, BARCODE_UPLOAD, EXCEL_SERVER_URL } from '@/config/env';

  export default {
    name: 'barcode',
    data() {
      return {
        EXCEL_SERVER_URL,
        params: {},
        filter: {
          barcode: null,
        },
        dataUrl: PLATFORM_BARCODE_QUERY,
        countUrl: PLATFORM_BARCODE_QUERY_COUNT,
        file: null,
        toolbar: [{
          title: '批量导入',
          handler: () => {
            this.$refs.excelModal.open();
          },
        }],
        columns: [
          {
            field: 'id',
            header: '序号',
            sort: 'id',
            width: 80,
          },
          {
            field: 'barcode',
            header: '条码',
            sort: 'barcode',
            width: 230,
          },
          {
            field: 'createTime',
            header: '创建时间',
            sort: 'create_time',
            width: 230,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'json',
            header: '属性',
            sort: 'json',
            // width: 650,
            formatter(row, index, value) {
              try {
                // 数据结构是： "[{"生产日期":"2017年11月11日"},{"包装":"硬壳"},{"规格":"20支"}]"
                // 要拼装成： 生产日期：2017年11月11日；包装：硬壳；规格：20支
                return (value && typeof value === 'string' && JSON.parse(value) || [])
                  .map(p => Object.entries(p)
                    .map(s => `${s[0]}：${s[1]}`)
                    .join('；'))
                  .join('；');
              } catch (e) {
                return '';
              }
            },
          },
        ],
      };
    },
    methods: {
      search() {
        this.params = reomveBlank(this.filter);
      },
      clear() {
        this.params = {};
        this.filter = {};
      },
      async commit() {
        // const file = this.$refs.upBarcode.files[0];
        const param = new FormData();
        param.append('file', this.file);
        const res = await this.$http.upload(BARCODE_UPLOAD, param);
        return res.success;
      },
    },
    components: {
      'v-datagrid': () => import('@/components/datagrid'),
      'v-modal': () => import('@/components/modal'),
    },
    mounted() {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

</style>
