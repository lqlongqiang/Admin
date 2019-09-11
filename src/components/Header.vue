<template>
  <div id="Header">
    <div class="Header_page">
      <div class="Header_title">小猪后台管理系统</div>
      <div class="Header_apply">
        <img src="../assets/img/8.png" alt="" class="language" />
        <img
          src="../assets/img/9.png"
          alt=""
          v-if="flag === false"
          class="Headportrait"
        />
        <el-dropdown
          trigger="click"
          placement="bottom-start"
          @command="handleCommand"
        >
          <div class="usersapply">
            <span class="username">亲爱的{{ user.username }}</span>
            <img src="../assets/img/11.png" alt="" class="subscript" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                class="avatar-uploader"
              >
                上传头像
              </el-upload>
            </el-dropdown-item>
            <el-dropdown-item command="2">修改密码</el-dropdown-item>
            <el-dropdown-item command="3">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dialog
          :visible.sync="dialogFormVisible"
          width="500px"
          style="height: 500px"
          title="提示"
          :modal-append-to-body ="false"
          class="modifyPassword"
        >
          <el-form>
            <el-form-item
              label="请输入原密码"
              :label-width="formLabelWidth"
              style="margin-left: -20px;"
              :hide-required-asterisk="true"
              :required="true"
            >
              <el-input
                v-model="oldPassword"
                autocomplete="off"
                size="small"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="请输入新密码"
              :label-width="formLabelWidth"
              style="margin-left: -20px;"
              :hide-required-asterisk="true"
              :required="true"
            >
              <el-input
                v-model="newPassword"
                autocomplete="off"
                size="small"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="请确认新密码"
              :label-width="formLabelWidth"
              style="margin-left: -20px;"
              :hide-required-asterisk="true"
              :required="true"
            >
              <el-input
                type="password"
                v-model="surenewPassword"
                autocomplete="off"
                size="small"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="Modify" size="small"
              >确定修改</el-button
            >
            <el-button @click="Cancel">取 消</el-button>
          </div>
        </el-dialog>
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
      user: "", //拿用户数据
      flag: false, //  判断有没有头像
      oldPassword: "", //修改密码旧密码v-model绑定的值
      newPassword: "", //修改密码新密码v-model绑定的值
      surenewPassword: "", //确认修改密码新密码v-model绑定的值
      formLabelWidth: "120px", //修改密码输入框长度
      dialogFormVisible: false //控制显示隐藏修改密码
    };
  },
  methods: {
    //下来用户菜单触发的事件
    handleCommand(command) {
      if (command === "1") {
        console.log(command);
      } else if (command === "2") {
        this.dialogFormVisible = true;
      } else {
        this.$confirm("亲爱的用户确定退出小猪后台管理系统吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "退出成功!"
            });
            localStorage.removeItem("users");
            this.$router.push({ path: "/Login" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消退出成功"
            });
          });
      }
    },
    //修改密码确认
    Modify() {
      if (
        this.oldPassword !== "" &&
        this.newPassword !== "" &&
        this.surenewPassword !== ""
      ) {
        if (this.newPassword !== this.surenewPassword) {
          this.$message({
            type: "warning",
            message: "新密码必须一致"
          });
        } else {
          this.$axios
            .req("api/users/updatePwd", {
              username: this.user.username,
              password: this.oldPassword,
              id: this.user._id,
              newPwd: this.newPassword
            })
            .then(respons => {
              //console.log(respons);
              if (respons.data.code === 1) {
                this.$message({
                  type: "error",
                  message: respons.data.msg
                });
              } else if (respons.data.code === 500){
                this.$message({
                  type: "error",
                  message: respons.data.msg
                })
              } else  {
                this.$message({
                  type: "success",
                  message: respons.data.msg
                })
                this.dialogFormVisible = false;
                this.oldPassword = "";
                this.newPassword = "";
                this.surenewPassword = "";
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请完善信息"
        });
      }
    },
    //修改密码取消
    Cancel() {
      this.dialogFormVisible = false;
      this.$message({
        type: "info",
        message: "取消修改成功"
      });
      this.oldPassword = "";
      this.newPassword = "";
      this.surenewPassword = "";
    }
  },
  mounted() {
    //判断登录和里面有无默认头像
    if (JSON.parse(localStorage.getItem("users"))) {
      this.user = JSON.parse(localStorage.getItem("users"));
      //console.log(this.user);
      if (!this.user.Headportrait) {
        this.flag = false;
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
  padding: 0 20px;
}
.Headportrait {
  width: 26px;
  height: 26px;
}
.username {
  font-size: 14px;
  color: #666666;
  padding: 0 5px;
}
.usersapply {
  display: flex;
  align-items: center;
}
.avatar-uploader {
  height: 36px;
}
</style>
