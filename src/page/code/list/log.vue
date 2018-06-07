<template>
  <div class="content">
    <div class="content_con">
      <section>
    <div class="content_con clearfix">
        <div class="content_con_cen">
            <div class="row clearfix">
                <div class="col-sm-3 pull-right text-center margintop20"><span class="dybb">打印报表</span></div>
                <div class="col-sm-9">
                    <p class="ewm_list_xq">二维码编号:<strong>l3mcm9G_sAm0661n5AiXsQ</strong></p>
                    <p class="ewm_list_xq">二维码类型:<strong>图像一物一码</strong></p>
                    <p class="ewm_list_xq">商品名称:<strong>━(*｀∀´*)ノ亻! </strong></p>
                    <p class="ewm_list_xq">企业名称:<strong>李银测试使用诸城市碧龙春茶业有限公司</strong></p>
                    <p class="ewm_list_xq">附码工厂:<strong>碧龙春赋码工厂</strong></p>
                    <p class="ewm_list_xq">生产时间:<strong></strong></p>
                    <p class="ewm_list_xq">经销商名称:<strong>无</strong></p>
                    <p class="ewm_list_xq">扫码次数:<strong>0</strong></p>
                    <p class="ewm_list_xq">当前状态:<strong>正常</strong></p>
                    <p class="ewm_list_xq">被扫描轨迹:</p>
                    <table class="table table_ewmxq">
                        <thead>
                        <tr>
                            <th>扫描时间</th>
                            <th>扫描位置</th>
                            <th>操作事件</th>
                            <th>扫描设备号</th>
                            <th>状态</th>
                            <th>扫描角色</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="text-center">
            <a class="btn btn-primary" href="javascript:history.back(-1);">返回上一页<span class="glyphicon glyphicon-share-alt"></span></a>
        </div>
    </div>
</section>
    </div>
  </div>
</template>

<script>

export default {
  name: 'log',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      lists: [],
    };
  },
  computed: {
  },
  methods: {
  },
  watch: {
  },
  components: {
  },
  beforeCreate() {
  },
  cteated() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.ewm_list_xq {
  padding: 5px 0;
}
.ewm_list_xq strong {
  padding-left: 10px;
}
.dybb {
  background: #EAF4FE;
  color: #4063FF;
  padding: 8px 25px;
  cursor: pointer;
}
.margintop20 {
  margin-top: 20px;
}
.table_ewmxq {
  border: 1px solid #ddd;
}
</style>