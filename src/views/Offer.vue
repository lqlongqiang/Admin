<template>
  <div id="Offer">
    <div>
      <div class="offer_header">
        <div class="offer_icon_title">
          <img src="../assets/img/offer.png" alt="" />
          <span class="offer_title">offer管理</span>
        </div>
        <div class="offer_button">
          <el-button type="primary" size="small">新建offer</el-button>
          <el-button type="primary" size="small">转移状态</el-button>
          <el-button type="primary" size="small">导出</el-button>
        </div>
      </div>
      <div>
        <el-card class="Box__card">
          <div slot="header" class="clearfix">
            <el-button type="primary" round size="mini"
              >待发offer({{ stayCount }})</el-button
            >
            <el-button type="primary" round size="mini"
              >已发offer({{ alreadyCount }})</el-button
            >
            <el-button type="primary" round size="mini"
              >已接受offer({{ acceptCount }})</el-button
            >
            <el-button type="primary" round size="mini"
              >已拒绝offer({{ refuseCount }})</el-button
            >
            <el-button type="primary" round size="mini"
              >已入职offer({{ entryCount }})</el-button
            >
          </div>
          <div></div>
        </el-card>
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
      OfferList: [], //offer人员数据
      stayCount: 0, //待发数量
      alreadyCount: 0, //已发数量
      acceptCount: 0, //已接受数量
      refuseCount: 0, //已拒绝数量
      entryCount: 0 //已入职数量
    };
  },
  methods: {
    //拿offer人员的数据
    getOfferData() {
      this.$axios
        .req("api/Offer")
        .then(respons => {
          console.log(respons);
          this.OfferList = respons.data.data;
          this.OfferList.forEach(item => {
            if (item.Approvalstatus === "待发") {
              this.stayCount++;
            } else if (item.Approvalstatus === "已发") {
              this.alreadyCount++;
            } else if (item.Approvalstatus === "已接受") {
              this.acceptCount++;
            } else if (item.Approvalstatus === "已拒绝") {
              this.refuseCount++;
            } else {
              this.entryCount++;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getOfferData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.offer_header {
  width: 98%;
  display: flex;
  padding: 20px 0;
  margin-left: 2%;
  justify-content: space-between;
  align-items: center;
}
.offer_icon_title {
  display: flex;
  align-items: center;
}
.offer_title {
  padding-left: 5px;
  color: #333333;
  font-weight: bold;
  font-size: 16px;
}
.Box__card {
  width: 98%;
  margin-left: 2%;
}
</style>
