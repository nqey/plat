<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4 class="title"><span>工厂详情</span></h4>
      <br/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">工厂名称:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.name}}<label style="display: inline;color: red;margin-left: 20px">（{{FACTORY_STATE[list.state]}}）</label>
            </p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">工厂类型:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{FACTORY_TYPE[list.type]}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">联系电话:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.areaCode === undefined ? '' : list.areaCode +
              '-'}}{{list.phone}}{{list.extendNumber === undefined ? '' : '('+list.extendNumber+')'}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">企业地址:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{list.address.area}}{{list.address.address}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">操作记录:</label>
          <div class="col-sm-10">
            <div v-for="item in list.logs">
              {{item.createTime && formatDate(item.createTime)}}[{{item.owner}}][{{ENTERPRISE_EVENT[item.event]}}]:
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">工厂图片:</label>
          <div class="col-sm-10">
            <div v-for="item of images.qualification">
              <v-img :imgSrc="item" style="float: left;margin-right: 10px;"></v-img>
            </div>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">工厂资质:</label>
          <div class="col-sm-10">
            <div v-for="item of images.main">
              <v-img :imgSrc="item" style="float: left;margin-right: 10px;"></v-img>
            </div>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">工厂资质:</label>
          <div class="col-sm-10">
            <div v-for="item of images.promise">
              <v-img :imgSrc="item" style="float: left;margin-right: 10px;"></v-img>
            </div>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">审核操作:</label>
          <div class="col-sm-10">
            <p class="form-control2" v-if="list.state === 'pending'">
              <button type="button" class="btn btn-primary" @click="pass">通过</button>
              <button type="button" class="btn btn-danger" style="margin-left: 10px;" @click="nopass">不通过</button>
            </p>
            <p class="form-control2" v-else style="color: red;">{{FACTORY_STATE[list.state]}}
            </p>
          </div>
        </div>
        <div class="title_content in_the">
          <button class="return" @click="$router.back(-1)">返回上一页</button>
        </div>
      </form>
      <v-passmodal ref="passmodal" :factoryId="factoryId"></v-passmodal>
      <v-nopassmodal ref="nopassmodal" :factoryId="factoryId"></v-nopassmodal>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '@/config/utils';
  import { PLATFORM_FACTORY_GET } from '@/config/env';
  import { ENTERPRISE_EVENT, FACTORY_TYPE, FACTORY_STATE } from '@/config/mapping';

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
        FACTORY_TYPE,
        FACTORY_STATE,
        ENTERPRISE_EVENT,
        factoryId: this.$route.params.id,
      };
    },
    components: {
      'v-img': () => import('@/components/img'),
      'v-passmodal': () => import('@/page/factory/list/passmodal'),
      'v-nopassmodal': () => import('@/page/factory/list/nopassmodal'),
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
      pass() {
        this.$refs.passmodal.$refs.passmodal.toggle();
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

</style>
