<template>
  <div class="videouploader-container">
    <v-videoviewer :imgSrc="videoViewUrl" ref="videoViewer"/>
    <div class="videouploader-viewer-container" v-show="videoUrls.length > 0">
      <div class="videouploader-viewer-cell" v-for="(video, index) of videoUrls"
           :style="{ width: `${width}px`, height: `${height}px`}">
        <div v-if="!video.loading" class="videouploader-viewer-delete">
          <img :src="delVideoBtn" class="videouploader-viewer-delete-btn"
               @click="videoUrls.splice(index, 1); notifyVideoChanged();">
        </div>
        <div v-if="!video.loading" class="videouploader-viewer-play"
             :style="{position: 'absolute', left: `${(width - 64)/ 2}px`, top: `${(height - 64)/ 2}px`, }">
          <img :src="videoPlay" class="videouploader-viewer-play-btn" @click="viewVideo(video.url)"/>
        </div>
        <img class="videouploader-loading" v-if="video.loading" :src="loading"/>
        <img v-else :src="`${getPlaceholder(video.url)}`" @error="increase($event, video.url)"
             style="width: 100%;height: 100%;"/>
      </div>
    </div>
    <div class="videouploader-backgroud-container" v-show="videoUrls.length < multiple">
      <div class="videouploader-backgroud-shower" :style="{ width: `${width}px`, height: `${height}px`}">
        <img :src="backgroud">
        <input @change="fileChanged($event)" class="videouploader-file-input" type="file" :multiple="multiple > 1"
               accept="video/*"/>
        <p class="title">{{ title }}</p>
      </div>
    </div>
  </div>
</template>

/**
* @author ： 李银 on 2018年6月20日 16:52:13
*
* 入参：
* backgroud:video     - 视频选择器背景图 64*64像素图片
* title:String        - 视频选择器背景提示文字
* width:Number        - 视频显示宽度，默认200px
* height:Number       - 视频显示高度，默认200px
* fileSize:Number     - 视频最大上传KB数，默认100MB（即1024*1024*100 KBytes）
* initVideoUrls:Array - 初始化视频列表，外部传入视频URL
*
* api:
* getVideoUrls()                - 获取当前已经上传的视频url；
*
* 回调：
* onVideoChanged(urls)          - 当前视频的url发生改变时（如删除，上传成功）出发此回调，urls为所有视频urls；
**/
<script>
  import delVideoBtn from '@/assets/img/delete.png';
  import loading from '@/assets/img/loading.gif';
  import videoUploadedBackgroud from '@/assets/img/video.jpg';
  import videoAddBackgroud from '@/assets/img/video-add.png';
  import videoPlay from '@/assets/img/play.png';
  import { VIDEO_SERVER_URL } from '@/config/env';
  import { Message } from 'element-ui';

  export default {
    name: 'videouploader',
    props: {
      backgroud: {
        type: String,
        default: videoAddBackgroud,
      },
      title: {
        type: String,
        default: '请选择需要上传的视频',
      },
      width: {
        type: Number,
        default: 200,
      },
      height: {
        type: Number,
        default: 200,
      },
      // 默认仅支持最大100M文件
      fileSize: {
        type: Number,
        default: 1024 * 1024 * 100,
      },
      initVideoUrls: {
        type: Array,
        default: () => [],
      },
      onVideoChanged: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        version: 1,
        multiple: 1,
        delVideoBtn,
        loading,
        videoPlay,
        videoUploadedBackgroud,
        videoAddBackgroud,
        videoViewUrl: '',
        // 格式为 {url: '视频url', loading: true/false - 是否在上传中？};
        videoUrls: [],
      };
    },
    watch: {
      initVideoUrls: 'setVideoUrls',
    },
    mounted() {
      this.setVideoUrls();
    },
    methods: {
      setVideoUrls() {
        let init = this.initVideoUrls || [];
        if (typeof init === 'string') {
          init = [init];
        }
        this.videoUrls = init.filter(url => url != null).map(url => ({ url, loading: false }));
      },
      fileChanged(e) {
        // 判断文件是否存在
        const files = e.target.files;

        // 判断是否为视频文件
        const temp = [];
        const legalFiles = [];
        for (let i = 0; i < files.length; i += 1) {
          const f = files[i];
          if (f.size >= this.fileSize) {
            Message.error(`您这个[${f.name}]文件太大了`);
          } else {
            temp.push({ loading: true });
            legalFiles.push(f);
          }
        }

        if (legalFiles.length === 0) {
          Message.error('没有可上传的视频');
        } else if (this.videoUrls.length + legalFiles.length > this.multiple) {
          // 上传视频是否超限
          Message.error(`只能上传${this.multiple}个视频`);
        } else {
          this.videoUrls = this.videoUrls.concat(temp);
          this.upload(legalFiles);
        }
        e.target.value = '';
      },
      async upload(files) {
        const param = new FormData();
        files.forEach((f) => {
          param.append('videoList', f);
        });

        const res = await this.$http.upload(`${VIDEO_SERVER_URL}publics/video/upload`, param, { timeout: 50000 });

        // 目前是单选
        this.videoUrls = [{ url: res.data, loading: false }];

        this.notifyVideoChanged();
      },
      notifyVideoChanged() {
        if (this.onVideoChanged) {
          this.onVideoChanged(this.getVideoUrls());
        }
      },
      getVideoUrls() {
        return this.videoUrls.filter(i => !i.loading).map(i => i.url);
      },
      getPlaceholder(url) {
        const c = url.split('/');
        c.splice(c.length - 1, 1);
        return `${VIDEO_SERVER_URL}${c.join('/')}/first.jpg`;
      },
      viewVideo(url) {
        this.$refs.videoViewer.open(`${VIDEO_SERVER_URL}${url}`);
      },
      increase(e, url) {
        setTimeout(() => {
          this.version += 1;
          e.target.src = `${this.getPlaceholder(url)}?t=${this.version}`;
        }, 500);
      },
    },
    components: {
      'v-videoviewer': () => import('@/components/videoviewer'),
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin.scss';

  .videouploader-container {
    width: auto;
    text-align: center;
  }

  .videouploader-viewer-container {
    overflow: hidden;
    float: left;
  }

  .videouploader-viewer-cell {
    position: relative;
    width: 200px;
    margin: 0px 30px 10px 0px;
    float: left;
    display: table-cell;
    text-align: center;
    cursor: pointer;
    border: 1px solid #e6e3e3;
    border-radius: 4px;
  }

  .videouploader-viewer-delete {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
  }

  .videouploader-viewer-delete-btn {
    position: absolute;
    top: 6px;
    width: 16px;
    right: 4px;
  }

  .videouploader-loading {
    margin-top: 43%;
  }

  .videouploader-viewer-cell img {
    max-width: 100%;
    vertical-align: middle;
  }

  .title {
    line-height: 75px;
  }

  .videouploader-file-input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
    cursor: pointer;
  }

  .videouploader-backgroud-container {
    display: inline;
    float: left;
  }

  .videouploader-backgroud-shower {
    border: 1px solid #e6e3e3;
    border-radius: 4px;
    cursor: pointer;
    color: #d0cbcb;
    position: relative;
  }

  .videouploader-backgroud-container img {
    margin-top: 40px;
  }

  .upload {
    border: 1px solid #ccc;
    background-color: #fff;
    width: 650px;
    box-shadow: 0px 1px 0px #ccc;
    border-radius: 4px;
  }

</style>
