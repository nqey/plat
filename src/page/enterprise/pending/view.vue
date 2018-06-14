<template>
  <div class="content">
    <div class="content_con">
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
.header_con {
	position: relative;
	margin-left: 500px;
}
.logo {
	width: 240px;
	min-width: 240px;
	height: 250px;
	padding-top: 40px;
	text-align: center;
	display: list-item;
	background: #4063FF;
	position: fixed;
	z-index: 102;
}
.logo h3 {
	color: #fff;
	line-height: 35px;
	font-size: 20px;
	font-weight: bold;
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
.content_right .form-control {
	margin-bottom: 5px;
}
.content_con_one, .content_con_cen {
	padding: 10px 30px;
}
.content_nav {
	padding: 0 30px;
}
.content_nav h4 {
	margin: 0;
	padding: 20px 0;
}
.bianj {
	border: 1px solid #015FE5;
	border-radius: 15px;
	padding: 6px 28px;
	font-size: 12px;
	color: #015FE5;
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
.content_con_tit {
	border-bottom: 2px solid #EDF2F5;
	margin: 0;
}
.content_con_tit span {
	display: block;
	width: 120px;
	text-align: center;
	border-bottom: 2px solid #015FE5;
	padding: 28px 0 15px 0;
}
.image30 {
	display: block;
	max-width: 30%;
	margin-right: 3.3%;
	float: left;
	min-width: 100px;
	cursor: pointer;
}
.wzxg {
	padding: 3px 10px;
	border-radius: 4px;
	border: 1px solid #dddddd;
	background: #fdfdfd;
	min-width: 300px;
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
.btn {
	padding: 5px 25px;
	margin: 0 3px;
	outline: none;
}


</style>