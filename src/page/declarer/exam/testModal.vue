<template>
  <div>
    <v-modal 
      :title="title"
      :cancelText="cancelText"
      :okText="okText"
      ref="modal">
      <div slot="body">
        <span v-if="examineeLists.length === 0">无提交答卷</span>
        <div v-if="examineeLists.length > 0">
          <table class="table table-hover">
            <thead>
              <tr class="table_tit">
                <th>序号</th>
                <th>姓名</th>
                <th>交卷时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of examineeLists">
                <td>{{item.examExamineeId}}</td>
                <td>{{item.name}}</td>
                <td>{{item.submitTime}}</td>
                <td>{{status[item.state]}}</td>
                <th><router-link :to="'/exam/detail/'+item.examExamineeId">查看答卷</router-link></th>
              </tr>
            </tbody>
          </table>
          <v-pagination :page="examineePages" :total="examineeCount" @nextPage="examineeSearch"></v-pagination>
        </div>
      </div>
    </v-modal>
  </div>
</template>

/**
* @author ： 秦超
*
* handler: 返回原因
**/
<script>
import modal from '@/components/modal';
import { formatDate } from '@/config/utils';
import { PLATFORM_POST_EXAMS_EXAMINEE_LISTING, PLATFORM_POST_EXAMS_EXAMINEE_COUNTS } from '@/config/env';
import pagination from '@/components/pagination';

export default {
  name: 'testModal',
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      cancelText: '关闭',
      okText: '',
      title: '答卷',
      examineeLists: [],
      examineePage: 1,
      examineeRows: 5,
      examineePages: 0,
      examineeCount: 0,
      status: {
        wait: '待考试',
        doing: '正在考试',
        done: '考试结束',
        checked: '试卷审查完毕',
        closed: '关闭',
        deleted: '删除',
      },
    };
  },
  components: {
    'v-modal': modal,
    'v-pagination': pagination,
  },
  watch: {
    id() {
      this.examineeSearch();
    },
  },
  methods: {
    async examineeSearch() {
      if (!this.id) return;
      const param = {};
      param.page = this.page;
      param.rows = this.rows;
      param.stateList = JSON.stringify(['done', 'checked']);
      const res = await this.$http.get(`${PLATFORM_POST_EXAMS_EXAMINEE_LISTING}${this.id}`, param);
      if (res.success) {
        this.examineeLists = res.data;
        this.examineeLists.forEach((o) => {
          o.submitTime = formatDate(new Date(o.submitTime), 'yyyy-MM-dd hh:mm:ss');
        });
      }
      const param2 = {};
      param2.page = this.examineePage;
      param2.rows = this.examineeRows;
      param2.stateList = JSON.stringify(['done', 'checked']);
      const res2 = await this.$http.get(`${PLATFORM_POST_EXAMS_EXAMINEE_COUNTS}${this.id}`, param2);
      if (res2.success) {
        this.examineePages = Math.ceil(res2.data / this.examineeRows);
        this.examineeCount = res2.data;
      }
    },
  },
};
</script>

<style scoped>
</style>