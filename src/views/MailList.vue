<template>
  <div>
    <div class="Tree_form">
      <el-tree
        class="filter-tree"
        :data="data.distribution"
        ref="tree"
        :indent="indent"
        @current-change="Selection"
        :highlight-current="true"
      >
      </el-tree>
      <div class="MailList">
        <div v-for="item in MailList" :key="item.id">
          <div
            class="maillist"
            v-if="
              Selectedarea === item.department || Selectedarea === '区域中心'
            "
          >
            <div class="Mail_Data">
              <div
                class="Mail_name"
                :style="{ backgroundColor: item.Headcolor }"
              >
                <span>{{ item.name }}</span>
              </div>
              <div class="mail_datas">
                <span class="mail_name">{{ item.name }}</span>
                <span class="mail_post"
                  >{{ item.department }} / {{ item.position }}</span
                >
                <div v-if="item.tag.length === 0" class="mail_tags">
                  <i class="el-icon-circle-plus-outline"></i>
                  快来给我添加第一个标签吧
                </div>
                <div v-else>
                  <span
                    v-for="(item1, index1) in item.tag"
                    :key="index1"
                    :style="{ backgroundColor: item1.colortext }"
                    class="mail_tag"
                  >
                    {{ item1.text }}
                  </span>
                </div>
              </div>
            </div>
            <div class="Mail_Contact">
              <span>邮箱: {{ item.email }}</span>
              <span>办公电话: {{ item.tel }}</span>
              <span>手机号码: {{ item.phone }}</span>
              <span>性别: {{ item.sex }}</span>
              <span>QQ: {{ item.QQ }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import department from "../http/department";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      MailList: [], //通讯录列表
      data: [], //通讯录数据
      indent: 20, //相隔树件像素大小
      Selectedarea: "区域中心" +
          "" //选中的区域
    };
  },
  methods: {
    //拿通讯录数据
    getMailList() {
      this.$axios
        .req("api/MailList")
        .then(respons => {
          //console.log(respons);
          this.MailList = respons.data.data;
          //console.log(this.MailList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //树形控件自带的选中事件 data为当前选中项数据
    Selection(data) {
      //console.log(data.label);
      //console.log(node);
      //console.log(data.children);
      //console.log(data.children);
      if (!data.children) {
        this.Selectedarea = data.label;
      }
      if (data.label === "区域中心") {
        this.Selectedarea = data.label;
      }
    }
  },
  mounted() {
    this.getMailList();
    //console.log(department.data);
    this.data = department.data;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Tree_form {
  width: 98%;
  margin-left: 2%;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
}
.filter-tree {
  width: 240px;
  border-radius: 2px;
}
.MailList {
  display: flex;
  flex-wrap: wrap;
  width: 1041px;
  margin-left: 20px;
}
.maillist {
  width: 337px;
  height: 241px;
  background-color: white;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  box-shadow: 0px 0px 5px 2px #dcdcdc;
}
.Mail_Data {
  display: flex;
  height: 120px;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
  padding-left: 20px;
}
.Mail_name {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
}
.mail_datas {
  display: flex;
  flex-direction: column;
  height: 70px;
  margin-left: 20px;
  justify-content: space-between;
}
.mail_name {
  font-size: 16px;
  color: #666666;
}
.mail_post {
  font-size: 12px;
  color: #888888;
}
.mail_tag {
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 12px;
  color: white;
  margin-right: 5px;
}
.mail_tags {
  font-size: 12px;
  color: #aaaaaa;
}
.Mail_Contact {
  display: flex;
  flex-direction: column;
  padding: 20px 0 20px 40px;
}
.Mail_Contact span {
  font-size: 12px;
  color: #666666;
}
</style>
