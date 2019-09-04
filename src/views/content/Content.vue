<template>
  <div id="Content">
    <router-view
      v-if="$route.path === '/Login' || $route.path === '/Register'"
    ></router-view>
    <el-container style="height: 2000px;" v-else>
      <el-header style="padding: 0;height: 50px;">header</el-header>
      <el-container>
        <el-aside width="140px">aside</el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Content"
};
</script>

<style scoped>

#Content {

}
</style>
