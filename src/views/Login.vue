<template>
  <div id="Login">
    <div id="Login_Page">
      <div class="Backstage">
        <img src="../assets/img/7.png" alt="" class="Backstage_icon" />
        <div class="Backstage_title">小猪后台管理系统</div>
      </div>
      <div class="login" v-if="Flag === true">
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
              style="width: 300px"
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
              style="width: 140px"
              placeholder="请输入密码"
            ></el-input>
            <el-button
              type="success"
              class="password_button"
              @click="Forgetpassword"
              >忘记密码</el-button
            >
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="inputCode"
            label-width="100px"
            :hide-required-asterisk="flag"
            :rules="[{ required: true, message: '验证码不能为空' }]"
            class="label-item"
          >
            <el-input
              v-model="ruleForm.inputCode"
              style="width: 140px;"
              placeholder="请输入验证码"
            ></el-input>
            <div v-html="Code" class="Captcha" @click="switchCaptcha"></div>
          </el-form-item>

          <div class="login_register">
            <el-button type="primary" @click="Login">立即登录</el-button>
            <el-button type="primary" @click="Go_Register">立即注册</el-button>
          </div>
        </el-form>
      </div>
      <div class="login" v-else>
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
            prop="names"
            label-width="100px"
            :hide-required-asterisk="flag"
            :rules="[{ required: true, message: '用户名不能为空' }]"
          >
            <el-input
              v-model="ruleForm.names"
              style="width: 300px"
              placeholder="请输入注册时用的用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="mailbox"
            label-width="100px"
            :hide-required-asterisk="flag"
            :rules="[{ required: true, message: '邮箱不能为空' }]"
          >
            <el-input
              v-model="ruleForm.mailbox"
              style="width: 300px"
              placeholder="请输入注册时用的邮箱"
            ></el-input>
          </el-form-item>
          <div class="login_register">
            <el-button type="primary" @click="Go_login">前往登录</el-button>
            <el-button type="primary" @click="ForgotPassword"
              >找回密码</el-button
            >
          </div>
        </el-form>
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
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      flag: true, //显示输入框上面的星
      Flag: true, //显示隐藏忘记密码页面
      //v-model绑定的用户输入的用户名 密码 验证码 邮箱
      ruleForm: {
        pass: "",
        name: "",
        inputCode: "",
        mailbox: "",
        names: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }]
      },
      Code: "" //图形验证码
    };
  },
  methods: {
    //拿图形验证码
    getCaptcha() {
      this.$axios
        .req("api/users/Captcha")
        .then(respons => {
          //console.log(respons);
          this.Code = respons.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //切换验证码
    switchCaptcha() {
      this.getCaptcha();
    },
    //忘记密码
    Forgetpassword() {
      this.Flag = false;
      this.ruleForm.names = "";
      this.ruleForm.mailbox = "";
    },
    //忘记密码去登录
    Go_login() {
      this.Flag = true;
      this.ruleForm.name = "";
      this.ruleForm.pass = "";
      this.ruleForm.inputCode = "";
    },
    //登录
    Login() {
      if (
        this.ruleForm.name !== "" &&
        this.ruleForm.pass !== "" &&
        this.ruleForm.inputCode !== ""
      ) {
        this.$axios
          .req("api/users/login", {
            username: this.ruleForm.name,
            password: this.ruleForm.pass,
            captcha: this.ruleForm.inputCode
          })
          .then(respons => {
            //console.log(respons);
            let users = respons.data.data;
            if (respons.data.code === 200) {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              localStorage.setItem("users", JSON.stringify(users));
              this.$router.push({ path: "/" });
            } else if (respons.data.code === 500) {
              this.$message.error(respons.data.msg);
            } else {
              this.$message.error(respons.data.msg);
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
    },
    //跳转注册页面
    Go_Register() {
      this.$router.push({ path: "/Register" });
    },
    //找回密码请求
    ForgotPassword() {
      if (this.ruleForm.names !== "" && this.ruleForm.mailbox !== "") {
        this.$axios
          .req("api/users/RetrievePassword", {
            username: this.ruleForm.names,
            mailbox: this.ruleForm.mailbox
          })
          .then(respons => {
            console.log(respons);
            if (respons.data.code === 200) {
              this.$message({
                message: "发送成功",
                type: "success"
              });
            } else {
              this.$message.error("请填写正确的注册时的用户名或邮箱");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.getCaptcha();
  },
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
.login {
  width: 450px;
}
.label-item {
  position: relative;
}
.Captcha {
  position: absolute;
  top: 0;
  left: 180px;
}
.password_button {
  margin-left: 40px;
}
.login_register {
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
}
</style>
