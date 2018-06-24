<template>
  <div class="plat-content">
    <div class="plat-content-con">
        	<div style="font-size: 42px; text-align: center;margin-bottom: 50px;font-family: '宋体';">认证官认证</div>
    	<div class="row">
        <div class="col-md-6 col-md-offset-3 inlet">
            <div id="main-form">
                <div class="row">
                    <div class="col-md-2 inlet_left_tit">
                        <label>照　　片</label>
                    </div>
                    <div class="col-md-10">请本人上传真实半身照，照片会进行身份证对比，点击更换<span style="color:red;font-size:12px; display:block;margin:0; padding:0; line-height:20px;">* 必须上传蓝色背景寸照，否则审核不通过</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-10 ytz">
                        <div class="image-uploader" style="float: left;" postname="avator" data-error="请选择半身照">
                          <section class="img-section">
                            <div class="z_photo upimg-div">
                                <section class="z_file fl">
                                    <img :src="add" class="add-img">
                                    <input type="file" class="file" name="fileList" validate="false" accept="image/jpg,image/png,image/bmp,image/jpeg">
                                </section>
                            </div>
                        </section>
                    </div>
                        <img class="slz" :src="slz">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <div class="col-md-2">
                            <label>姓　　名</label>
                        </div>
                        <div class="col-md-10">
                            <input class="form-control" type="text" name="name" validtype="required" data-notice="false" data-error="请输入姓名" placeholder="姓名 例：赵四">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <div class="col-md-2">
                            <label>服务中心</label>
                        </div>
                        <div class="col-md-10">
                            <input class="form-control" type="text" name="organiz" validtype="required" data-notice="false" data-error="请输入效省级服务中心名称" placeholder="隶属省级服务中心 例：四川省服务中心">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <div class="col-md-2">
                            <label>联系电话</label>
                        </div>
                        <div class="col-md-10">
                            <input class="form-control" type="text" name="organizTel" validtype="required" data-notice="false" data-error="请输入省级服务中心电话" placeholder="隶属省级服务中心联系电话 例：156******83">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <div class="col-md-2">
                            <label>考试分数</label>
                        </div>
                        <div class="col-md-10">
                            <input class="form-control" type="text" name="score" validtype="required" data-notice="false" data-error="请准确输入分数" placeholder="考试分数 例如：90">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <div class="col-md-2">
                            <label>身份证号</label>
                        </div>
                        <div class="col-md-10">
                            <input class="form-control" type="text" name="idCard" validtype="required idCard" data-notice="false" data-error="请输入正确的身份证号" placeholder="身份证号 例：513***********5294">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <label>身份证<br>
                            <span>(正/反面)</span></label>
                    </div>
                    <span style="color:red;font-size:12px; display:block;margin:5px; padding:0; line-height:20px;"> * 请按照示例图格式上传图片，否则审核不通过</span>
                    <div class="col-md-5 ytz">
                        <div class="image-uploader" style="float: left;" data-error="请选择身份证正面照" postname="idFrontUrl" background="">
                            <section class="img-section">
                                <div class="z_photo upimg-div">
                                    <section class="z_file fl">
                                        <img :src="idcar" class="add-img">
                                        <input type="file" class="file" name="fileList" validate="false" accept="image/jpg,image/png,image/bmp,image/jpeg">                </section>
                                    </div>
                                </section>
                            </div>
                        <img class="slz" :src="sfzsl">
                    </div>
                    <div class="col-md-5 ytz">
                        <div class="image-uploader" style="float: left;" data-error="请选择身份证反面照" postname="idBackUrl" background="">
                            <section class="img-section">
                                <div class="z_photo upimg-div">
                                    <section class="z_file fl">
                                        <img :src="idcar2" class="add-img">
                                        <input type="file" class="file" name="fileList" validate="false" accept="image/jpg,image/png,image/bmp,image/jpeg">                </section>
                                    </div>
                                </section>
                            </div>
                        <img class="slz" :src="sfzsl">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <div class="col-md-2">
                            <label>承诺公函</label>
                        </div>
                        <div class="col-md-10">
                            <a href="" class="cngh">下载承诺公函</a>　并认真阅读签字盖章，将影印件上传至下方即可
                            <span style="color:red;font-size:12px; display:block;margin:0px; padding:0; line-height:20px;">
                                * 请按照示例图格式上传图片，否则审核不通过</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-10 ytz">
                        <div class="image-uploader" style="float: left;" postname="agreement" data-error="请选择公函签名照">
                            <section class="img-section">
                                <div class="z_photo upimg-div">
                                    <section class="z_file fl">
                                        <img :src="add" class="add-img">
                                        <input type="file" class="file" name="fileList" validate="false" accept="image/jpg,image/png,image/bmp,image/jpeg">                </section>
                                    </div>
                                </section>
                            </div>
                        <img class="slz" :src="ghsl">
                    </div>
                </div>


                <div class="row">
                    <div class="form-group">
                        <div class="col-md-2">
                            <label>手机验证</label>
                        </div>
                        <div class="col-md-10">
                            <input class="form-control" type="text" name="cellphone" validtype="required cellphone" data-notice="false" data-error="请输入正确的手机号码" placeholder="手机号 例：156******83">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <div class="col-md-2"></div>
                        <div class="col-md-7">
                            <input class="form-control" type="text" name="validateCode" validtype="required" data-notice="false" data-error="请输入4位有效验证码" placeholder="请输入验证码">
                        </div>
                        <div class="col-md-3">
                            <input type="button" class="btn yzm" id="sendcode" value="获取验证码">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <div class="col-md-2"></div>

                        <div class="col-md-10">
                            <input type="button" class="btn tj" data-event="submit" value="提交" data-loading-text="正在提交…">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
  import add from '@/assets/img/photo_icon.jpg';
  import slz from '@/assets/img/slz.jpg';
  import idcar from '@/assets/img/idcar.png';
  import idcar2 from '@/assets/img/idcar-2.png';
  import sfzsl from '@/assets/img/sfzsl.jpg';
  import ghsl from '@/assets/img/ghsl.jpg';

  export default {
    name: 'entry',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        lists: [],
        add,
        slz,
        idcar,
        idcar2,
        sfzsl,
        ghsl,
      };
    },
    computed: {
    },
    methods: {
    },
    watch: {
    },
    components: {
    },
    beforeCreate() {
    },
    cteated() {
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

img {
	max-width: none;
}
ul li {
	list-style-type: none;
}
.z_file .add-img {
    display: block;
    width: 158px;
    height: 158px;
    border: 2px dashed #E7E6E6;
}
.z_file .file {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
}
.slz {
    display: none;
    position: absolute;
    z-index: 1;
}
.ytz:hover .slz {
    display: inline-block;
}
.slz {
    border: 1px solid #ddd;
    display: none;
    position: absolute;
    z-index: 1;
}
.row{
    margin: 25px 0;
}
.form-control {
	margin-bottom: 5px;
}
.btn {
	margin-right: 30px;
	outline: none;
	color: #fff;
	min-width: 135px;
	background: #337CFD;
	color: #fff;
    padding: 5px 25px;
    margin: 0 3px;
    outline: none;
}
.tj{
    width: 180px;
}
select {
	background-color: #fff;
	height: 30px;
	line-height: 30px;
	padding: 4px 6px;
	color: #666666;
	border-radius: 3px;
	outline: none;
	-webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
	-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
h1 a {
	display: block;
	height: 50px;
	/* width: 398px; */
	margin: auto;
	overflow: hidden;
	color: #fff;
	font-size: 30px;
	/* font-weight: normal; */
	text-align: center;
	text-decoration: none; /* line-height: 50px; */
}
.placeholder {
	color: #999;
}
a:hover {
	color: #33a8ff;
}
.form-control {
	min-width: 200px;
}
.col-md-2 label{
    font-size: 18px;
    font-weight: 500;
    font-family: '黑体';
}

</style>