<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4 class="title"><span>审核信息</span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">企业名称:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.base.name}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">定位地址:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ (list.authentication && list.authentication.address) || '认证官暂未上门采集'}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">录入人员:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ (list.authentication && list.authentication.authofficerName) || '认证官暂未上门采集'}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">录入时间:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ (list.authentication && list.authentication.createTime) || '认证官暂未上门采集'}}</p>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
<span v-if="this.list.authentication">
      <h4 class="title"><span>初审资料<br><br><h4>企业环境</h4></span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">门牌照:</label>
          <div class="col-sm-10">
            <v-imageuploader :multiple="3" :initImageUrls="imageList.doorplate" :title="'请上传门牌照'" :onImageChanged="(urls) => imageList.doorplate = urls"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">文化墙:</label>
          <div class="col-sm-10" >
            <v-imageuploader :multiple="3" :initImageUrls="imageList.culture" :title="'请上传文化墙'" :onImageChanged="(urls) => imageList.culture = urls"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">办公环境:</label>
          <div class="col-sm-10">
            <v-imageuploader :multiple="3" :initImageUrls="imageList.environment" :title="'请上传办公环境'" :onImageChanged="(urls) => imageList.environment = urls"/>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span><h4>资质证书</h4></span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">营业执照:</label>
          <div class="col-sm-10">
            <v-imageuploader :multiple="3" :initImageUrls="imageList.license" :title="'请上传营业执照'" :onImageChanged="(urls) => imageList.license = urls"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">组织机构代码证书:</label>
          <div class="col-sm-10">
            <v-imageuploader :multiple="3" :initImageUrls="imageList.orgCode" :title="'请上传组织机构代码证书'" :onImageChanged="(urls) => imageList.orgCode = urls"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">税务登记证:</label>
          <div class="col-sm-10">
            <v-imageuploader :multiple="3" :initImageUrls="imageList.tax" :title="'请上传税务登记证'" :onImageChanged="(urls) => imageList.tax = urls"/>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span><h4>补充材料</h4></span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group" v-for="(item, i) of imageList.custom">
          <input class="col-sm-2" v-model="item.name">
          <div class="col-sm-8">
            <v-imageuploader :initImageUrls="[item.url]" :title="'请上传补充材料'" :onImageChanged="(urls) => item.url = urls[0]"/>
          </div>
          <div class="col-sm-2" v-if="imageList.custom.length > 1">
             <a @click="imageList.custom.splice(i, 1)">【删除】</a>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span><h4>企业承诺信息</h4></span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">企业承诺函:</label>
          <div class="col-sm-10">
            <v-imageuploader :multiple="3" :initImageUrls="imageList.letter" :title="'请上传企业承诺函'" :onImageChanged="(urls) => imageList.letter = urls"/>
          </div>
        </div>
       <div class="form-group">
          <label class="col-sm-2 control-label">负责人与审核官合照:</label>
          <div class="col-sm-10">
          <v-imageuploader :multiple="3" :initImageUrls="imageList.groupPhoto" :title="'请上传责人与审核官合照'" :onImageChanged="(urls) => imageList.groupPhoto = urls"/>
          </div>
        </div>
         <div class="form-group">
          <label class="col-sm-2 control-label">企业承诺视频:</label>
          <div class="col-sm-10">
            <v-videouploader :initVideoUrls="imageList.video" :width="150" :title="'请上传企业承诺视频'" :onVideoChanged="(urls) => imageList.video = urls"></v-videouploader>
          </div>
        </div>
         <div class="form-group" v-if="center">
          <label class="col-sm-2 control-label">承诺地址:</label>
          <div class="col-sm-10">
            <div class="amap-page-container">
              <el-amap vid="amapDemo"  :center="center" :amap-manager="amapManager" :zoom="zoom" class="amap-demo">
                 <el-amap-marker vid="component-marker" :position="center"></el-amap-marker>
                 <el-amap-text :text="address" :offset="offset" :position="center"></el-amap-text>
              </el-amap>
            </div>
          </div>
        </div>
        <div class="form-group" v-if="center">
          <label class="col-sm-2 control-label"></label>
          <div class="col-sm-10">
            <button type="button" class="btn btn-primary" @click="submit">保存</button>
            <button type="button" class="btn btn-default" @click="$router.push(`/enterprise/pending2/view/${$route.params.id}`)">取消</button>
          </div>
        </div>
      </form>
</span>
    </div>
  </div>
</template>

<script>
  import { PLATFORM_EP_GET2, VIDEO_SERVER_URL, PLATFORM_EP_PENDING2_MODIFY } from '@/config/env';
  import { ENTERPRISE_STATE_PASS } from '@/config/mapping';
  import { getPictureUrl } from '@/config/utils';
  import batchadd from '@/assets/img/batchadd.png';
  import VueAMap from 'vue-amap';

  const amapManager = new VueAMap.AMapManager();

  export default {
    name: 'pending2',
    data() {
      return {
        amapManager,
        zoom: 12,
        center: null,
        ENTERPRISE_STATE_PASS,
        VIDEO_SERVER_URL,
        batchadd,
        address: null,
        offset: [-20, 20],
        form: {
          name: null,
        },
        imageList: [],
        list: {
          base: {},
          authentication: {},
        },
        enterpriseId: this.$route.params.id,
      };
    },
    components: {
      'v-imageuploader': () => import('@/components/imageuploader'),
      'v-videouploader': () => import('@/components/videouploader'),
    },
    mounted() {
      if (this.list.authentication) {
        this.show = false;
      }
      this.getData();
    },
    methods: {
      async getData() {
        const param = {
          enterpriseId: this.enterpriseId,
        };
        const res = await this.$http.get(PLATFORM_EP_GET2, param);
        if (res.success) {
          let a = null;
          const b = {};
          this.list = res.data;
          a = this.list.authentication && JSON.parse(this.list.authentication.imageList || '[]');
          a = a || {};
          Object.keys(a).forEach((k) => {
            if (k === 'custom') {
              b[k] = a[k];
              return;
            }
            b[k] = [];
            a[k].forEach((u) => {
              b[k].push(u.url);
            });
          });
          this.imageList = b || {};
          this.center = [res.data.authentication.longitude, res.data.authentication.latitude];
          this.address = res.data.authentication.address;
        }
      },
      getImgSrc(value) {
        return value && getPictureUrl(value, { w: 0, h: 0, q: 0 });
      },
      async submit() {
        const b = {};
        Object.keys(this.imageList).forEach((k) => {
          if (k === 'custom') {
            b[k] = this.imageList[k];
            return;
          }
          b[k] = [];
          this.imageList[k].forEach((url) => {
            b[k].push({ url });
          });
        });
        const params = {};
        params.id = this.$route.params.id;
        params.imageList = JSON.stringify(b || {});
        const res = await this.$http.post(PLATFORM_EP_PENDING2_MODIFY, params);
        if (res.success) {
          this.$transfer({
            back: '继续更新',
            buttons: [{
              text: '返回详情',
              link: `/enterprise/pending2/view/${this.enterpriseId}`,
            }],
          });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';


.form-control2 {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-image: none;
}
.title {
  border-bottom: 1px solid #EDF2F5;
  margin: 0;
}
.title span {
  display: block;
  width: 120px;
  text-align: center;
  border-bottom: 1px solid #015FE5;
  padding: 28px 0 15px 0;
}

.amap-demo {
  height: 300px;
  width: 350px;
}
</style>
