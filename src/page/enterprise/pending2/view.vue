<!-- <template>
  <div class="content">
    <div class="content_con">
      <div class="main_left_content">
        <div class="content_con_one">
        <h4>审核信息</h4>
        <div class="form-group clearfix">
            <div class="content_left">
                <p>企业名称:</p>
            </div>
            <div class="content_right"><strong>上海会顺实业有限公司</strong></div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left">
                <p>定位地址:</p>
            </div>
            <div class="content_right">
                <strong>认证官暂未上门采集</strong>
            </div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left">
                <p>录入人员:</p>
            </div>
            <div class="content_right">
                <strong>认证官暂未上门采集</strong></div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left">
                <p>录入时间:</p>
            </div>
            <div class="content_right"><strong>认证官暂未上门采集 </strong>
            </div>
        </div>
        <div class="form-group clearfix">
            <div class="content_left"><p>审核操作</p></div>
            
            <div class="content_right">
                <button class="btn btn_pass" data-event="pass">通过</button>
                <button class="btn btn_nopass" data-event="reject" disabled="disabled">不通过</button>
            </div>
            
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
.btn_pass {
	background: #337CFD;
}
.btn_nopass {
	background: #FC5765;
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

</style> -->