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
            <p class="form-control2">{{list.authentication && list.authentication.address ? '' : '认证官暂未上门采集'}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">录入人员:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.authentication && list.authentication.authofficerName ? '' : '认证官暂未上门采集'}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">录入时间:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.authentication && list.authentication.createTime ? '' : '认证官暂未上门采集'}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">审核操作:</label>
          <div class="col-sm-10">
            <p class="form-control2">
              <button @click="pass">通过</button>
              <button @click="nopass" id="color">不通过</button>
              <button class="editor2" v-show="isEditor" @click="save">
                <span>保存</span>
              </button>
              <button class="editor"  v-if="show" @click="isEditor = !isEditor">
                <span v-show="!isEditor">编辑</span>
                <span v-show="isEditor">取消</span>
              </button>
            </p>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
<span v-if="show">
      <h4 class="title"><span>初审资料<br><br><h4>企业环境</h4></span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">门牌照:</label>
          <div class="col-sm-10" v-for="item of imageList.doorplate">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">文化墙:</label>
          <div class="col-sm-10" v-for="item of imageList.culture">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">办公环境:</label>
          <div class="col-sm-10"  v-for="item of imageList.environment">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span><h4>资质证书</h4></span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">营业执照:</label>
          <div class="col-sm-10" v-for="item of imageList.license">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">组织机构代码证书:</label>
          <div class="col-sm-10" v-for="item of imageList.orgCode">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">税务登记证:</label>
          <div class="col-sm-10" v-for="item of imageList.tax">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span><h4>补充材料</h4></span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group" v-for="item of imageList.custom">
          <label class="col-sm-2 control-label">{{item.name}}</label>
          <div class="col-sm-10" v-for="item of imageList.custom">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span><h4>企业承诺信息</h4></span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">企业承诺函:</label>
          <div class="col-sm-10" v-for="item of imageList.letter">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
       <div class="form-group">
          <label class="col-sm-2 control-label">负责人与审核官合照:</label>
          <div class="col-sm-10" v-for="item of imageList.groupPhoto">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
         <div class="form-group">
          <label class="col-sm-2 control-label">企业承诺视频:</label>
          <div class="col-sm-10" v-for="item of imageList.video">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
         <div class="form-group">
          <label class="col-sm-2 control-label">承诺地址:</label>
          <div class="col-sm-10" v-for="item of imageList.groupPhoto">
            <v-img :imgSrc="item.url" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[item.url]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
      </form>
</span>
      <v-passmodal ref="passmodal"></v-passmodal>
      <v-nopassmodal ref="nopassmodal"></v-nopassmodal>
    </div>
  </div>
</template>

<script>
  import { PLATFORM_EP_GET2, PLATFORM_EP_CONFIRM, PLATFORM_EP_REJECT } from '@/config/env';
  import { getPictureUrl } from '@/config/utils';
  import passmodal from '@/page/enterprise/pending/passmodal';
  import nopassmodal from '@/page/enterprise/pending/nopassmodal';
  import batchadd from '@/assets/img/batchadd.png';
  import vimg from '@/components/img';

  export default {
    name: '',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        batchadd,
        show: true,
        form: {
          name: null,
        },
        isEditor: false,
        imageList: [],
        list: {
          base: {},
          authentication: {},
        },
        enterpriseId: this.$route.params.id,
      };
    },
    components: {
      'v-passmodal': passmodal,
      'v-nopassmodal': nopassmodal,
      'v-img': vimg,
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
        }
      },
      getImgSrc(value) {
        return value && getPictureUrl(value, { w: 0, h: 0, q: 0 });
      },
      pass() {
        const param = {
          enterpriseId: this.enterpriseId,
        };
        const res = this.$http.post(PLATFORM_EP_CONFIRM, param);
        if (res.success) {
          this.success = res.data;
        }
        this.$refs.passmodal.$refs.passmodal.toggle();
      },
      nopass() {
        const param = {
          enterpriseId: this.enterpriseId,
        };
        const res = this.$http.post(PLATFORM_EP_REJECT, param);
        if (res.success) {
          this.failure = res.data;
        }
        this.$refs.nopassmodal.$refs.nopassmodal.toggle();
      },
      save() {},
      // submit() {
      //   const res = this.$http.put(PLATFORM_EP_REJECT, this.form);
      //   if (res.success) {
      //   }
      // },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';


button{
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #337CFD;
  border: none;
  color: #fff;
  border-radius: 5px;
}
#color{
  background: #ff6666,
}

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
.editor,.editor2{
  width: 100px !important;
  height: 38px;
  line-height: 34px;
  text-align: center;
  color: #337CFD;
  border-radius: 25px;
  border:1px solid #337CFD;
  position: absolute;
  left: 80%;
  outline: none;
  background: #fff;
  font-size: 18px;
}
.editor span,.editor2 span{
  width: 100px;
}
.editor2{
  left: 70%;
}
.editor:hover,.editor2:hover{
  border:2px solid #997CFD;
  color: #997CFD;
  background: #e9e9e9;
}

</style>
