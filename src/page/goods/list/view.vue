<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <div>
        <h4 class="title">
          <span>
          {{ detail.base.name }}
            <i class="red">（{{ GOODS_STATE[detail.base.state] }}）</i>
          </span>
        </h4>
      </div>
      <div class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">所属企业</label>
          <div class="col-sm-10">
            <a class="form-control2" @click="$router.push(`/enterprise/passed/view/${detail.base.enterpriseId}`)">
              {{ detail.base.enterpriseName }}
            </a>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">分&#12288;&#12288;类</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ detail.base.categoryName }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">保&#8194;质&#8194;期</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ getShelflife(detail.base.validPeriod, detail.base.validPeriodType) }}</p>
          </div>
        </div>
      </div>
      <!-- sku 信息-->
      <div>
        <h4 class="title">
          <span>SKU信息</span>
        </h4>
      </div>
      <div class="form-horizontal">
        <div class="sku-container" v-if="detail.skus" v-for="sku of detail.skus">
          <div class="form-group">
            <label class="col-sm-2 control-label">条&#12288;&#12288;码</label>
            <div class="col-sm-10">
              <p class="form-control2">{{ sku.barcode }}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">规格属性</label>
            <div class="col-sm-10 ggcs">
              <table class="table-bordered" v-if="sku.attributes && sku.attributes.length > 0">
                <tbody>
                <tr v-for="attr of sku.attributes">
                  <td>{{ attr.attributeName }}</td>
                  <td>{{ attr.attributeValue }}</td>
                </tr>
                </tbody>
              </table>
              <p v-else class="form-control2">无</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">描述属性</label>
            <div class="col-sm-10">
              <table class="table-bordered" v-if="sku.properties">
                <tbody>
                <tr v-for="property of JSON.parse(sku.properties || '[]')">
                  <td v-for="(value, key) of property">{{ key }}</td>
                  <td v-for="(value, key) of property">{{ value }}</td>
                </tr>
                </tbody>
              </table>
              <p v-else class="form-control2">无</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">商品图片</label>
            <div class="col-sm-10 inline">
              <v-img v-for="(image, index) in sku.images"
                     :imgSrc="image" :key="index" class="inline"/>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 class="title">
          <span>其他资料</span>
        </h4>
      </div>
      <div class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">商品资质</label>
          <div class="col-sm-10 inline">
            <div v-if="detail.images">
              <v-img v-for="(q, index) in (JSON.parse(detail.images).qualification || [])"
                     :imgSrc="q" :key="index" class="inline"/>
            </div>
            <p v-else class="form-control2">无</p>
          </div>
        </div>
      </div>

      <div>
        <h4 class="title">
          <span>商品详情</span>
        </h4>
      </div>
      <div class="form-horizontal detail-container" v-html="detail.detail.html">
      </div>
    </div>

    <div class="text-center">
      <button class="btn" onclick="history.back(-1);">返回上一页<span
        class="glyphicon glyphicon-share-alt"></span></button>
    </div>
  </div>
</template>

<script>
  import { GOODS_BASE_URL } from '@/config/env';
  import { getPictureUrl } from '@/config/utils';
  import { GOODS_STATE, getShelflife } from '@/config/mapping';

  export default {
    name: 'goodsDetail',
    data() {
      return {
        GOODS_STATE,
        getShelflife,
        detail: {
          base: {},
          detail: {},
          images: '',
          skus: [],
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
        const params = { goodsId: this.$route.params.id };
        const res = await this.$http.get(`${GOODS_BASE_URL}platform/goods/get`, params);

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

  .sku-container {
    margin: 0 0 20px 30px;
  }

  .table-bordered {
    border: 1px solid #ddd;
    tr:nth-child(odd) {
      background: rgba(215, 235, 249, 0.39);
    }
    td {
      font-size: 14px;
      font-weight: normal;
      text-align: center;
      border-color: #e0e0e0;
      padding: 5px 15px;
    }
  }

  .detail-container {
    width: 375px;
    height: 667px;
    overflow-x: hidden;
    overflow-y: auto;
    border: 10px solid darkgray;
    border-radius: 11px;
    padding: 20px;
  }

  .detail-container::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  .detail-container::-webkit-scrollbar-thumb {
    background: rgba(68, 54, 54, 0.1);
  }

  .detail-container::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.11);
  }

</style>
