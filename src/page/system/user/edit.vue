<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <section>
        <h4 class="title"><span>{{ mode === 'insert' ? '新增用户' :'修改用户' }}</span></h4>
        <form class="form-horizontal body">
          <div class="form-group">
            <label class="col-sm-2 control-label">LOGO：</label>
            <div class="col-sm-10">
              <v-imageuploader :title="'请上传头像/LOGO'" :initImageUrls="[data.logo]"
                               :onImageChanged="(urls) => { data.logo = urls[0] }"/>
              <!--<v-videouploader :title="'请上传视频'" :initVideoUrls="[data.logo]"-->
              <!--:onVideoChanged="(urls) => { data.logo = urls[0] }"/>-->
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">用户名称：</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="data.username" val-required placeholder="请输入用户名">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">账户密码：</label>
            <div class="col-sm-6">
              <input v-if="mode === 'insert'" type="text" class="form-control" v-model="data.password"
                     val-required val-password placeholder="请设置密码">
              <input v-else type="text" class="form-control" v-model="data.password" placeholder="不输入此项表示不修改">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">用户类型：</label>
            <div class="col-sm-6">
              <select name="type" v-model="data.type" class="form-control" val-required>
                <option value="">请选择用户类型</option>
                <option v-for="(v, k) of platformUserType" :value="k">{{ v }}</option>
              </select>
            </div>
          </div>
          <!--2， 3为省级市级服务中心，需要录入以下信息-->
          <div v-if="[2, 3].indexOf(+data.type) > -1">
            <div class="form-group">
              <label class="col-sm-2 control-label">资质证书：</label>
              <div class="col-sm-6">
                <v-imageuploader :title="'请上传资质证书'" :initImageUrls="[data.diplomaUrl]"
                                 :onImageChanged="(urls) => { data.diplomaUrl = urls[0] }"/>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">姓&#12288;&#12288;名：</label>
              <div class="col-sm-6">
                <input class="form-control" v-model="data.chargerName" placeholder="负责人姓名">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">联系电话：</label>
              <div class="col-sm-6">
                <input class="form-control" v-model="data.cellphone" val-cellphone placeholder="负责人联系电话">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">公司名称：</label>
              <div class="col-sm-6">
                <input class="form-control" v-model="data.companyName" placeholder="输入机构/公司名称">
              </div>
            </div>
          </div>
          <div class="form-group" v-if="[2, 3, 4].indexOf(+data.type) > -1">
            <label class="col-sm-2 control-label">负责区域：</label>
            <div class="col-sm-10">
              <button type="button" class="btn btn-default" @click="data.chargeAreaCodeList.push('')"
                      style="margin-bottom: 15px;">
                增加负责区域
              </button>
              <div style="margin-bottom: 15px;" v-for="(area, index) in data.chargeAreaCodeList">
                <v-area :code="area" style="display: inline;"
                        :onAreaChanged="(code) => { data.chargeAreaCodeList[index] = code; }"></v-area>
                <a @click="data.chargeAreaCodeList.splice(index, 1)">【删除】</a>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">绑定角色：</label>
            <div class="col-sm-3 role-tree-container">
              <v-tree :nodes="roleNodes" :selected="data.roleIdList" :multiple="true"
                      :onSelectionChanged="(selected) => { this.data.roleIdList = selected; }"></v-tree>
            </div>
          </div>
          <div class="form-group" style="margin-top: 51px;">
            <div class="col-sm-offset-2 col-sm-3">
              <button type="button" class="btn btn-default" @click="save" :disabled="disabled">
                {{ disabled ? '正在保存…' : '&#8194;保&#12288;&#12288;存&#8194;' }}
              </button>
              <button type="button" class="btn" onclick="history.back(-1);">返回上一页
                <span class="glyphicon glyphicon-share-alt"></span>
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
  import { BASE_URL } from '@/config/env';
  import { PLATFORM_USER_TYPE } from '@/config/mapping';
  import { validate } from '@/config/validator';

  export default {
    name: 'userEdit',
    data() {
      return {
        platformUserType: PLATFORM_USER_TYPE,
        title: '',
        mode: 'insert',
        roleNodes: [],
        disabled: false,
        data: {
          // logo头像
          logo: null,
          // 用户名
          username: null,
          // 用户类型 1 -- 平台 2 -- 省级服务中心 3 -- 市级管理中心 4 -- 市场部
          type: '',
          // 负责区域的code
          chargeAreaCodeList: [],
          // 角色id list 用户已经绑定的角色id 列表，如果为null或空则表示还未绑定任何角色
          roleIdList: [],
          // 资质证书, 省级市级服务中心才有
          diplomaUrl: null,
          // 电话号码, 省级市级服务中心才有
          cellphone: null,
          // 负责人姓名 省级市级服务中心才有
          chargerName: null,
          // 公司名称,如：四川新中华搜信息技术有限公司, 省级市级服务中心才有
          companyName: null,
        },
        config: ({
          insert: {
            init() {
              this.mode = 'insert';
            },
            save() {
              return this.$http.post(`${BASE_URL}platform/system/user`, this.data);
            },
            transfer() {
              this.$transfer({
                back: '继续添加',
                buttons: [{
                  text: '去列表',
                  link: '/system/user',
                }],
              });
            },
          },
          update: {
            async init() {
              this.mode = 'update';
              const res = await this.$http.get(`${BASE_URL}platform/system/user/${this.$route.params.id}`);
              Object.assign(this.data, res.data);
            },
            save() {
              return this.$http.put(`${BASE_URL}platform/system/user/${this.$route.params.id}`, this.data);
            },
            transfer() {
              this.$transfer({
                buttons: [{
                  text: '去列表',
                  link: '/system/user',
                }],
              });
            },
          },
          // id不为空表示编辑，否则表示新增
        })[this.$route.params.id ? 'update' : 'insert'],
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        // 加载角色树
        const tree = await this.$http.get(`${BASE_URL}platform/system/role/tree`);
        this.roleNodes = tree.data;

        // 获取配置初始化
        this.config.init.call(this);
      },
      @validate()
      async save() {
        this.disabled = true;

        const res = await this.config.save.call(this);
        if (res.success) {
          this.config.transfer.call(this);
        }

        this.disabled = false;
      },
    },
    components: {
      'v-tree': () => import('@/components/tree'),
      'v-area': () => import('@/components/area'),
      'v-imageuploader': () => import('@/components/imageuploader'),
      // 'v-videouploader': () => import('@/components/videouploader'),
    },
  };
</script>

<style scoped>
  .form-control {
    width: 50%;
  }

  .title {
    border-bottom: 2px solid #EDF2F5;
    margin: 0;
  }

  .title span {
    display: block;
    width: 120px;
    text-align: center;
    border-bottom: 2px solid #015FE5;
    padding: 28px 0 15px 0;
  }

  .body {
    padding: 20px 30px;
  }

  .role-tree-container {
    max-height: 500px;
    overflow: auto;
    padding-right: 0;
  }

  .role-tree-container::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .role-tree-container::-webkit-scrollbar-thumb {
    background: rgba(68, 54, 54, 0.1);
  }

</style>
