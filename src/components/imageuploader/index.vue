<template>
  <div class="imageuploader-container">
    <v-big-img v-if="isShowBigImg" :imgSrc="bigImgUrl" @hideBigImg="closeBigImg"></v-big-img>
    <div class="imageuploader-viewer-container" v-show="imageUrls.length > 0">
      <div class="imageuploader-viewer-cell" v-for="(image, index) of imageUrls"
           :style="{ width: `${width}px`, height: `${height}px`}">
        <div v-if="!image.loading" class="imageuploader-viewer-delete">
          <img :src="delImageBtn" class="imageuploader-viewer-delete-btn"
               @click="imageUrls.splice(index, 1); notifyImageChanged();">
        </div>
        <div v-if="!image.loading" class="imageuploader-viewer-show-big" @click="showBigImg(image.url)">
          <span class="glyphicon glyphicon-resize-full"></span>
        </div>
        <img class="imageuploader-loading" v-if="image.loading" :src="loading"/>
        <img v-else :src="getPictureUrl(image.url, {q : quality, w: width, h: height})"/>
      </div>
    </div>
    <div class="imageuploader-backgroud-container" v-show="imageUrls.length < multiple">
      <div class="imageuploader-backgroud-shower" :style="{ width: `${width}px`, height: `${height}px`}">
        <img :src="backgroud">
        <input @change="fileChanged($event)" class="imageuploader-file-input" type="file" :multiple="multiple > 1"
               accept="image/*"/>
        <p class="title">{{ title }}</p>
      </div>
    </div>
  </div>
</template>

/**
* @author ： 李银 on 2018年6月19日 21:11:04
*
* 入参：
* multiple:Number     - 最多上传多少张图片，默认为1
* backgroud:image     - 图片选择器背景图
* title:String        - 图片选择器背景提示文字
* width:Number        - 图片显示宽度，默认200px
* height:Number       - 图片显示高度，默认200px
* quality:Number      - 小图显示的质量，默认50（即原图50%的压缩质量）
* fileSize:Number     - 图片最大上传KB数，默认10MB（即1024*1024*10 KBytes）
* initImageUrls:Array - 初始化图片列表，外部传入图片URL
*
* api:
* getImageUrls()                - 获取当前已经上传的图片url；
*
* 回调：
* onImageChanged(urls)          - 当前图片的url发生改变时（如删除，上传成功）出发此回调，urls为所有图片urls；
**/
<script>
  import delImageBtn from '@/assets/img/delete.png';
  import uploadImage from '@/assets/img/upload.png';
  import loading from '@/assets/img/loading.gif';
  import { BASE_URL } from '@/config/env';
  import { getPictureUrl } from '@/config/utils';
  import { Message } from 'element-ui';

  export default {
    name: 'imageuploader',
    props: {
      multiple: {
        type: Number,
        default: 1,
      },
      backgroud: {
        type: String,
        default: uploadImage,
      },
      title: {
        type: String,
        default: '请选择需要上传的图片',
      },
      width: {
        type: Number,
        default: 200,
      },
      height: {
        type: Number,
        default: 200,
      },
      quality: {
        type: Number,
        default: 50,
      },
      // 默认仅支持最大10M文件
      fileSize: {
        type: Number,
        default: 1024 * 1024 * 10,
      },
      initImageUrls: {
        type: Array,
        default: () => [],
      },
      onImageChanged: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        delImageBtn,
        loading,
        bigImgUrl: '',
        isShowBigImg: false,
        // 格式为 {url: '图片url', loading: true/false - 是否在上传中？};
        imageUrls: [],
        // 支持上传的图片类型
        support: ['gif', 'jpeg', 'jpg', 'png', 'svg', 'bmp'],
      };
    },
    watch: {
      initImageUrls: 'setImageUrls',
    },
    mounted() {
      // 初始化验证器
      // window.console.log(this.$el.hasAttribute('val-required'));
      // window.console.log(this.$el.getAttribute('val-required'));
      // window.console.log(this.$el);

      // 初始化外部传入的图片资源
      this.setImageUrls();
    },
    methods: {
      setImageUrls() {
        let init = this.initImageUrls || [];
        if (typeof init === 'string') {
          init = [init];
        }
        this.imageUrls = init.filter(url => url != null).map(url => ({ url, loading: false }));
      },
      getPictureUrl,
      fileChanged(e) {
        // 判断文件是否存在
        const files = e.target.files;

        // 判断是否为图片文件
        const temp = [];
        const legalFiles = [];
        for (let i = 0; i < files.length; i += 1) {
          const f = files[i];
          // 获取文件上传的后缀名
          const splits = f.name.split('.');
          const type = splits[splits.length - 1].toLowerCase();
          if (this.support.indexOf(type) === -1) {
            Message.error(`您这个[${f.name}]上传类型不符合`);
          } else if (f.size >= this.fileSize) {
            Message.error(`您这个[${f.name}]文件太大了`);
          } else {
            temp.push({ loading: true });
            legalFiles.push(f);
          }
        }

        // 上传图片是否超限
        if (this.imageUrls.length + legalFiles.length > this.multiple) {
          Message.error(`只能上传${this.multiple}张图片`);
        } else {
          this.imageUrls = this.imageUrls.concat(temp);
          this.upload(legalFiles);
        }
        e.target.value = '';
      },
      async upload(files) {
        const param = new FormData();
        files.forEach((f) => {
          param.append('fileList', f);
        });

        const res = await this.$http.upload(`${BASE_URL}/publics/file/upload`, param);

        let index = 0;
        this.imageUrls = this.imageUrls.map((image) => {
          if (image.loading) {
            image.url = res.data[index];
            image.loading = false;
            index += 1;
          }
          return image;
        });

        this.notifyImageChanged();
      },
      notifyImageChanged() {
        if (this.onImageChanged) {
          this.onImageChanged(this.getImageUrls());
        }
      },
      getImageUrls() {
        return this.imageUrls.filter(i => !i.loading).map(i => i.url);
      },
      showBigImg(url) {
        this.bigImgUrl = this.getPictureUrl(url);
        this.isShowBigImg = true;
      },
      closeBigImg() {
        this.isShowBigImg = false;
      },
    },
    components: {
      'v-big-img': () => import('@/components/img/bigImg'),
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin.scss';

  .imageuploader-container {
    width: auto;
    text-align: center;
  }

  .imageuploader-viewer-container {
    overflow: hidden;
    float: left;
  }

  .imageuploader-viewer-cell {
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

  .imageuploader-viewer-delete {
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

  .imageuploader-viewer-delete-btn {
    position: absolute;
    top: 6px;
    width: 16px;
    right: 4px;
  }

  .imageuploader-viewer-show-big {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    color: #fff;
    text-align: center;
    /*z-index: 999;*/
  }

  .imageuploader-loading {
    margin-top: 43%;
  }

  .imageuploader-viewer-cell img {
    max-width: 100%;
    vertical-align: middle;
  }

  .title {
    line-height: 75px;
  }

  .imageuploader-file-input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
    cursor: pointer;
  }

  .imageuploader-backgroud-container {
    display: inline;
    float: left;
  }

  .imageuploader-backgroud-shower {
    border: 1px solid #e6e3e3;
    border-radius: 4px;
    cursor: pointer;
    color: #d0cbcb;
    position: relative;
  }

  .imageuploader-backgroud-container img {
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
