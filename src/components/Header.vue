<template>
  <div id="Header">
    <div class="Header_page">
      <div class="Header_title">小猪后台管理系统</div>
      <div class="Header_apply">
        <img src="../assets/img/8.png" alt="" class="language" />
        <img src="../assets/img/9.png" alt="" v-if="flag ===false" class="Headportrait"/>
          <span>亲爱的{{user.username}}</span>
      </div>
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
      user: "" ,//拿用户数据
      flag:false,//  判断有没有头像
    };
  },
  methods: {},
  mounted() {
    if (JSON.parse(localStorage.getItem("users"))) {
      this.user = JSON.parse(localStorage.getItem("users"));
      console.log(this.user);
      if (!this.user.Headportrait) {
          this.flag = false
      }
    }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#Header {
  height: 40px;
  width: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 1000;
}
.Header_page {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}
.Header_title {
  color: #1296db;
  font-size: 18px;
  font-weight: 700;
}
.Header_apply {
    display: flex;
    align-items: center;
}
.language {
  width: 20px;
  height: 20px;
}
.Headportrait {
    width: 26px;
    height: 26px;
}

</style>
