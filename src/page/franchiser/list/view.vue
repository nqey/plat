<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <div>
        <h4 class="title">
          <span>
          经销商详情
            <i class="red">（{{ FRANCHISER_USER_STATE[detail.base.state] }}）</i>
          </span>
        </h4>
      </div>
      <div class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">经销商名称</label>
          <div class="col-sm-10">
            <p class="form-control2">{{detail.base.name}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">经销商地址</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ detail.address ? `${detail.address.area}${detail.address.address}`:'' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">头&#12288;&#12288;&#12288;像</label>
          <div class="col-sm-10">
            <v-img :imgSrc="detail.base.portrait"/>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">负&#12288;责&#12288;人</label>
          <div class="col-sm-10">
            <p class="form-control2">{{detail.base.charger}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">手&#12288;机&#12288;号</label>
          <div class="col-sm-10">
            <p class="form-control2">{{detail.base.cellphone}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证号码</label>
          <div class="col-sm-10">
            <p class="form-control2">{{detail.base.idNumber}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身&#12288;份&#12288;证</label>
          <div class="col-sm-10 inline">
            <v-img :imgSrc="detail.base.idFrontUrl" class="inline"/>
            <v-img :imgSrc="detail.base.idBackUrl" class="inline"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">&#8197;资&#8197;质&#8197;证&#8197;书</label>
          <div class="col-sm-10 inline" v-if="detail.base.diplomaUrls">
            <v-img v-for="(diploma, index) in detail.base.diplomaUrls.split(',')"
                   :imgSrc="diploma" :key="index" class="inline"/>
          </div>
        </div>
      </div>
      <div v-if="detail.enterprises && detail.enterprises.length > 0" v-for="proxy of detail.enterprises">
        <h4 class="title"><span>{{ proxy.enterpriseName }}</span></h4>
        <div class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">商品授权书</label>
            <div class="col-sm-10 inline" v-if="proxy.imageList">
              <v-img v-for="(image, index) of proxy.imageList.split(',')"
                     :imgSrc="image" :key="`${image}_${index}`" class="inline"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">&#8197;授&#8197;权&#8197;商&#8197;品</label>
            <div class="col-sm-10 form-control2">
              <strong class="red" v-if="proxy.skuList.filter(s => s.state === 'passed').length > 0">已授权商品：</strong>
              <div v-for="sku of proxy.skuList.filter(s => s.state === 'passed')">
                <div class="franchiser-sku-container">
                  <strong>商品：</strong><span>{{ sku.skuName }} </span>
                  <div>
                    <strong>授权区域：</strong>
                    {{ sku.chargeAddress.map(s => s.area).join('；') }}
                  </div>
                </div>
              </div>
              <strong class="red" v-if="proxy.skuList.filter(s => s.state === 'rejected').length > 0">未通过授权商品：</strong>
              <div v-for="sku of proxy.skuList.filter(s => s.state === 'rejected')">
                <div class="franchiser-sku-container">
                  <strong>商品：</strong><span>{{ sku.skuName }} </span>
                  <div>
                    <strong>原因：</strong>
                    {{ sku.reason }}
                  </div>
                </div>
              </div>
              <strong class="red" v-if="proxy.skuList.filter(s => s.state === 'pending').length > 0">待授权商品：</strong>
              <div v-for="sku of proxy.skuList.filter(s => s.state === 'pending')">
                <div class="franchiser-sku-container">
                  <strong>商品：</strong><span>{{ sku.skuName }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button class="btn" onclick="history.back(-1);">返回上一页<span
            class="glyphicon glyphicon-share-alt"></span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { PLATFORM_FRANCHISER_GET } from '@/config/env';
  import { getPictureUrl } from '@/config/utils';
  import { FRANCHISER_USER_STATE } from '@/config/mapping';

  export default {
    name: 'franchiserDetail',
    data() {
      return {
        FRANCHISER_USER_STATE,
        detail: {
          base: {},
          address: {},
          enterprises: [],
        },
      };
    },
    components: {
      'v-img': () => import('@/components/img'),
    },
    mounted() {
      this.getData();
    },
    methods: {
      getPictureUrl,
      async getData() {
        const params = { franchiserId: this.$route.params.id };
        const res = await this.$http.get(PLATFORM_FRANCHISER_GET, params);

        if (res.success) {
          this.detail = res.data;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

  .title {
    border-bottom: 1px solid #EDF2F5;
    margin: 30px 0;
    height: 63px;
    span {
      display: block;
      float: left;
      text-align: center;
      border-bottom: 1px solid #015FE5;
      padding: 28px 0 15px 0;
    }
  }

  .form-control2 {
    line-height: 2.428571;
    color: #555;
  }

  .inline {
    display: inline-block;
  }

  .franchiser-sku-container {
    margin: 0 0 20px 30px;
  }
</style>
