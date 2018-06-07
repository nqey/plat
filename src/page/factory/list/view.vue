<template>
  <div class="content">
    <div class="content_con">
      <div class="main_left_content clearfix">
        <h3>工厂详情</h3>
        <div class="main_left_section_content">
          <div class="form-group clearfix">
            <div class="content_left">工厂名称：</div>
            <div class="content_right view">
              <p>
                <strong>江门市明富粮油食品有限公司</strong>
                <span style="color: red;">（已审核）</span>
              </p>
            </div>
            <div class="content_right edit" style="display: none;">
              <input type="text" class="form-control" name="name" placeholder="请输入工厂名称" validtype="required" value="江门市明富粮油食品有限公司">
              <div class="beizhu">(备注：请填写工厂全称)</div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="content_left">工厂类型：</div>
            <div class="content_right view">
              <p><strong>生产工厂</strong></p>
            </div>
            <div class="content_right edit" style="display: none;">
              <select name="type" validtype="required" class="form-control type">
                <option value="1">生产工厂</option>
                <option value="2">赋码工厂</option>
              </select>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="content_left">联系电话</div>
            <div class="content_right view"><strong>0750 - 3669588</strong></div>
            <div class="row content_right edit" style="display: none;">
              <input type="text" class="form-control" name="areaCode" style="width:70px;" validtype="required" placeholder="区号" value="0750">
              <input type="text" class="form-control" name="phone" validtype="required" placeholder="电话" value="3669588">
              <input type="text" class="form-control" name="extendNumber" placeholder="分机号" value="">
              <div class="beizhu">(备注：若无分机号可不填)</div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="content_left">企业地址：</div>
            <div class="content_right view"><p><strong>广东省江门市蓬江区 杜阮镇龙榜工业区蓬莱一路3号</strong></p></div>
            <div class="content_right edit" style="display: none;">
              <div id="address" class="area-container">
                <select data-event="province" name="address.provinceId" validtype="required">
                  <option value="" selected="selected">省份</option>
                  <option value="1">北京市</option>
                  <option value="19">天津市</option>
                  <option value="37">河北省</option>
                  <option value="230">山西省</option>
                  <option value="372">内蒙古自治区</option>
                  <option value="497">辽宁省</option>
                  <option value="626">吉林省</option>
                  <option value="704">黑龙江省</option>
                  <option value="858">上海市</option>
                  <option value="876">江苏省</option>
                  <option value="999">浙江省</option>
                  <option value="1112">安徽省</option>
                  <option value="1250">福建省</option>
                  <option value="1354">江西省</option>
                  <option value="1477">山东省</option>
                  <option value="1649">河南省</option>
                  <option value="1844">湖北省</option>
                  <option value="1974">湖南省</option>
                  <option value="2124">广东省</option>
                  <option value="2284">广西壮族自治区</option>
                  <option value="2424">海南省</option>
                  <option value="2455">重庆市</option>
                  <option value="2496">四川省</option>
                  <option value="2719">贵州省</option>
                  <option value="2822">云南省</option>
                  <option value="2976">西藏自治区</option>
                  <option value="3060">陕西省</option>
                  <option value="3188">甘肃省</option>
                  <option value="3301">青海省</option>
                  <option value="3354">宁夏回族自治区</option>
                  <option value="3387">新疆维吾尔自治区</option>
                  <option value="3506">台湾省</option>
                  <option value="3507">香港特别行政区</option>
                  <option value="3508">澳门特别行政区</option>
                </select>
                <select data-event="city" name="address.cityId" validtype="required">
                  <option value="" selected="selected">地级市</option>
                  <option value="2125">广州市</option>
                  <option value="2138">韶关市</option>
                  <option value="2150">深圳市</option>
                  <option value="2158">珠海市</option>
                  <option value="2163">汕头市</option>
                  <option value="2172">佛山市</option>
                  <option value="2179">江门市</option>
                  <option value="2188">湛江市</option>
                  <option value="2199">茂名市</option>
                  <option value="2206">肇庆市</option>
                  <option value="2216">惠州市</option>
                  <option value="2223">梅州市</option>
                  <option value="2233">汕尾市</option>
                  <option value="2239">河源市</option>
                  <option value="2247">阳江市</option>
                  <option value="2253">清远市</option>
                  <option value="2263">东莞市</option>
                  <option value="2264">中山市</option>
                  <option value="2265">潮州市</option>
                  <option value="2270">揭阳市</option>
                  <option value="2277">云浮市</option>
                </select>
                <select data-event="district" name="address.areaId" validtype="required">
                  <option value="" selected="selected">市、县级市</option>
                  <option value="2180">市辖区</option>
                  <option value="2181">蓬江区</option>
                  <option value="2182">江海区</option>
                  <option value="2183">新会区</option>
                  <option value="2184">台山市</option>
                  <option value="2185">开平市</option>
                  <option value="2186">鹤山市</option>
                  <option value="2187">恩平市</option>
                </select>
              </div>
              <input type="text" class="form-control" name="address.address" value="杜阮镇龙榜工业区蓬莱一路3号" placeholder="请填写详细地址，精确到门牌号" validtype="required">
              <div class="beizhu">(备注：便于后期进行工厂实地考察，详细地址请精确到门牌号)</div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="content_left">操作记录：</div>
            <div class="content_right view">
              <strong>
                <p>2018-05-24 11:33:30[13702285378][创建]：</p>
                <p>2018-05-24 14:24:49[13702285378][提交审核]：</p>
                <p>2018-05-31 14:47:58[庞波][通过审核]：</p>
              </strong>
            </div>
          </div>
          <!--  板块详情 -->
          <div class="main_left_section_content">
            <div class="form-group clearfix">
              <div class="content_left">工厂图片：</div>
              <div class="content_right view">
                <ul class="row clearfix">
                  <li class="col-sm-4">
                    <a class="1527841577627 cboxElement" href="" title=""><img class="img-viewer img-viewer-added" src=""></a>
                  </li>
                  <li class="col-sm-4">
                    <a class="1527841577627 cboxElement" href="" title=""><img class="img-viewer img-viewer-added" src=""></a>
                  </li>
                  <li class="col-sm-4">
                    <a class="1527841577627 cboxElement" href="" title=""><img class="img-viewer img-viewer-added" src=""></a>
                  </li>
                </ul>
              </div>

            <div class="content_right edit" style="display: none;">
                <ul class="row clearfix" id="main-images">
                  <section class="img-section">
                    <div class="z_photo upimg-div">
                      <section class="up-section fl">
                        <span class="up-span"></span>
                        <img class="close-upimg" src="">
                        <img class="up-img" src="">
                        <p class="img-name-p"></p>
                        <input type="hidden" name="fileUrl" value="d166e94bff76c1f301d1987e944b09eb">
                      </section>
                      <section class="up-section fl">
                      <span class="up-span"></span>
                      <img class="close-upimg" src="">
                      <img class="up-img" src="">
                      <p class="img-name-p"></p>
                      <input type="hidden" name="fileUrl" value="b920e6315f0fd13fe6efe6eba4e778a9"></section><section class="up-section fl">
                      <span class="up-span"></span>
                      <img class="close-upimg" src="">
                      <img class="up-img" src="">
                      <p class="img-name-p"></p>
                      <input type="hidden" name="fileUrl" value="b7d2ee80d607abfb6c076c029687b309">
                    </section>
                    <section class="z_file fl">
                      <img src="" class="add-img">
                      <input type="file" class="file" name="fileList" validate="false" multiple="multiple" accept="image/jpg,image/png,image/bmp,image/jpeg">
                    </section>
                  </div>
                </section>
              </ul>
              <div class="beizhu">(备注：图片尺寸400*300，请上传1—5张图片，为了展示效果美观，请保证图片大小风格统一)
              </div>
            </div>
          </div>
         <div class="form-group clearfix">
            <div class="content_left">工厂资质：</div>
            <div class="content_right view">
              <ul class="row clearfix">
                <li class="col-sm-4">
                  <a class="1527841577627 cboxElement" href="" title=""><img class="img-viewer img-viewer-added" src=""></a>
                </li>
                <li class="col-sm-4">
                  <a class="1527841577627 cboxElement" href="" title=""><img class="img-viewer img-viewer-added" src=""></a>
                </li>
              </ul>
            </div>
            <div class="content_right edit" style="display: none;">
              <ul class="row clearfix" id="qualification-images">
                <section class="img-section">
                  <div class="z_photo upimg-div">
                      <section class="up-section fl">
                      <span class="up-span"></span>
                      <img class="close-upimg" src="">
                      <img class="up-img" src="">
                      <p class="img-name-p"></p>
                      <input type="hidden" name="fileUrl" value="349e7f0d7866b421939599cffe7558ce">
                    </section>
                    <section class="up-section fl">
                      <span class="up-span"></span>
                      <img class="close-upimg" src="">
                      <img class="up-img" src="">
                      <p class="img-name-p"></p><input type="hidden" name="fileUrl" value="171fc020fa819981756139a7b5acb466">
                    </section>
                    <section class="z_file fl">
                      <img src="" class="add-img">
                      <input type="file" class="file" name="fileList" validate="false" multiple="multiple" accept="image/jpg,image/png,image/bmp,image/jpeg">
                    </section>
                  </div>
                </section>
              </ul>
              <div class="beizhu">(备注：请上传营业执照、全国工业安全生产许可证、卫生许可证等资质证书)
              </div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="content_left">承诺函：</div>
            <div class="content_right view">
              <ul class="row clearfix">
                <li class="col-sm-4">
                  <a class="1527841577627 cboxElement" href="" title="">
                    <img class="img-viewer img-viewer-added" src="">
                  </a>
                </li>
              </ul>
            </div>
            <div class="content_right edit" style="display: none;">
              <ul class="row clearfix" id="promise-images">
                <section class="img-section">
                  <div class="z_photo upimg-div">
                    <section class="up-section fl">
                      <span class="up-span"></span>
                      <img class="close-upimg" src="">
                      <img class="up-img" src="">
                      <p class="img-name-p"></p>
                      <input type="hidden" name="fileUrl" value="b126945d1734d1796d875569ebca17ab">
                    </section>
                    <section class="z_file fl" style="display: none;">
                      <img src="" class="add-img">
                      <input type="file" class="file" name="fileList" validate="false" accept="image/jpg,image/png,image/bmp,image/jpeg">
                    </section>
                  </div>
                </section>
              </ul>
            </div>
          </div>
          <div class="form-group clearfix edit" style="display: none;">
            <div class="text-center">
              <input data-event="save" class="btn btn-primary" type="button" value="保存">
              <input data-event="view" class="btn btn-primary" type="button" value="取消">
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="content_left">审核操作：</div>
            <div class="content_right">
              <strong style="color:red">已审核</strong>
            </div>
          </div>
        </div>
        <!-- 板块结束 -->
          <div class="text-center">
            <a class="btn btn-primary" href="javascript:history.back(-1);">返回上一页
              <span class="glyphicon glyphicon-share-alt"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      lists: [],
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
	max-width: 100%;
}
ul li {
	list-style-type: none;
}
.form-group {
	margin: 10px 0 !important;
	border-radius: 4px;
}
.form-group {
	margin: 25px 0;
	border-radius: 4px;
}
.content_left, .content_right {
	float: left;
}
.content_left {
	width: 16%;
	margin-right: 2%;
}
.content_left p {
	margin: 0;
}
.form-control {
	margin-bottom: 5px;
}
.btn {
	margin-right: 30px;
	outline: none;
	color: #fff;
}
.btn {
	min-width: 180px;
	background: #337CFD;
	color: #fff;
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
.input {
	width: 100%;
	padding: 7px;
	vertical-align: middle;
	border: 0 none;
	color: #000000;
	background: transparent;
	font-size: 17px; /* font-family: Arial,"Microsoft Yahei";*/
}
.input:focus {
	outline: 0 none;
}
.placeholder {
	color: #999;
}
a:hover {
	color: #33a8ff;
}
.btn {
	padding: 5px 25px;
	margin: 0 3px;
	outline: none;
}
.btn-primary:hover {
	background: #3171e2;
	border-color: #3171e2;
}
.form-inline {
	margin-bottom: 20px;
}
.form-inline .form-control {
	min-width: 200px;
}
.form-inline label {
	margin-right: 10px;
}
@media (max-width: 1480px){
.search, .clear{ margin-top:22px;}
}


</style>