<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <button type="button" class="btn btn-default" @click="$router.push('/enterprise/pending2')">返回</button>
      <button type="button" class="btn btn-primary pull-right" @click="$router.push(`/enterprise/pending2/edit/${$route.params.id}`)">编辑</button>
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
            <p class="form-control2">{{ (list.authentication && formatDate(list.authentication.createTime)) || '认证官暂未上门采集'}}</p>
          </div>
        </div>
      </form>
      <div class="form-horizontal" v-if="list.base">
        <div class="form-group" v-if="ENTERPRISE_STATE_PASS[list.base.state]">
          <label class="col-sm-2 control-label">审核操作:</label>
          <div class="col-sm-10">
            <button type="button" class="btn btn-success" @click="pass">通过</button>
            <button type="button" class="btn btn-danger" @click="nopass">不通过</button>
          </div>
        </div>
      </div>
<!--    ............................................................................................     -->
<span v-if="this.list.authentication">
      <h4 class="title"><span>初审资料<br><br><h4>企业环境</h4></span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">门牌照:</label>
          <div class="col-sm-10">
            <v-img v-for="(item, i) of imageList.doorplate" key="i" :imgSrc="item.url"></v-img>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">文化墙:</label>
          <div class="col-sm-10" >
            <v-img v-for="(item, i) of imageList.culture" key="i" :imgSrc="item.url"></v-img>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">办公环境:</label>
          <div class="col-sm-10">
            <v-img v-for="(item, i) of imageList.environment" key="i" :imgSrc="item.url"></v-img>
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
            <v-img v-for="(item, i) of imageList.license" key="i" :imgSrc="item.url"></v-img>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">组织机构代码证书:</label>
          <div class="col-sm-10">
            <v-img v-for="(item, i) of imageList.orgCode" key="i" :imgSrc="item.url"></v-img>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">税务登记证:</label>
          <div class="col-sm-10">
            <v-img v-for="(item, i) of imageList.tax" key="i" :imgSrc="item.url"></v-img>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span><h4>补充材料</h4></span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group" v-for="item of imageList.custom">
          <label class="col-sm-2 control-label">{{item.name}}</label>
          <div class="col-sm-10">
            <v-img :imgSrc="item.url"></v-img>
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
            <v-img v-for="(item, i) of imageList.letter" key="i" :imgSrc="item.url"></v-img>
          </div>
        </div>
       <div class="form-group">
          <label class="col-sm-2 control-label">负责人与审核官合照:</label>
          <div class="col-sm-10">
            <v-img v-for="(item, i) of imageList.groupPhoto" key="i" :imgSrc="item.url"></v-img>
          </div>
        </div>
         <div class="form-group">
          <label class="col-sm-2 control-label">企业承诺视频:</label>
          <div class="col-sm-10">
            <video v-if="imageList.video" style="max-width:200px;" :src="VIDEO_SERVER_URL + imageList.video[0].url" controls="controls">
              your browser does not support the video tag
            </video>
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
      </form>
</span>
      <v-nopassmodal ref="nopassmodal" :id="$route.params.id"></v-nopassmodal>
    </div>
  </div>
</template>

<script>
  import { PLATFORM_EP_GET2, PLATFORM_EP_CONFIRM, VIDEO_SERVER_URL } from '@/config/env';
  import { ENTERPRISE_STATE_PASS } from '@/config/mapping';
  import { getPictureUrl, formatDate } from '@/config/utils';
  import batchadd from '@/assets/img/batchadd.png';
  import VueAMap from 'vue-amap';

  const amapManager = new VueAMap.AMapManager();

  export default {
    name: 'pending2',
    data() {
      return {
        formatDate,
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
      'v-nopassmodal': () => import('@/page/enterprise/pending/nopassmodal'),
      'v-img': () => import('@/components/img'),
      'v-imageuploader': () => import('@/components/imageuploader'),
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
          this.list = res.data;
          this.imageList = this.list.authentication && JSON.parse(this.list.authentication.imageList || '[]');
          this.imageList = this.imageList || [];
          this.center = [res.data.authentication.longitude, res.data.authentication.latitude];
          this.address = res.data.authentication.address;
        }
      },
      getImgSrc(value) {
        return value && getPictureUrl(value, { w: 0, h: 0, q: 0 });
      },
      async pass() {
        const param = {
          enterpriseId: this.enterpriseId,
        };
        const res = await this.$http.post(PLATFORM_EP_CONFIRM, param);
        if (res.success) {
          this.$transfer({
            buttons: [{
              text: '去列表',
              link: '/enterprise/pending2',
            }],
          });
        }
      },
      nopass() {
        this.$refs.nopassmodal.$refs.nopassmodal.toggle();
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
