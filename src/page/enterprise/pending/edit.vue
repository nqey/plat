<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4 class="title"><span>审核信息</span></h4>
      <br/>
      <form class="form-horizontal" v-if="list.order">
        <div class="form-group">
          <label class="col-sm-2 control-label">订单编号:</label>
          <div class="col-sm-4">
            <p class="form-control2">{{list.order.id}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">支付方式:</label>
          <div class="col-sm-4">
            <p class="form-control2">{{payway[list.order.payMethod]}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">支付状态:</label>
          <div class="col-sm-4">
            <p class="form-control2">{{ENTERPRISE_PAY_TYPE[list.order.state]}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">支付金额:</label>
          <div class="col-sm-4">
            <p class="form-control2">{{list.order.amount}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">创建时间:</label>
          <div class="col-sm-4">
            <p class="form-control2">{{list.order.createTime && formatDate(list.order.createTime)}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">支付时间:</label>
          <div class="col-sm-4">
            <p class="form-control2">{{list.order.modifyTime && formatDate(list.order.modifyTime)}}</p>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span>初审资料</span></h4>
      <br/>
      <form class="form-horizontal" v-if="list.base">
        <div class="form-group">
          <label class="col-sm-2 control-label">企业名称:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.base.name"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">企业logo:</label>
          <div class="col-sm-4">
            <v-imageuploader :width="150" :initImageUrls="[(list.base.logo && list.base.logo.indexOf('?') >= 0 ? `${list.base.logo}&f=png` : `${list.base.logo}?f=png`)]" :title="'请上传LOGO'" :onImageChanged="(urls) => list.base.logo = urls[0]"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">座机号码:</label>
          <div class="col-sm-1">
            <input class="form-control" v-model="list.base.areaCode"/>
          </div>
          <div class="col-sm-1" style="text-align: center;">
            -
          </div>
          <div class="col-sm-3">
            <input class="form-control" v-model="list.base.phone"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">企业地址:</label>
          <div class="col-sm-4">
            <v-area :code="'00' + list.address.areaId" :onAreaChanged="(code) => list.address.areaId = code"></v-area>
            <br/>
            <br/>
            <input class="form-control" v-model="list.address.address"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">企业介绍:</label>
          <div class="col-sm-4">
            <textarea rows="10" class="form-control" v-model="list.base.introduction"/>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span>营业执照</span></h4>
      <br/>
      <form class="form-horizontal" v-if="list.base">
        <div class="form-group">
          <label class="col-sm-2 control-label">营业执照号:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.base.license"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">注册地址:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.base.licenseAddress"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">营业期限:</label>
          <div class="col-sm-2">
            <el-date-picker v-model="list.base.businessValidStart" type="date" value-format="yyyy-MM-dd" placeholder="起始时间"/>
          </div>
          <div class="col-sm-1" style="text-align: center;">
            <span class="text-center">-</span>
          </div>
          <div class="col-sm-2">
            <el-date-picker v-if="list.base.businessValidEnd !== '永久'" v-model="list.base.businessValidEnd" type="date" value-format="yyyy-MM-dd" placeholder="结束时间"/>
            <input class="form-control" v-if="list.base.businessValidEnd === '永久'" v-model="list.base.businessValidEnd" disabled />
          </div>
          <div class="col-sm-2">
            <label>
              <input type="checkbox" :checked="list.base.businessValidEnd === '永久'" @change="isE"> 永久
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">营业执照影印件:</label>
          <div class="col-sm-4">
            <v-imageuploader :title="'营业执照影印件'" :initImageUrls="[list.base.licenseImageUrl]" :onImageChanged="(urls) => list.base.licenseImageUrl = urls[0]"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">经营范围:</label>
          <div class="col-sm-4">
            <textarea rows="10" class="form-control" v-model="list.base.businessScope"/>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span>法人信息</span></h4>
      <br/>
      <form class="form-horizontal" v-if="list.legalPerson">
        <div class="form-group">
          <label class="col-sm-2 control-label">法人姓名:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.legalPerson.name"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件类型:</label>
          <div class="col-sm-4">
            <select class="form-control" v-model="list.legalPerson.idType">
                <option v-for="(v,k) of ID_TYPE" :value="k">{{ v }}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证号码:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.legalPerson.idNumber"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件有效期:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.legalPerson.idValidStart"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件有效期:</label>
          <div class="col-sm-2">
            <el-date-picker v-model="list.legalPerson.idValidStart" type="date" value-format="yyyy-MM-dd" placeholder="起始时间"/>
          </div>
          <div class="col-sm-1" style="text-align: center;">
            <span class="text-center">-</span>
          </div>
          <div class="col-sm-2">
            <el-date-picker v-if="list.legalPerson.idValidEnd !== '永久'" v-model="list.legalPerson.idValidEnd" type="date" value-format="yyyy-MM-dd" placeholder="结束时间"/>
            <input class="form-control" v-if="list.legalPerson.idValidEnd === '永久'" v-model="list.legalPerson.idValidEnd" disabled />
          </div>
          <div class="col-sm-2">
            <label>
              <input type="checkbox" :checked="list.legalPerson.idValidEnd === '永久'" @change="isE2"> 永久
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证(正/反面)</label>
          <div class="col-sm-2">
             <v-imageuploader :title="'请上传身份证正面'" :initImageUrls="[list.legalPerson.idFrontUrl]" :onImageChanged="(urls) => list.legalPerson.idFrontUrl = urls[0]"/>
          </div>
          <div class="col-sm-2">
             <v-imageuploader :title="'请上传身份证反面'" :initImageUrls="[list.legalPerson.idBackUrl]" :onImageChanged="(urls) => list.legalPerson.idBackUrl = urls[0]"/>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span>负责人信息</span></h4>
      <br/>
      <form class="form-horizontal" v-if="list.charger">
        <div class="form-group">
          <label class="col-sm-2 control-label">负责人姓名:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.charger.name"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">手机号码:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.charger.cellphone"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">邮箱地址:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.charger.email"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件类型:</label>
          <div class="col-sm-4">
            <select class="form-control" v-model="list.charger.idType">
                <option v-for="(v,k) of ID_TYPE" :value="k">{{ v }}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证号码:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.charger.idNumber"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件有效期:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.charger.idValidStart"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件有效期:</label>
          <div class="col-sm-2">
            <el-date-picker v-model="list.charger.idValidStart" type="date" value-format="yyyy-MM-dd" placeholder="起始时间"/>
          </div>
          <div class="col-sm-1" style="text-align: center;">
            <span class="text-center">-</span>
          </div>
          <div class="col-sm-2">
            <el-date-picker v-if="list.charger.idValidEnd !== '永久'" v-model="list.charger.idValidEnd" type="date" value-format="yyyy-MM-dd" placeholder="结束时间"/>
            <input class="form-control" v-if="list.charger.idValidEnd === '永久'" v-model="list.charger.idValidEnd" disabled />
          </div>
          <div class="col-sm-2">
            <label>
              <input type="checkbox" :checked="list.charger.idValidEnd === '永久'" @change="isE3"> 永久
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证(正/反面)</label>
          <div class="col-sm-2">
             <v-imageuploader :title="'请上传身份证正面'" :initImageUrls="[list.charger.idFrontUrl]" :onImageChanged="(urls) => list.charger.idFrontUrl = urls[0]"/>
          </div>
          <div class="col-sm-2">
             <v-imageuploader :title="'请上传身份证反面'" :initImageUrls="[list.charger.idBackUrl]" :onImageChanged="(urls) => list.charger.idBackUrl = urls[0]"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">手持身份证照:</label>
          <div class="col-sm-4">
            <v-imageuploader :title="'请上传手持身份证照'" :initImageUrls="[list.charger.idHoldFrontUrl]" :onImageChanged="(urls) => list.charger.idHoldFrontUrl = urls[0]"/>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span>申请公函</span></h4>
      <br/>
      <form class="form-horizontal" v-if="list.base">
        <div class="form-group">
          <label class="col-sm-2 control-label">申请公函编号:</label>
          <div class="col-sm-4">
            <input class="form-control" v-model="list.base.letterNumber" disabled />
            <a href="javascript:void 0" @click="setLetter">下载公函</a>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">公函有效期限:</label>
          <div class="col-sm-4">
           <input class="form-control" disabled :value="list.base.letterValidStart + ' 至 ' + list.base.letterValidEnd"></input>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">申请公函影印件:</label>
          <div class="col-sm-4">
            <v-imageuploader :title="'请上传申请公函影印件'" :initImageUrls="[list.base.letterImageUrl]" :onImageChanged="(urls) => list.base.letterImageUrl = urls[0]"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">操作记录:</label>
          <div class="col-sm-4">
            <table class="table">
              <thead>
                <tr>
                  <th>创建时间</th>
                  <th>操作帐号</th>
                  <th>操作内容</th>
                </tr>
              </thead>
              <tbody>
               <tr v-for="item in list.logs">
                  <td>{{item.createTime && formatDate(item.createTime)}}</td>
                  <td>{{item.owner}}</td>
                  <td>{{ENTERPRISE_EVENT[item.event]}}</td>
               </tr>
              </tbody>
            </table>
          </div>
        </div>
          <div class="form-group">
              <label class="col-sm-4 control-label"></label>
              <div class="col-sm-5">
                 <button type="button" class="btn btn-primary" @click="submit">保存</button>
                 <button type="button" class="btn btn-default" @click="$router.push(`/enterprise/pending/view/${$route.params.id}`)">取消</button>
              </div>
          </div>
      </form>
      <v-nopassmodal ref="nopassmodal"></v-nopassmodal>
    </div>
  </div>
</template>

<script>
  import { PLATFORM_EP_GET, PLATFORM_EP_PENDING_MODIFY, PUBLICS_REGISTER_GET_LETTER_PDF, DOMAIN } from '@/config/env';
  import { ENTERPRISE_EVENT, ENTERPRISE_PAY_TYPE, ID_TYPE } from '@/config/mapping';
  import { formatDate, toQueryString, download } from '@/config/utils';
  import nopassmodal from '@/page/enterprise/pending/nopassmodal';
  import { DatePicker } from 'element-ui';
  import { getCookie } from '@/config/cookie';

  export default {
    name: 'pendingView',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        formatDate,
        list: {
          base: {},
          order: {},
          legalPerson: {},
          charger: {},
          address: {},
          authentication: {},
          logs: {},
        },
        enterpriseId: this.$route.params.id,
        ENTERPRISE_EVENT,
        payway: {
          alipayWeb: '支付宝',
          wachatpayQrcode: '微信支付',
          offline: '线下支付',
          free: '全额补贴',
        },
        ENTERPRISE_PAY_TYPE,
        ID_TYPE,
      };
    },
    components: {
      'v-nopassmodal': nopassmodal,
      'v-imageuploader': () => import('@/components/imageuploader'),
      'v-area': () => import('@/components/area'),
      'el-date-picker': DatePicker,
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        const params = {
          enterpriseId: this.enterpriseId,
        };
        const res = await this.$http.get(PLATFORM_EP_GET, params);
        if (res.success) {
          this.list = res.data;
        }
      },
      dowloadPdf() {
        const params = {
          name: this.list.base.name,
          address: `${this.list.address.area}-${this.list.address.address}`,
          chargerName: this.list.charger.name,
          chargerIdNumber: this.list.charger.idNumber,
          cellphone: this.list.charger.cellphone,
          email: this.list.charger.email,
          domain: DOMAIN,
        };
        const rs = `${PUBLICS_REGISTER_GET_LETTER_PDF}?${toQueryString(params)}`;
        return rs;
      },
      async setLetter() {
        await download(this.dowloadPdf(), '申请公函.pdf');
        this.list.base.letterNumber = getCookie('letter');
      },
      isE() {
        if (this.list.base.businessValidEnd === '永久') {
          this.list.base.businessValidEnd = null;
          return true;
        }
        this.list.base.businessValidEnd = '永久';
        return true;
      },
      isE2() {
        if (this.list.legalPerson.idValidEnd === '永久') {
          this.list.legalPerson.idValidEnd = null;
          return true;
        }
        this.list.legalPerson.idValidEnd = '永久';
        return true;
      },
      isE3() {
        if (this.list.charger.idValidEnd === '永久') {
          this.list.charger.idValidEnd = null;
          return true;
        }
        this.list.charger.idValidEnd = '永久';
        return true;
      },
      async submit() {
        const params = {};
        params.id = this.enterpriseId;
        params.logo = this.list.base.logo;
        params.name = this.list.base.name;
        params.areaCode = this.list.base.areaCode;
        params.phone = this.list.base.phone;
        params.introduction = this.list.base.introduction;
        params.license = this.list.base.license;
        params.licenseAddress = this.list.base.licenseAddress;
        params.businessScope = this.list.base.businessScope;
        params.businessValidStart = this.list.base.businessValidStart;
        params.businessValidEnd = this.list.base.businessValidEnd;
        params.licenseImageUrl = this.list.base.licenseImageUrl;
        params.letterNumber = this.list.base.letterNumber;
        params.letterImageUrl = this.list.base.letterImageUrl;
        params.charger = this.list.charger;
        params.legalPerson = this.list.legalPerson;
        params.address = this.list.address;
        const res = await this.$http.post(PLATFORM_EP_PENDING_MODIFY, params);
        if (res.success) {
          this.$transfer({
            back: '继续更新',
            buttons: [{
              text: '返回详情',
              link: `/enterprise/pending/view/${this.enterpriseId}`,
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

</style>
