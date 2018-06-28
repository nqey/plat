<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4 class="title"><span>二维码扫描明细</span></h4>
      <br/>
      <div class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">二维码编号:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].code}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">二维码类型:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{CODE_TYPE[data[0].type]}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">商品名称:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].goodsName}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">企业名称:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].enterpriseName}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">附码工厂:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].factoryName}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">生产时间:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].factoryTime && formatDate(data[0].factoryTime)}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">经销商名称:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].franchiserName}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">扫码次数:</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].scanTimes}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">当前状态:</label>
          <div class="col-sm-10">
            <p class="form-control2" v-if="CODE_DETAIL_STATE[data[0].state] === '正常'">{{CODE_DETAIL_STATE[data[0].state]}}</p>
            <p class="form-control2" v-else style="color: red;">{{CODE_DETAIL_STATE[data[0].state]}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">被扫描轨迹:</label>
        <v-datagrid :columns="columns"
              :data-url="dataUrl"
              :params="datagridParams">
        </v-datagrid>
        </div>
      </div>
        <div class="title_content in_the">
          <button type="button" class="return" @click="$router.back(-1)">返回上一页</button>
        </div>
      </div>
    </div>
</template>

<script>
import datagrid from '@/components/datagrid';
import { formatDate } from '@/config/utils';
import { PLATFORM_CODE_GET_LOGS, PLATFORM_STATISTICAL_CODE_QUERY } from '@/config/env';
import { CODE_TYPE, CODE_DETAIL_STATE, CODE_SCAN_EVENT, CODE_SCAN_APP_USER } from '@/config/mapping';

export default {
  name: 'codelog',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      formatDate,
      data: [
        {
          code: null,
          enterpriseId: null,
          enterpriseName: null,
          factoryId: null,
          factoryName: null,
          goodsName: null,
          id: null,
          scanTimes: null,
          skuId: null,
          state: null,
          type: null,
        },
      ],
      CODE_TYPE,
      CODE_DETAIL_STATE,
      CODE_SCAN_EVENT,
      CODE_SCAN_APP_USER,
      resultObj: {
        highRisk: '高风险',
        passed: '验证通过',
      },
      datagridParams: {
        detailId: this.$route.params.id,
      },
      dataUrl: PLATFORM_CODE_GET_LOGS,
      columns: [
        {
          field: 'createTime',
          header: '扫描时间',
          sort: 'create_time',
          width: 250,
          formatter(row, index, value) {
            return value && formatDate(value);
          },
        },
        { field: 'address', header: '扫码位置', width: 250 },
        {
          field: 'event',
          header: '操作事件',
          width: 200,
          formatter: row => this.CODE_SCAN_EVENT[row.event],
        },
        { field: 'deviceId', header: '扫码设备号', sort: 'name', width: 250 },
        {
          field: 'result',
          header: '状态',
          html: true,
          width: 150,
          formatter: row => (row.result === 'highRisk' ? '<span style="color:red;">异常</span>' : '正常'),
        },
        {
          field: 'app',
          header: '扫描角色',
          width: 250,
          formatter: row => this.CODE_SCAN_APP_USER[row.app],
        },
      ],
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
      const param = {
        id: this.$route.params.id,
      };
      const res = await this.$http.get(PLATFORM_STATISTICAL_CODE_QUERY, param);
      if (res.success) {
        this.data = res.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

button{
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #337CFD;
  border: none;
  color: #fff;
  border-radius: 5px;
}
#color{
  background: #ff6666,
}

.form-control2 {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-image: none;
}
.title {
  border-bottom: 1px solid #EDF2F5;
  margin: 0;
}
.title span {
  display: block;
  width: 130px;
  text-align: center;
  border-bottom: 1px solid #015FE5;
  padding: 28px 0 15px 0;
}
.in_the{
  text-align: center;
  margin-top:50px;
}
.return {
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #337CFD;
  border: none;
  color: #fff;
  margin: 5px 20px 0  0;
  border-radius: 5px;
}

</style>
