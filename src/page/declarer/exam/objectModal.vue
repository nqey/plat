<template>
  <div>
    <v-modal 
      :title="title"
      ref="modal">
      <div slot="body">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-3 control-label">考试对象：</label>
            <div class="col-sm-7">
              <el-checkbox-group v-model="rules">
                <el-checkbox label="未参加考试" key="1"></el-checkbox>
                <el-checkbox label="考试不及格" key="2"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">拿证时间：</label>
            <div class="col-sm-7">
              <el-date-picker
                v-model="objectTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">考试名称：</label>
            <div class="col-sm-7">
              <input type="text"  class="form-control" placeholder="请输入考试名称" v-model="examName">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">考试说明：</label>
            <div class="col-sm-7">
              <textarea type="text" rows="5" class="form-control" v-model="illustrate"/>
            </div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-info" @click="$refs.modal.toggle();setTargetExam()">确认</button>
        <button type="button" class="btn btn-default" @click="$refs.modal.toggle();">取消</button>
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
import { DatePicker, Checkbox, CheckboxGroup } from 'element-ui';
import { formatDate } from '@/config/utils';
import { PLATFORM_POST_EXAMS_EXAMINEE_OBJECTSETTING } from '@/config/env';

export default {
  name: 'timeModal',
  props: {
    id: {
      type: Number,
      default: null,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      title: '考试对象',
      objectTime: [],
      rules: [],
      examName: null,
      illustrate: null,
    };
  },
  components: {
    'v-modal': modal,
    'el-date-picker': DatePicker,
    'el-checkbox': Checkbox,
    'el-checkbox-group': CheckboxGroup,
  },
  watch: {
    id() {
      this.duration = this.item.duration;
      this.objectTime = [formatDate(new Date(this.item.objectStartTime), 'yyyy-MM-dd hh:mm:ss'), formatDate(new Date(this.item.objectEndTime), 'yyyy-MM-dd hh:mm:ss')];
      this.rules = this.item.rules.map((d) => {
        if (d === 1) {
          return '未参加考试';
        }
        if (d === 2) {
          return '考试不及格';
        }
        return 0;
      });
      this.illustrate = this.item.illustrate;
      this.examName = this.item.name;
    },
  },
  methods: {
    async setTargetExam() {
      const param = {};
      param.id = this.examinationId;
      param.objectStartTime = new Date(this.objectTime[0]).getTime();
      param.objectEndTime = new Date(this.objectTime[1]).getTime();
      param.rules = this.rules.map((d) => {
        if (d === '未参加考试') {
          return 1;
        }
        if (d === '考试不及格') {
          return 2;
        }
        return 0;
      });
      param.illustrate = this.illustrate;
      param.name = this.examName;
      const res = await this.$http.post(PLATFORM_POST_EXAMS_EXAMINEE_OBJECTSETTING, param);
      if (res.success) {
        this.search(1);
      }
    },
  },
};
</script>

<style scoped>
</style>