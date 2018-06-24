<template>
  <div class="plat-content">
    <div class="plat-content-con">
    	<h4>筛选条件</h4>
      <hr/>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-1 control-label">发布至</label>
          <div class="col-sm-11">
            <select class="form-control" v-model="type">
              <option v-for="(v, k) of status" :value="k">{{v}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-1 control-label">标题</label>
          <div class="col-sm-11">
            <input placeholder="请输入标题" class="form-control" v-model="title"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-1 control-label">公告内容</label>
          <div class="col-sm-11">
            <quill-editor ref="myTextEditor"
                          v-model="content"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
          </div>
        </div>
        <br/>
        <br/>
        <div class="form-group">
          <div class="col-sm-offset-1 col-sm-11">
            <button type="button" class="btn btn-default" @click="submit">发布</button>
            <button v-if="$route.params.id" type="button" class="btn btn-default" @click="$router.push('/message/list')">返回</button>
          </div>
        </div>
      </form>
      <v-modal ref="modal"></v-modal>
    </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';
import { PLATFORM_NOTICES, PUBLICS_NOTICES_DETAILS } from '@/config/env';
import modal from '@/page/message/create/modal';

export default {
  name: 'system',
  components: {
    quillEditor,
    'v-modal': modal,
  },
  data() {
    return {
      title: '',
      content: '',
      type: 'authOfficer',
      editorOption: {
       // something config
      },
      status: {
        authOfficer: '认证官系统',
        declare: '申报系统',
        enterprise: '企业平台系统',
      },
    };
  },
  methods: {
    onEditorBlur() {
      // console.log('editor blur!', editor);
    },
    onEditorFocus() {
      // console.log('editor focus!', editor);
    },
    onEditorReady() {
      // console.log('editor ready!', editor);
    },
    onEditorChange() {
      // console.log('editor change!', editor, html, text);
      // this.content = html;
    },
    async init() {
      if (!this.$route.params.id) return;
      const res = await this.$http.get(`${PUBLICS_NOTICES_DETAILS}${this.$route.params.id}`);
      if (res.success) {
        this.title = res.data.title;
        this.content = res.data.content;
        this.type = res.data.type;
      }
    },
    async submit() {
      const param = {};
      param.title = this.title;
      param.content = this.content;
      param.type = this.type;
      let res = null;
      if (!this.$route.params.id) {
        res = await this.$http.post(PLATFORM_NOTICES, param);
        if (res.success) {
          this.title = '';
          this.content = '';
          this.type = 'authOfficer';
          this.$refs.modal.$refs.modal.toggle();
        }
      } else {
        res = await this.$http.put(`${PLATFORM_NOTICES}/${this.$route.params.id}`, param);
        if (res.success) {
          this.$refs.modal.$refs.modal.toggle();
        }
      }
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.quill-editor {
  height: 192px;
}

</style>
