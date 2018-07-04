<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <ul>
        <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="myindex = index;tab(index)">{{item}}
        </li>
        <div style="clear: both;"></div>
      </ul>
      <div v-show="myindex === 0">
        <div style="font-size: 18px;margin-left: 24px;line-height: 50px;">审核信息</div>
        <br/>
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">企业名称：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{list.base.name}}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">订单编号：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{list.order.id}}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">支付方式：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{PAY_METHOD[list.order.payMethod]}}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">支付状态：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{ENTERPRISE_PAY_TYPE[list.order.state]}}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">支付金额：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{list.order.amount}}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">创建时间：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{list.order.createTime && formatDate(list.order.createTime)}}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">支付时间：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{list.order.createTime && formatDate(list.order.modifyTime)}}</p>
            </div>
          </div>
        </form>
        <!--    ............................................................     -->
        <h4 class="title"><span>基本信息</span></h4>
        <br/>
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">企业logo：</label>
            <div class="col-sm-10">
              <v-img
                :imgSrc="list.base.logo && list.base.logo.indexOf('?') >= 0 ? `${list.base.logo}&f=png` : `${list.base.logo}?f=png`"
                style="float: left;"></v-img>
              <div style="clear: both;"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">座机号码：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{list.base.areaCode}}-{{list.base.phone}}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">注册地址：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{list.base.licenseAddress}}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">企业地址：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{list.address.area}}{{list.address.address}}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">企业介绍：</label>
            <div class="col-sm-10">
              <p class="form-control2">{{list.base.introduction}}</p>
            </div>
          </div>
        </form>
        <!--    ............................................................     -->
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
              <p class="form-control2">{{list.base.businessValidStart}} —— {{list.base.businessValidEnd}}</p>
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
        <!--    ............................................................     -->
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
              <p class="form-control2">{{list.legalPerson.idValidStart}} —— {{list.legalPerson.idValidEnd}}</p>
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
        <!--    ............................................................     -->
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
              <p class="form-control2">{{list.charger.idValidStart}} —— {{list.charger.idValidEnd}}</p>
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
        <!--    ............................................................     -->
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
              <p class="form-control2">{{list.base.letterValidStart}} —— {{list.base.letterValidEnd}}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">申请公函影印件:</label>
            <div class="col-sm-10">
              <v-img :imgSrc="list.base.letterImageUrl" style="float: left;"></v-img>
              <div style="clear: both;"></div>
            </div>
          </div>
        </form>
      </div>
      <!-- 第二页面复审信息 -->
      <div v-show="myindex === 1">
        <div style="font-size: 18px;margin-left: 24px;line-height: 50px;">复审信息</div>
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
              <p class="form-control2">{{ (list.authentication && list.authentication.authofficerName) ||
                '认证官暂未上门采集'}}</p>
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
        <h4 class="title"><span>企业环境</span></h4>
        <br/>
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">门牌照:</label>
            <div class="col-sm-10">
              <v-img v-for="(item, i) of imageList.doorplate" :key="i" :imgSrc="item.url"></v-img>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">文化墙:</label>
            <div class="col-sm-10">
              <v-img v-for="(item, i) of imageList.culture" :key="i" :imgSrc="item.url"></v-img>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">办公环境:</label>
            <div class="col-sm-10">
              <v-img v-for="(item, i) of imageList.environment" :key="i" :imgSrc="item.url"></v-img>
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
          <div class="form-group" v-if="imageList.orgCode">
            <label class="col-sm-2 control-label">组织机构代码证书:</label>
            <div class="col-sm-10">
              <v-img v-for="(item, i) of imageList.orgCode" key="i" :imgSrc="item.url"></v-img>
            </div>
          </div>
          <div class="form-group" v-if="imageList.tax">
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
              <video v-if="imageList.video" style="max-width:400px;" :src="VIDEO_SERVER_URL + imageList.video[0].url"
                     controls="controls">
                your browser does not support the video tag
              </video>
            </div>
          </div>
          <div class="form-group" v-if="center">
            <label class="col-sm-2 control-label">承诺地址:</label>
            <div class="col-sm-10">
              <div class="amap-page-container">
                <el-amap vid="amapDemo" :center="center" :amap-manager="amapManager" :zoom="zoom" class="amap-demo">
                  <el-amap-marker vid="component-marker" :position="center"></el-amap-marker>
                  <el-amap-text :text="address" :offset="offset" :position="center"></el-amap-text>
                </el-amap>
              </div>
            </div>
          </div>
        </form>
      </div>
      <!-- 第三页面认证证书 -->
      <div v-show="myindex === 2">
        <div style="font-size: 18px;margin-left: 24px;line-height: 50px;">认证证书
          <a :href="getPictureUrl(list.base.autheImageUrl)" download="认证证书.jpg">（点击下载）</a>
        </div>
        <v-img style="float: left;margin-left: 15px;" :imgSrc="list.base.autheImageUrl"></v-img>
        <div style="clear: both;"></div>
      </div>
      <div class="title_content in_the">
        <button class="return" @click="$router.back(-1)">返回上一页</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { PLATFORM_EP_GET, VIDEO_SERVER_URL } from '@/config/env';
  import { PAY_METHOD, ENTERPRISE_PAY_TYPE, ID_TYPE } from '@/config/mapping';
  import { getPictureUrl, formatDate, download } from '@/config/utils';
  import batchadd from '@/assets/img/batchadd.png';
  import VueAMap from 'vue-amap';

  const amapManager = new VueAMap.AMapManager();

  export default {
    name: 'pendingView',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        myindex: 0,
        tabs: ['基础资料', '认证资料', '认证证书'],
        num: 0,
        list: {
          address: {},
          authentication: {},
          base: {},
          charger: {},
          legalPerson: {},
          logs: [],
          order: {},
        },
        imageList: [],
        data: {
          base: {},
          authentication: {},
        },
        formatDate,
        PAY_METHOD,
        ENTERPRISE_PAY_TYPE,
        ID_TYPE,
        VIDEO_SERVER_URL,
        amapManager,
        zoom: 12,
        center: null,
        batchadd,
        address: null,
        offset: [-20, 20],
      };
    },
    components: {
      'v-img': () => import('@/components/img'),
    },
    mounted() {
      this.getData();
    },
    methods: {
      download,
      getPictureUrl,
      tab(index) {
        this.num = index;
      },
      async getData() {
        const param = {
          enterpriseId: this.$route.params.id,
        };
        const res = await this.$http.get(PLATFORM_EP_GET, param);
        if (res.success) {
          this.list = Object.assign({}, this.list, res.data);
          this.imageList = this.list.authentication && JSON.parse(this.list.authentication.imageList || '[]');
          this.imageList = this.imageList || [];
          this.center = [res.data.authentication.longitude, res.data.authentication.latitude];
          this.address = res.data.authentication.address;
        }
      },
      getImgSrc(value) {
        return value && getPictureUrl(value, { w: 0, h: 0, q: 0 });
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
    display: inline-block;
    width: 120px;
    text-align: center;
    border-bottom: 1px solid #015FE5;
    padding: 28px 0 15px 0;
  }

  .plat-content-con ul {
    width: 100%;
    height: 62px;
    color: #878988;
    border-bottom: 2px solid #EDF2F5;
  }

  .plat-content-con ul li {
    float: left;
    width: 120px;
    height: 62px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
  }

  .plat-content-con ul li:hover {
    cursor: pointer
  }

  .in_the {
    text-align: center;
    margin-top: 50px;
  }

  .return {
    width: 120px;
    height: 40px;
    line-height: 40px;
    background: #337CFD;
    border: none;
    color: #fff;
    margin: 5px 20px 0 0;
    border-radius: 5px;
  }

  .active {
    color: #333;
    border-bottom: 2px solid #015FE5;
  }

  .amap-demo {
    height: 300px;
    width: 350px;
  }
</style>
