<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>商品名称</label>
              <input type="text" class="form-control" v-model="filter.name" placeholder="输入商品名称">
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
      <h4>商品列表</h4>
      <hr/>
      <v-datagrid :columns="columns" :data-url="dataUrl" :count-url="countUrl" :params="params"></v-datagrid>

      <v-modal ref="modal" :ok="submit" :width="+450">
        <div slot="body">
          <table>
            <tbody>
            <tr>
              <td>轴距：</td>
              <td><input v-model="rules.radius" class="form-control" type="text" autofocus></td>
            </tr>
            <tr>
              <td></td>
              <td class="mark">获取轴距(单位：米)，不填表示无限</td>
            </tr>
            <tr>
              <td>扫码次数：</td>
              <td><input v-model="rules.innerTimes" class="form-control" type="text"></td>
            </tr>
            <tr>
              <td></td>
              <td class="mark">轴距内可扫码次数，不填表示无限</td>
            </tr>
            <tr>
              <td>位置变换次数：</td>
              <td><input v-model="rules.outerChangeTimes" class="form-control" type="text"></td>
            </tr>
            <tr>
              <td></td>
              <td class="mark">轴距之外能发生扫码的次数，当发生的时候，轴距中心更改，不填表示无限</td>
            </tr>
            </tbody>
          </table>
        </div>
      </v-modal>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '@/config/utils';
  import { getShelflife } from '@/config/mapping';
  import { PLATFORM_GOODS_QUERY, PLATFORM_GOODS_QUERY_COUNT, PLATFORM_GOODS_RULES } from '@/config/env';

  export default {
    name: 'goods',
    data() {
      return {
        params: {},
        filter: {
          name: null,
        },
        rules: {
          goodsId: null,
          radius: null,
          innerTimes: null,
          outerChangeTimes: null,
        },
        dataUrl: PLATFORM_GOODS_QUERY,
        countUrl: PLATFORM_GOODS_QUERY_COUNT,
        columns: [
          {
            field: 'id',
            header: '序号',
            sort: 'id',
            width: 70,
          },
          {
            field: 'name',
            header: '商品名称',
            sort: 'name',
            width: 200,
          },
          {
            field: 'enterpriseName',
            header: '所属企业',
            sort: 'enterprise_name',
            width: 200,
          },
          {
            field: 'validPeriod',
            header: '保质期',
            sort: 'valid_period',
            width: 100,
            formatter: (row, index, value) => getShelflife(value, row.validPeriodType),
          },
          {
            field: 'introduction',
            header: '商品特点',
            sort: 'introduction',
            width: 300,
          },
          {
            field: 'categoryName',
            header: '分类',
            sort: 'category_name',
            width: 200,
          },
          {
            field: 'createTime',
            header: '创建时间',
            sort: 'create_time',
            width: 200,
            formatter: (row, index, value) => formatDate(value),
          },
          {
            field: 'action',
            header: '操作',
            width: '200',
            actions: [{
              text: '【设置规则】',
              handler: this.editRules,
            }, {
              text: '【查看】',
              handler: this.view,
            }],
          },
        ],
      };
    },
    methods: {
      view(row) {
        this.$router.push(`/goods/list/view/${row.id}`);
      },
      async editRules(row) {
        // 获取当商品已经设置过的规则
        const res = await this.$http.get(`${PLATFORM_GOODS_RULES}${row.id}`);
        if (res.success) {
          const data = JSON.parse(res.data);

          this.rules = {
            goodsId: row.id,
            radius: data.radius,
            innerTimes: data.innerTimes,
            outerChangeTimes: data.outerChangeTimes,
          };

          // 打开设置对话框
          this.$refs.modal.open();
        }
      },
      async submit() {
        const rules = {
          radius: this.rules.radius,
          innerTimes: this.rules.innerTimes,
          outerChangeTimes: this.rules.outerChangeTimes,
        };
        const res = await this.$http.put(`${PLATFORM_GOODS_RULES}${this.rules.goodsId}`, { rules: JSON.stringify(rules) });
        return res.success;
      },
      search() {
        this.params = Object.assign({}, this.filter);
      },
      clear() {
        this.params = {};
        this.filter = {};
      },
    },
    components: {
      'v-datagrid': () => import('@/components/datagrid'),
      'v-modal': () => import('@/components/modal'),
    },
    mounted() {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

  .mark {
    color: darkgray;
  }
</style>
