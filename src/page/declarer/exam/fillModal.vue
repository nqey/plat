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
            <label class="col-sm-2 control-label">答案</label>
            <div class="col-sm-9">
              <textarea row="5" class="form-control" v-model="answer" placeholder="请设置答案"></textarea> 
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">分数</label>
            <div class="col-sm-2">
              <select v-model="score" class="form-control"> <option v-for="v of scores">{{v}}</option> </select> 
            </div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button type="button" style="width: 100%" class="btn btn-info" @click="$refs.modal.toggle();handler({title, score, answer})">完成编辑</button>
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
      this.score = this.item.score || 5;
      this.answer = this.item.answer;
    },
  },
  data() {
    return {
      title: null,
      answer: null,
      myt: '填空题',
      score: 5,
      scores: [5, 8, 10],
    };
  },
  components: {
    'v-modal': modal,
  },
};
</script>

<style scoped>
</style>