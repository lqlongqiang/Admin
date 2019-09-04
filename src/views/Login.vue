<template>
  <div id="Login">
    <div id="Login_Page">
      <div class="Backstage">
        <img src="../assets/img/7.png" alt="" class="Backstage_icon" />
        <div class="Backstage_title">小猪后台管理系统</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
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

<style scoped lang="scss">
#Login {
  height: 789px;
  width: 100%;
  background: url("../assets/img/2.jpg");
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#Login_Page {
  height: 400px;
  width: 800px;
  opacity: 0.3;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.Backstage {
  display: flex;
  width: 300px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
    height: 300px;
    border-right:1px dashed #888888 ;
}
.Backstage_icon {
  margin-bottom: 20px;
}
.Backstage_title {
  color: black;
  font-weight: 700;
  font-size: 18px;
  margin-top: 20px;
}
</style>
