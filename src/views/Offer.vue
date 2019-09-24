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
          <div class="tab_list">
            <el-table
              ref="multipleTable"
              :data="
                OfferList.slice(
                  (currentPage4 - 1) * SizeChange,
                  currentPage4 * SizeChange
                )
              "
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              :cell-style="Switch(activeIndex)"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <template v-for="(item, index) in ListOfHeader">
                <el-table-column
                  :key="index"
                  :label="item.title"
                  :prop="item.prop"
                  align="center"
                  v-if="item.display === true"
                  show-overflow-tooltip
                >
                </el-table-column>
              </template>
              <el-table-column label="" width="140px">
                <template slot="header">
                  <el-popover
                    placement="bottom-start"
                    width="200"
                    trigger="click"
                    class="icon"
                    v-model="visible"
                  >
                    <div class="Set_up">
                      <div class="Set_up_field">
                        <el-popover
                          placement="left"
                          width="140"
                          trigger="click"
                          v-model="visibles"
                        >
                          <div class="Add_field">
                            <div
                              v-for="item2 in OfferTrue"
                              :key="item2.title"
                              class="add"
                            >
                              <el-checkbox-group v-model="checkList">
                                <el-checkbox :label="item2.title"></el-checkbox>
                              </el-checkbox-group>
                            </div>
                          </div>
                          <el-button
                            type="primary"
                            size="mini"
                            style="margin-left: 80px;margin-top: 10px;"
                            @click="Add"
                            >确定</el-button
                          >
                          <span class="field_add" slot="reference"
                            >添加显示字段</span
                          >
                        </el-popover>
                        <el-popover
                          placement="left"
                          width="140"
                          trigger="click"
                          v-model="visibled"
                        >
                          <div class="delete_field">
                            <div
                              v-for="item2 in OfferFalse"
                              :key="item2.title"
                              class="delete"
                            >
                              <el-checkbox-group v-model="checkListed">
                                <el-checkbox :label="item2.title"></el-checkbox>
                              </el-checkbox-group>
                            </div>
                          </div>
                          <el-button
                            type="primary"
                            size="mini"
                            style="margin-left: 80px;margin-top: 10px;"
                            @click="Delete"
                            >删除</el-button
                          >
                          <span class="field_delete" slot="reference"
                            >删除显示字段</span
                          >
                        </el-popover>
                      </div>
                      <div class="Type_selection">
                        <div class="selection">选择间距类型</div>
                        <div class="Type">
                          <div
                            v-for="(item, index) in Typelist"
                            :key="item.type"
                            :class="{ active: activeIndex === index }"
                            @click="TypeSelection(index)"
                          >
                            {{ item.type }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <i class="el-icon-setting" slot="reference"></i>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="OfferList.length"
              style="margin-top: 20px;"
            >
            </el-pagination>
          </div>
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
      visible: false, //显示隐藏弹出框
      visibles: false, //添加显示隐藏弹出框
      visibled: false, //删除显示隐藏弹出框
      checkList: [], //确定绑定选择字段的值
      checkListed: [], //删除绑定选择字段的值
      multipleSelection: [], //多选数据
      currentPage4: 1, //分页页数
      SizeChange: 10, //一页10条
      OfferTrue: [], //属性为true的显示
      OfferFalse: [], //  属性为false的显示
      ListOfHeader: [
        {
          title: "姓名",
          prop: "name",
          display: true
        },
        {
          title: "个人邮箱",
          prop: "email",
          display: true
        },
        {
          title: "证件类型",
          prop: "Document",
          display: true
        },
        {
          title: "证件号码",
          prop: "DocumentNumber",
          display: true
        },
        {
          title: "性别",
          prop: "sex",
          display: true
        },
        {
          title: "职位",
          prop: "position",
          display: true
        },
        {
          title: "籍贯",
          prop: "Nativeplace",
          display: true
        },
        {
          title: "qq",
          prop: "QQ",
          display: true
        },
        {
          title: "入职时间",
          prop: "Entrytime",
          display: true
        },
        {
          title: "offer状态",
          prop: "Approvalstatus",
          display: false
        },
        {
          title: "出生日期",
          prop: "birthday",
          display: false
        },
        {
          title: "民族",
          prop: "Famousrace",
          display: false
        },
        {
          title: "电话",
          prop: "tel",
          display: false
        },
        {
          title: "学历",
          prop: "Education",
          display: false
        },
        {
          title: "手机",
          prop: "phone",
          display: false
        },
        {
          title: "工作地点",
          prop: "Workingplace",
          display: false
        },
        {
          title: "部门",
          prop: "department",
          display: false
        },
        {
          title: "婚姻状态",
          prop: "Maritalstatus",
          display: false
        }
      ], //表格头部列表
      Typelist: [{ type: "紧凑" }, { type: "适中" }, { type: "宽松" }], //选择的类型
      OfferList: [], //offer人员数据
      stayCount: 0, //待发数量
      alreadyCount: 0, //已发数量
      acceptCount: 0, //已接受数量
      refuseCount: 0, //已拒绝数量
      entryCount: 0, //已入职数量
      activeIndex: 1 //tab切换默认选择第2个
    };
  },
  methods: {
    //拿offer人员的数据
    getOfferData() {
      this.$axios
        .req("api/Offer")
        .then(respons => {
          //console.log(respons);
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
    },
    //添加删除字段push数组
    AddDelete() {
      this.ListOfHeader.forEach(item => {
        if (item.display === false) {
          this.OfferTrue.push(item);
          //console.log(this.OfferTrue);
        } else {
          this.OfferFalse.push(item);
          //console.log(this.OfferFalse);
        }
      });
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //切换间距类型
    Switch(data) {
      if (data === 0) {
        return { padding: "2px" };
      } else if (data === 2) {
        return { height: "80px" };
      }
    },
    //点击事件Tab切换
    TypeSelection(index) {
      this.activeIndex = index;
    },
    //分页内容
    handleSizeChange(val) {
      this.SizeChange = val;
      //console.log(`每页 ${val} 条`);
    },
    //分页内容
    handleCurrentChange(val) {
      this.currentPage4 = val;
      //console.log(`当前页: ${val}`);
    },
    //添加字段
    Add() {
      //console.log(this.checkList);
      this.ListOfHeader.forEach(item => {
        if (this.checkList.includes(item.title)) {
          item.display = true;
        }
      });
      this.OfferTrue.forEach(item => {
        if (this.checkList.includes(item.title)) {
          this.OfferFalse.push(item);
        }
      });
      this.OfferTrue = this.OfferTrue.filter(item => {
        return !this.checkList.includes(item.title);
      });
      this.visible = false;
      this.visibled = false;
      this.visibles = false;
    },
    //删除字段
    Delete() {
      //console.log(this.checkListed);
      this.ListOfHeader.forEach(item => {
        if (this.checkListed.includes(item.title)) {
          item.display = false;
        }
      });
      this.OfferFalse.forEach(item => {
        if (this.checkListed.includes(item.title)) {
          this.OfferTrue.push(item);
        }
      });
      this.OfferFalse = this.OfferFalse.filter(item => {
        return !this.checkListed.includes(item.title);
      });
      this.visible = false;
      this.visibles = false;
      this.visibled = false;
    }
  },
  mounted() {
    this.getOfferData();
    this.AddDelete();
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
  height: 40px;
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
.tab_list {
  position: relative;
}
.icon {
  position: absolute;
  top: -10px;
  right: 40px;
  color: #409eff;
}
.Set_up {
}
.Set_up_field {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
  height: 36px;
  align-items: center;
}
.field_add {
  font-size: 12px;
  color: #409eff;
}
.field_delete {
  font-size: 12px;
  color: #409eff;
}
.Type_selection {
}
.selection {
  font-size: 14px;
  color: #888888;
  padding: 10px 0;
}
.active {
  color: #409eff;
}
.Type {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.add {
  padding: 2px;
}
.delete {
  padding: 2px;
}
</style>
