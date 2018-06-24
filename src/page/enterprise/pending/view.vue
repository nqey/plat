<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <div class="box">
        <div class="title">审核信息</div>
        <div class="title_content">
          <span>订单编号:</span><p>{{list.order.id}}</p>
        </div>
        <div class="title_content">
          <span>支付方式:</span><p>{{payway[list.order.payMethod]}}</p>
        </div>
        <div class="title_content">
          <span>支付状态:</span><p>{{stateOjb[list.order.state]}}</p>
        </div>
        <div class="title_content">
          <span>支付金额:</span><p>{{list.order.amount}}</p>
        </div>
        <div class="title_content">
          <span>创建时间:</span><p>{{list.order.createTime && formatDate(list.order.createTime)}}</p>
        </div>
        <div class="title_content"> 
          <span>支付时间:</span><p>{{list.order.modifyTime && formatDate(list.order.modifyTime)}}</p>
        </div>
        <div class="title_content">
          <span>审核操作:</span><p><button @click="pass">通过</button><button @click="nopass" id="color">不通过</button></p>
        </div>
      </div>
      <div class="box">
        <div class="title two">审核信息</div>
        <div class="text"><span>初审资料</span></div>
        <div class="title_box">
          <div class="title_content">
            <span>企业名称:</span><p>{{list.base.name}}</p>
          </div>
          <div class="title_content">
            <span>企业logo:</span>
            <img style="width: 150px;" :src="getImgSrc(list.base.logo)">
          </div>
          <div class="title_content">
            <span>座机号码:</span><p>{{list.base.phone}}</p>
          </div>
          <div class="title_content">
            <span>企业地址:</span><p>{{list.base.address}}785275272857</p>
          </div>
          <div class="title_content">
            <span>企业介绍:</span><p>{{list.base.introduction}}</p>
          </div>
        </div>
<!--    ............................................................................................     -->
        <div class="text"><span>营业执照</span></div>
        <div class="title_box">
          <div class="title_content">
            <span>营业执照号:</span><p>{{list.base.license}}</p>
          </div>
          <div class="title_content">
            <span>注册地址:</span><p>{{list.base.licenseAddress}}</p>
          </div>
          <div class="title_content">
            <span>营业期限:</span><p>{{list.base.businessValidStart}}</p>
          </div>
          <div class="title_content">
            <span>营业执照影印件:</span>
            <img style="width: 200px;" :src="getImgSrc(list.base.licenseImageUrl)">
          </div>
          <div class="title_content">
            <span>经营范围:</span>
            <p>{{list.base.businessScope}}</p>
          </div>
        </div>
<!--    ............................................................................................     -->
        <div class="text"><span>法人信息</span></div>
        <div class="title_box">
          <div class="title_content">
            <span>法人姓名:</span><p>{{list.legalPerson.name}}</p>
          </div>
          <div class="title_content">
            <span>证件类型:</span><p>{{idtype[list.legalPerson.idType]}}</p>
          </div>
          <div class="title_content">
            <span>身份证号码:</span><p>{{list.legalPerson.idNumber}}</p>
          </div>
          <div class="title_content">
            <span>证件有效期:</span><p>{{list.legalPerson.idValidStart}}</p>
          </div>
          <div class="title_content">
            <span class="">身份证正/反面:</span>
            <img style="width: 300px" :src="getImgSrc(list.legalPerson.idFrontUrl)">
            <img style="width: 300px" :src="getImgSrc(list.legalPerson.idBackUrl)">
          </div>
        </div>
<!--    ............................................................................................     -->
        <div class="text"><span>负责人信息</span></div>
        <div class="title_box">
          <div class="title_content">
            <span>负责人姓名:</span><p>{{list.charger.name}}</p>
          </div>
          <div class="title_content">
            <span>手机号码:</span><p>{{list.charger.cellphone}}</p>
          </div>
          <div class="title_content">
            <span>邮箱地址:</span><p>{{list.charger.email}}</p>
          </div>
          <div class="title_content">
            <span>证件类型:</span><p>{{idtype[list.charger.idType]}}</p>
          </div>
          <div class="title_content">
            <span>身份证号码:</span><p>{{list.charger.idNumber}}</p>
          </div>
          <div class="title_content">
            <span>证件有效期:</span><p>{{list.charger.idValidStart}}</p>
          </div>
          <div class="title_content">
            <span>身份证正/反面:</span>
            <img style="width: 300px;" :src="getImgSrc(list.legalPerson.idFrontUrl)">
            <img style="width: 300px;" :src="getImgSrc(list.legalPerson.idBackUrl)"> 
          </div>
          <div class="title_content">
            <span>手持身份证照:</span>
            <img style="width: 200px;" :src="getImgSrc(list.charger.idHoldFrontUrl)">
          </div>
        </div>
<!--    ............................................................................................     -->
        <div class="text"><span>申请公函</span></div>
        <div class="title_box">
          <div class="title_content">
            <span>申请公函编号:</span><p>{{list.base.letterNumber}}</p>
          </div>
          <div class="title_content">
            <span>公函有效期限:</span><p>{{list.base.letterValidStart}}  ——  {{list.base.letterValidEnd}}</p>
          </div>
          <div class="title_content">
            <span class="">申请公函影印件:</span>
            <img style="width: 200px;" :src="getImgSrc(list.base.letterImageUrl)">
          </div>
          <div class="title_content">
            <div class="spanblack">操作记录:</div>
            <div class="ffleft">
              <div v-for="item in list.logs">
                {{item.createTime && formatDate(item.createTime)}}[{{item.owner}}][{{eventObj[item.event]}}]:
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-passmodal ref="passmodal"></v-passmodal>
      <v-nopassmodal ref="nopassmodal"></v-nopassmodal>
    </div>
  </div>
</template>

<script>
  import { PLATFORM_EP_GET, PLATFORM_EP_CONFIRM, PLATFORM_EP_REJECT } from '@/config/env';
  import { getPictureUrl, formatDate } from '@/config/utils';
  import passmodal from '@/page/enterprise/pending/passmodal';
  import nopassmodal from '@/page/enterprise/pending/nopassmodal';

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
        eventObj: {
          create: '创建',
          pay: '支付',
          confirm: '通过',
          reject: '不通过',
          authSubmit: '认证官采集完成',
          reject2: '认证官采集未通过',
          pendingModify: '初审修改',
          pending2Modify: '复审修改',
        },
        payway: {
          alipayWeb: '支付宝',
          wachatpayQrcode: '微信支付',
          offline: '线下支付',
          free: '全额补贴',
        },
        stateOjb: {
          wait: '待支付',
          success: '支付成',
          failed: '支付失败',
        },
        idtype: {
          1: '身份证',
          2: '驾驶证',
          3: '军官证',
        },
      };
    },
    components: {
      'v-passmodal': passmodal,
      'v-nopassmodal': nopassmodal,
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
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.box{
  width: 100%;
  margin-bottom: 100px;
}
.title{
  width: 100%;
  margin-bottom: 20px;
  font-size: 24px; 
}
.two{
  margin-bottom: 5px;
}
.text{
  height: 32px;
  font-size: 20px;
  border-bottom: 2px solid #e9e9e9;
  margin-bottom: 15px;
}
.text span{
  height: 32px;
  font-family: "黑体";
  display: inline-block;
  border-bottom: 2px solid #337CFD;
}
.title_content{
  width: 100%;
  line-height: 50px;
}
.title_content span{
  display: inline-block;
  font-size: 18px;
  width: 200px;
}
.spanblack {
  font-size: 18px;
  width: 200px;
  float: left;
}
.title_content p, .ffleft{
  width: 80%;
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
}
.title_content p button{
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #337CFD;
  border: none;
  color: #fff;
  margin: 5px 20px 0  0;
  border-radius: 5px;
}
#color{
  background: #ff6666,
}
.title_box > .title_content:last-child{
  margin-bottom: 20px;
}
</style>