<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <div class="box">
        <div class="title">经销商详情<span></span></div>
        <div class="title_content">
          <span>经销商名称:</span><p>{{list.base.name}}</p>
        </div>
        <div class="title_content">
          <span>经销商地址:</span><p>{{list.address.area}}{{list.address.address}}</p>
        </div>
        <div class="title_content">
          <div class="spanblack">头像:</div>
          <div class="ffleft">
            <v-img style="width: 200px;" :imgSrc="list.base.portrait"></v-img>
          </div>
        </div>
        <div class="title_content">
          <span>负责人:</span><p>{{list.base.charger}}</p>
        </div>
        <div class="title_content">
          <span>手机号:</span><p>{{list.base.cellphone}}</p>
        </div>
        <div class="title_content">
          <span>身份证号:</span><p>{{list.base.idNumber}}</p>
        </div>
        <div class="title_content">
          <div class="spanblack">经销商身份证:</div>
          <div class="ffleft">
            <v-img style="width: 200px; float: left;" :imgSrc="list.base.idFrontUrl"></v-img>
            <v-img style="width: 200px; float: left; margin-left: 20px;" :imgSrc="list.base.idBackUrl"></v-img>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="title two">四川中新华搜信息技术有限公司</div>
        <div class="title_box">
          <div class="title_content">
            <span>商品授权书:</span>
            <img :src="getImgSrc(list.enterprises.imageList)">
          </div>
          <div class="title_content">
            <span>授权商品:</span>
            <p>{{list.enterprises.skuList}}</p>
          </div>
        </div>
        <div class="title_content in_the">
          <button class="return" @click="back">返回上一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { PLATFORM_FRANCHISER_GET } from '@/config/env';
  import { getPictureUrl } from '@/config/utils';

  export default {
    name: '',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        list: {
          base: {},
          address: {},
          enterprises: {},
        },
        portrait: '',
        franchiserId: this.$route.params.id,
      };
    },
    components: {
      'v-img': () => import('@/components/img'),
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        const param = {
          franchiserId: this.franchiserId,
        };
        const res = await this.$http.get(PLATFORM_FRANCHISER_GET, param);
        if (res.success) {
          this.list = res.data;
        }
      },
      getImgSrc(value) {
        return value && getPictureUrl(value, { w: 40, h: 40, q: 40 });
      },
      back() {
        history.back(-1);
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
  width: 180px;
}
.spanblack {
  font-size: 18px;
  width: 180px;
  float: left;
}
.title_content p, .ffleft{
  width: 80%;
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
}
.title_content p{
  font-weight: 600;
  font-size: 16px;
  display: inline;
}
.title_content p button, .return{
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
.in_the{
  text-align: center;
  margin-top:50px;
}
</style>
