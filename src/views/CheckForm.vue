<template>
  <div id="CheckForm">
    <div class="bill">
      <el-card class="box__card">
        <div slot="header" class="clearfix">
          <span class="box_header">账单详情</span>
        </div>
        <div class="success_message">
          <div class="Payment_spans">付款账户：{{ Accountname }}</div>
          <div class="Payment_spans">收款账户：{{ Receivables }}</div>
          <div class="Payment_spans">收款人姓名：{{ Paymentname }}</div>
          <div class="Payment_spans"
            >收款金额:
            <span class="Payment_money">{{ PaymentAmount.slice(2) }}</span
            >元
          </div>
        </div>
        <div class="operation">
          <el-button
            type="primary"
            size="small"
            style="margin-right: 10px"
            plain
            @click="BackHome"
            >返回首页</el-button
          >
          <!-- <a class="orderBtn1 sIRicon2" href="/Login" target="view_window">-->
          <el-button plain size="small" type="success" @click="printBtn()"
            >打印账单</el-button
          ><!--</a
            >-->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
    import Bus from "../bus/bus.js"
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      Accountname: "", //接受账单页面传过来的付款人账户名
      Receivables: "", //接受账单页面传过来的收款人账户名
      Paymentname: "", //接受账单页面传过来的收款人姓名
      PaymentAmount: "", //接受账单页面传过来的付款金额
      flag: false //控制显示的打印文件
    };
  },
  methods: {
    //返回首页
    BackHome() {
      this.$router.push({
        path: "/Homepage"
      });
    },
    //连接打印机
    printBtn() {
      let newstr = document.getElementsByClassName("success_message")[0].innerHTML;
      window.document.body.innerHTML = newstr;
      let oldstr = window.document.body.innerHTML;
      window.print();
      window.location.reload(); //解决打印之后按钮失效的问题
      window.document.body.innerHTML = oldstr;
      return false;
    }
  },
  mounted() {
    this.Accountname = this.$route.params.Accountname;
    this.Receivables = this.$route.params.Receivables;
    this.Paymentname = this.$route.params.Paymentname;
    this.PaymentAmount = this.$route.params.PaymentAmount;
      console.log(this.$route.params);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#CheckForm {
  background-color: #f0f2f5;
  width: 1600px;
  height: 788px;
  position: relative;
}
.bill {
  position: absolute;
  left: 600px;
  top: 244px;
}
.box__card {
  height: 300px;
  width: 400px;
}
.box_header {
  color: #666666;
  font-size: 16px;
}
.success_message {
  margin-top: 5px;
  width: 360px;
  height: 140px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 5px;
}
.Payment_spans {
  color: #666666;
  font-size: 16px;
}
.Payment_money {
  font-size: 18px;
  font-weight: 600;
  color: #444444;
}
.operation {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
