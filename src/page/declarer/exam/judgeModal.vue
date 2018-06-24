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
                 </tr> 
                </thead> 
                <tbody> 
                 <tr v-for="(o, index) of options"> 
                  <td><input type="text" v-model="o.option" class="form-control" disabled /></td> 
                  <td> 
                    <input :value="index" type="radio" name="radio1" v-model="answer"/>
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
import modal from '@/components/modal';

export default {
  name: 'judgeModal',
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
    },
  },
  data() {
    return {
      title: null,
      myt: '判断题',
      answer: null,
      score: 5,
      scores: [5, 8, 10],
      options: [
        {
          option: '正确',
        },
        {
          option: '错误',
        },
      ],
    };
  },
  components: {
    'v-modal': modal,
  },
};
</script>

<style scoped>
</style>