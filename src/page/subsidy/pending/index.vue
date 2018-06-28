<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <ul>
        <li>
          <div class="the-total"><img :src="sumIcon">补贴总额（单位：元）</div>
          <div class="the-total-amount">{{ amountObj.amountTtl.toFixed(2) }}</div>
        </li>
        <li>
          <div class="subsidies">
            <div class="total">审核通过</div>
            <div class="number">{{ amountObj.passed.amount }}</div>
            <div class="block gt">
              <div class="block_1 gt" :style="{width:block_1 + 'px'}"></div>
            </div>
          </div>
        </li>
        <li>
          <div class="subsidies">
            <div class="total">拒绝申请</div>
            <div class="number">{{ amountObj.rejected.amount }}</div>
            <div class="block gt">
              <div class="block_2 gt" :style="{width:block_2 + 'px'}"></div>
            </div>
          </div>
        </li>
        <li>
          <div class="subsidies">
            <div class="total">延后处理</div>
            <div class="number">{{ amountObj.delayed.amount }}</div>
            <div class="block gt">
              <div class="block_3 gt" :style="{width:block_3 + 'px'}"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="plat-content-con">
      <ul>
        <li>
          <div class="the-total"><img :src="headcountIcon">申请总人数</div>
          <div class="the-total-amount">{{ amountObj.countTtl }}</div>
        </li>
        <li>
          <div class="subsidies">
            <div class="total">审核通过</div>
            <div class="number">{{ amountObj.passed.count }}</div>
            <div class="block gt">
              <div class="block_4 gt" :style="{width:block_4 + 'px'}"></div>
            </div>
          </div>
        </li>
        <li>
          <div class="subsidies">
            <div class="total">拒绝申请</div>
            <div class="number">{{ amountObj.rejected.count }}</div>
            <div class="block gt">
              <div class="block_5 gt" :style="{width:block_5 + 'px'}"></div>
            </div>
          </div>
        </li>
        <li>
          <div class="subsidies">
            <div class="total">延后处理</div>
            <div class="number">{{ amountObj.delayed.count }}</div>
            <div class="block gt">
              <div class="block_6 gt" :style="{width:block_6 + 'px'}"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="plat-content-con">
      <div class="row">
        <div class="col-md-12">
          <h4>待审核列表</h4>
        </div>
      </div>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>机构名称</label>
              <input type="text" placeholder="请输入机构名称" class="form-control" v-model="filter.organizName">
            </div>
            <div class="form-group col-md-4">
              <label>提现卡号</label>
              <input type="text" placeholder="请输入提现卡号" class="form-control" v-model="filter.bankCard">
            </div>
            <div class="form-group col-md-4">
              <label>交&#8194;易&#8194;号</label>
              <input type="text" placeholder="请输入交易号" class="form-control" v-model="filter.sn">
            </div>
            <div class="form-group col-md-4">
              <label>状&#12288;&#12288;态</label>
              <select class="form-control" v-model="filter.state">
                <option value="">请选择</option>
                <option v-for="(v, k) of SUBSIDY_STATE" :value="k">{{v}}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="btn btn-primary" @click="search">
                <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="button" class="btn btn-primary" @click="clear">清空</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="padding-top: 50px;">
        <div class="col-md-12">
          <v-datagrid :columns="columns" :data-url="dataUrl" :count-url="countUrl" :params="datagridParams"/>
        </div>
      </div>
      <v-modal ref="modal" :param="modalParams" :callback="search"></v-modal>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';
  import sumIcon from '@/assets/img/sum_icon.png';
  import headcountIcon from '@/assets/img/headcount_icon.png';
  import { PLATFORM_SUBSIDY_QUERY, PLATFORM_SUBSIDY_COUNT, PLATFORM_SUBSIDY_STATISTICAL_AMOUNT } from '@/config/env';
  import modal from '@/page/subsidy/pending/modal';
  import { SUBSIDY_STATE } from '@/config/mapping';
  import { reomveBlank } from '@/config/utils';

  export default {
    name: 'pending',
    data() {
      return {
        datagridParams: {},
        filter: {
          organizName: null,
          bankCard: null,
          sn: null,
          state: '',
        },
        modalParams: {},
        sumIcon,
        headcountIcon,
        amountObj: {
          pending: {
            amount: 0,
            count: 0,
          },
          delayed: {
            amount: 0,
            count: 0,
          },
          rejected: {
            amount: 0,
            count: 0,
          },
          passed: {
            amount: 0,
            count: 0,
          },
          amountTtl: 0,
          countTtl: 0,
        },
        block_1: '',
        block_2: '',
        block_3: '',
        block_4: '',
        block_5: '',
        block_6: '',
        SUBSIDY_STATE,
        dataUrl: PLATFORM_SUBSIDY_QUERY,
        countUrl: PLATFORM_SUBSIDY_COUNT,
        columns: [{ field: 'sn', header: '交易号', sort: 'id', width: 100 },
          { field: 'organizName', header: '申请机构', sort: 'name', width: 180 },
          { field: 'name', header: '开户名', width: 100 },
          { field: 'bankBranch', header: '开户行', width: 100 },
          { field: 'bankCard', header: '卡号', width: 220 },
          { field: 'amount', header: '金额', width: 100 },
          { field: 'cellphone', header: '手机号', width: 150 },
          {
            field: 'createTime',
            header: '申请时间',
            sort: 'create_time',
            width: 200,
            formatter(row, index, value) {
              return value;
            },
          },
          {
            field: 'state',
            header: '状态',
            width: 120,
            formatter: row => SUBSIDY_STATE[row.state],
          },
          {
            field: 'action',
            header: '操作',
            width: 120,
            actions: [{
              // 显示内容，可以写html代码
              text: '【审核】',
              // return true 表示这个按钮要显示，否则不显示
              show(row) {
                return row.state === 'pending' || row.state === 'delayed';
              },
              // 处理器，参数：row-当前行数据，index当前行所属数据的第几行
              handler: (row) => {
                this.modalParams = row;
                this.$refs.modal.$refs.modal.toggle();
              },
            }],
          }],
      };
    },
    components: {
      'v-datagrid': datagrid,
      'v-modal': modal,
    },
    mounted() {
      this.getData();
    },
    methods: {
      search() {
        this.datagridParams = reomveBlank(this.filter);
      },
      clear() {
        this.params = {};
        this.filter = { state: '' };
      },
      async getData() {
        const res = await this.$http.get(PLATFORM_SUBSIDY_STATISTICAL_AMOUNT);
        if (res.success) {
          (res.data || []).forEach((d) => {
            this.amountObj[d.state].amount = d.amount;
            this.amountObj.amountTtl += d.amount;
            this.amountObj[d.state].count = d.count;
            this.amountObj.countTtl += d.count;
          });
        }
        this.block_1 = this.jisuan(this.amountObj.passed.amount, this.amountObj.amountTtl);
        this.block_2 = this.jisuan(this.amountObj.rejected.amount, this.amountObj.amountTtl);
        this.block_3 = this.jisuan(this.amountObj.delayed.amount, this.amountObj.amountTtl);
        this.block_4 = this.jisuan(this.amountObj.passed.count, this.amountObj.countTtl);
        this.block_5 = this.jisuan(this.amountObj.rejected.count, this.amountObj.countTtl);
        this.block_6 = this.jisuan(this.amountObj.delayed.count, this.amountObj.countTtl);
      },
      jisuan(a, b) {
        return b === 0 ? 0 : window.parseInt(a / b * 200);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

  .plat-content-con ul {
    height: 80px;
    display: block;
  }

  .plat-content-con ul li {
    width: 300px;
    height: 80px;
    float: left;
    border-right: 1px solid #e0e0e0;
  }

  .plat-content-con ul li:last-child {
    border: none
  }

  .total {
    font-size: 16px;
    color: #888;
  }

  .the-total {
    padding-left: 16px;
    color: #4e4e4e;
    font-weight: bold;
    font-size: 16px;
  }

  .the-total img {
    width: 24px;
    height: 24px;
    margin-right: 6px;
    vertical-align: -6px;
  }

  .the-total-amount {
    font-weight: 600;
    font-size: 30px;
    line-height: 60px;
    color: #2a3249;
    padding-left: 45px;
  }

  .number {
    color: #2a3249;
    font-size: 24px;
    font-weight: 600;
    line-height: 52px;
  }

  .subsidies {
    /*width: 200px;*/
    margin-left: 50px;
  }

  .gt {
    height: 4px;
    border-radius: 2px;
  }

  .block {
    width: 200px;
    background-color: #eeeeee;
  }

  .block_1 {
    background-color: #68ddd5;
  }

  .block_2 {
    background-color: #fd5765;
  }

  .block_3 {
    background-color: #589efe;
  }

  .block_4 {
    background-color: #68ddd5;
  }

  .block_5 {
    background-color: #fd5765;
  }

  .block_6 {
    background-color: #589efe;
  }
</style>

