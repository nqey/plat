<template>
  <div class="plat-content">
    <div class="plat-content-con">
    	<form class="form-horizontal">
          <div class="form-group">
            <h1 class="col-sm-12" style="text-align: center;">认证官认证</h1>
          </div>
          <br/>
          <div class="form-group">
            <label class="col-sm-4 control-label">照　　片</label>
            <div class="col-sm-8 ytz">
              <div>
                请本人上传真实半身照，照片会进行身份证对比，点击更换
                <span style="color:red;font-size:12px; display:block;margin:0; padding:0; line-height:20px;">* 必须上传蓝色背景寸照，否则审核不通过</span>
              </div>
              <br/>
              <v-imageuploader :width="150" :title="'请上传头像/LOGO'" :onImageChanged="(urls) => form.avator = urls[0]"/>
              <img class="slz" :src="slz">
            </div>
          </div>
          <div class="form-group">
              <label class="col-sm-4 control-label">姓　　名</label>
              <div class="col-sm-5">
                <input class="form-control" type="text" v-model="form.name" placeholder="姓名 例：赵四" val-required>
              </div>
          </div>·
          <div class="form-group">
              <label class="col-sm-4 control-label">服务中心</label>
              <div class="col-sm-5">
                <input class="form-control" type="text" v-model="form.organiz" placeholder="隶属省级服务中心 例：四川省服务中心" val-required>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-4 control-label">联系电话</label>
              <div class="col-sm-5">
                 <input class="form-control" type="text" v-model="form.organizTel" placeholder="隶属省级服务中心联系电话 例：156******83" val-required val-cellphone>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-4 control-label">考试分数</label>
              <div class="col-sm-5">
                 <input class="form-control" type="text" v-model="form.score" placeholder="考试分数 例如：90" val-required>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-4 control-label">身份证号</label>
              <div class="col-sm-5">
                 <input class="form-control" type="text" v-model="form.idCard" placeholder="身份证号 例：513***********5294" val-required val-id-card>
              </div>
          </div>
          <div class="form-group ytz">
              <label class="col-sm-4 control-label">身份证(正/反面)</label>
              <div class="col-sm-2">
                 <v-imageuploader :title="'请上传身份证正面'" :onImageChanged="(urls) => form.idFrontUrl = urls[0]"/>
              </div>
              <div class="col-sm-2">
                 <v-imageuploader :title="'请上传身份证反面'" :onImageChanged="(urls) => form.idBackUrl = urls[0]"/>
              </div>
              <div class="col-sm-2">
                 <img class="slz" :src="sfzsl">
              </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label">承诺公函</label>
            <div class="col-sm-8 ytz">
              <div>
                <a href="" class="cngh">下载承诺公函</a>　并认真阅读签字盖章，将影印件上传至下方即可
                <span style="color:red;font-size:12px; display:block;margin:0px; padding:0; line-height:20px;">
                    * 请按照示例图格式上传图片，否则审核不通过</span>
              </div>
              <br/>
              <v-imageuploader :title="'请上传承诺公函'" postname="agreement" :onImageChanged="(urls) => form.agreement = urls[0]"/>
              <img class="slz" :src="ghsl">
            </div>
          </div>
          <div class="form-group" v-show="!this.$route.params.id">
              <label class="col-sm-4 control-label">手机验证</label>
              <div class="col-sm-5">
                 <input class="form-control" type="text" v-model="form.cellphone" placeholder="手机号 例：156******83" val-required val-cellphone>
              </div>
          </div>
          <div class="form-group" v-show="!this.$route.params.id">
              <label class="col-sm-4 control-label"></label>
              <div class="col-sm-5">
                 <input class="form-control" type="text" v-model="form.validateCode" placeholder="请输入验证码" val-required>
              </div>
              <div>
                  <button type="button" class="btn btn-primary" @click="sendMsg" :disabled="isDisabled">
                    {{buttonName}}
                  </button>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-4 control-label"></label>
              <div class="col-sm-5">
                 <button type="button" class="btn btn-primary" @click="submit">提交</button>
              </div>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
  import slz from '@/assets/img/slz.jpg';
  import idcar from '@/assets/img/idcar.png';
  import sfzsl from '@/assets/img/sfzsl.jpg';
  import ghsl from '@/assets/img/ghsl.jpg';
  import { DECLARE_GET_VALIDATECODE, PUBLICS_AUTHOFFICER_CREATE } from '@/config/env';
  import { validate } from '@/config/validator';

  export default {
    name: 'entry',
    data() {
      return {
        buttonName: '获取验证码',
        isDisabled: false,
        time: 60,
        lists: [],
        slz,
        idcar,
        sfzsl,
        ghsl,
        form: {
          validateCode: null,
          avator: null,
          name: null,
          idCard: null,
          organiz: null,
          organizTel: null,
          score: null,
          idFrontUrl: null,
          idBackUrl: null,
          cellphone: null,
          agreement: null,
        },
      };
    },
    methods: {
      async sendMsg() {
        const me = this;
        me.isDisabled = true;
        const interval = window.setInterval(() => {
          me.buttonName = me.time;
          me.time -= 1;
          if (me.time < 0) {
            me.buttonName = '重新发送';
            me.time = 60;
            me.isDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
        await this.$http.get(`${DECLARE_GET_VALIDATECODE}addAuthoffer/${this.form.cellphone}`);
      },
      @validate()
      async submit() {
        const res = await this.$http.post(PUBLICS_AUTHOFFICER_CREATE, this.form);
        if (res.success) {
          this.$transfer({
            back: '继续添加',
            buttons: [{
              text: '去列表',
              link: '/authofficer/list',
            }],
          });
        }
      },
    },
    components: {
      'v-imageuploader': () => import('@/components/imageuploader'),
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.slz {
    border: 1px solid #ddd;
    display: none;
    position: absolute;
    top: 0px;
    z-index: 1;
}
.ytz:hover .slz {
    display: inline-block;
}

</style>