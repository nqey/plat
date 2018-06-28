<template>
  <div class="plat-content">
    <div class="plat-content-con">
        <form class="form-horizontal">
          <div class="form-group">
            <h1 class="col-sm-12" style="text-align: center;">认证官详情</h1>
            <button type="button" class="btn btn-default" @click="$router.push('/authofficer/list')">返回</button>
            <button type="button" class="btn btn-primary pull-right" @click="$router.push(`/authofficer/edit/${$route.params.id}`)">编辑</button>
          </div>
          <br/>
          <div class="form-group">
            <label class="col-sm-4 control-label">照　　片</label>
            <div class="col-sm-8">
              <v-img :width="150" :imgSrc="form.avator"></v-img>
            </div>
          </div>
          <div class="form-group">
              <label class="col-sm-4 control-label">姓　　名</label>
              <div class="col-sm-5">
                <input class="form-control" type="text" v-model="form.name" placeholder="姓名 例：赵四" disabled>
              </div>
          </div>·
          <div class="form-group">
              <label class="col-sm-4 control-label">服务中心</label>
              <div class="col-sm-5">
                <input class="form-control" type="text" v-model="form.organiz" placeholder="隶属省级服务中心 例：四川省服务中心" disabled>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-4 control-label">联系电话</label>
              <div class="col-sm-5">
                 <input class="form-control" type="text" v-model="form.organizTel" placeholder="隶属省级服务中心联系电话 例：156******83" disabled>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-4 control-label">考试分数</label>
              <div class="col-sm-5">
                 <input class="form-control" type="text" v-model="form.score" placeholder="考试分数 例如：90" disabled>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-4 control-label">身份证号</label>
              <div class="col-sm-5">
                 <input class="form-control" type="text" v-model="form.idCard" placeholder="身份证号 例：513***********5294" disabled>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-4 control-label">身份证(正/反面)</label>
              <div class="col-sm-2">
                 <v-img :imgSrc="form.idFrontUrl"></v-img>
              </div>
              <div class="col-sm-2">
                 <v-img :imgSrc="form.idBackUrl"></v-img>
              </div>
              <div class="col-sm-2">
              </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label">承诺公函</label>
            <div class="col-sm-8">
              <v-img :imgSrc="form.agreement"></v-img>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label">二维码</label>
            <div class="col-sm-8">
              <img :src="DECLARE_QCODE2 + $route.params.id"></img>
              <a download :href="DECLARE_QCODE2 + $route.params.id" >下载二维码</a>
            </div>
          </div>
          <div class="form-group" v-if="!form.state">
              <label class="col-sm-4 control-label">审核</label>
              <div class="col-sm-5">
                <button type="button" class="btn btn-success" @click="submit">通过</button>
              </div>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { PLATFORM_AUTHOFFICER_GET, DECLARE_QCODE2, PLATFORM_AUTHOFFICER_CONFIRM } from '@/config/env';

  export default {
    name: 'mview',
    data() {
      return {
        DECLARE_QCODE2,
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
          qrcode: null,
        },
      };
    },
    methods: {
      async init() {
        const param = {
          id: this.$route.params.id,
        };
        const res = await this.$http.get(PLATFORM_AUTHOFFICER_GET, param);
        if (res.success) {
          this.form = res.data;
        }
      },
      async submit() {
        const param = {
          id: this.$route.params.id,
        };
        const res = await this.$http.post(PLATFORM_AUTHOFFICER_CONFIRM, param);
        if (res.success) {
          this.$transfer({
            buttons: [{
              text: '去列表',
              link: '/authofficer/list',
            }],
          });
        }
      },
    },
    components: {
      'v-img': () => import('@/components/img'),
    },
    mounted() {
      this.init();
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

</style>