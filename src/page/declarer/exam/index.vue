<template>
  <div class="content">
    <div class="content_con">
    	<div class="index_table">
          <div class="index_table_search">
            <form class="form-inline clearfix">
            <!-- <a type="submit" class="btn btn_search" >创建考试</a> -->
            <router-link to="/declarer/exam/the_test" class="btn btn_search">创建考试</router-link>
             <div class="form-group pull-right ks_search">
            <input type="text" class="form-control" placeholder="请输入考试名称" v-model="name" @keypress="enter($event)"/>
            <span class="glyphicon glyphicon-search"></span> </div>
        </form>
      </div>
      <!--申报官列表页面-->
      <table class="table table-hover">
        <thead>
          <tr class="table_tit">
            <th>选项</th>
            <th>ID</th>
            <th>考试名称</th>
            <th>状态</th>
            <th>答卷</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of lists">
            <td>
              <input type="radio" name="s" :value="item.examinationId" v-model="examinationId" class="child_item" @click="setIndex(index)"/>
            </td>
            <td>{{item.examinationId}}</td>
            <td>{{item.name}}</td>
            <td class="green">{{status[item.state]}}</td>
            <td @click="examineeSearch(1, item.examinationId)"><a class="color_qf" data-toggle="modal" data-target="#myModal">{{item.number}}</a></td>
            <td>{{item.createTime}}</td>
            <td class="gc_list">
              <a @click="openExam(item)" v-if="item.state === 'wait'">开启</a>
              <a @click="closeExam(item)" v-if="item.state === 'wait' || item.state === 'done'">关闭</a>
              <router-link :to="'/exam/edit/' + item.examinationId" v-if="item.state === 'wait'">编辑</router-link>
              <a @click="deleteExam(item, index)" v-if="item.state === 'wait' || item.state === 'done' || item.state === 'closed'">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="index_table_btn">
        <button class="btn color_qf" v-if="selectState === 'doing'" data-toggle="modal" data-target="#myModal1" @click="initSend">发送</button>
        <button class="btn color_qf" v-if="selectState === 'wait'" data-toggle="modal" data-target="#myModal2" @click="initTimeExam">设置时长</button>
        <a class="btn color_qf" v-if="selectState !== 'wait'" :href="download + examinationId">下载数据</a>
        <button class="btn color_qf" @click="copyExam">复制试题</button>
        <button class="btn color_qf" v-if="selectState === 'wait'" data-toggle="modal" data-target="#myModal3" @click="initTargetExam">考试对象</button>
      </div>
      <v-pagination :page="pages" :total="count" @nextPage="search"></v-pagination>
    </div>
  </div>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-center" id="myModalLabel"> 答卷 </h4>
      </div>
      <div class="modal-body">
        <span v-if="examineeLists.length === 0">无提交答卷</span>
        <div class="index_table_cont" v-if="examineeLists.length > 0">
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
                <th class="gc_list" data-dismiss="modal" aria-label="Close"><router-link :to="'/exam/detail/'+item.examExamineeId">查看答卷</router-link></th>
              </tr>
            </tbody>
          </table>
          <v-pagination :page="examineePages" :total="examineeCount" @nextPage="examineeSearch"></v-pagination>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-center" id="myModalLabel1"> 请选择发送方式 </h4>
      </div>
      <div class="modal-body">
        <div class="index_table_cont">
          <div class="table_cont_top">
            <div class="fs_ewm"><img :src="qrCode" /></div>
            <div class="fs_ewm"><a :href="downloadqrcode + examinationId" class="btn btn_search">下载二维码</a></div>
            <div style="clear:both;"></div>
          </div>
          <div class="text-center"><img :src="ffx" /></div>
          <div class="table_cont_bottom"> 
            <input id="con_url" style="width: 300px" type="text" :value="url" readonly></input>
            <button id="copyBT" class="btn btn_fz pull-right" @click="copyUrl">复制链接</button>
            <div style="clear:both;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-center" id="myModalLabel2"> 设置时长 </h4>
      </div>
      <div class="modal-body">
        <div class="index_table_cont">
          <form class="form-inline scsz">
            <div class="form-group">
              <label for="">考试日期</label>
              <el-date-picker
                v-model="examTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="form-group">
              <label for="">设置时长</label>
              <input type="text" placeholder="请输入考试分钟数" v-model="duration">分钟
              <p class="mrts">默认考试时间为90分钟</p>
            </div>
            <button class="btn btn_search" type="button" @click="setTimeExam" data-dismiss="modal" aria-label="Close">确认</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-center" id="myModalLabel2"> 考试对象 </h4>
      </div>
      <div class="modal-body">
        <div class="index_table_cont">
          <form class="form-inline scsz">
            <div class="form-group">
              <div style="float: left;">考试对象： </div>
              <el-checkbox-group v-model="rules">
                <el-checkbox label="未参加考试" key="1"></el-checkbox>
                <el-checkbox label="考试不及格" key="2"></el-checkbox>
              </el-checkbox-group>
              拿证时间：
              <el-date-picker
                v-model="objectTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <br/>
              <br/>
              考试名称： <div style="width: 180px;display: inline-block;"><el-input v-model="examName" placeholder="请输入考试名称"></el-input></div>
              <br/>
              <br/>
              考试说明： <textarea type="text" rows="5" class="form-control" v-model="illustrate"/>
            </div>
            <button class="btn btn_search" type="button" @click="setTargetExam" data-dismiss="modal" aria-label="Close">确认</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ksewm from '@/assets/img/ksewm.jpg';
import ffx from '@/assets/img/ffx.png';
import pagination from '@/components/pagination';
import { PLATFORM_GET_EXAMS_LISTING, PLATFORM_GET_EXAMS_COUNTS,
PLATFORM_POST_EXAMS_EXAMINEE_LISTING, PLATFORM_POST_EXAMS_EXAMINEE_COUNTS,
PLATFORM_POST_EXAMS_EXAMINEE_ENTRANCE, PLATFORM_POST_EXAMS_EXAMINEE_COPYING,
PLATFORM_POST_EXAMS_EXAMINEE_CLOSEORDELETE, PLATFORM_POST_EXAMS_EXAMINEE_PUBLICATIONIMAGE,
PLATFORM_POST_EXAMS_EXAMINEE_PUBLICATIONURL, PLATFORM_POST_EXAMS_EXAMINEE_TIMESETTING,
PLATFORM_POST_EXAMS_EXAMINEE_OBJECTSETTING, PLATFORM_POST_EXAMS_EXAMINEE_DOWNLOADEXCEL,
PLATFORM_POST_EXAMS_EXAMINEE_DOWNLOADQRCODE } from '@/config/env';
import { formatDate } from '@/config/utils';
import { DatePicker, Checkbox, CheckboxGroup, Input, MessageBox } from 'element-ui';

export default {
  data() {
    return {
      lists: [],
      index: 0,
      ksewm,
      name,
      ffx,
      page: 1,
      rows: 10,
      pages: 0,
      examTime: '',
      examineePage: 1,
      examineeRows: 5,
      examineePages: 0,
      examinationId: '',
      examineeLists: [],
      objectTime: '',
      illustrate: '',
      examName: '',
      duration: '',
      count: 0,
      examineeCount: 0,
      rules: [],
      url: null,
      qrCode: null,
      download: PLATFORM_POST_EXAMS_EXAMINEE_DOWNLOADEXCEL,
      downloadqrcode: PLATFORM_POST_EXAMS_EXAMINEE_DOWNLOADQRCODE,
      selectState: '',
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
    'v-pagination': pagination,
    'el-date-picker': DatePicker,
    'el-checkbox': Checkbox,
    'el-checkbox-group': CheckboxGroup,
    'el-input': Input,
  },
  methods: {
    async openExam(obj) {
      const res = await this.$http.post(`${PLATFORM_POST_EXAMS_EXAMINEE_ENTRANCE}${obj.examinationId}`);
      if (res.success) {
        obj.state = res.data;
      }
    },
    async closeExam(obj) {
      const res = await this.$http.post(`${PLATFORM_POST_EXAMS_EXAMINEE_CLOSEORDELETE}${obj.examinationId}/closed`);
      if (res.success) {
        obj.state = res.data;
      }
    },
    async deleteExam(obj, index) {
      MessageBox({
        title: '提示',
        message: '此操作将永久删除该数据, 是否继续?',
        showCancelButton: true,
        showConfirmButton: true,
        type: 'warning',
      }).then(async () => {
        const res = await this.$http.post(`${PLATFORM_POST_EXAMS_EXAMINEE_CLOSEORDELETE}${obj.examinationId}/deleted`);
        if (res.success) {
          this.lists.splice(index, 1);
        }
      }).catch(() => {
      });
    },
    async copyExam() {
      const res = await this.$http.post(`${PLATFORM_POST_EXAMS_EXAMINEE_COPYING}${this.examinationId}`);
      if (res.success) {
        this.search(1);
      }
    },
    async initSend() {
      this.qrCode = `${PLATFORM_POST_EXAMS_EXAMINEE_PUBLICATIONIMAGE}${this.examinationId}`;
      const res = await this.$http.get(`${PLATFORM_POST_EXAMS_EXAMINEE_PUBLICATIONURL}${this.examinationId}`);
      if (res.success) {
        this.url = res.data;
      }
    },
    copyUrl() {
      document.getElementById('con_url').focus();
      document.getElementById('con_url').select();
      document.execCommand('copy', false, null);
    },

    initTimeExam() {
      this.$store.commit('isModalVisible');
      this.$store.commit('setModalType', 'settime');
    },
    setIndex(index) {
      this.index = index;
      this.selectState = this.lists[index].state;
    },
    async setTimeExam() {
      const param = {};
      param.examinationId = this.examinationId;
      param.duration = this.duration;
      param.startTime = new Date(this.examTime[0]).getTime();
      param.endTime = new Date(this.examTime[1]).getTime();
      const res = await this.$http.post(PLATFORM_POST_EXAMS_EXAMINEE_TIMESETTING, param);
      if (res.success) {
        this.search(1);
      }
    },
    initTargetExam() {
      const item = this.lists[this.index];
      this.duration = item.duration;
      this.objectTime = [formatDate(new Date(item.objectStartTime), 'yyyy-MM-dd hh:mm:ss'), formatDate(new Date(item.objectEndTime), 'yyyy-MM-dd hh:mm:ss')];
      this.rules = item.rules.map((d) => {
        if (d === 1) {
          return '未参加考试';
        }
        if (d === 2) {
          return '考试不及格';
        }
        return 0;
      });
      this.illustrate = item.illustrate;
      this.examName = item.name;
    },
    enter(e) {
      if (e.keyCode === 13) {
        this.search(1);
      }
    },
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
    async search(page) {
      const param = {};
      param.name = this.name;
      param.page = page;
      param.rows = this.rows;
      const res = await this.$http.get(PLATFORM_GET_EXAMS_LISTING, param);
      if (res.success) {
        this.lists = res.data;
        this.lists.forEach((o, i) => {
          if (i === 0) {
            this.examinationId = o.examinationId;
          }
          o.createTime = formatDate(new Date(o.createTime), 'yyyy-MM-dd hh:mm:ss');
        });
        this.selectState = this.lists[0].state;
      }
      const param2 = {};
      param2.name = this.name;
      const res2 = await this.$http.get(PLATFORM_GET_EXAMS_COUNTS, param2);
      if (res2.success) {
        this.pages = Math.ceil(res2.data / param.rows);
        this.count = res2.data;
      }
    },
    async examineeSearch(page, id) {
      if (id) {
        this.examinationId = id;
      }
      const param = {};
      param.page = this.page;
      param.rows = this.rows;
      param.stateList = JSON.stringify(['done', 'checked']);
      const res = await this.$http.get(`${PLATFORM_POST_EXAMS_EXAMINEE_LISTING}${this.examinationId}`, param);
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
      const res2 = await this.$http.get(`${PLATFORM_POST_EXAMS_EXAMINEE_COUNTS}${this.examinationId}`, param2);
      if (res2.success) {
        this.examineePages = Math.ceil(res2.data / this.examineeRows);
        this.examineeCount = res2.data;
      }
    },
  },
  mounted() {
    this.search(1);
  },
};

</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.btn:hover {
  color: #fff !important;
}
.color_qf {
  color: #4786ff !important;
}
.green {
  color: #01c853 !important;
}
.btn_fz {
  background: #01c853;
  color: #fff;
  width: 152px;
  border-radius: 18px;
}
.index_table {
  background: #fff;
  padding: 40px;
  border-radius: 4px 4px 0 0;
  min-height: 600px;
}
.index_table_search {
  margin-bottom: 40px;
}
.btn_search {
  padding: 6px 40px;
  background: #4786ff;
  border-radius: 20px;
  color: #fff !important;
  margin-bottom: 20px;
}
.index_table_search .form-group {
  margin-right: 30px;
}
.index_table_search input, .index_table_search select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  max-width: 150px;
  margin-bottom: 20px;
}
table {
  border: 1px solid #ddd;
}
.index_table nav {
  margin-top: 80px;
}
.index_table .table>thead>tr>th {
  border-bottom: 0;
  padding: 15px 8px;
  min-width: 80px;
}
.index_table .table>tbody>tr>td {
  padding: 12px 8px;
}
.gc_list a {
  padding-right: 15px;
  color: #4786ff !important;
}
.ks_search input {
  max-width: 220px !important;
  min-width: 220px;
  margin-bottom: 0;
}
.ks_search span {
  margin-left: -30px;
  top: 3px;
  color: #cacaca;
}
.index_table_btn .color_qf {
  width: 100px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #4786ff;
  background: none;
  margin-right: 15px;
}
.index_table_btn .color_qf:hover {
  color: #4786ff !important;
  background: #dbe7ff;
  border: 1px solid #dbe7ff;
}
.index_table_cont {
  margin: 40px;
}
.table_cont_top {
  position: relative;
  margin-bottom: 30px;
}
.table_cont_bottom {
  margin-top: 30px;
}
.table_cont_bottom input {
  border: none;
  width: 100%;
  background: none;
}
.fs_ewm {
  width: 50%;
  float: left;
  text-align: center;
}
.fs_ewm img {
  border: 1px solid #ddd;
  padding: 10px;
}
.fs_ewm a {
  position: absolute;
  bottom: 0;
  margin-bottom: 0;
  margin-left: -50px;
  color: #fff !important;
}
.scsz .form-group label {
  margin-right: 30px;
}
.scsz .form-group input {
  width: 180px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.scsz .mrts {
  margin-left: 90px;
  color: #a7a7a7;
}
.scsz button {
  display: block;
  width: 280px;
  margin: 20px auto;
}
.table_cont_bottom span {
  background: #f0f5f8;
  padding: 10px;
  display: block;
  width: 60%;
  float: left;
  margin-right: 30px;
  color: #9c8f8f;
}
label{ margin-bottom:18px !important;}
.content_con {
  min-width: 1250px;
}
</style>

