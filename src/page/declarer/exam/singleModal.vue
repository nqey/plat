<template>
  <div>
    <v-modal 
      :title="myt"
      ref="modal">
      <div slot="body">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">标题</label>
            <div class="col-sm-9">
              <textarea row="5" class="form-control" v-model="title" placeholder="请设置标题"></textarea> 
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">分数</label>
            <div class="col-sm-2">
              <select v-model="score" class="form-control"> <option v-for="v of scores">{{v}}</option> </select> 
            </div>
          </div>
          <hr/>
          <div class="form-group">
            <div class="col-sm-offset-1 col-sm-10">
              <table class="table" v-show="options.length > 0"> 
                <thead> 
                 <tr class="table_tit"> 
                  <th>选项</th> 
                  <th>正确答案</th> 
                  <th>操作</th> 
                 </tr> 
                </thead> 
                <tbody> 
                 <tr v-for="(o, index) of options"> 
                  <td><input type="text" v-model="o.option" class="form-control"/></td> 
                  <td> 
                    <input :value="index" type="radio" name="radio1" v-model="answer" />
                  </td> 
                  <td class="gc_list">
                    <img :src="tj" @click="addOption" />
                    <img :src="jy" @click="delOption(index)"/>
                    <img :src="sy" @click="upMove(index)" />
                    <img :src="xy" @click="downMove(index)" />
                  </td>
                 </tr> 
                </tbody> 
               </table> 
             </div>
           </div>
        </form>
      </div>
      <div slot="footer">
        <button type="button" style="width: 100%" class="btn btn-info" @click="$refs.modal.toggle();handler({title, answer, score, options})">完成编辑</button>
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
import tj from '@/assets/img/tj.png';
import jy from '@/assets/img/jy.png';
import sy from '@/assets/img/sy.png';
import xy from '@/assets/img/xy.png';
import modal from '@/components/modal';

export default {
  name: 'singleModal',
  props: {
    handler: {
      type: Function,
      default: null,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  watch: {
    item() {
      this.title = this.item.title;
      this.answer = this.item.answer || 0;
      this.score = this.item.score || 5;
      this.options = this.item.options || [
        {
          option: null,
        },
      ];
    },
  },
  data() {
    return {
      tj,
      jy,
      sy,
      xy,
      title: null,
      myt: '单选题',
      answer: null,
      score: 5,
      scores: [5, 8, 10],
      options: [
        {
          option: null,
        },
      ],
    };
  },
  components: {
    'v-modal': modal,
  },
  methods: {
    addOption() {
      const option = {
        option: null,
      };
      this.options.push(option);
    },
    delOption(index) {
      if (this.options.length === 1) return;
      this.answer = 0;
      this.options.splice(index, 1);
    },
    downMove(index) {
      if (index === this.options.length - 1) return;
      const a = this.options[index + 1];
      const b = this.options[index];
      this.options.splice(index, 2, ...[a, b]);
      if (index === this.answer - 0) {
        this.answer = index + 1;
      } else if (index === this.answer - 1) {
        this.answer = index;
      }
    },
    upMove(index) {
      if (index === 0) return;
      const a = this.options[index];
      const b = this.options[index - 1];
      this.options.splice(index - 1, 2, ...[a, b]);
      if (index === (this.answer - 0)) {
        this.answer = index - 1;
      } else if (index === (this.answer - 0 + 1)) {
        this.answer = index;
      }
    },
  },
};
</script>

<style scoped>
</style>