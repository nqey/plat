<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4 class="title"><span>审核信息</span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">订单编号:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.order.id}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">支付方式:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{PAY_METHOD[list.order.payMethod]}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">支付状态:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ENTERPRISE_PAY_TYPE[list.order.state]}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">支付金额:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.order.amount}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">创建时间:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.order.createTime && formatDate(list.order.createTime)}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">支付时间:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.order.createTime && formatDate(list.order.modifyTime)}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">认证官:</label>
          <div class="col-sm-10">
            <p class="form-control2" style="display: inline-block;width: 20%">
              {{list.authentication && list.authentication.authofficerName}}
            </p>
            <button type="button" class="btn btn-primary" @click="open">{{list.authentication && list.authentication.authofficerName ? '重新指派认证官' : '指派认证官'}}</button>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">审核操作:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ENTERPRISE_STATE[list.base.state]}}</p>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span>初审资料</span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">企业名称:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.base.name}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">企业logo:</label>
          <div class="col-sm-10">
            <v-img :imgSrc="list.base.logo && list.base.logo.indexOf('?') >= 0 ? `${list.base.logo}&f=png` : `${list.base.logo}?f=png`" style="float: left;"></v-img>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">座机号码:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.base.areaCode}}-{{list.base.phone}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">企业地址:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.address.area}}{{list.address.address}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">企业介绍:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.base.introduction}}</p>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span>营业执照</span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">营业执照号:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.base.license}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">注册地址:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.base.licenseAddress}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">营业期限:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.base.businessValidStart}}  ——  {{list.base.businessValidEnd}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">营业执照影印件:</label>
          <div class="col-sm-10">
            <v-img :imgSrc="list.base.licenseImageUrl" style="float: left;"></v-img>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">经营范围:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.base.businessScope}}</p>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span>法人信息</span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">法人姓名:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.legalPerson.name}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件类型:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ID_TYPE[list.legalPerson.idType]}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证号码:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.legalPerson.idNumber}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件有效期:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.legalPerson.idValidStart}}  ——  {{list.legalPerson.idValidEnd}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证正/反面:</label>
          <div class="col-sm-10">
            <v-img :imgSrc="list.legalPerson.idFrontUrl" style="float: left;"></v-img>
            <v-img :imgSrc="list.legalPerson.idBackUrl" style="float: left;margin-left: 20px;"></v-img>
            <div style="clear: both;"></div>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span>负责人信息</span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">负责人姓名:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.charger.name}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">手机号码:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.charger.cellphone}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">邮箱地址:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.charger.email}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件类型:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{ID_TYPE[list.charger.idType]}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证号码:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.charger.idNumber}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">证件有效期:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.charger.idValidStart}}  ——  {{list.charger.idValidEnd}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证正/反面:</label>
          <div class="col-sm-10">
            <v-img :imgSrc="list.charger.idFrontUrl" style="float: left;"></v-img>
            <v-img :imgSrc="list.charger.idBackUrl" style="float: left;margin-left: 20px;"></v-img>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">手持身份证照:</label>
          <div class="col-sm-10">
            <v-img :imgSrc="list.charger.idHoldFrontUrl" style="float: left;"></v-img>
            <div style="clear: both;"></div>
          </div>
        </div>
      </form>
<!--    ............................................................................................     -->
      <h4 class="title"><span>申请公函</span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">申请公函编号:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.base.letterNumber}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">公函有效期限:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.base.letterValidStart}}  ——  {{list.base.letterValidEnd}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">申请公函影印件:</label>
          <div class="col-sm-10">
            <v-img :imgSrc="list.base.letterImageUrl" style="float: left;"></v-img>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">操作记录:</label>
          <div class="col-sm-10">
            <p class="form-control2">
              <div v-for="item in list.logs">
                {{item.createTime && formatDate(item.createTime)}}[{{item.owner}}][{{ENTERPRISE_EVENT[item.event]}}]:
              </div>
            </p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">操作:</label>
          <div class="col-sm-10">
            <button type="button" class="btn btn-danger" @click="nopass">不通过</button>
          </div>
        </div>
      </form>
      <v-viewmodal ref="viewmodal" :handler="handler"></v-viewmodal>
      <v-nopassmodal ref="nopassmodal" :id="$route.params.id" ></v-nopassmodal>
    </div>
  </div>
</template>

<script>
  import viewmodal from '@/page/enterprise/collectting/viewmodal';
  import nopassmodal from '@/page/enterprise/collectting/nopassmodal';
  import { PLATFORM_EP_GET } from '@/config/env';
  import { formatDate, getPictureUrl } from '@/config/utils';
  import { ENTERPRISE_EVENT, ENTERPRISE_PAY_TYPE, ID_TYPE, ENTERPRISE_STATE, PAY_METHOD } from '@/config/mapping';

  export default {
    name: '',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        handler: () => {
          this.getData();
        },
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
        PAY_METHOD,
        ENTERPRISE_PAY_TYPE,
        ID_TYPE,
        ENTERPRISE_STATE,
      };
    },
    components: {
      'v-viewmodal': viewmodal,
      'v-nopassmodal': nopassmodal,
      'v-img': () => import('@/components/img'),
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        const param = {
          enterpriseId: this.enterpriseId,
        };
        const res = await this.$http.get(PLATFORM_EP_GET, param);
        if (res.success) {
          this.list = res.data;
        }
      },
      getImgSrc(value) {
        return value && getPictureUrl(value, { q: 40 });
      },
      open() {
        this.$refs.viewmodal.$refs.viewmodal.toggle();
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
</style>
