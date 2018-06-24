<template>
  <div>
    <v-big-img v-if="isShowBigImg" :imgSrc="getPictureUrl(imgSrc)" @hideBigImg="closeBigImg"></v-big-img>
    <div class="imgW" :style="{ width: `${width}px`, height: `${height}px`}">
      <img :src="getPictureUrl(imgSrc, {q : quality, w: width, h: height})" @click="showBigImg"/>
      <span class="glyphicon glyphicon-resize-full" @click="showBigImg"></span>
    </div>
  </div>
</template>

/**
* @author ： 李银 on 2018年6月21日 22:40:14
*
* 入参：
* imgSrc:String       - 图片源地址
* width:Number        - 图片显示宽度，默认200px
* height:Number       - 图片显示高度，默认200px
* quality:Number      - 小图显示的质量，默认50（即原图50%的压缩质量）
**/
<script>
  import { getPictureUrl } from '@/config/utils';
  import vBigImg from '@/components/img/bigImg';

  export default {
    name: 'mimg',
    props: {
      imgSrc: {
        type: String,
        default: '',
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
    },
    data() {
      return {
        isShowBigImg: false,
      };
    },
    components: {
      'v-big-img': vBigImg,
    },
    methods: {
      getPictureUrl,
      showBigImg() {
        this.isShowBigImg = true;
      },
      closeBigImg() {
        this.isShowBigImg = false;
      },
    },
  };

</script>
<style lang="scss" scoped>
  .imgW {
    width: 200px;
    position: relative;
    border: 1px solid #e6e3e3;
    cursor: pointer;

    img {
      max-width: 100%;
    }

    span {
      position: absolute;
      bottom: 0;
      right: 0;
      top: inherit;
      left: inherit;
      background: rgba(100, 106, 127, 0.8);
      line-height: 18px;
      color: white;
      width: 18px;
      height: 18px;
      text-align: center;
    }
  }
</style>
