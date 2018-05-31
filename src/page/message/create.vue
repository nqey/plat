<template>
  <div class="content">
    <div class="content_con">
    	<div style="width: 800px; position: relative;">
    	<h4>发布公告</h4>
    	<div class="platform"><span>发布至</span><select><option value="0" selected = "selected">请选择申报系统/企业自主管理后台/认证官方APP</option></select></div>
    	<div class="platform">
    		<div class="obj"><span>发布对象</span><input placeholder="请输入企业名称" /></div>
    	    <div class="type"><span>企业类型</span>
    	    	<select>
    	    		<option value="0" selected = "selected">请选择企业类型</option>
    	    	</select>
    	    </div>
    	</div>
    	<div class="platform"><span>标题</span><input class="title" placeholder="请输入内容" /></div>
    	<div class="platform_1">
    		<div style="width: 80px; height: 260px; margin-right: 20px; text-align: right; float: left;">公告内容</div>
    		<div style="width:700px; float: left;"> 
          <!-- 双向数据绑定 -->
          <quill-editor ref="myTextEditor"
                        v-model="content"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
          </quill-editor>
        </div>
    	</div>
    	<div class="but">发布</div>
    	</div>
    </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'system',
  components: {
    quillEditor,
  },
  data() {
    return {
      content: '',
      editorOption: {
       // something config
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
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.quill-editor {
  height: 192px;
  .ql-container {
  }
}
.platform{
	width: 100%;
	height: 40px;
	margin-top: 40px;
}
.platform_1{
  width: 100%;
  height: 260px;
  margin-top: 40px;
}
.platform span{
	width: 80px;
	height: 40px;
	line-height: 40px;
	margin-right: 20px;
	text-align: right;
	display: inline-block;
}
.platform select{
	width: 700px;
	height: 40px;
	padding-left: 10px;
	border:1px solid #dde8ee;
}
.platform input{
	width: 700px;
	height: 40px;
	padding-left: 10px;
	border:1px solid #dde8ee;
}
.obj{
	width: 400px;
	height: 40px;
	position: absolute;
	display: inline-block;
}
.obj input{
	width: 280px;
	height: 40px;
	padding-left: 10px;
	display: inline-block;
}
.type select{
	position: absolute;
	right: 0;
	padding-left: 10px;
	width: 280px;
	height: 40px;
}
.type{
	width: 400px;
	height: 40px;
	position: absolute;
	left: 400px;
	display: inline-block;
}
.but{
	width: 300px;
	height: 40px;
	line-height: 40px;
	background-color: #327bfb;
	text-align: center;
	border-radius: 5px;
	color: #fff;
  margin-top: 30px;
	margin-left: 100px;
}
input{
  outline:none;
}
:-moz-placeholder {
    color: #aab0c0; 
}

::-moz-placeholder {
    color: #aab0c0;
}

input:-ms-input-placeholder{
    color: #aab0c0;
}

input::-webkit-input-placeholder{
    color: #aab0c0;
}

</style>