<template>
  <div id="Personnel">
    <div>
      <div class="Personnel_header">
        <div class="Personnel_icon_title">
          <img
            src="../assets/img/Personnel.png"
            alt=""
            class="Personnel_icon"
          />
          <span class="Personnel_title">人员信息</span>
        </div>
        <div class="Personnel_button">
          <el-button
            type="primary"
            size="small"
            v-if="flag === false"
            @click="Application"
            >批量转正申请</el-button
          >
          <el-button
            type="primary"
            size="small"
            v-if="flag === true"
            @click="confirm"
            >确认</el-button
          >
          <el-button
            type="primary"
            size="small"
            v-if="flag === true"
            @click="cancel"
            >取消</el-button
          >
          <el-button type="primary" size="small">导出</el-button>
        </div>
      </div>
      <div class="Tab_display">
        <div
          v-for="(item, index) in buttonList"
          :key="item.title"
          class="button_list"
        >
          <el-button
            type="primary"
            size="mini"
            round
            v-if="activeIndex === index"
            @click="TabButton(index)"
            >{{ item.title }}</el-button
          >
          <el-button
            type="primary"
            size="mini"
            round
            v-else
            @click="TabButton(index)"
            plain
            >{{ item.title }}</el-button
          >
        </div>
      </div>
      <div>
        <el-card class="Box__card">
          <div class="tab_list">
            <el-table
              ref="multipleTable"
              :data="
                switchTab.slice(
                  (currentPage4 - 1) * SizeChange,
                  currentPage4 * SizeChange
                )
              "
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <template v-for="(item, index) in ListOfHeader">
                <el-table-column
                  :key="index"
                  :label="item.title"
                  :prop="item.prop"
                  align="center"
                  show-overflow-tooltip
                  v-if="
                    item.title === '工号' ||
                      item.title === '试用期开始日期' ||
                      item.title === '试用期结束日期'
                  "
                  sortable
                >
                </el-table-column>
                <el-table-column
                  :key="index"
                  :label="item.title"
                  :prop="item.prop"
                  align="center"
                  show-overflow-tooltip
                  v-else
                >
                </el-table-column>
              </template>
              <el-table-column label="操作" align="center">
                <el-button type="primary" size="small">编辑试用期</el-button>
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
              :total="switchTab.length"
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
      flag: false, //判断显示批量转正的按钮
      Flag: false, //判断是否是批量转正
      PersonnelLsit: [], //人员信息数据
      multipleSelection: [], //多选数据
      ListOfHeader: [
        {
          title: "姓名",
          prop: "name"
        },
        {
          title: "工号",
          prop: "Jobnumber"
        },
        {
          title: "机构",
          prop: "mechanism"
        },
        {
          title: "部门",
          prop: "department"
        },
        {
          title: "试用期开始日期",
          prop: "startTime"
        },
        {
          title: "试用期结束日期",
          prop: "endTime"
        },
        {
          title: "转正审批状态",
          prop: "Approvalstatus"
        }
      ], //表格头部列表
      buttonList: [
        { title: "全部员工" },
        {
          title: "考核中员工"
        },
        {
          title: "已转正员工"
        }
      ], //按钮循环数据
      currentPage4: 1, //分页页数
      SizeChange: 10, //一页10条
      activeIndex: 0 //tab切换默认选择第1个
    };
  },
  methods: {
    //拿人员信息模拟数据
    getPersonnelData() {
      this.$axios
        .req("api/Personnel")
        .then(respons => {
          //console.log(respons);
          this.PersonnelLsit = respons.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //tab切换按钮
    TabButton(index) {
      this.activeIndex = index;
    },
    //多选数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    // 批量转正
    Application() {
      this.flag = true;
      this.Flag = true;
    },
    //确认转正
    confirm() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择至少一条数据",
          type: "warning"
        });
      } else {
        //console.log(this.multipleSelection);
        this.PersonnelLsit.forEach(item => {
          if (this.multipleSelection.includes(item)) {
            item.Approvalstatus = "审批通过";
            this.$message({
              message: "操作成功",
              type: "success"
            });
          }
        });
        /* this.PersonnelLsit.forEach(item => {
          if (this.multipleSelection.includes(item)) {
            item.Approvalstatus = "审核通过";
          }
        });*/
        this.Flag = false;
        this.flag = false;
        this.activeIndex = 0;
      }
      //console.log(this.multipleSelection);
    },
    //取消转正
    cancel() {
      this.$message({
        message: "取消操作成功",
        type: "info"
      });
      this.Flag = false;
      this.flag = false;
      this.activeIndex = 0;
    }
  },
  mounted() {
    this.getPersonnelData();
  },
  created() {},
  filters: {},
  computed: {
    //计算属性判断是点击的左边的3个按钮还是批量转正
    switchTab() {
      if (this.activeIndex === 0 && this.Flag === false) {
        return this.PersonnelLsit;
      } else if (this.activeIndex === 1 && this.Flag === false) {
        let Examination = [];
        this.PersonnelLsit.forEach(item => {
          if (item.Approvalstatus === "审批中") {
            Examination.push(item);
          }
        });
        return Examination;
      } else if (this.activeIndex === 2 && this.Flag === false) {
        let Examinationpass = [];
        this.PersonnelLsit.forEach(item => {
          if (item.Approvalstatus === "审批通过") {
            Examinationpass.push(item);
          }
        });
        return Examinationpass;
      } else {
        let correction = [];
        this.PersonnelLsit.forEach(item => {
          if (
            item.Approvalstatus === "审批未通过" ||
            item.Approvalstatus === "审批中"
          ) {
            correction.push(item);
          }
        });
        return correction;
      }
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Personnel_header {
  width: 98%;
  display: flex;
  padding: 20px 0;
  margin-left: 2%;
  justify-content: space-between;
  align-items: center;
}
.Personnel_icon_title {
  display: flex;
  align-items: center;
}

.Personnel_title {
  padding-left: 5px;
  color: #333333;
  font-weight: bold;
  font-size: 16px;
}
.Tab_display {
  display: flex;
  width: 97%;
  margin-left: 3%;
  margin-bottom: 20px;
}
.Box__card {
  width: 98%;
  margin-left: 2%;
}
.button_list {
  margin-right: 10px;
}
</style>
