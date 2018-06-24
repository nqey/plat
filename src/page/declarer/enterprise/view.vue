<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4 class="title">
          <a href="#/declarer/enterprise" class="back_icon">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUxRDI3MEMxMkU2MjExRThCMERBRUYwMjdBMDQ5NjdFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUxRDI3MEMyMkU2MjExRThCMERBRUYwMjdBMDQ5NjdFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTFEMjcwQkYyRTYyMTFFOEIwREFFRjAyN0EwNDk2N0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTFEMjcwQzAyRTYyMTFFOEIwREFFRjAyN0EwNDk2N0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Il0tdAAABkUlEQVR42qTUSyhEURzH8ZnxDAtKUjIrEjsbG6yQYiGvsmCjLERZUnYkS481C1KmWVA2KKXEZjYKpTwWyEKJSY1HhO+pnzpN95rrOvXpTHPO/d9z/ud/bjAajQZStEaMqffc0lOMj2A24KOFXP4PYk5B1/wEdlpxBjZRjXJ8oOO/K87HqfowLqyxHKT5CVyGG2yjBomkuQmt/lS5L/ASuBbnGMQQPq05V8hFtvo25OEBk8hyC9yDLVRhxWHOF57xpv4MU8hECZ4UI5gcuBsnSfn00t7Rj1YsYdkObgJ3Iab8FvmorB0UowWrdrl96TCOcIc6HFgPFmJGv834hubGrTmPqMAt2rFuV8UimrCPUWtb5qB6VS0vGNALrjGOSs27V1oiZsHpDtsyl+JQldJpjdkH26dy69ALb5Vv8/wxmp2utDnEUlXJJRpccvuoXYaVyl19BiYw7PYRimuL5moveDjAmBazp7S5foR+ysnkfF6XwUv51WsnvwYOWBVT4rH0PlR2kZDHB17/UNfmZk5/CzAA6YlY7OPwKSsAAAAASUVORK5CYII=">
        </a>
        <a class="info active" >基本信息</a>
      </h4>
      <br/>
      <div v-if="data.reason" style="text-align: center;color: red;">
        <span class="glyphicon glyphicon-exclamation-sign"></span> <span style="position: relative;top:-1px;">{{data.reason}}</span>
      </div>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">企业名称</label>
          <div class="col-sm-8">
            <p class="form-control2">{{data.name}}</p>
            <span class="red"  style="position: absolute;top:7px;right: 300px;"><b>{{statusNm}}</b></span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">企业负责人</label>
          <div class="col-sm-8">
            <p class="form-control2">{{data.charger}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">手机号码</label>
          <div class="col-sm-8">
            <p class="form-control2">{{data.cellphone}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">身份证号</label>
          <div class="col-sm-8">
            <p class="form-control2">{{data.idNumber}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">证件照片</label>
          <div class="col-sm-8">
            <v-img v-if="data.idBackUrl" :imgSrc="data.idBackUrl" style="float: left;"></v-img>
            <v-img v-if="data.idFrontUrl" :imgSrc="data.idFrontUrl" style="float: left;margin-left: 20px;"></v-img>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">营业执照</label>
          <div class="col-sm-8">
            <div class="pull-left" v-for="url of data.licenseImageUrl" style="margin-right: 10px;" >
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">生产许可证</label>
          <div class="col-sm-8">
            <div class="pull-left" v-for="url of data.productionImageUrl" style="margin-right: 10px;" >
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">资金补贴申请表</label>
          <div class="col-sm-8">
            <div class="pull-left" v-for="url of data.capitalImageUrl" style="margin-right: 10px;" >
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">企业尽职调查表</label>
          <div class="col-sm-8">
            <div class="pull-left" v-for="url of data.enterpriseSurveyImageUrl" style="margin-right: 10px;" >
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">企业负责人尽职调查表</label>
          <div class="col-sm-8">
            <div class="pull-left" v-for="url of data.enterpriseChargerSurveyImageUrl" style="margin-right: 10px;" >
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">企业入库申请函</label>
          <div class="col-sm-8">
            <div class="pull-left" v-for="url of data.enterpriseShindImageUrl" style="margin-right: 10px;" >
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group" v-if="data.authorizationImageUrl">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">授权委托书</label>
          <div class="col-sm-8">
            <div class="pull-left" v-for="url of data.authorizationImageUrl" style="margin-right: 10px;" >
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group" v-if="data.otherImageUrl">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">其他补充材料</label>
          <div class="col-sm-8">
            <div class="pull-left" v-for="url of data.otherImageUrl" style="margin-right: 10px;" >
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group" v-show="isShowStatus">
          <label class="col-sm-offset-2 col-sm-2 control-label txr">审核操作</label>
          <div class="col-sm-8">
            <button class="btn btn-success" @click="submit('true')" :disabled="isShowSubmit">通过</button>
            <button class="btn btn-danger" @click="$refs.modal.$refs.modal.toggle();">不通过</button>
          </div>
        </div>
      </form>
      <v-modal ref="modal" :handler="modalHandler"></v-modal>
    </div>
  </div>
</template>

<script>
import { PLATFORM_DECLARE_ENTERPRISE, PLATFORM_PUT_DECLARER_ENTERPRISE_AUDIT, PLATFORM_PUT_DECLARER_ENTERPRISE_WAITAUDIT } from '@/config/env';
import vimg from '@/components/img';
import modal from '@/page/declarer/enterprise/modal';

export default {
  name: 'enterpriseView',
  data() {
    return {
      isShowSubmit: false,
      isShowStatus: true,
      statusNm: null,
      data: {},
      reason: null,
      modalHandler: (reason) => {
        this.reason = reason;
        this.submit('false');
      },
      status: {
        waitPending: ['申报企业待初审', 'base'],
        waitUnPending: ['初审未通过', 'pass'],
        waitPended: ['初审通过', 'pass'],
        waitAudit: ['待审核', 'baseWait'],
        unPass: ['未通过', 'pass'],
        pass: ['已通过', 'pass'],
        wait: ['待支付', 'pass'],
        pending: ['企业入库待初审', 'pass'],
        collectting: ['待认证官上门采集', 'pass'],
        confirmFailed: ['初审未通过', 'pass'],
        reject2: ['认证官采集未通过', 'pass'],
        pending2: ['待复审', 'pass'],
        confirm2Failed: ['复审未通过', 'pass'],
        passed: ['通过审核', 'pass'],
      },
    };
  },
  components: {
    'v-img': vimg,
    'v-modal': modal,
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`${PLATFORM_DECLARE_ENTERPRISE}/${this.$route.params.id}`);
      if (res.success) {
        this.data = res.data;
        this.statusNm = this.status[this.data.state][0];
        if (this.data.capitalImageUrl) {
          this.data.capitalImageUrl = this.data.capitalImageUrl.split(',');
        }
        if (this.data.authorizationImageUrl) {
          this.data.authorizationImageUrl = this.data.authorizationImageUrl.split(',');
        }
        if (this.data.licenseImageUrl) {
          this.data.licenseImageUrl = this.data.licenseImageUrl.split(',');
        }
        if (this.data.productionImageUrl) {
          this.data.productionImageUrl = this.data.productionImageUrl.split(',');
        }
        if (this.data.enterpriseChargerSurveyImageUrl) {
          this.data.enterpriseChargerSurveyImageUrl = this.data.enterpriseChargerSurveyImageUrl.split(',');
        }
        if (this.data.enterpriseShindImageUrl) {
          this.data.enterpriseShindImageUrl = this.data.enterpriseShindImageUrl.split(',');
        }
        if (this.data.enterpriseSurveyImageUrl) {
          this.data.enterpriseSurveyImageUrl = this.data.enterpriseSurveyImageUrl.split(',');
        }
        if (this.data.otherImageUrl) {
          this.data.otherImageUrl = this.data.otherImageUrl.split(',');
        }
        if (this.status[this.data.state][1] === 'pass') {
          this.isShowStatus = false;
        }
      }
    },
    async submit(state) {
      const param = {};
      param.state = state;
      if (state === 'false') {
        param.reason = this.reason;
      }
      let api;
      const status = this.status[this.data.state][1];
      if (status === 'base') {
        // 信息初审
        api = PLATFORM_PUT_DECLARER_ENTERPRISE_WAITAUDIT;
      } else if (status === 'baseWait') {
        // 信息复审
        api = PLATFORM_PUT_DECLARER_ENTERPRISE_AUDIT;
      }
      if (status !== 'pass') {
        this.isShowSubmit = !this.isShowSubmit;
        const res = await this.$http.post(`${api}${this.$route.params.id}`, param);
        if (res.success) {
          this.$router.push('/declarer/enterprise');
        } else {
          this.isShowSubmit = !this.isShowSubmit;
        }
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
  height: 38px;
  position: relative;
  text-align: center;
}

.info {
  color: black;
  letter-spacing: 5px;
  width: 120px;
  padding: 15px;
}

.active {
  border-bottom: 1px solid #015FE5;
}

.txr {
  text-align: left;
}

.back_icon {
  position: absolute;left: 0px;
}

</style>
