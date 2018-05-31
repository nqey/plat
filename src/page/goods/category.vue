<template>
  <div class="content">
    <div class="content_con">
      <v-tree></v-tree>
    </div>
  </div>
</template>

<script>
import tree from '@/components/tree';

export default {
  name: 'categoryMng',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  computed: {
  },
  methods: {
  },
  watch: {
  },
  components: {
    'v-tree': tree,
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
@import '../../assets/css/mixin.scss';

</style>