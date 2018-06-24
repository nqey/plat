<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <div class="box">
        <div class="title">工厂详情</div>
        <div class="title_content">
          <span>工厂名称:</span><p>{{list.name}}</p>
        </div>
        <div class="title_content">
          <span>工厂类型:</span><p>{{typeOjb[list.type]}}</p>
        </div>
        <div class="title_content">
          <span>联系电话:</span><p>{{list.areaCode}}-{{list.phone}}</p>
        </div>
        <div class="title_content">
          <span>企业地址:</span><p>{{list.address.area}}{{list.address.address}}</p>
        </div>
        <div class="title_content">
          <div class="spanblack">操作记录:</div>
           <div class="ffleft">
            <div v-for="item in list.logs">
              {{item.createTime && formatDate(item.createTime)}}[{{item.owner}}][{{eventObj[item.event]}}]:
            </div>
          </div>
        </div>
        <div class="title_content">
          <div class="spanblack">工厂图片:</div>
          <div class="ffleft">
            <div v-for="item of images.qualification">
              <v-img style="width: 200px;" :imgSrc="item"></v-img>
            </div>
          </div>
        </div>
        <div class="title_content">
          <div class="spanblack">工厂资质:</div>
          <div class="ffleft">
            <div v-for="item of images.main">
              <v-img style="width: 200px;" :imgSrc="item"></v-img>
            </div>
          </div>
        </div>
        <div class="title_content">
          <div class="spanblack">承诺函:</div>
          <div class="ffleft">
            <div v-for="item of images.promise">
              <v-img style="width: 200px;" :imgSrc="item"></v-img>
            </div>
          </div>
        </div>
        <div class="title_content">
          <span>审核操作:</span><p style="color: red;">{{stateObj[list.state]}}</p>
        </div>
        <div class="title_content in_the">
          <button class="return" @click="back">返回上一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PLATFORM_FACTORY_GET } from '@/config/env';
import { formatDate, getPictureUrl } from '@/config/utils';

export default {
  name: '',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      formatDate,
      list: {
        logs: {},
        address: {},
      },
      images: {},
      typeOjb: {
        1: '生产工厂',
        2: '赋码工厂',
      },
      stateObj: {
        pending: '待审核',
        passed: '通过审核',
        failed: '未通过审核',
        draft: '待提交',
      },
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
      factoryId: this.$route.params.id,
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
        factoryId: this.factoryId,
      };
      const res = await this.$http.get(PLATFORM_FACTORY_GET, param);
      if (res.success) {
        this.list = res.data;
        this.images = JSON.parse(this.list.images || '[]');
      }
    },
    getImgSrc(value) {
      return value && getPictureUrl(value, { w: 0, h: 0, q: 0 });
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
  font-size: 28px;
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
.title_content p button, .return {
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
