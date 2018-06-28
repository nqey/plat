<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <div class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">员工姓名：</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].name}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">手机号：</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].cellphone}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证号：</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].idNumber}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">身份证照片(正/反面)：</label>
          <div class="col-sm-10">
            <v-img :imgSrc="data[0].idBackUrl" style="float: left;"></v-img>
            <v-img :imgSrc="data[0].idFrontUrl" style="float: left;margin-left: 20px;"></v-img>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">职责：</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].duty}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">所属工厂：</label>
          <div class="col-sm-10">
            <p class="form-control2">{{data[0].factoryName}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">状态：</label>
          <div class="col-sm-10">
            <p class="form-control2">{{stateObj[data[0].state]}}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label"></label>
          <v-datagrid :columns="columns"
                      :data-url="dataUrl"
                      :count-url="countUrl"
                      :params="params">
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
import { PLATFORM_CODE_EMPLOYEE_OPERATION, PLATFORM_CODE_EMPLOYEE_OPERATION_COUNT, PLATFORM_EMPLOYEE_QUERY } from '@/config/env';
import { CODE_SCAN_EVENT } from '@/config/mapping';

export default {
  name: 'listView',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      formatDate,
      params: {
        factoryId: this.$route.params.id,
        employeeId: this.$route.params.employeeId,
        page: 1,
        rows: 20,
      },
      data: [{
        name: '',
        cellphone: '',
        idNumber: '',
        idBackUrl: '',
        idFrontUrl: '',
        duty: '',
      }],
      stateObj: {
        0: '不可用',
        1: '可用',
      },
      CODE_SCAN_EVENT,
      dataUrl: PLATFORM_CODE_EMPLOYEE_OPERATION,
      countUrl: PLATFORM_CODE_EMPLOYEE_OPERATION_COUNT,
      columns: [
        {
          field: 'createTime',
          header: '扫描时间',
          sort: 'create_time',
          width: 300,
          formatter(row, index, value) {
            return value && formatDate(value);
          },
        },
        { field: 'address', header: '扫描位置', width: 300 },
        {
          field: 'event',
          header: '操作事件',
          width: 300,
          formatter: row => this.CODE_SCAN_EVENT[row.event],
        },
      ],
    };
  },
  components: {
    'v-datagrid': datagrid,
    'v-img': () => import('@/components/img'),
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const param = {
        id: this.$route.params.employeeId,
      };
      const res = await this.$http.get(PLATFORM_EMPLOYEE_QUERY, param);
      if (res.success) {
        this.data = res.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

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