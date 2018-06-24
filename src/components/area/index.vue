<template>
  <div class='area-container'>
    <select v-show="provinces.length > 0" class='form-control' v-model="province"
            @change=" city = ''; district = ''; notifyAreaChanged()">
      <option value="">请选择省份</option>
      <option v-for="item in provinces" :value="item.code">{{item.text}}</option>
    </select>
    <select v-show="(cityMap[province] || []).length > 0" class='form-control' v-model="city"
            @change=" district = ''; notifyAreaChanged()">
      <option value="">请选择市</option>
      <option v-for="item in (cityMap[province] || [])" :value="item.code">{{item.text}}</option>
    </select>
    <select v-show="(districtMap[city] || []).length > 0" class='form-control' v-model="district"
            @change="notifyAreaChanged">
      <option value="">请选择区/县</option>
      <option v-for="item in (districtMap[city] || [])" :value="item.code">{{item.text}}</option>
    </select>
  </div>
</template>


/**
* @author ： 李银 on 2018年6月19日 14:26:52
*
* 入参：
* code:Boolean   - 是否支持数据行被check选中， 默认为false（不支持）
*
* API:
* getCode        - 获取最终用户选择的区域code
*
* 回调：
* onAreaChanged(code)  - 用户修改了选择项出发此回调，code为最终选择的area code；
**/
<script>
  import { DECLARE_GET_AREA_TREE } from '@/config/env';

  export default {
    name: 'geoArea',
    props: {
      code: {
        type: String,
        default: null,
      },
      onAreaChanged: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        province: '',
        city: '',
        district: '',
        provinces: [],
        cityMap: {},
        districtMap: {},
      };
    },
    watch: {
      code: 'load',
    },
    methods: {
      async init() {
        const res = await this.$http.get(DECLARE_GET_AREA_TREE, {}, { cache: true });
        if (res.success) {
          // 获取省级数据
          const provinces = [];
          // key = provinceId
          const cityMap = {};
          // key = cityid
          const districtMap = {};
          res.data.forEach((p) => {
            provinces.push({ code: p.code, text: p.text });

            cityMap[p.code] = [];
            (p.nodes || []).forEach((c) => {
              cityMap[p.code].push({ code: c.code, text: c.text });

              districtMap[c.code] = [];
              (c.nodes || []).forEach((d) => {
                districtMap[c.code].push({ code: d.code, text: d.text });
              });
            });
          });

          this.provinces = provinces;
          this.cityMap = cityMap;
          this.districtMap = districtMap;

          delete res.data;

          this.load();
        }
      },
      // 通知选择项改变
      notifyAreaChanged() {
        if (this.onAreaChanged) {
          this.onAreaChanged(this.getCode());
        }
      },
      getCode() {
        return this.district || this.city || this.province;
      },
      load() {
        if (this.code && this.code.length === 6) {
          const provinceCode = `${this.code.substr(0, 2)}0000`;
          const cityCode = `${this.code.substr(0, 4)}00`;
          const districtCode = this.code;

          // 初始化省份 通过code获取到实际的code；
          const province = this.provinces.filter(p => p.code === provinceCode).map(p => p.code)[0] || '';
          const city = (this.cityMap[province] || []).filter(c => c.code === cityCode).map(c => c.code)[0] || '';
          const district = (this.districtMap[city] || []).filter(d => d.code === districtCode).map(d => d.code)[0] || '';

          if (province !== this.province) {
            this.province = province;
          }

          if (city !== this.city) {
            this.city = city;
          }

          if (district !== this.district) {
            this.district = district;
          }
          return true;
        }
        this.province = '';
        this.city = '';
        this.district = '';
        return true;
      },
    },
    mounted() {
      this.init();
    },
  };
</script>

<style lang='scss' scoped>
  @import '../../assets/css/mixin.scss';

  .iw {
    width: 300px;
  }

  .mt {
    margin-top: 30px;
  }
  .area-container{ 
    display: inline;
  }
  .area-container select {
    width: inherit;
    display: inline;
  }
</style>
