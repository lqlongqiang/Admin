<template>
  <div>
    <div class="navigation">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <i class="el-icon-menu" style="font-size: 24px;" @click="Passvalue"></i>
        <el-breadcrumb-item :to="{ path: '/Homepage' }">
          <span class="homeTitle">首页</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      flag: true //控制侧边栏显示隐藏
    };
  },
  methods: {
    //传值给Content组件 子传父
    Passvalue() {
      if (this.flag === false) {
        this.flag = true;
        this.$emit("Flag", this.flag);
      } else {
        this.flag = false;
        this.$emit("Flag", this.flag);
      }
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.homeTitle {
  font-size: 14px;
  padding-left: 5px;
  color: #888888;
}
</style>
