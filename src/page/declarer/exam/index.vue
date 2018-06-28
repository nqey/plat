<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4>筛选条件</h4>
      <hr/>
      <div class="filters">
        <div class="form-inline">
          <div class="row clearfix sssrk">
            <div class="form-group col-md-4">
              <label>考试名称</label>
              <input v-model="name" class="form-control" placeholder="请输入考试名称"></input>
            </div>
            <div class="form-group col-md-4">
              <button type="button" class="btn btn-primary" @click="search()">
                <span class="glyphicon glyphicon-search"></span>搜索
              </button>
              <button type="reset" class="btn btn-primary" @click="clear()">清空
              </button>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <h4>考试列表</h4>
      <hr/>
      <router-link to="/declarer/exam/the_test">
        <button type="button" class="btn btn-primary">
          创建考试
        </button>
      </router-link>
      <br/>
      <br/>
      <!--申报官列表页面-->
      <v-datagrid :columns="columns"
                  :data-url="dataUrl"
                  :count-url="countUrl"
                  :singleCheck="singleCheck"
                  :checkable="singleCheck"
                  :params="datagridParams"
                  :onSelected="onSelected"
                  ref="datagrid">
      </v-datagrid>
      <br/>
      <div class="index_table_btn">
        <button class="btn btn-primary" v-if="selectState && selectState === 'doing'"
                @click="$refs.sendModal.$refs.modal.open();">发送
        </button>
        <button class="btn btn-primary" v-if="selectState && selectState === 'wait'" data-toggle="modal"
                data-target="#myModal2" @click="$refs.timeModal.$refs.modal.open();">设置时长
        </button>
        <a class="btn btn-primary" v-if="selectState && selectState !== 'wait'"
           :href="download + examinationId">下载数据</a>
        <button class="btn btn-primary" @click="copyExam" v-if="examinationId">复制试题</button>
        <button class="btn btn-primary" v-if="selectState && selectState === 'wait'" data-toggle="modal"
                data-target="#myModal3" @click="$refs.objecModal.$refs.modal.open();">考试对象
        </button>
      </div>
      <!-- 发送modal -->
      <v-send-modal ref="sendModal" :state='selectState' :id="examinationId"></v-send-modal>
      <!-- 设置时长modal -->
      <v-time-modal ref="timeModal" :item="item" :handler="modalHandler"></v-time-modal>
      <!-- 考试对象modal -->
      <v-object-modal ref="objecModal" :item="item" :handler="modalHandler"></v-object-modal>
      <!-- 答卷modal -->
      <v-test-modal ref="testModal" :id="mexaminationId"></v-test-modal>
    </div>
  </div>
</template>

<script>
  import {
    PLATFORM_GET_EXAMS_LISTING, PLATFORM_GET_EXAMS_COUNTS,
    PLATFORM_POST_EXAMS_EXAMINEE_ENTRANCE, PLATFORM_POST_EXAMS_EXAMINEE_COPYING,
    PLATFORM_POST_EXAMS_EXAMINEE_CLOSEORDELETE,
    PLATFORM_POST_EXAMS_EXAMINEE_DOWNLOADEXCEL,
  } from '@/config/env';
  import { formatDate } from '@/config/utils';
  import { MessageBox } from 'element-ui';
  import sendModal from '@/page/declarer/exam/sendModal';
  import timeModal from '@/page/declarer/exam/timeModal';
  import objectModal from '@/page/declarer/exam/objectModal';
  import testModal from '@/page/declarer/exam/testModal';
  import datagrid from '@/components/datagrid';

  export default {
    data() {
      return {
        item: {},
        lists: [],
        index: 0,
        name: null,
        examinationId: null,
        mexaminationId: null,
        download: PLATFORM_POST_EXAMS_EXAMINEE_DOWNLOADEXCEL,
        selectState: null,
        modalHandler: () => this.search(),
        status: {
          wait: '待考试',
          doing: '正在考试',
          done: '考试结束',
          checked: '试卷审查完毕',
          closed: '关闭',
          deleted: '删除',
        },
        datagridParams: {},
        dataUrl: PLATFORM_GET_EXAMS_LISTING,
        countUrl: PLATFORM_GET_EXAMS_COUNTS,
        singleCheck: true,
        onSelected: (row) => {
          this.examinationId = this.examinationId === row.examinationId ? null : row.examinationId;
          this.selectState = this.examinationId && row.state;
          this.item = row;
          return true;
        },
        columns: [
          {
            field: 'examinationId',
            header: 'ID',
            sort: 'examinationId',
            // width: 220,
          },
          {
            field: 'name',
            header: '考试名称',
            sort: 'name',
            // width: 220,
          },
          {
            field: 'state',
            header: '状态',
            sort: 'state',
            // width: 220,
            html: true,
            formatter: row => `<span class="green">${this.status[row.state]}</span>`,
          },
          {
            field: 'number',
            header: '答卷',
            sort: 'number',
            formatter(row) {
              return row.number || 0;
            },
            actions: [{
              text: '（查看）',
              show(row) {
                return (row.number || 0) > 0;
              },
              handler: (row) => {
                this.mexaminationId = row.examinationId;
                this.$refs.testModal.$refs.modal.toggle();
              },
            }],
          },
          {
            field: 'createTime',
            header: '创建时间',
            sort: 'create_time',
            // width: '25%',
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
          {
            field: 'action',
            header: '详情',
            // width: 200,
            actions: [{
              text: '【开启】',
              show(row) {
                return row.state === 'wait';
              },
              handler: row => this.openExam(row),
            }, {
              text: '【关闭】',
              show(row) {
                return row.state === 'wait' || row.state === 'done';
              },
              handler: row => this.closeExam(row),
            }, {
              text: '【编辑】',
              show(row) {
                return row.state === 'wait';
              },
              handler: row => this.$router.push(`/exam/edit/${row.examinationId}`),
            }, {
              text: '【删除】',
              show(row) {
                return row.state === 'wait' || row.state === 'done' || row.state === 'closed';
              },
              handler: row => this.deleteExam(row),
            }],
          },
        ],
      };
    },
    components: {
      'v-send-modal': sendModal,
      'v-time-modal': timeModal,
      'v-object-modal': objectModal,
      'v-test-modal': testModal,
      'v-datagrid': datagrid,
    },
    methods: {
      async openExam(obj) {
        MessageBox({
          title: '提示',
          message: '是否打开试卷, 是否继续?',
          showCancelButton: true,
          showConfirmButton: true,
          type: 'warning',
        }).then(async () => {
          const res = await this.$http.post(`${PLATFORM_POST_EXAMS_EXAMINEE_ENTRANCE}${obj.examinationId}`);
          if (res.success) {
            this.search();
          }
        }).catch(() => {
        });
      },
      async closeExam(obj) {
        MessageBox({
          title: '提示',
          message: '是否关闭试卷, 是否继续?',
          showCancelButton: true,
          showConfirmButton: true,
          type: 'warning',
        }).then(async () => {
          const res = await this.$http.post(`${PLATFORM_POST_EXAMS_EXAMINEE_CLOSEORDELETE}${obj.examinationId}/closed`);
          if (res.success) {
            this.search();
          }
        }).catch(() => {
        });
      },
      async deleteExam(obj) {
        MessageBox({
          title: '提示',
          message: '此操作将永久删除该数据, 是否继续?',
          showCancelButton: true,
          showConfirmButton: true,
          type: 'warning',
        }).then(async () => {
          const res = await this.$http.post(`${PLATFORM_POST_EXAMS_EXAMINEE_CLOSEORDELETE}${obj.examinationId}/deleted`);
          if (res.success) {
            this.search();
          }
        }).catch(() => {
        });
      },
      async copyExam() {
        MessageBox({
          title: '提示',
          message: '是否复制试卷, 是否继续?',
          showCancelButton: true,
          showConfirmButton: true,
          type: 'warning',
        }).then(async () => {
          const res = await this.$http.post(`${PLATFORM_POST_EXAMS_EXAMINEE_COPYING}${this.examinationId}`);
          if (res.success) {
            this.search();
          }
        }).catch(() => {
        });
      },
      search() {
        this.examinationId = null;
        this.selectState = null;
        this.datagridParams = {
          name: this.name,
        };
      },
      // 清除筛选条件
      clear() {
        this.examinationId = null;
        this.selectState = null;
        this.name = null;
        this.datagridParams = {};
      },
    },
  };

</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin.scss';

</style>

