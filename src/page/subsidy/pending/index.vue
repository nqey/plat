
<template>
	<div class="content">
	    <div class="content_con">
		    <ul>
		        <li>
					<div class="the-total"><img :src="sumIcon">补贴总额（单位：元）</div>
					<div class="the-total-amount">{{ amountObj.subsidyAmount }}</div>
		        </li>
		        <li>
	    			<div class="subsidies">
		    			<div class="total">审核通过</div>
		    			<div class="number">{{ amountObj.passAmount }}</div>
		    			<div class="block gt">
		    				<div class="block_1 gt" :style="{width:block_1 + 'px'}"></div>
		    			</div>
	    			</div>
		    	</li>
		    	<li>
	    			<div class="subsidies">
		    			<div class="total">拒绝申请</div>
		    			<div class="number">{{ amountObj.rejectedAmount }}</div>
		    			<div class="block gt">
		    				<div class="block_2 gt" :style="{width:block_2 + 'px'}"></div>
		    			</div>
	    			</div>
		    	</li>
		    	<li>
	    			<div class="subsidies">
		    			<div class="total">延后处理</div>
		    			<div class="number">{{ amountObj.delayedAmount }}</div>
		    			<div class="block gt">
		    				<div class="block_3 gt" :style="{width:block_3 + 'px'}"></div>
		    			</div>
	    			</div>
		    	</li>
		    </ul>
	    </div>
	    <div class="content_con">
	    	<ul>
	    		<li>
	    			<div class="the-total"><img :src="headcountIcon">申请总人数</div>
	    			<div class="the-total-amount">{{ amountObj.subsidyCount }}</div>
	    		</li>
	    		<li>
	    			<div class="subsidies">
		    			<div class="total">审核通过</div>
		    			<div class="number">{{ amountObj.passCount }}</div>
		    			<div class="block gt">
		    				<div class="block_4 gt" :style="{width:block_4 + 'px'}"></div>
		    			</div>
	    			</div>
	    		</li>
	    		<li>
	    			<div class="subsidies">
		    			<div class="total">拒绝申请</div>
		    			<div class="number">{{ amountObj.rejectedCount }}</div>
		    			<div class="block gt">
		    				<div class="block_5 gt" :style="{width:block_5 + 'px'}"></div>
		    			</div>
	    			</div>
	    		</li>
	    		<li>
	    			<div class="subsidies">
		    			<div class="total">延后处理</div>
		    			<div class="number">{{ amountObj.delayedCount }}</div>
		    			<div class="block gt">
		    				<div class="block_6 gt" :style="{width:block_6 + 'px'}"></div>
		    			</div>
	    			</div>
	    		</li>
	    	</ul>
	    </div>
	    <div class="content_con">
	        <div style="font-size: 16px;font-weight: bold;padding-left: 16px;">待审核列表</div>
	        <div class="the_input">
        		<p>机构名称<input type="text" placeholder="申报机构/省级/市级"></p>
        		<p>提现卡号<input type="text" placeholder="请输入卡号"></p>
        		<p>交易号<input type="text" placeholder="请输入交易号"></p>
        		<P>选择状态
	    			<select v-model="state">
                        <option v-for="(v, k) of status" :value="k">{{v}}</option>
                    </select>
        		</P>
	        	</div>
	        	<!-- <div class="but">查询</div> -->
	        	<v-datagrid :toolbar="toolbar" :columns="columns" :checkable="checkable"
                  :data-url="dataUrl" :count-url="countUrl" :load-data="datas"></v-datagrid>
	        </div>
	    </div>
	</div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import sumIcon from '@/assets/img/sum_icon.png';
  import headcountIcon from '@/assets/img/headcount_icon.png';
  import { SUBSIDIES_ADDRESS } from '@/config/env';

  export default {
    name: 'pending',
    data() {
      return {
        sumIcon,
        headcountIcon,
        amountObj: {},
        block_1: '',
        block_2: '',
        block_3: '',
        block_4: '',
        block_5: '',
        block_6: '',
        status: {
          0: '',
          pending: '待审核',
          delayed: '延后',
          rejected: '未通过',
          passed: '通过',
        },
        state: 0,
        datas: [{
          id: '123456',
          name: '成都市申报机构',
          openName: '王麻子',
          categoryName: '中国银行',
          cardNumber: '999999999',
          amount: '1000000,00',
          tel: '13588888888',
          createTime: '2018-04-25',
          code: '待审核',
        },
        {
          id: '999999',
          name: '绵阳市申报机构',
          openName: '张三',
          categoryName: '中国银行',
          cardNumber: '888888888',
          amount: '900000,00',
          tel: '13788998899',
          createTime: '',
          code: '延后',
        }],
        dataUrl: SUBSIDIES_ADDRESS,
        countUrl: SUBSIDIES_ADDRESS,
        toolbar: [{
          title: '查询',
          handler() {
            window.console.log('查询');
          },
        }],
        checkable: true,
        columns: [{ field: 'id', header: '交易号', sort: 'id', width: 100 },
          { field: 'name', header: '申请机构', sort: 'name', width: 180 },
          { field: 'openName', header: '开户名', width: 100 },
          { field: 'categoryName', header: '开户行', width: 100 },
          { field: 'cardNumber', header: '卡号', width: 220 },
          { field: 'amount', header: '金额', width: 100 },
          { field: 'tel', header: '手机号', width: 150 },
          {
            field: 'createTime',
            header: '申请时间',
            sort: 'create_time',
            width: 200,
            formatter(row, index, value) {
              return new Date(value).toUTCString();
            },
          },
          { field: 'code', header: '状态', width: 120 },
          {
            field: 'action',
            header: '操作',
            width: 120,
            actions: [{
              // 显示内容，可以写html代码
              text: '【查看1】',
              // return true 表示这个按钮要显示，否则不显示
              show(row) {
                window.console.log(row);
                return true;
              },
              // 处理器，参数：row-当前行数据，index当前行所属数据的第几行
              handler(row, index) {
                window.console.log(row, index);
              },
            }, {
              text: '【查看2】',
              show(row) {
                return row.id % 2 === 0;
              },
              handler(row, index) {
                window.console.log(index, row);
              },
            }],
          }],
      };
    },
    components: {
      'v-datagrid': datagrid,
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        // const param = {
        //   param1: '',
        //   param2: '',
        //   param3: '',
        // };
        // const res = await this.$http.get(THE_TOTAL_ADDRESS, param);
        // if (res.sucess) {
        //   this.list = res;
        // }
        // 模拟请求的返回的数据
        this.amountObj = {
          subsidyAmount: 100000,
          passAmount: 50000,
          rejectedAmount: 30000,
          delayedAmount: 20000,
          subsidyCount: 500,
          passCount: 100,
          rejectedCount: 100,
          delayedCount: 200,
        };
        // 算动态的宽度
        this.block_1 = this.amountObj.passAmount * 200 / this.amountObj.subsidyAmount;
        this.block_2 = this.amountObj.rejectedAmount * 200 / this.amountObj.subsidyAmount;
        this.block_3 = this.amountObj.delayedAmount * 200 / this.amountObj.subsidyAmount;
        this.block_4 = this.amountObj.passCount * 200 / this.amountObj.subsidyCount;
        this.block_5 = this.amountObj.rejectedCount * 200 / this.amountObj.subsidyCount;
        this.block_6 = this.amountObj.delayedCount * 200 / this.amountObj.subsidyCount;
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.content_con{
	min-width: 1260px;
}
.content_con ul{
	width: 100%;
	height: 80px;
	display: block;
}
.content_con ul li{
	width: 300px;
	height: 80px;
	float: left;
	border-right: 1px solid #e0e0e0;
}
.content_con ul li:last-child{border:none}
.total{
	font-size: 16px;
    color: #888;
}
.the-total{
	padding-left: 16px;
    color: #4e4e4e;
    font-weight: bold;
    font-size: 16px;
}
.the-total img{
	width: 24px;
    height: 24px;
    margin-right: 6px;
    vertical-align: -6px;
}
.the-total-amount{
    font-weight: 600;
    font-size: 30px;
    line-height: 60px;
    color: #2a3249;
    padding-left: 45px;
}
.number{
	color: #2a3249;
    font-size: 24px;
    font-weight: 600;
    line-height: 52px;
}
.subsidies{
	width: 200px;
	margin-left: 50px;
}
.gt{
	height: 4px;
	border-radius: 2px;
}
.block{
	width: 200px;
	background-color: #eeeeee;
}
.block_1{
	background-color: #68ddd5;
}
.block_2{
	background-color: #fd5765;
}

.block_3{
	background-color: #589efe;
}
.block_4{
	background-color: #68ddd5;
}
.block_5{
	background-color: #fd5765;
}
.block_6{
	background-color: #589efe;
}
.the_input{
	width: 100%;
	margin-top: 30px;
}
.the_input p{
	width: 300px;
	margin: 20px 0;
	text-align: right;
	display: inline-block;
	font-size: 16px;
}
.the_input p input{
	width: 200px;
	height: 40px;
	padding-left: 10px;
	margin-left: 10px;
	border:1px solid #b0b0b0;
}
.the_input p select{
	width: 200px;
	height: 40px;
	padding-left: 10px;
	margin-left: 10px;
	border:1px solid #b0b0b0;
}
/*.but{
	width: 180px;
	height: 40px;
	line-height: 40px;
	margin-top: 20px;
	background-color: #337cfd;
	border-radius: 5px;
	color: #fff;
	text-align: center;
	font-size: 18px;
}*/
.style{
	width: 100%;
	margin-top: 30px;
	border:1px solid #dde8ee;
}
.style tr{
	height: 40px;
	line-height: 40px;
	border-bottom:1px solid #dde8ee;
}
.style tr td{
	text-align: center;
}

input{
  outline:none;
}
select{
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

