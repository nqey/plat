<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4 class="title">
        <a href="#/declarer/agency" class="back_icon">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUxRDI3MEMxMkU2MjExRThCMERBRUYwMjdBMDQ5NjdFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUxRDI3MEMyMkU2MjExRThCMERBRUYwMjdBMDQ5NjdFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTFEMjcwQkYyRTYyMTFFOEIwREFFRjAyN0EwNDk2N0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTFEMjcwQzAyRTYyMTFFOEIwREFFRjAyN0EwNDk2N0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Il0tdAAABkUlEQVR42qTUSyhEURzH8ZnxDAtKUjIrEjsbG6yQYiGvsmCjLERZUnYkS481C1KmWVA2KKXEZjYKpTwWyEKJSY1HhO+pnzpN95rrOvXpTHPO/d9z/ud/bjAajQZStEaMqffc0lOMj2A24KOFXP4PYk5B1/wEdlpxBjZRjXJ8oOO/K87HqfowLqyxHKT5CVyGG2yjBomkuQmt/lS5L/ASuBbnGMQQPq05V8hFtvo25OEBk8hyC9yDLVRhxWHOF57xpv4MU8hECZ4UI5gcuBsnSfn00t7Rj1YsYdkObgJ3Iab8FvmorB0UowWrdrl96TCOcIc6HFgPFmJGv834hubGrTmPqMAt2rFuV8UimrCPUWtb5qB6VS0vGNALrjGOSs27V1oiZsHpDtsyl+JQldJpjdkH26dy69ALb5Vv8/wxmp2utDnEUlXJJRpccvuoXYaVyl19BiYw7PYRimuL5moveDjAmBazp7S5foR+ysnkfF6XwUv51WsnvwYOWBVT4rH0PlR2kZDHB17/UNfmZk5/CzAA6YlY7OPwKSsAAAAASUVORK5CYII=">
        </a>
        <a class="info" :class="{active: tabActive}" @click="tabActive = true"><b>基本信息</b></a>
        <a class="info" :class="{active: !tabActive}" @click="tabActive = false"><b>登记信息</b></a>
      </h4>
      <div class="clearfix"></div>
      <br/>
      <div v-if="data.reason" style="text-align: center;color: red;">
        <span class="glyphicon glyphicon-exclamation-sign"></span> <span style="position: relative;top:-1px;">{{data.reason}}</span>
      </div>
      <div style="text-align: right;">
        <span><b v-html="stateCN"></b></span>
      </div>
      <div class="form-horizontal" v-show="tabActive">
        <div class="form-group">
          <label
            class="col-sm-offset-1 col-sm-1 control-label txr">姓&#12288;&#12288;名</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data.name}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-1 control-label txr">身份证号</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data.idNumber}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-1 control-label txr">证件照片</label>
          <div class="col-sm-10">
            <v-img v-if="data.idBackUrl" :imgSrc="data.idBackUrl" style="float: left;"></v-img>
            <v-img v-if="data.idFrontUrl" :imgSrc="data.idFrontUrl" style="float: left;margin-left: 20px;"></v-img>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-1 control-label txr">常住地址</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data.liveCodeAddress}}-{{data.address}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-1 control-label txr">申请区域</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data.organizAddress}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-1 control-label txr">提交时间</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ data.baseTime && formatDate(data.baseTime)}}</p>
          </div>
        </div>
      </div>
      <br/>
      <div class="form-horizontal" v-show="!tabActive">
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-2 control-label txr">申报机构尽职调查表</label>
          <div class="col-sm-9">
            <div class="pull-left" v-for="url of data.surveyImageUrl" style="margin-right: 10px;">
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-2 control-label txr">申报机构承诺公函</label>
          <div class="col-sm-9">
            <v-img v-if="data.letterImageUrl" :imgSrc="data.letterImageUrl"></v-img>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-2 control-label txr">负责人尽职调查表</label>
          <div class="col-sm-9">
            <div class="pull-left" v-for="url of data.chargerSurveyImageUrl" style="margin-right: 10px;">
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-2 control-label txr">企业工商营业执照</label>
          <div class="col-sm-9">
            <v-img v-if="data.commerceImageUrl" :imgSrc="data.commerceImageUrl"></v-img>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-2 control-label txr">其他补充材料</label>
          <div class="col-sm-9">
            <div class="pull-left" v-for="url of data.otherImageUrl" style="margin-right: 10px;">
              <v-img v-if="url" :imgSrc="url"></v-img>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-offset-1 col-sm-2 control-label txr">提交时间</label>
          <div class="col-sm-9">
            <p class="form-control2">{{ data.registTime && formatDate(data.registTime)}}</p>
          </div>
        </div>
      </div>
      <div class="form-horizontal">
        <div class="form-group" v-show="isShowConfirm">
          <label class="col-sm-offset-1 col-sm-1 control-label txr">审核操作</label>
          <div class="col-sm-10">
            <button type="button" class="btn btn-success" @click="pass()" :disabled="submitDisabled">通过</button>
            <button type="button" class="btn btn-danger" @click="$refs.modal.open();">不通过</button>
          </div>
        </div>
      </div>
      <v-modal
        :title="'审核'"
        ref="modal"
        :ok="reject">
        <div slot="body">
          <div class="form-group">
            <textarea class="form-control" placeholder="请输入不通过原因" style="height: 200px;"
                      val-required no-validate-pass-tip v-model="reason" autofocus></textarea>
          </div>
        </div>
      </v-modal>
    </div>
  </div>
</template>

<script>
  import {
    PLATFORM_ORGANIZ, PLATFORM_POST_ORGANIZ_BASEWAITAUDIT,
    PLATFORM_PUT_ORGANIZ_BASEAUDIT, PLATFORM_POST_ORGANIZ_REGISTWAITAUDIT,
    PLATFORM_PUT_ORGANIZ_REGISTAUDIT,
  } from '@/config/env';
  import { formatDate } from '@/config/utils';
  import { ORGANIZ_STATE } from '@/config/mapping';
  import { MessageBox } from 'element-ui';

  export default {
    name: 'agencyView',
    data() {
      return {
        // 提交按钮可用状态 ： true表示不可用
        submitDisabled: false,
        // tab选中，true选中第一个，false选中第二个
        tabActive: true,
        // 不通过原因
        reason: null,
        // 状态
        state: '',
        stateCN: '',
        data: {},
        // 是否显示审核操作按钮
        isShowConfirm: false,
        formatDate,
        config: {
          baseWaitPending: {
            api: PLATFORM_POST_ORGANIZ_BASEWAITAUDIT,
          },
          baseWaitAudit: {
            api: PLATFORM_PUT_ORGANIZ_BASEAUDIT,
          },
          registWaitPending: {
            api: PLATFORM_POST_ORGANIZ_REGISTWAITAUDIT,
          },
          registWaitAudit: {
            api: PLATFORM_PUT_ORGANIZ_REGISTAUDIT,
          },
        },
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      async reject() {
        const r = await this.submit({ state: false, reason: this.reason });
        return r;
      },
      pass() {
        MessageBox({
          title: '提示',
          message: '确认审核通过吗？',
          showCancelButton: true,
          showConfirmButton: true,
          type: 'info',
        }).then(async () => {
          this.submit({ state: true });
        }).catch(() => {
        });
      },
      async getData() {
        const res = await this.$http.get(`${PLATFORM_ORGANIZ}/${this.$route.params.id}`);
        if (res.success) {
          this.data = res.data;

          this.tabActive = !this.data.state.startsWith('regist');

          if (this.data.surveyImageUrl) {
            this.data.surveyImageUrl = this.data.surveyImageUrl.split(',');
          }
          if (this.data.chargerSurveyImageUrl) {
            this.data.chargerSurveyImageUrl = this.data.chargerSurveyImageUrl.split(',');
          }
          if (this.data.otherImageUrl) {
            this.data.otherImageUrl = this.data.otherImageUrl.split(',');
          }

          // 设置状态和状态显示
          this.state = this.data.state;
          this.stateCN = ORGANIZ_STATE[this.state] ? ORGANIZ_STATE[this.state].name.fontcolor(ORGANIZ_STATE[this.state].color) : '';
          // 基本信息待初审、复审； 登记信息待初审、复审可以有审核操作按钮
          this.isShowConfirm = Object.keys(this.config).indexOf(this.state) > -1;
        }
      },
      async submit(param) {
        this.submitDisabled = true;

        const res = await this.$http.post(`${this.config[this.state].api}${this.$route.params.id}`, param);
        if (res.success) {
          this.$transfer({
            buttons: [{
              text: '去列表',
              link: '/declarer/agency',
            }],
          });
          return true;
        }

        this.submitDisabled = false;
        return false;
      },
    },
    components: {
      'v-img': () => import('@/components/img'),
      'v-modal': () => import('@/components/modal'),
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
    position: absolute;
    left: 0px;
  }
</style>
