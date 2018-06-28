<template>
  <div v-if="visible">
    <div id="myModal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         style="display: block;">
      <div class="modal-dialog" role="document" :style="{ width: width != null ? `${width}px` : 'auto' }">
        <div class="modal-content"
             :style="{ width: width != null ? `${width}px` : 'auto', height: height != null ? `${height}px` : 'auto'}">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close"><span
              aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
          </div>

          <div class="modal-body">
            <slot name='body'></slot>
          </div>

          <div v-if="okText || cancelText" class="modal-footer">
            <slot name='footer'>
              <button v-if="okText" type="button" class="btn btn-primary" @click="confirm" :disabled="disabled">
                {{ okText }}
              </button>
              <button v-if="cancelText" type="button" class="btn btn-default" @click="close">{{ cancelText }}</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in"></div>
  </div>
</template>


/**
* @author ： 李银 on 2018年6月24日 11:03:45
*
* 入参：
* title:String        - 弹框标题
* okText:String       - 确定按钮文字
* cancelText:String   - 取消按钮文字
* width:Number        - 模态框显示宽度，默认600px
* height:Number       - 模态框示高度，默认自适应
*
* api:
* open                - 打开对话框
* confirm             - 触发确定按钮
* cancel              - 触发取消按钮
* toggle              - 切换窗口打开/关闭，如果当前是打开状态调用则变为关闭，反之则打开
*
* 回调：
* ok()                - 当前点击确定按钮的时候触发, 如果此方法的返回值为false，对话框将不会关闭，其他将自动关闭；
* cancel()            - 当前点击确定按钮的时候触发, 如果此方法的返回值为false，对话框将不会关闭，其他将自动关闭；
**/
<script>
  import { validate } from '@/config/validator';

  export default {
    name: 'modalBase',
    props: {
      title: {
        type: String,
        default: '模态框',
      },
      okText: {
        type: String,
        default: '确定',
      },
      cancelText: {
        type: String,
        default: '取消',
      },
      ok: {
        type: Function,
        default: null,
      },
      cancel: {
        type: Function,
        default: null,
      },
      width: {
        type: Number,
        default: 600,
      },
      height: {
        type: Number,
        default: null,
      },
    },
    data() {
      return {
        visible: false,
        disabled: false,
      };
    },
    methods: {
      @validate()
      async confirm() {
        this.disabled = true;

        if (this.ok) {
          const r = await this.ok();
          if (r !== false) {
            this.visible = false;
          }
        } else {
          this.visible = false;
        }

        this.disabled = false;
      },
      close() {
        if (this.cancel) {
          const r = this.cancel();
          if (r !== false) {
            this.visible = false;
          }
        } else {
          this.visible = false;
        }
      },
      open() {
        this.visible = true;
      },
      toggle() {
        this.visible = !this.visible;
      },
    },
  };
</script>

<style scoped>
  .modal-body {
    padding: 20px;
  }
</style>
