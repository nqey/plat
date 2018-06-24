<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <div class="box">
        <div class="title">二维码扫描明细</div>
        <div class="title_content">
          <span>二维码编号:</span><p>{{data[0].code}}</p>
        </div>
        <div class="title_content">
          <span>二维码类型:</span><p>{{typeObj[data[0].type]}}</p>
        </div>
        <div class="title_content">
          <span>商品名称:</span><p>{{data[0].goodsName}}</p>
        </div>
        <div class="title_content">
          <span>企业名称:</span><p>{{data[0].enterpriseName}}</p>
        </div>
        <div class="title_content">
          <span>附码工厂:</span><p>{{data[0].factoryName}}</p>
        </div>
        <div class="title_content">
          <span>生产时间:</span><p>{{data[0].factoryTime && formatDate(data[0].factoryTime)}}</p>
        </div>
        <div class="title_content">
          <span>经销商名称:</span><p>{{data[0].franchiserName}}</p>
        </div>
        <div class="title_content">
          <span>扫码次数:</span><p>{{data[0].scanTimes}}</p>
        </div>
        <div class="title_content">
          <span>当前状态:</span><p>{{stateObj[data[0].state]}}</p>
        </div>
        <div class="title_content">
          <span>被扫描轨迹:</span>
        </div>
        <v-datagrid :columns="columns"
                    :data-url="dataUrl"
                    :params="datagridParams">
        </v-datagrid>
        <div class="title_content in_the"> 
          <button class="return" @click="back">返回上一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid';
import { formatDate } from '@/config/utils';
import { PLATFORM_CODE_GET_LOGS, PLATFORM_STATISTICAL_CODE_QUERY } from '@/config/env';

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
      typeObj: {
        1: '数据一物一码',
        2: '图像一物一码',
        3: '普通图像',
      },
      stateObj: {
        normal: '正常',
        highRisk: '异常',
      },
      eventObj: {
        create: '创建',
        // 工厂事件
        download: '下载',
        packet: '包装',
        // 经销商事件
        receive: '经销商验货',
        sold: '电商发货',
        allocate: '调货',
        exchange: '退换货',
        // 消费者事件
        scanValidate: '扫码验真伪',
      },
      appObj: {
        zhsapp: '用户',
        franchiserapp: '经销商app',
        factoryapp: '工厂app(采集关联app)',
        printer: '喷码机',
        other: '其他',
      },
      resultObj: {
        highRisk: '高风险',
        passed: '验证通过',
      },
      datagridParams: {
        detailId: this.$route.params.type,
      },
      dataUrl: PLATFORM_CODE_GET_LOGS,
      // countUrl: '',
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
          width: 250,
          formatter: row => this.eventObj[row.event],
        },
        { field: 'deviceId', header: '扫码设备号', sort: 'name', width: 250 },
        {
          field: 'result',
          header: '状态',
          width: 150,
          formatter: row => (this.resultObj[row.result] == null ? '正常' : this.resultObj[row.result]),
        },
        {
          field: 'app',
          header: '扫描角色',
          width: 250,
          formatter: row => this.appObj[row.app],
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
    back() {
      history.back(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.box{
  width: 100%;
  margin-bottom: 100px;
}
.title{
  width: 100%;
  margin-bottom: 20px;
  font-size: 28px; 
}
.two{
  margin-bottom: 5px;
}
.text{
  height: 32px;
  font-size: 20px;
  border-bottom: 2px solid #e9e9e9;
  margin-bottom: 15px;
}
.text span{
  height: 32px;
  font-family: "黑体";
  display: inline-block;
  border-bottom: 2px solid #337CFD;
}
.title_content{
  width: 100%;
  line-height: 50px;
}
.title_content span{
  display: inline-block;
  font-size: 18px;
  width: 180px;
}
.title_content p{
  font-weight: 600;
  font-size: 16px;
  display: inline;
}
.title_content p button, .return {
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #337CFD;
  border: none;
  color: #fff;
  margin: 5px 20px 0  0;
  border-radius: 5px;
}
#color{
  background: #ff6666,
}
.title_box > .title_content:last-child{
  margin-bottom: 20px;
}
.in_the{
  text-align: center;
  margin-top:50px;
}

</style>