<template>
  <div class="content">
    <div class="content_con">
      <div class="main_left_content clearfix">
        <div class="content_con content_con_one">
          <h4>经销商详情
            <span style="color:red">（信息待审核）</span>
          </h4>
        <div class="form-group clearfix">
            <div class="content_left"><strong>经销商名称：</strong></div>
            <div class="content_right view"><strong>老咯</strong></div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left"><strong>经销商地址：</strong></div>
            <div class="content_right view"><strong>湖南省长沙市市辖区 海港广场</strong></div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left"><strong>头像：</strong></div>
            <div class="content_right view">
                <a class="1528169367541 cboxElement" href="http://pic.cpsdb61.com/5564039b495b1c1cc41591611de58db9" title=""><img class="img-viewer img-viewer-added" src=""></a>
            </div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left"><strong>负责人：</strong></div>
            <div class="content_right view"><strong>老龙旺</strong></div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left"><strong>手机号：</strong></div>
            <div class="content_right view"><strong>18583673261</strong></div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left"><strong>身份证号：</strong></div>
            <div class="content_right view"><strong>522321198606157319</strong></div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left"><strong>经销商身份证：</strong></div>
            <div class="content_right view">
                <ul class="row clearfix">
                    <li class="col-sm-3">
                        <a class="1528169367541 cboxElement" href="http://pic.cpsdb61.com/dec6741fad0aa78b640144e4b4055cb7" title=""><img class="img-viewer img-viewer-added" src=""></a>
                    </li>
                    <li class="col-sm-3">
                        <a class="1528169367541 cboxElement" href="http://pic.cpsdb61.com/0295b7d2d90696f73cc6a6ce94d02995" title=""><img class="img-viewer img-viewer-added" src=""></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left"><strong>资质证书：</strong></div>
            <div class="content_right view">
                <ul class="row clearfix">
                    <li class="col-sm-2">
                        <a class="1528169367541 cboxElement" href="http://pic.cpsdb61.com/7da48a69db051dd1cf2137b1c2ee0f03" title=""><img class="img-viewer img-viewer-added" src="">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="content_con_one">
        <h4>李银测试使用诸城市碧龙春茶业有限公司</h4>
        <div class="form-group clearfix">
            <div class="content_left"><strong>商品授权书：</strong></div>
            <div class="content_right view">
                <ul class="row clearfix">
                    <li class="col-sm-2">
                        <a class="1528169367541 cboxElement" href="http://pic.cpsdb61.com/4278f7a5dec1a0803588cacda2dbfcbb" title=""><img class="img-viewer img-viewer-added" src="">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left"><strong>授权商品：</strong></div>
            <div class="content_right view">
                <strong style="color:red;">已授权商品：</strong>
                <div class="franchiser-sku-container" style="margin: 0 0 20px 30px;">
                    <strong>商品：</strong><span>━(*｀∀´*)ノ亻! </span>
                    <div><strong>授权区域：</strong>
                    天津市；
                    吉林省四平市；
                    福建省漳州市云霄县；
                    </div>
                </div>
                <strong style="color:red;">未通过授权商品：</strong>
                <div class="franchiser-sku-container" style="margin: 0 0 20px 30px;">
                    <strong>商品：</strong><span>0327 </span>
                    <div><strong>原因：</strong>商品授权书不对！~</div>
                </div>
            </div>
        </div>
    </div>
    <!--proxy-->
    <div class="text-center">
        <a class="btn btn-primary" href="javascript:history.back(-1);">返回上一页<span class="glyphicon glyphicon-share-alt"></span></a>
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
.content_right {
	width: 82%;
}
.content_right {
	margin-bottom: 5px;
}
.content_con_one {
	padding: 10px 30px;
}
.content_con_one h4 {
	padding-bottom: 30px;
}
.content_con_one .btn {
	margin-right: 30px;
	/*width: 100px;*/
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
.placeholder {
	color: #999;
}
a:hover {
	color: #33a8ff;
}
.btn-primary {
	background: #327BFB;
}
.btn {
	padding: 5px 25px;
	margin: 0 3px;
	outline: none;
}
.search, .clear {
	padding: 7px 20px;
}
.search span {
	margin-right: 10px;
}
.btn-primary:hover {
	background: #3171e2;
	border-color: #3171e2;
}

</style>