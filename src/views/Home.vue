<template>
  <div id="Home">
    <button @click="Go">123</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    Go() {
      this.$router.push({ path: "/Login" });
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
#Home {

}
</style>
