<template>
  <div id="Aside">
    <div class="Navigation">
      <el-row class="tac" style="width: 200px;">
        <el-col :span="12" style="width: 200px;">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            background-color="#ffffff"
            text-color="#aaaaaa"
            active-text-color="#409EFF"
            style="width: 140px;"
          >
            <el-menu-item
              v-for="(item, index) in NavigationBan"
              :key="item.title"
              :index="index.toString()"

            >
              <i :class="item.icon" ></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
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
      NavigationBan: [
        {
          title: "首页",
          icon: "el-icon-house",
          name: "homepage"
        },
        {
          title: "日程管理",
          icon: "el-icon-date",
          name: "tasks"
        },
        {
          title: "通讯录",
          icon: "el-icon-document",
          name: "mailList"
        },
        {
          title: "组织员工",
          icon: "el-icon-user",
          name: "employees"
        },
        {
          title: "表单页",
          icon: "el-icon-files",
          name: "formPage"
        }
      ]
    };
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

<style scoped lang="scss">
</style>
