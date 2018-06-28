<template>
  <div>
    <v-modal 
      :title="title"
      :ok="setTimeExam"
      ref="modal">
      <div slot="body">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">考试日期</label>
            <div class="col-sm-10">
              <el-date-picker
                v-model="examTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">设置时长</label>
            <div class="col-sm-8">
              <input type="text"  class="form-control" placeholder="默认考试时间为90分钟" v-model="duration">
            </div>
            <div class="col-sm-2">
              <span style="line-height: 30px">分钟</span>
            </div>
          </div>
        </form>
      </div>
    </v-modal>
  </div>
</template>

/**
* @author ： 秦超
*
* handler: 
**/
<script>
import modal from '@/components/modal';
import { DatePicker } from 'element-ui';
import { formatDate } from '@/config/utils';
import { PLATFORM_POST_EXAMS_EXAMINEE_TIMESETTING } from '@/config/env';

export default {
  name: 'timeModal',
  props: {
    item: {
      type: Object,
      default: null,
    },
    handler: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      title: '设置时长',
      duration: null,
      examTime: null,
    };
  },
  components: {
    'v-modal': modal,
    'el-date-picker': DatePicker,
  },
  watch: {
    item() {
      this.duration = this.item.duration;
      this.examTime = [formatDate(new Date(this.item.startTime), 'yyyy-MM-dd hh:mm:ss'), formatDate(new Date(this.item.endTime), 'yyyy-MM-dd hh:mm:ss')];
    },
  },
  methods: {
    async setTimeExam() {
      const param = {};
      param.examinationId = this.item.examinationId;
      param.duration = this.duration;
      param.startTime = new Date(this.examTime[0]).getTime();
      param.endTime = new Date(this.examTime[1]).getTime();
      const res = await this.$http.post(PLATFORM_POST_EXAMS_EXAMINEE_TIMESETTING, param);
      if (res.success) {
        this.handler();
      }
    },
  },
};
</script>

<style scoped>
</style>