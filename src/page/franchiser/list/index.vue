<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>名称</label>
              <input type="text" class="form-control" v-model="name" placeholder="请输入经销商名称">
            </div>
            <div class="form-group col-md-4">
              <label>负责人</label>
              <input type="text" class="form-control" v-model="charger" placeholder="请输入负责人姓名">
            </div>
            <div class="form-group col-md-4">
              <label>电话号码</label>
              <input type="text" class="form-control" v-model="cellphone" placeholder="请输入负责人手机号码">
            </div>
            <div class="form-group col-md-8">
              <label>按地区查找</label>
              <v-area :code="areaCode" :onAreaChanged="(code) => liveAddress = code"></v-area>
            </div>
            <div class="form-group but col-md-8">
              <button type="button" class="btn btn-primary" @click="search">
                <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="reset" class="btn btn-primary" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <h4>经销商列表</h4>
      <hr/>
      <v-datagrid :columns="columns"
                  :data-url="dataUrl"
                  :count-url="countUrl"
                  :params="datagridParams">
      </v-datagrid>
      <v-modal ref="modal"
              :goodsId="goodsId"
              :cellphones="cellphones"
              :handler="modalHandler">
      </v-modal>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import area from '@/components/area';
  import modal from '@/page/franchiser/list/modal';
  import { PLATFORM_FRANCHISER_QUERY, PLATFORM_FRANCHISER_QUERY_COUNT } from '@/config/env';

  export default {
    name: 'index',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        modalHandler: () => {
          this.datagridParams = {};
        },
        datagridParams: {
          name: null,
          charger: null,
          cellphone: null,
          areaCode: '',
          page: 1,
          rows: 20,
        },
        stateObj: {
          unusering: '信息未完善',
          wait: '待审核',
          failed: '未通过',
          usering: '可用',
          lock: '锁定',
        },
        name: null,
        charger: null,
        cellphone: null,
        areaCode: '',
        liveAddress: '',
        goodsId: null,
        cellphones: null,
        dataUrl: PLATFORM_FRANCHISER_QUERY,
        countUrl: PLATFORM_FRANCHISER_QUERY_COUNT,
        columns: [{ field: 'id', header: '二维码编号', width: 200 },
          { field: 'name', header: '经销商名称', width: 260 },
          {
            field: 'state',
            header: '状态',
            width: 180,
            formatter: row => this.stateObj[row.state],
          },
          { field: 'charger', header: '负责人', width: 120 },
          { field: 'cellphone', header: '手机号码', width: 100 },
          {
            field: 'address',
            header: '营业地址',
            width: 400,
            formatter: row => `${row.address.area}-${row.address.address}`,
          },
          {
            field: 'skuList',
            header: '授权商品',
            width: 180,
            height: 100,
            html: true,
            formatter: row => `<textarea disabled>${JSON.stringify(row.skuList)}</textarea>`,
          },
          {
            field: 'authorized_account',
            header: '授权账号',
            width: 150,
            actions: [{
              text: '【查看】',
              show() {
                return true;
              },
              handler: (row) => {
                this.goodsId = row.id;
                this.cellphones = row.cellphone;
                this.$refs.modal.$refs.modal.toggle();
              },
            }],
          },
          {
            field: 'sweep_code',
            header: '扫码情况',
            width: 150,
            actions: [{
              text: '【查看】',
              show() {
                return true;
              },
              handler: (row) => {
                this.$router.push(`/franchiser/list/scan/${row.id}`);
              },
            }],
          },
          {
            field: 'action',
            header: '操作',
            width: 200,
            actions: [{
              text: '【查看】',
              show() {
                return true;
              },
              handler: (row) => {
                this.$router.push(`/franchiser/list/view/${row.id}`);
              },
            }],
          },
        ],
      };
    },
    components: {
      'v-datagrid': datagrid,
      'v-area': area,
      'v-modal': modal,
    },
    methods: {
      search() {
        this.datagridParams = {
          name: this.name || null,
          charger: this.charger || null,
          cellphone: this.cellphone || null,
          areaCode: this.liveAddress || null,
          page: 1,
          rows: 20,
        };
      },
      clear() {
        this.name = null;
        this.charger = null;
        this.cellphone = null;
        this.areaCode = '';
        setTimeout(() => { this.areaCode = null; }, 10);
        this.datagridParams = {};
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
</style>
