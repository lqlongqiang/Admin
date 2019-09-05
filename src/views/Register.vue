<template>
  <div id="Register">
    <div id="Register_Page">
      <div class="Backstage">
        <img src="../assets/img/7.png" alt="" class="Backstage_icon" />
        <div class="Backstage_title">小猪后台管理系统</div>
      </div>
      <div class="register">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="用户名"
            prop="name"
            label-width="100px"
            :hide-required-asterisk="flag"
            :required="flag"
          >
            <el-input
              v-model="ruleForm.name"
              style="width: 220px"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="pass"
            label-width="100px"
            :hide-required-asterisk="flag"
            :required="flag"
          >
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              style="width: 220px"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电话"
            prop="phone"
            label-width="100px"
            :hide-required-asterisk="flag"
            :rules="[
              { required: true, message: '请填写手机号' },
              { type: 'number', message: '手机号必须为数字值' }
            ]"
          >
            <el-input
              type="phone"
              v-model.number="ruleForm.phone"
              style="width: 220px;"
              placeholder="请输入电话"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="mailbox"
            label-width="100px"
            :hide-required-asterisk="flag"
            :rules="[{ required: true, message: '请填写邮箱' }]"
          >
            <el-input
              v-model="ruleForm.mailbox"
              style="width: 220px;"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="Code"
            label-width="100px"
            :hide-required-asterisk="flag"
            :rules="[{ required: true, message: '验证码不能为空' }]"
            class="label-item"
          >
            <el-input
              v-model="ruleForm.Code"
              style="width: 220px;"
              placeholder="请输入手机验证码"
            ></el-input>
            <el-button
              type="success"
              class="send_code"
              @click="sendCode"
              v-if="Flag === true"
              >发送验证码</el-button
            >
            <el-button type="success" class="send_code" v-else
              >{{ count }} s</el-button
            >
          </el-form-item>
          <div class="login_register">
            <el-button type="primary" @click="Go_Login">前往登录</el-button>
            <el-button type="primary" @click="Register">立即注册</el-button>
          </div>
        </el-form>
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
    //判断用户输入的用户名和密码不能为空
    let checkName = (rule, value, callback) => {
      let regs = "^[a-zA-Z0-9_]{3,16}$";
      let respons = new RegExp(regs);
      let flag = respons.test(value);
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      let timeID = setTimeout(() => {
        if (!flag) {
          callback(new Error("用户名只能由3-16位数字或者字母或者下划线组成"));
        } else {
          callback();
        }
        clearTimeout(timeID);
        timeID = null;
      }, 600);
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      flag: true, //显示输入框上面的星
      Flag: true, //触发定时器
      count: 60, //定时器初始值
      //v-model绑定的用户名，密码，电话，邮箱,验证码
      ruleForm: {
        pass: "",
        name: "",
        phone: "",
        mailbox: "",
        Code: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    //前往登录
    Go_Login() {
      this.$router.push({ path: "/Login" });
    },
    //发送验证码
    sendCode() {
      if (this.ruleForm.phone !== "") {
        if (
          !/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/.test(
            this.ruleForm.phone
          )
        ) {
          this.$message.error(
            "请输入正确的手机号格式,并且手机号码只能由0-9数字组成"
          );
        } else {
          this.$axios
            .req("api/users/sendMsg", {
              phone: this.ruleForm.phone
            })
            .then(respons => {
              console.log(respons);
              if (respons.data.code === 200) {
                this.Flag = false;
                let timer = setInterval(() => {
                  this.count--;
                  if (this.count === 0) {
                    clearInterval(timer);
                    this.Flag = true;
                  }
                }, 1000);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.$message({
          message: "请输入手机号",
          type: "warning"
        });
      }
    },

    //注册账号
    Register() {
      if (
        this.ruleForm.name !== "" &&
        this.ruleForm.pass !== "" &&
        this.ruleForm.phone !== "" &&
        this.ruleForm.mailbox !== "" &&
        this.ruleForm.Code !== ""
      ) {
        this.$axios
          .req("api/users/register", {
            username: this.ruleForm.name,
            password: this.ruleForm.pass,
            phone: this.ruleForm.phone,
            mailbox: this.ruleForm.mailbox,
            code: this.ruleForm.Code
          })
          .then(respons => {
            console.log(respons);
            if (respons.data.code === 200) {
              this.$message({
                message: "恭喜你，注册成功",
                type: "success"
              });
            this.$router.push({ path: "/Login" });
            } else if (respons.data.code === 500) {
              this.$message.error("用户名已存在");
            } else {
              this.$message.error("验证码不正确");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          message: "请填写完整的信息",
          type: "warning"
        });
      }
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
#Register {
  height: 789px;
  width: 100%;
  background: url("../assets/img/2.jpg");
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#Register_Page {
  height: 400px;
  width: 750px;
  opacity: 0.6;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 5px 5px #dcdcdc;
}
.Backstage {
  display: flex;
  width: 300px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 300px;
  border-right: 1px dashed #888888;
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
.register {
  width: 450px;
}
.login_register {
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
}
.label-item {
  position: relative;
}
.send_code {
  width: 100px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 240px;
}
</style>
