<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>名&#12288;&#12288;称</label>
              <input type="text" class="form-control" v-model="filter.name" placeholder="请输入经销商名称">
            </div>
            <div class="form-group col-md-4">
              <label>负&#12288;责&#12288;人</label>
              <input type="text" class="form-control" v-model="filter.charger" placeholder="请输入负责人姓名">
            </div>
            <div class="form-group col-md-4">
              <label>电话号码</label>
              <input type="text" class="form-control" v-model="filter.cellphone" placeholder="请输入负责人手机号码">
            </div>
            <div class="form-group col-md-6">
              <label>营业地址</label>
              <v-area :code="filter.areaCode" :onAreaChanged="(code) => filter.areaCode = code"/>
            </div>
            <div class="form-group but col-md-3">
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
      <v-datagrid :columns="columns" :data-url="dataUrl" :count-url="countUrl" :params="params"/>

      <v-modal ref="modal" :title="'提示'" :width="+'300'" :height="+'200'">
        <div slot="body" class="account-body">
          <div>登录账号: <span>{{account}}</span></div>
          <div>登录密码: <span>**************</span></div>
        </div>
        <div slot='footer'></div>
      </v-modal>
    </div>
  </div>
</template>


<script>
  import { reomveBlank } from '@/config/utils';
  import { PLATFORM_FRANCHISER_QUERY, PLATFORM_FRANCHISER_QUERY_COUNT } from '@/config/env';
  import { FRANCHISER_USER_STATE } from '@/config/mapping';

  export default {
    name: 'franchierList',
    data() {
      return {
        params: {},
        filter: {
          name: null,
          charger: null,
          cellphone: null,
          areaCode: '',
        },
        // 账号弹框显示的账号信息
        account: null,
        dataUrl: PLATFORM_FRANCHISER_QUERY,
        countUrl: PLATFORM_FRANCHISER_QUERY_COUNT,
        columns: [{ field: 'authCode', header: '二维码编号', width: 200 },
          { field: 'name', header: '经销商名称', width: 260 },
          {
            field: 'state',
            header: '状态',
            width: 180,
            formatter: row => FRANCHISER_USER_STATE[row.state],
          },
          { field: 'charger', header: '负责人', width: 120 },
          { field: 'cellphone', header: '手机号码', width: 100 },
          {
            field: 'address',
            header: '营业地址',
            width: 400,
            formatter(row) {
              try {
                return `${row.address.area}-${row.address.address}`;
              } catch (ignore) {
                // do nothing
              }
              return '';
            },
          },
          {
            field: 'skuList',
            header: '授权商品',
            width: 180,
            html: true,
            formatter(row) {
              return (row.skuList || []).map(s => s.skuName).join('<br/>');
            },
          },
          {
            field: 'authorized_account',
            header: '授权账号',
            width: 150,
            actions: [{
              text: '【查看】',
              handler: (row) => {
                this.account = row.cellphone;
                this.$refs.modal.open();
              },
            }],
          },
          {
            field: 'sweep_code',
            header: '扫码情况',
            width: 150,
            actions: [{
              text: '【查看】',
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
              handler: (row) => {
                this.$router.push(`/franchiser/list/view/${row.id}`);
              },
            }],
          },
        ],
      };
    },
    components: {
      'v-datagrid': () => import('@/components/datagrid'),
      'v-area': () => import('@/components/area'),
      'v-modal': () => import('@/components/modal'),
    },
    methods: {
      search() {
        this.params = reomveBlank(this.filter);
      },
      clear() {
        this.params = {};
        this.filter = { areaCode: '' };
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

  .account-body {
    padding: 20px;
    text-align: center;
  }
</style>
