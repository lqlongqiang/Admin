<template>
  <div id="FormPage">
    <div class="Remind">
      <div class="Remind_text">
        请填写您的账户信息
      </div>
      <div class="Light_prompt">
        请务必是你本人操作,确认转账人金额及收款人信息
      </div>
    </div>
    <div>
      <el-card class="box-card">
        <div class="Step_bar">
          <el-steps
            :active="active"
            finish-status="success"
            class="Step_style"
            space="default"
          >
            <el-step
              title="填写转账信息"
              :class="{
                activeStyle: active === 1 || active === 2
              }"
            >
            </el-step>
            <el-step
              title="确认转账信息"
              :class="{ activeStyle: active === 2 }"
            ></el-step>
            <el-step
              title="完成"
              :class="{ activeStyle: active === 3 }"
            ></el-step>
          </el-steps>
        </div>
        <div class="bill_message" v-if="active === 0">
          <el-form status-icon label-width="100px" class="demo__ruleForm">
            <el-form-item
              label="付款账户"
              label-width="100px"
              :hide-required-asterisk="true"
              :required="true"
              size="small"
            >
              <el-input style="width: 450px" v-model="Accountname"></el-input>
            </el-form-item>
            <el-form-item
              label="付款账户"
              label-width="100px"
              :hide-required-asterisk="true"
              :required="true"
              size="small"
            >
              <el-input
                class="input-with-select"
                style="width: 450px"
                v-model="Receivables"
              >
                <el-select
                  v-model="select"
                  slot="prepend"
                  placeholder="请选择"
                  style="width: 100px"
                >
                  <el-option label="支付宝" value="1"></el-option>
                  <el-option label="银行卡" value="2"></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <el-form-item
              label="收款人姓名"
              label-width="100px"
              :hide-required-asterisk="true"
              :required="true"
              size="small"
            >
              <el-input
                v-model="Paymentname"
                autocomplete="off"
                style="width: 450px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="付款金额"
              label-width="100px"
              :hide-required-asterisk="true"
              size="small"
              class="label-item"
            >
              <el-input
                style="width: 450px;"
                v-model.number="PaymentAmount"
              ></el-input>
            </el-form-item>

            <div>
              <el-button type="primary" @click="next" size="small"
                >下一步</el-button
              >
            </div>
          </el-form>
        </div>
        <div v-else-if="active === 1" class="confirm">
          <div class="warning_text">
            <el-alert
              title="确认转账后,资金将直接打入对方账户，无法退回"
              type="warning"
              show-icon
            >
            </el-alert>
          </div>
          <div class="Payment_detail">
            <span class="Payment_span">付款账户：{{ Accountname }}</span>
            <span class="Payment_span">收款账户：{{ Receivables }}</span>
            <span class="Payment_span">收款人姓名：{{ Paymentname }}</span>
            <span class="Payment_span"
              >收款金额:
              <span class="Payment_money">{{ PaymentAmount.slice(2) }}</span
              >元
            </span>
          </div>
          <el-divider></el-divider>
          <el-form status-icon label-width="100px" class="demo-ruleForm">
            <el-form-item
              label="支付密码"
              label-width="100px"
              :hide-required-asterisk="true"
              :required="true"
              size="small"
            >
              <el-input
                v-model="Password"
                autocomplete="off"
                style="width: 300px"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>

          <div>
            <el-button type="primary" @click="submit" size="small"
              >提交</el-button
            >
            <el-button plain size="small" @click="Back">上一步</el-button>
          </div>
        </div>
        <div v-else class="success">
          <div class="el-step__icon is-text">
            <i class="el-step__icon-inner is-status el-icon-check"></i>
          </div>
          <span class="success_text">操作成功</span>
          <span class="success_remind">预计两小时到账</span>
          <div class="success_message">
            <span class="Payment_spans">付款账户：{{ Accountname }}</span>
            <span class="Payment_spans">收款账户：{{ Receivables }}</span>
            <span class="Payment_spans">收款人姓名：{{ Paymentname }}</span>
            <span class="Payment_spans"
              >收款金额:
              <span class="Payment_money">{{ PaymentAmount.slice(2) }}</span
              >元
            </span>
          </div>
          <div class="operation">
            <el-button
              type="primary"
              @click="AnotherRound"
              size="small"
              style="margin-right: 10px"
              plain
              >再转一笔</el-button
            >
            <!-- <a class="orderBtn1 sIRicon2" href="/Login" target="view_window">-->
            <el-button plain size="small" @click="CheckBill" type="success"
              >查看账单</el-button
            ><!--</a
            >-->
          </div>
        </div>
      </el-card>
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
      active: 0, //切换初始值
      Accountname: "", //绑定的账户名
      Receivables: "", //收款账户名
      select: "", //绑定的用户选择的支付方式
      Paymentname: "", //绑定的收款人姓名
      PaymentAmount: "¥   ", //绑定的付款金额
      Password: "" //支付密码
    };
  },
  methods: {
    //点击下一步触发的事件
    next() {
      if (
        this.active === 0 &&
        (this.Accountname === "" ||
          this.Receivables === "" ||
          this.select === "" ||
          this.Paymentname === "" ||
          this.PaymentAmount === "")
      ) {
        this.$message({
          message: "亲爱的用户请确认必填的信息是否填写完整",
          type: "warning"
        });
      } else {
        if (this.active++ > 2) this.active = 0;
      }
    },
    //提交按钮触发的事件
    submit() {
      if (this.Password === "") {
        this.$message({
          message: "请输入支付密码",
          type: "warning"
        });
      } else {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        if (this.active++ > 2) this.active = 0;
      }
    },
    //返回到上一步
    Back() {
      this.active = 0;
    },
    //再转一笔
    AnotherRound() {
      this.active = 0;
    },
    //查看账单
    CheckBill() {
      let jump = this.$router.resolve({
        path: "/FormPage/CheckForm",
        query: {
          Accountname: this.Accountname,
          Receivables: this.Receivables,
          Paymentname: this.Paymentname,
          PaymentAmount: this.PaymentAmount
        }
      });
      window.open(jump.href, "_blank");
    }
    /*toMallInfo(){
          this.$router.push({ path: "/Login" });
      }*/
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
.Remind {
  height: 50px;
  background-color: white;
  border-radius: 2px;
  width: 98%;
  margin-left: 2%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.Remind_text {
  padding-left: 20px;
  color: #666666;
  font-size: 16px;
}
.Light_prompt {
  padding-left: 20px;
  color: #c0c2c4;
  font-size: 14px;
}
.box-card {
  width: 98%;
  margin-left: 2%;
  margin-top: 30px;
}
/*.Step_bar {
  display: flex;
  justify-content: center;
}*/
.bill_message {
  margin-top: 40px;
}
.confirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}
.Payment_detail {
  display: flex;
  flex-direction: column;
  width: 600px;
}
.Payment_span {
  color: #666666;
  font-size: 14px;
  padding-top: 10px;
}
.Payment_money {
  font-size: 18px;
  font-weight: 600;
  color: #444444;
}
.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}
.success_text {
  font-size: 16px;
  color: #666666;
  margin-top: 20px;
}
.success_remind {
  font-size: 14px;
  color: #c0c2c4;
}
.success_message {
  margin-top: 5px;
  width: 360px;
  height: 140px;
  background-color: #fafafa;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}
.Payment_spans {
  color: #666666;
  font-size: 16px;
}
.operation {
  margin-top: 20px;
}
</style>
