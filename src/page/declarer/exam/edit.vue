<template>
  <div class="plat-content">
    <div class="plat-content-con">
    <div class="index_table_tit clearfix">
      <div class="col-md-10 col-md-offset-1">
      <router-link to="/declarer/exam" class="btn back_icon"><img :src="backicon">返回</router-link>
      </div>
    </div>
    <div class="index_table index_table_con clearfix">
     <div class="col-md-8 col-md-offset-2">
      <h3 class="tit_bjks text-center">{{name}}</h3>
      <span class="inputtext_1">{{illustrate}}</span>
      <div class="cjst_btn">
       <ul>
        <li @click="type='insert';item={};$refs.single.$refs.modal.toggle()">
          <button type="button" class="btn btn_search">插入单选题</button>
        </li>
        <li @click="type='insert';item={};$refs.multiple.$refs.modal.toggle();">
          <button type="button" class="btn btn_search">插入多选题</button>
        </li>
        <li @click="type='insert';item={};$refs.judge.$refs.modal.toggle();">
          <button type="button" class="btn btn_search">插入判断题</button>
        </li>
        <li @click="type='insert';item={};$refs.fill.$refs.modal.toggle();">
          <button type="button" class="btn btn_search">插入填空题</button>
        </li>
        <li @click="type='insert';item={};$refs.essay.$refs.modal.toggle();">
          <button type="button" class="btn btn_search">插入简答题</button>
        </li>
       </ul>
       <div style="clear:both;"></div>
      </div>
      <div class="cjst_sttj">
         <fieldset>
            <div class="div_title_cut_question">
              <b>一、单选题</b>
            </div>
            <div class="div_question" v-for="(q, index) of singleQS">
              <div class="div_table_radio_question">
                <div class="div_title_question_all">
                  <div class="div_title_question">
                   <span class="number">{{index+1}}、</span>{{q.title}}
                   <span class="req">&nbsp;*（分值：{{q.score}}分）</span>
                  </div>
                </div>
                <ul class="ulradiocheck" v-for="(o, oi) of q.options">
                  <li>
                    <label class="radio-inline">
                      <input type="radio" :value="oi" :name="index" v-model="q.answer" disabled/>
                      <b :class="{req: oi === q.answer - 0}">{{optionMap[oi]}}、{{o.option}}<span v-if="oi === q.answer - 0">（正确答案）</span></b>
                    </label>
                  </li>
                </ul>
                <div class="cjks_txxg clearfix"> 
                  <ul class="pull-right txxg_xx"> 
                    <li class="text-center" @click="singleQI=index;type='edit';item=JSON.parse(JSON.stringify(q));$refs.single.$refs.modal.toggle();"><a data-toggle="modal" data-target="#myModal"><img :src="bj" />编辑</a></li> 
                    <li class="text-center" @click="copy(index, 'single')"><img :src="cz" />复制</li> 
                    <li class="text-center" @click="del(index, 'single')"><img :src="sc" />删除</li> 
                  </ul> 
                </div>
              </div>
           </div>
           <div class="div_title_cut_question">
              <b>二、多选题</b>
            </div>
           <div class="div_question" v-for="(q, index) of multipleQS">
             <div class="div_table_radio_question">
                <div class="div_title_question_all">
                  <div class="div_title_question">
                    <span class="number">{{index+1}}、</span>
                    <span class="color_qf">[多选题]</span>
                    {{q.title}}
                    <span class="req">&nbsp;*（分值：{{q.score}}分）</span>
                  </div>
                </div>
                <ul class="ulradiocheck">
                  <li v-for="(o, oi) of q.options">
                    <label class="radio-inline">
                      <input type="checkbox" :checked="o.answer" disabled/>
                      <b :class="{req: o.answer}">{{optionMap[oi]}}、{{o.option}}<span v-if="o.answer">（正确答案）</span></b>
                    </label>
                  </li>
                </ul>
                <div class="cjks_txxg clearfix"> 
                  <ul class="pull-right txxg_xx"> 
                    <li class="text-center" @click="multipleQI=index;type='edit';item=JSON.parse(JSON.stringify(q));$refs.multiple.$refs.modal.toggle();"><a><img :src="bj" />编辑</a></li> 
                    <li class="text-center" @click="copy(index, 'multiple')"><img :src="cz" />复制</li> 
                    <li class="text-center" @click="del(index, 'multiple')"><img :src="sc" />删除</li> 
                  </ul> 
                </div>
              </div>
            </div>
            <div class="div_title_cut_question">
              <b>三、判断题</b>
            </div>
            <div class="div_question" v-for="(q, index) of judgeQS">
              <div class="div_table_radio_question">
                <div class="div_title_question_all">
                  <div class="div_title_question">
                   <span class="number">{{index+1}}、</span>{{q.title}}
                   <span class="req">&nbsp;*（分值：{{q.score}}分）</span>
                  </div>
                </div>
                <ul class="ulradiocheck" v-for="(o, oi) of q.options">
                  <li>
                    <label class="radio-inline">
                      <input type="radio" :value="oi" :name="'ju' + index" v-model="q.answer" disabled/>
                      <b :class="{req: oi === q.answer - 0}">{{optionMap[oi]}}、{{o.option}}<span v-if="oi === q.answer - 0">（正确答案）</span></b>
                    </label>
                  </li>
                </ul>
                <div class="cjks_txxg clearfix"> 
                  <ul class="pull-right txxg_xx"> 
                    <li class="text-center" @click="judgeQI=index;type='edit';item=JSON.parse(JSON.stringify(q));$refs.judge.$refs.modal.toggle();"><a><img :src="bj" />编辑</a></li> 
                    <li class="text-center" @click="copy(index, 'judge')"><img :src="cz" />复制</li> 
                    <li class="text-center" @click="del(index, 'judge')"><img :src="sc" />删除</li> 
                  </ul> 
                </div>
              </div>
           </div>
           <div class="div_title_cut_question">
              <b>四、填空题</b>
            </div>
            <div class="div_question" v-for="(q, index) of fillQS">
              <div class="div_table_radio_question">
                <div class="div_title_question_all">
                  <div class="div_title_question">
                   <span class="number">{{index+1}}、</span>{{q.title}}
                   <span class="req">&nbsp;*（分值：{{q.score}}分）</span>
                  </div>
                </div>
                <div class="ulradiocheck">
                  <b class="req">正确答案:</b><input style="border: 0px;" type="text" disabled="disabled" :value="q.answer"></input>
                </div>
                <div class="cjks_txxg clearfix"> 
                  <ul class="pull-right txxg_xx"> 
                    <li class="text-center" @click="fillQI=index;type='edit';item=JSON.parse(JSON.stringify(q));$refs.fill.$refs.modal.toggle();"><a data-toggle="modal" data-target="#myModal"><img :src="bj" />编辑</a></li> 
                    <li class="text-center" @click="copy(index, 'fill')"><img :src="cz" />复制</li> 
                    <li class="text-center" @click="del(index, 'fill')"><img :src="sc" />删除</li> 
                  </ul> 
                </div>
              </div>
           </div>
           <div class="div_title_cut_question">
            <b>五、简答题</b>
           </div>
           <div class="div_question" v-for="(q, index) of essayQS">
            <div class="div_table_radio_question">
             <div class="div_title_question_all">
              <div class="div_title_question">
               <span class="number">{{index+1}}、</span>{{q.title}}
               <span class="req">&nbsp;*（分值：{{q.score}}分）</span>
              </div>
             </div>
             <div class="jdt_jj">
              <textarea title="" class="inputtext" placeholder="请输入内容" disabled></textarea>
             </div>
             <div class="cjks_txxg clearfix"> 
              <ul class="pull-right txxg_xx"> 
                <li class="text-center" @click="essayQI=index;type='edit';item=JSON.parse(JSON.stringify(q));$refs.essay.$refs.modal.toggle();"><a><img :src="bj" />编辑</a></li> 
                <li class="text-center" @click="copy(index, 'essay')"><img :src="cz" />复制</li> 
                <li class="text-center" @click="del(index, 'essay')"><img :src="sc" />删除</li> 
              </ul> 
            </div>
            </div>
           </div>
         </fieldset>
      </div>
      <div class="clearfix yz_correct">
       <button class="btn pull-left" @click="submit">完成</button>
       <a class="back_icon" @click="view">预览</a>
      </div>
     </div>
    </div>
   </div>
     <v-single-modal ref="single" :item="item" :handler="editHandler" :type="type"></v-single-modal>
     <v-multiple-modal ref="multiple" :item="item" :handler="multipleHandler" :type="type"></v-multiple-modal>
     <v-judge-modal ref="judge" :item="item" :handler="judgeHandler" :type="type"></v-judge-modal>
     <v-essay-modal ref="essay" :item="item" :handler="essayHandler" :type="type"></v-essay-modal>
     <v-fill-modal ref="fill" :item="item" :handler="fillHandler" :type="type"></v-fill-modal>
    </div>
  </div>
</template>

<script>
import bj from '@/assets/img/bj.png';
import cz from '@/assets/img/cz.png';
import sc from '@/assets/img/sc.png';
import backicon from '@/assets/img/back_icon.png';
import { PLATFORM_POST_EXAMS_ADDITIONORUPDATING, PLATFORM_POST_EXAMS_EDITION } from '@/config/env';
import singleModal from '@/page/declarer/exam/singleModal';
import multipleModal from '@/page/declarer/exam/multipleModal';
import judgeModal from '@/page/declarer/exam/judgeModal';
import essayModal from '@/page/declarer/exam/essayModal';
import fillModal from '@/page/declarer/exam/fillModal';

export default {
  data() {
    return {
      editHandler: (o) => {
        if (this.type === 'insert') {
          o.type = 'single';
          this.singleQS.push(o);
          return;
        }
        const o2 = this.singleQS[this.singleQI];
        o2.title = o.title;
        o2.answer = o.answer;
        o2.options = o.options;
        o2.score = o.score;
        this.singleQS = JSON.parse(JSON.stringify(this.singleQS));
      },
      multipleHandler: (o) => {
        if (this.type === 'insert') {
          o.type = 'multiple';
          this.multipleQS.push(o);
          return;
        }
        const o2 = this.multipleQS[this.multipleQI];
        o2.title = o.title;
        o2.options = o.options;
        o2.score = o.score;
        this.multipleQS = JSON.parse(JSON.stringify(this.multipleQS));
      },
      judgeHandler: (o) => {
        if (this.type === 'insert') {
          o.type = 'judge';
          this.judgeQS.push(o);
          return;
        }
        const o2 = this.judgeQS[this.judgeQI];
        o2.title = o.title;
        o2.answer = o.answer;
        o2.options = o.options;
        o2.score = o.score;
      },
      essayHandler: (o) => {
        if (this.type === 'insert') {
          o.type = 'essay';
          this.essayQS.push(o);
          return;
        }
        const o2 = this.essayQS[this.essayQI];
        o2.title = o.title;
        o2.score = o.score;
      },
      fillHandler: (o) => {
        if (this.type === 'insert') {
          o.type = 'fill';
          this.fillQS.push(o);
          return;
        }
        const o2 = this.fillQS[this.fillQI];
        o2.title = o.title;
        o2.score = o.score;
        o2.answer = o.answer;
      },
      backicon,
      bj,
      cz,
      sc,
      insOrEdi: '',
      type: null,
      typeNm: '',
      subjectType: {
        single: '单选题',
        multiple: '多选题',
        essay: '简答题',
        fill: '填空题',
        judge: '判断题',
      },
      item: {},
      list: [],
      singleQI: '',
      singleQS: [
        // 例
        // {
        //   title: '',
        //   answer: '',
        //   options: [
        //     {
        //       option: '选项A',
        //       score: '',
        //       image: '',
        //     },
        //   ],
        // },
      ],
      judgeQI: '',
      judgeQS: [
        // 例
        // {
        //   title: '',
        //   answer: '',
        //   options: [
        //     {
        //       option: '选项A',
        //       score: '',
        //       image: '',
        //     },
        //   ],
        // },
      ],
      multipleQI: '',
      multipleQS: [
        // 例
        // {
        //   title: '',
        //   options: [
        //     {
        //       option: '选项A',
        //       answer: '',
        //       score: '',
        //       image: '',
        //     },
        //   ],
        // },
      ],
      essayQI: '',
      essayQS: [
        // 例
        // {
        //   title: '',
        //   score: '',
        //   image: '',
        // },
      ],
      fillQI: '',
      fillQS: [
        // 例
        // {
        //   title: '',
        //   score: '',
        //   image: '',
        //   answer: '',
        // },
      ],
      optionMap: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      ],
      options: [],
      title: '',
      option: '',
      answer: '',
      image: '',
      score: 5,
      scores: [5, 8, 10],
      errMsg: [],
      timer: null,
      cancelOp: null,
      name: null,
      illustrate: null,
    };
  },
  components: {
    'v-single-modal': singleModal,
    'v-multiple-modal': multipleModal,
    'v-judge-modal': judgeModal,
    'v-essay-modal': essayModal,
    'v-fill-modal': fillModal,
  },
  methods: {
    copy(index, type) {
      if (type === 'single') {
        const o = JSON.parse(JSON.stringify(this.singleQS[index]));
        if (o.id) {
          delete o.id;
        }
        this.singleQS.push(o);
      } else if (type === 'judge') {
        const o = JSON.parse(JSON.stringify(this.judgeQS[index]));
        if (o.id) {
          delete o.id;
        }
        this.judgeQS.push(o);
      } else if (type === 'multiple') {
        const o = JSON.parse(JSON.stringify(this.multipleQS[index]));
        if (o.id) {
          delete o.id;
        }
        this.multipleQS.push(o);
      } else if (type === 'essay') {
        const o = JSON.parse(JSON.stringify(this.essayQS[index]));
        if (o.id) {
          delete o.id;
        }
        this.essayQS.push(o);
      } else if (type === 'fill') {
        const o = JSON.parse(JSON.stringify(this.fillQS[index]));
        if (o.id) {
          delete o.id;
        }
        this.fillQS.push(o);
      }
    },
    del(index, type) {
      if (type === 'single') {
        this.singleQS.splice(index, 1);
      } else if (type === 'judge') {
        this.judgeQS.splice(index, 1);
      } else if (type === 'multiple') {
        this.multipleQS.splice(index, 1);
      } else if (type === 'essay') {
        this.essayQS.splice(index, 1);
      } else if (type === 'fill') {
        this.fillQS.splice(index, 1);
      }
    },
    view() {
      window.sessionStorage.setItem('singleQS', JSON.stringify(this.singleQS));
      window.sessionStorage.setItem('multipleQS', JSON.stringify(this.multipleQS));
      window.sessionStorage.setItem('judgeQS', JSON.stringify(this.judgeQS));
      window.sessionStorage.setItem('essayQS', JSON.stringify(this.essayQS));
      window.sessionStorage.setItem('fillQS', JSON.stringify(this.fillQS));
      this.$router.push(`/declarer/exam/view/${this.$route.params.id}`);
    },
    async init() {
      const res = await this.$http.get(`${PLATFORM_POST_EXAMS_EDITION}${this.$route.params.id}`);
      if (res.success) {
        this.singleQS = res.data.questionMap.single || [];
        this.multipleQS = res.data.questionMap.multiple || [];
        this.essayQS = res.data.questionMap.essay || [];
        this.judgeQS = res.data.questionMap.judge || [];
        this.fillQS = res.data.questionMap.fill || [];
        this.name = res.data.name;
        this.illustrate = res.data.illustrate;
        if (this.singleQS) {
          this.singleQS.forEach((o) => {
            o.options = JSON.parse(o.content);
            o.type = o.subjectType;
            delete o.content;
            delete o.subjectType;
          });
        }
        if (this.judgeQS) {
          this.judgeQS.forEach((o) => {
            o.options = JSON.parse(o.content);
            o.type = o.subjectType;
            delete o.content;
            delete o.subjectType;
          });
        }
        if (this.multipleQS) {
          this.multipleQS.forEach((o) => {
            o.options = JSON.parse(o.content);
            o.type = o.subjectType;
            delete o.content;
            delete o.subjectType;
          });
        }
        if (this.essayQS) {
          this.essayQS.forEach((o) => {
            o.type = o.subjectType;
            delete o.subjectType;
          });
        }
        if (this.fillQS) {
          this.fillQS.forEach((o) => {
            o.type = o.subjectType;
            delete o.subjectType;
          });
        }
        if (window.sessionStorage.getItem('singleQS') && window.sessionStorage.getItem('singleQS') !== 'undefined') {
          const singleQS = JSON.parse(window.sessionStorage.getItem('singleQS'));
          if (singleQS) {
            singleQS.forEach((o) => {
              if (!o.id) {
                this.singleQS.push(o);
              }
            });
          }
        }
        if (window.sessionStorage.getItem('judgeQS') && window.sessionStorage.getItem('judgeQS') !== 'undefined') {
          const judgeQS = JSON.parse(window.sessionStorage.getItem('judgeQS'));
          if (judgeQS) {
            judgeQS.forEach((o) => {
              if (!o.id) {
                this.judgeQS.push(o);
              }
            });
          }
        }
        if (window.sessionStorage.getItem('multipleQS') && window.sessionStorage.getItem('multipleQS') !== 'undefined') {
          const multipleQS = JSON.parse(window.sessionStorage.getItem('multipleQS'));
          if (multipleQS) {
            multipleQS.forEach((o) => {
              if (!o.id) {
                this.multipleQS.push(o);
              }
            });
          }
        }
        if (window.sessionStorage.getItem('essayQS') && window.sessionStorage.getItem('essayQS') !== 'undefined') {
          const essayQS = JSON.parse(window.sessionStorage.getItem('essayQS'));
          if (essayQS) {
            essayQS.forEach((o) => {
              if (!o.id) {
                this.essayQS.push(o);
              }
            });
          }
        }
        if (window.sessionStorage.getItem('fillQS') && window.sessionStorage.getItem('fillQS') !== 'undefined') {
          const fillQS = JSON.parse(window.sessionStorage.getItem('fillQS'));
          if (fillQS) {
            fillQS.forEach((o) => {
              if (!o.id) {
                this.fillQS.push(o);
              }
            });
          }
        }
      }
    },
    async submit() {
      const param = {};
      param.questionList = JSON.stringify([
        ...this.singleQS,
        ...this.multipleQS,
        ...this.essayQS,
        ...this.judgeQS,
        ...this.fillQS,
      ]);
      param.questionList = JSON.parse(param.questionList);
      param.questionList.forEach((d) => {
        if (d.options) {
          d.content = JSON.stringify(d.options);
          d.answer = typeof d.answer === 'object' ? d.answer.join(',') : d.answer;
          delete d.options;
        }
      });
      param.questionList = JSON.stringify(param.questionList);
      const res = await this.$http.post(`${PLATFORM_POST_EXAMS_ADDITIONORUPDATING}${this.$route.params.id}`, param);
      if (res.success) {
        window.sessionStorage.setItem('singleQS', '');
        window.sessionStorage.setItem('multipleQS', '');
        window.sessionStorage.setItem('judgeQS', '');
        window.sessionStorage.setItem('essayQS', '');
        window.sessionStorage.setItem('fillQS', '');
        this.$router.push('/declarer/exam');
      }
    },
  },
  mounted() {
    this.init();
  },
};

</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.btn:hover {
  color: #fff !important;
}
.req {
  color: #f0820c;
  margin-right: 30px;
}
.red {
  color: red;
}
.color_qf {
  color: #4786ff !important;
}
.green {
  color: #01c853 !important;
}
.tgsh {
  color: #828282;
}
.size_color {
  color: #888888;
}
.tsy {
  padding: 1px 6px;
  border-radius: 180px;
  background: #4786ff;
  color: #fff;
  font-size: 0.1em;
  margin-left: 5px;
}
.btn_sure, .btn_waive {
  padding: 6px 30px;
  margin: 0 5px;
  border-radius: 20px;
  color: #fff;
  font-size: 12px;
  min-width: 130px;
}
.btn_dc {
  background: #DBE7FF;
  padding: 3px 30px;
  margin: 0 5px;
  font-size: 12px;
  border-radius: 20px;
  color: #4344fe !important;
}
.btn_dc:hover {
  color: #4344fe !important;
}
.btn_sure {
  background: #4344fe;
  color: #fff !important;
}
.glyphicon-chevron-down {
  color: #fff;
}
.btn_waive {
  background: #555555;
}
.btn_gg {
  background: #dbe7ff;
  color: #4344fe;
  margin-left: 30px;
  border-radius: 20px;
  width: 130px;
}
.btn_gg:hover {
  background: #c4d7ff;
  color: #4344fe !important;
}
.btn_fz {
  background: #01c853;
  color: #fff;
  width: 152px;
  border-radius: 18px;
}
.index_header {
  height: 100px;
  background-size: cover;
}
.index_logo {
  line-height: 100px;
  color: #fff;
}
.index_logo img {
  padding-right: 30px;
}
.index_user .dropdown-toggle {
  color: #fff;
  padding-top: 25px;
  display: block;
}
.index_user .dropdown-toggle img {
  padding-right: 25px;
}
.index_user .dropdown-menu {
  padding: 20px;
}
.index_user .dropdown-menu img {
  padding-bottom: 20px;
}
.index_user .dropdown-menu h5 {
  margin-top: 0;
  margin-bottom: 20px;
}
.index_user .dropdown-menu .btn {
  background: #e2e2e2;
  color: #696868;
  padding: 4px 20px;
}
.index_user .dropdown-menu .btn:hover {
  color: #4e4c4c !important;
}
.index_nav {
  background: #fff;
}
.nav_nav {
  margin-bottom: 0;
}
.nav_nav li {
  float: left;
  width: 20%;
  text-align: center;
}
.nav_nav li a {
  display: block;
  width: 125px;
  color: #6f6868;
  margin: auto;
  text-align: center;
  padding: 15px 0;
  font-weight: bold;
  border-bottom: 3px solid #fff;
}
.xzcx {
  display: none;
}
.nav_nav li:hover .xzcx {
  display: inline-block;
}
.nav_nav li:hover .xzyc {
  display: none;
}
.nav_nav .cur {
  color: #4786ff !important;
  border-bottom: 3px solid #4786ff;
}
.nav_nav a img {
  padding-right: 5px;
}
.nav_nav .cur > .xzyc {
  display: none;
}
.nav_nav .cur > .xzcx {
  display: inline-block;
}
.nav_nav li:hover a {
  color: #4786ff !important;
  border-bottom: 3px solid #4786ff;
}
.nav_nav li:hover .cur {
  color: #4786ff !important;
}
.current a {
  color: #000 !important;
}
.index_content {
  margin-top: 50px;
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
  background: #4786ff;
  border-radius: 20px;
  height: 35px;
  color: #fff;
  margin-bottom: 20px;
  width: 155px;
}
.inputtext_1 {
  display: block;
  padding: 30px;
    border: 1px solid #ddd;
    min-height: 150px;
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
.back_icon {
  color: #333;
  padding: 5px 30px;
  border: 1px solid #d4d4d4;
  border-radius: 20px;
  letter-spacing: 5px;
  float: left;
  margin-left: 15px;
}
.back_icon:hover{ color:#ababab !important;}
.back_icon img {
  padding-right: 10px;
}
.index_table_con .form-group {
  margin: 30px 0;
}
.index_table_con a:hover {
  color: #fff;
}
.index_table_tit {
  margin-bottom: 30px;
}
.index_table_tit .nav-tabs {
  border-bottom: 0;
  width: 280px;
  margin: auto;
}
.index_table_tit .nav-tabs li {
  width: 50%;
  text-align: center;
}
.index_table_tit .nav-tabs>li>a {
  margin-right: 0;
  border: 1px solid #efefef;
  border-radius: 0;
  font-size: 14px;
  font-weight: 600;
  background: #f9f9f9;
}
.index_table_tit .nav-tabs>li>a:hover {
  background: #fff;
  border: 1px solid #efefef;
}
.index_table_tit .nav-tabs>li.active>a {
  border: 1px solid #fff;
  border-radius: 0;
  background: #fff;
}
.index_sh {
  background: #f5f9fc;
  padding: 50px;
  margin-bottom: 80px;
}
.content_left {
  width: 16%;
  margin-right: 2%;
}
.content_right {
  width: 82%;
}
.content_right p {
  color: #6f6f6f;
}
.content_right img {
  padding-right: 20px;
}
.content_left, .content_right {
  float: left;
  line-height: 34px;
  letter-spacing: 2px;
}
.index_sh .btn {
  margin-right: 30px;
  width: 130px;
  outline: none;
  color: #fff;
  border-radius: 20px;
}
.content_right .zfzt {
  border: none;
}
.index_more {
  margin-bottom: 10px;
}
.index_more a {
  border-bottom: 1px solid #4344fe;
  color: #4344fe !important;
  line-height: 26px;
}
.index_more a:hover {
  color: #4344fe;
}
.wznr {
  margin-bottom: 0;
}
.wznr li {
  float: left;
  text-align: center;
  width: 16%;
  margin: 0 2%;
  border: 1px solid #ddd;
  height: 45px;
  line-height: 45px;
  border-radius: 4px;
}
.wznr .current {
  background: #fff;
  border: 1px solid #fff;
}
.wz_btn {
  width: 240px;
  padding: 10px;
  background: #4786ff;
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
.inputtext_ck {
  background: #f6f6f6 !important;
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
.ckkj_ks span {
  padding: 0 20px;
}
.ckkj_kt {
  background: #f8f8f8;
  padding: 40px 60px;
  margin-top: 40px;
}
.div_title_cut_question {
  font-size: 16px;
  padding: 2px 0;
  margin-bottom: 35px;
  line-height: 25px;
}
.div_title_question {
  overflow: hidden;
  zoom: 1;
  margin-bottom: 20px;
}
.div_table_radio_question {
  margin-bottom: 40px;
}
.div_title_question_all {
  padding-top: 2px;
  font-size: 14px;
  color: #444444;
  font-weight: bold;
  height: auto;
  line-height: 20px;
}
.div_table_radio_question li {
  margin: 10px 0;
  list-style-type: none;
  font-size: 14px;
}
.inputtext {
  width: 100%;
  margin-top: 10px;
  border-radius: 4px;
  border: none;
  background: #fff;
  padding: 25px;
  line-height: 25px;
}
.btg {
  background: #f6f6f6 !important;
  min-height: 180px;
}
.inputtext_1 {
  border: 1px solid #ddd;
  min-height: 150px;
}
.ckkj_zq {
  margin-top: 30px;
}
.ht_cjks {
  padding-top: 10%;
}
.ht_cjks .btn {
  margin-top: 60px;
}
.tit_bjks {
  margin-bottom: 30px;
}
.tit_bjks img {
  margin-left: 20px;
}
.cjst_btn {
  margin: 25px 0 30px 0;
}
.cjst_btn ul li {
  width: 19%;
  float: left;
}
.cjst_btn ul li a{ display: block; }
.cjst_btn ul li:nth-of-type(n+2) {
  margin-left: 1.25%;
}
.cjst_sttj .div_table_radio_question {
  border: 1px solid #ddd;
  border-radius: 4px;
}
.cjst_sttj .div_table_radio_question:hover {
  border: 1px solid #4786ff;
  cursor: pointer;
}
.cjst_sttj .div_title_question {
  padding: 15px 15px 0 15px;
}
.cjst_sttj .ulradiocheck {
  padding: 0 15px;
}
.cjst_sttj .inputtext {
  background: #f6f6f6;
}
.jdt_jj {
  padding: 0 15px 15px;
}
.cjks_txxg {
  padding: 18px;
  background: #f6fafc;
  color: #4786ff;
}
.div_table_radio_question:hover .cjks_txxg {
  display: block;
}
.crtx {
  border-bottom: 1px solid #4786ff;
  line-height: 32px;
}
.txxg_xx {
  margin-bottom: 0;
}
.txxg_xx li {
  float: left;
  width: 85px;
  margin: 0 5px;
  border: 1px solid #4786ff;
  border-radius: 20px;
  padding: 5px 2px;
}
.txxg_xx li a img {
  margin-right: 10px;
}
.wzys {
  color: #323232;
}
.bjst_tit {
  background: #f6fafc;
  padding: 10px;
}
.bjst_tit h5 {
  margin: 0;
  padding: 0;
  font-size: 16px;
}
.bjst_tit a {
  border-bottom: 1px solid #4786ff;
  color: #4786ff !important;
}
.txxz {
  margin-bottom: 15px;
}
.txxz select{  border:1px solid #ddd; padding:0 5px; border-radius:4px;}
.dajx{ line-height:30px;}
.dajx a{ color:#01c853 !important; border-bottom:1px solid #01c853; padding-bottom:2px;}
.bjst {
  border: 1px solid #ddd;
}
.bjst .inputtext {
  background: #fff;
}
label{ margin-bottom:18px !important;}
.txsz {
  margin-top: 40px;
}
.stnr {
  padding: 15px;
}
.stnr input,.stnr select{
  border:1px solid #ddd; border-radius:4px;padding:3px;
}
.stnr select{ margin-left:10px;}
.wcbj {
  background: #01c853;
  width: 100%;
  border-radius: 20px;
  color: #fff;
}
.btgyy {
  padding: 15px 0 25px 0;
}
.yz_correct {
  width: 360px;
  margin: auto;
}
.yz_correct button {
  background: #01c853;
  width: 240px;
  margin: auto;
  color: #fff;
  letter-spacing: 5px;
  border-radius: 18px;
}
.content_con {
  min-width: 1250px;
}
</style>