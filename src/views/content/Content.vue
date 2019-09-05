<template>
  <div id="Content">
    <router-view
      v-if="$route.path === '/Login' || $route.path === '/Register'"
    ></router-view>
    <el-container style="height: 2000px;" v-else>
      <el-header style="padding: 0;height: 40px;" class=""><Header></Header></el-header>
      <el-container>
        <el-aside width="140px">aside</el-aside>
        <el-main class="el_-_main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Header from "../../components/Header"
export default {
  name: "",
  components: {
    Header
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped>
.el_-_main {
  background-color: #F0F2F5;
}
</style>
