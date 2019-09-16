<template>
  <div id="Content">
    <router-view
      v-if="$route.path === '/Login' || $route.path === '/Register' || $route.path === '/FormPage/CheckForm'"
    ></router-view>
    <el-container style="height: 2000px;" v-else>
      <el-header style="padding: 0;height: 40px;" class=""
        ><Header></Header
      ></el-header>
      <el-container>
        <el-aside width="200px" v-if="Flag === true"
          ><Aside :flag="Flag"></Aside
        ></el-aside>
        <el-aside width="100px" v-else><Aside :flag="Flag"></Aside></el-aside>
        <el-main class="el_-_main">
          <Navigation @Flag="getData"></Navigation>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Aside from "../../components/Aside";
import Navigation from "../../components/Crumbnavigation";
export default {
  name: "",
  components: {
    Header,
    Aside,
    Navigation
  },
  props: {},
  data() {
    return {
      Flag: true //接受Home组件传过来的值
    };
  },
  methods: {
    //通过事件接受Home组件传过来的值
    getData(data) {
      this.Flag = data;
      //console.log(this.Flag);
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

<style scoped>
.el_-_main {
  background-color: #f0f2f5;
}
</style>
