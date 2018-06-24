<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <button class="editor2" v-show="isEditor" @click="isEditor = !isEditor;save()">
        <span>保存</span>
      </button>
      <button class="editor" @click="isEditor = !isEditor">
        <span v-show="!isEditor">编辑</span>
        <span v-show="isEditor" @click="x_editor">取消</span>
      </button>
      <h4 class="title"><span>认证官详情</span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">照片:</label>
          <div class="col-sm-10">
            <v-img style="float: left;" :imgSrc="list.avator" v-show="!isEditor"></v-img>
            <v-imageuploader style="float: left;" :initImageUrls="[list.avator]" v-show="isEditor"></v-imageuploader>
            <a :href="getImgSrc(list.avator)">下载头像</a>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">姓名:</label>
          <div class="col-sm-10">
            <p class="form-control2" v-show="!isEditor">{{list.name}}</p>
            <input class="form-control3" type="text" v-model="list.name" v-show="isEditor">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">手机号码:</label>
          <div class="col-sm-10">
            <p class="form-control2" v-show="!isEditor">{{list.cellphone}}</p>
            <input class="form-control3" type="text" v-model="list.cellphone" v-show="isEditor">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">隶属服务中心:</label>
          <div class="col-sm-10">
            <p class="form-control2" v-show="!isEditor">{{list.organiz}}</p>
            <input class="form-control3" type="text" v-model="list.organiz" v-show="isEditor">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">服务中心电话:</label>
          <div class="col-sm-10">
            <p class="form-control2" v-show="!isEditor">{{list.organizTel}}</p>
            <input class="form-control3" type="text" v-model="list.cellphone" v-show="isEditor">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">考试分数:</label>
          <div class="col-sm-10">
            <p class="form-control2" v-show="!isEditor">{{list.score}}</p>
            <input class="form-control3" type="text" v-model="list.score" v-show="isEditor">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证号码:</label>
          <div class="col-sm-10">
            <p class="form-control2" v-show="!isEditor">{{list.idCard}}</p>
            <input class="form-control3" type="text" v-model="list.idCard" v-show="isEditor">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件照片:</label>
          <div class="col-sm-10">
            <v-img :imgSrc="list.idFrontUrl" style="float: left;" v-show="!isEditor"></v-img>
            <v-img :imgSrc="list.idBackUrl" style="float: left;margin-left: 20px;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[list.idFrontUrl]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <v-imageuploader :initImageUrls="[list.idBackUrl]" style="float: left;margin-left: 20px;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">承诺公函:</label>
          <div class="col-sm-10">
            <v-img :imgSrc="list.agreement" style="float: left;" v-show="!isEditor"></v-img>
            <v-imageuploader :initImageUrls="[list.agreement]" style="float: left;" v-show="isEditor"></v-imageuploader>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">二维码:</label>
          <div class="col-sm-10">
            <img v-bind:src="list.qrcode" style="float: left;" v-show="!isEditor">
            <a v-bind:href="list.qrcode">下载二维码</a>
            <div style="clear: both;"></div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { PLATFORM_AUTHOFFICER_GET, PLATFORM_AUTHOFFICER_UPDATE } from '@/config/env';
  import { getPictureUrl } from '@/config/utils';
  import vimg from '@/components/img';

  export default {
    name: 'authofficerView',
    props: {
    //   initImageUrls: {
    //     type: Array,
    //     default: () => [],
    //   },
      value: {
        type: String,
      },
    },
    data() {
      return {
        list: {},
        isEditor: false,
      };
    },
    components: {
      'v-img': vimg,
      'v-imageuploader': () => import('@/components/imageuploader'),
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        const param = {
          id: this.$route.params.id,
        };
        const res = await this.$http.get(PLATFORM_AUTHOFFICER_GET, param);
        if (res.success) {
          this.list = res.data;
          // this.imageList = JSON.parse(this.list.authentication.imageList || '[]');
        }
      },
      getImgSrc(value) {
        return value && getPictureUrl(value, { w: 0, h: 0, q: 0 });
      },
      x_editor() {
        this.getData();
      },
      async save() {
        const param = {
          avator: this.list.avator,
          name: this.list.name,
          cellphone: this.list.cellphone,
          organiz: this.list.organiz,
          organizTel: this.list.organizTel,
          score: this.list.score,
          idCard: this.list.idCard,
          idFrontUrl: this.list.idFrontUrl,
          idBackUrl: this.list.idBackUrl,
          agreement: this.list.agreement,
          id: this.$route.params.id,
        };
        const res = await this.$http.post(PLATFORM_AUTHOFFICER_UPDATE, param);
        if (res.success) {
          this.getData();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.form-control2,.form-control3{
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.5;
    color: #555;
    background-image: none;
}
.form-control3{
    width: 20%;
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
  margin-top: 20px;
}
.editor2{
  left: 73%;
}
.editor:hover,.editor2:hover{
  border:2px solid #997CFD;
  color: #997CFD;
  background: #e9e9e9;
}

</style>
