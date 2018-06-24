<template>
  <!-- 过渡动画 -->
  <transition name="fade">
    <div class="video-view" v-show="show">
      <!-- 遮罩层 -->
      <div class="video-layer"></div>
      <div class="video">
        <video style="max-width:100%; max-height:450px;" :src="src" controls="" @click="toggle"></video>
      </div>
      <span class="upload_warp_video_div_top el-icon-error video_div_del" @click="close"></span>
    </div>
  </transition>
</template>
<script>

  export default {
    name: 'videoviewer',
    props: {
      url: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        src: '',
        show: false,
        play: false,
      };
    },
    watch: {
      url() {
        this.init(this.url);
      },
      play() {
        if (this.play) {
          this.$el.getElementsByTagName('video')[0].play();
        } else {
          this.$el.getElementsByTagName('video')[0].pause();
        }
      },
    },
    mounted() {
      this.init(this.url);
    },
    methods: {
      init(url) {
        this.src = url;
        this.play = false;
      },
      toggle() {
        this.play = !this.play;
      },
      open(url) {
        this.init(url);
        this.show = true;
      },
      close() {
        this.show = false;
        this.play = false;
      },
    },
  };

</script>
<style scoped>
  .video_div_del {
    position: fixed;
    top: 20px;
    right: 20px;
    color: #fff;
    z-index: 1000;
    font-size: 30px;
  }

  /*动画*/
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
  }

  .fade-enter,
  .fade-leave-active {
    transform: translate3D(100%, 0, 0);
  }

  /* bigvideo */
  .video-view {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /*遮罩层样式*/
  .video-view .video-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /*不限制视频大小，实现居中*/
  .video-view .video video {
    max-width: 100%;
    max-height: 100%;
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 1000;
  }
</style>
