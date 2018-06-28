<template>
  <div>
    <v-modal 
      :title="myt"
      :ok="setScore"
      ref="modal">
      <div slot="body">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">分数</label>
            <div class="col-sm-2">
              <input type="text" placeholder="请输入分数" v-model="score"/>
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
import { PLATFORM_POST_EXAMS_EXAMINEE_SCORES } from '@/config/env';

export default {
  name: 'singleModal',
  props: {
    handler: {
      type: Function,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    subjectId: {
      type: String,
      default: Number,
    },
  },
  data() {
    return {
      score: 10,
      myt: '打分',
    };
  },
  components: {
    'v-modal': modal,
  },
  methods: {
    async setScore() {
      const param = {};
      param.score = this.score;
      param.examExamineeId = this.id;
      param.subjectId = this.subjectId;
      const res = await this.$http.post(PLATFORM_POST_EXAMS_EXAMINEE_SCORES, param);
      if (res.success) {
        this.handler();
      }
    },
  },
};
</script>

<style scoped>
</style>