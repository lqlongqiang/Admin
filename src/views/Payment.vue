<template>
  <div id="Payment">
    <div>
      <div class="Payment_header">
        <div class="Payment_icon_title">
          <img src="../assets/img/Payment.png" alt="" />
          <span class="Payment_title">薪酬管理</span>
        </div>
      </div>
      <div class="Payment">
        <div class="Payment_time">
          <div class="Payment_budget">{{ value1 }} 薪酬预算</div>
          <div>
            <el-date-picker
              v-model="value"
              type="month"
              placeholder="请选择月份"
              size="small"
              style="width: 180px"
              :picker-options="pickerOptions"
              @change="Changedate"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="remind">
          <span
            >如果有更多的渠道请自行添加,所有添加的渠道会显示在CRM系统中</span
          >
        </div>
        <div>
          <el-card class="Box__card">
            <div slot="header" class="clearfix">
              <span>薪资结构</span>
            </div>
            <el-table
              :data="PaymentList"
              style="width: 100%;border: 1px solid #ebeef5"
              class="Table_el"
            >
              <template v-for="(item, index) in ListOfHeader">
                <el-table-column
                  :key="index"
                  :label="item.title"
                  :prop="item.prop"
                  align="center"
                  show-overflow-tooltip
                  v-if="item.title !== ''"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="text"
                      v-model="scope.row[item.prop]"
                      size="small"
                      v-if="display(scope.$index, item.prop)"
                      @blur="changeData(scope.row[item.prop])"
                    ></el-input>
                    <span @click="handleEdit(scope.$index, item.prop)" v-else>{{
                      scope.row[item.prop]
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :key="index"
                  :label="item.title"
                  align="center"
                  show-overflow-tooltip
                  v-else
                  width="360px"
                >
                </el-table-column>
              </template>
              <template v-for="(item, index) in ListOfHeaded">
                <el-table-column
                  :key="index + 4"
                  :label="item.title"
                  :prop="item.prop"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span class="Prohibit">{{ scope.row[item.prop] }}</span>
                  </template>
                </el-table-column>
              </template>
            </el-table>
            <div class="Add_Button">
              <el-button type="primary" size="small" @click="AddMore"
                >添加更多</el-button
              >
            </div>
          </el-card>
        </div>
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
      inspect: "", // 拿到数据的竖行
      PaymentList: [], //薪酬管理列表
      value: "", //v-model绑定的日期的值
      value1: "", //绑定的日期的值显示在页面上
      disabled: 0, // 拿到数据的横行
      disable: "", //  判断input框显示隐藏
      //日期选择快捷键上月本月
      ListOfHeader: [
        {
          title: "薪资构成",
          prop: "Salary"
        },
        {
          title: "计划支出(元)",
          prop: "Planned"
        },
        {
          title: "实际支出(元)",
          prop: "Actualed"
        },
        {
          title: ""
        }
      ],
      ListOfHeaded: [
        {
          title: "上月计划(元)",
          prop: "LastmonthPlanned"
        },
        {
          title: "上月实际(元)",
          prop: "LastmonthActualed"
        }
      ], //表格头部列表
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "上月",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    //控制显示隐藏input
    display(row, vertical) {
      if (this.inspect === "") {
        return false;
      } else {
        return row === this.disabled && this.inspect === vertical;
      }
    },
    //拿薪酬管理的数据
    getPaymentData() {
      this.$axios
        .req("api/Payment")
        .then(respons => {
          console.log(respons);
          this.PaymentList = respons.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //change事件监测日期改变没有
    Changedate() {
      this.value1 = this.$dayjs(this.value).format("YYYY年MM月");
    },
    //控制显示隐藏 input框
    handleEdit(index, row) {
      this.inspect = row;
      this.disabled = index;
      //console.log(row);
      //console.log(this.disable);
    },
    //失去焦点事件改变input框的值
    changeData() {
      this.inspect = "";
    },
    AddMore() {}
  },
  mounted() {
    this.getPaymentData();
    //改变日期选择器显示的默认值
    this.value = new Date();
    //改变页面上显示的值
    this.value1 = this.$dayjs(new Date()).format("YYYY年MM月");
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Payment_header {
  width: 98%;
  display: flex;
  padding: 20px 0;
  margin-left: 2%;
  justify-content: space-between;
  align-items: center;
}
.Payment_icon_title {
  display: flex;
  align-items: center;
}
.Payment_title {
  padding-left: 5px;
  color: #333333;
  font-weight: bold;
  font-size: 16px;
}
.Payment {
  width: 98%;
  margin-left: 2%;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
}
.Payment_budget {
  font-size: 20px;
  color: #333333;
  font-weight: bold;
}
.Payment_time {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px 0 20px;
}
.remind {
  height: 40px;
  background-color: #e5f2e1;
  padding-left: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666666;
}
.clearfix {
  font-size: 18px;
  color: #666666;
  font-weight: bold;
}
.Prohibit {
  color: #c0c2c4 !important;
}
.Add_Button {
  padding: 20px 60px;
}
</style>
