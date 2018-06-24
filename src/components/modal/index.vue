<template>
  <div v-if="isModalVisible">
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div id="myModal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         style="display: block;">
      <div class="modal-dialog" role="document" :style="{ width: mystyle.width }">
        <div class="modal-content">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="toggle"><span
              aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
          </div>

          <div class="modal-body">
            <slot name='body'></slot>
          </div>

          <div class="modal-footer">
            <slot name='footer'>
              <button slot="footer" type="button" class="btn btn-primary" @click="submit">确认</button>
              <button type="button" class="btn btn-default" @click="toggle">取消</button>
            </slot>
          </div>

        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in"></div>
  </div>
</template>

<script>
  import errInfo from '@/components/info/error';
  import { validate } from '@/config/validator';

  export default {
    name: 'modalBase',
    props: {
      title: {
        type: String,
        default: '模态框',
      },
      errMsg: {
        type: Array,
        default: () => [],
      },
      commit: {
        type: Function,
        default: null,
      },
      mystyle: {
        type: Object,
        default: () => {
          const o = {
            width: '600px',
          };
          return o;
        },
      },
    },
    data() {
      return {
        isModalVisible: false,
      };
    },
    components: {
      'v-error-info': errInfo,
    },
    methods: {
      @validate()
      submit() {
        if (this.commit) {
          this.commit();
        }
      },
      toggle() {
        this.isModalVisible = !this.isModalVisible;
      },
    },
  };
</script>

<style scoped>
</style>
