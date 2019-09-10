<template>
  <div id="Homepage">
    <div class="Progress">
      <div class="progress_Data">
        <div
          v-for="(item, index) in progressList"
          :key="item.money"
          class="progress_list"
          @click="Tabswich(index)"
          :class="{
            active1: activeindex === 0 && activeindex === index,
            active2: activeindex === 1 && activeindex === index,
            active3: activeindex === 2 && activeindex === index
          }"
        >
          <div class="progress_data">
            <span class="progress_title">{{ ProgressList[index].title }}</span>
            <div class="countTo">
              ¥
              <countTo
                :startVal="startVal"
                :endVal="item.money"
                :duration="3000"
                >{{ item.money }}</countTo
              >
            </div>
          </div>
          <section>
            <section class="p-test" v-if="activeindex === index">
              <circle-progress
                :id="ProgressList[index].id"
                v-if="isShow"
                ref="$circle"
                class="progress"
                key="animation-model"
                :isAnimation="true"
                :isRound="true"
                :width="width"
                :radius="radius"
                :progress="item.speed"
                :barColor="ProgressList[index].backgroundcolor"
                :duration="duration"
                :delay="delay"
                :timeFunction="timeFunction"
                :backgroundColor="ProgressList[index].bgcolor"
              >
              </circle-progress>
            </section>
            <section class="p-test p-duration-model" v-else>
              <circle-progress
                v-if="isShow"
                ref="$circle"
                class="progress"
                :id="ProgressList[index].id"
                key="duration-model"
                :isAnimation="true"
                :isRound="true"
                :width="width"
                :radius="radius"
                :progress="item.speed"
                :barColor="backgroundcolor"
                :duration="duration"
                :delay="delay"
                :timeFunction="timeFunction"
                :backgroundColor="bgColor"
              >
              </circle-progress>
            </section>
          </section>
          <div
            :class="{
              Completion_rate: true,
              Completion_rates: activeindex === 2
            }"
            v-if="activeindex === index"
          >
            <span class="comletion_scoal">{{ item.speed }}%</span>
            <span>完成率</span>
          </div>
          <div :class="{ Partitionline: index === 0 || index === 1 }"></div>
        </div>
      </div>
    </div>
    <div class="City_Dynamic">
      <div class="City_data">
        <div class="profit">
          <span class="profit_text">利润(万)</span>
        </div>
        <div>
          <ve-wordcloud
            :data="chartData"
            :settings="chartSettings"
            height="280px"
          ></ve-wordcloud>
        </div>
      </div>
      <div class="add_Dynamic">
        <div class="dynamic">
          <span class="dynamic_text">个人动态</span>
          <el-button type="primary" size="mini" @click="AddDynamic"
            >添加动态</el-button
          >
        </div>
        <div class="Dynamic_time">
          <div class="block">
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              size="small"
              style="width: 180px"
            >
            </el-date-picker>
          </div>
          <div v-if="DynamicList.length === 0" class="Dynamic_data">
            暂无动态
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="添加动态"
      :visible.sync="dialogFormVisible"
      width="700px"
      style="height: 500px"
    >
      <el-form :model="form">
        <el-form-item label="动态类型" :label-width="formLabelWidth">
          <el-select
            placeholder="请选择活动区域"
            style="width:560px"
            v-model="form.region"
          >
            <el-option label="个人心情" value="个人心情"></el-option>
            <el-option label="工作汇报" value="工作汇报"></el-option>
            <el-option label="公司相关" value="公司相关"></el-option>
            <el-option label="其他事物" value="其他事物"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="详情内容"
          :label-width="formLabelWidth"
          v-if="form.region !== '工作汇报'"
        >
          <el-input
            v-model="form.content"
            autocomplete="off"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item
            label="相关汇报人"
            :label-width="formLabelWidth"
            class="Dynamic_people"
          >
            <el-select
              placeholder="请选择汇报人"
              style="width:560px"
              v-model="form.WorkReport"
              :multiple="true"
              :clearable="true"
            >
              <el-option
                v-for="item in ReportList"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详情内容" :label-width="formLabelWidth">
            <el-input
              v-model="form.content"
              autocomplete="off"
              type="textarea"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Modify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CircleProgress from "../components/vue-circle-progress";
import countTo from "vue-count-to";
export default {
  components: {
    CircleProgress,
    countTo
  },
  data() {
    this.chartSettings = {
      color: [],
      shape: "triangle",
      sizeMin: 12,
      sizeMax: 16
    };
    return {
      props: { multiple: true, value: "name" },
      progressList: [], //圆形进度条数据
      startVal: 0, //数字动画开始时间
      dialogFormVisible: false, //显示隐藏添加动态
      formLabelWidth: "100px", //添加动态输入框长度
      form: {
        region: "",
        content: "",
        WorkReport: ""
      }, //添加动态输入框绑定的值
      chartData: {
        columns: ["city", "count"],
        rows: []
      }, //模拟城市数据
      ReportList: [], //汇报人列表
      DynamicList: [], //个人动态数据
      value2: "", //时间选择器绑定的时间
      //日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      ProgressList: [
        {
          title: "本月营收(元)",
          id: "1",
          backgroundcolor: "#409eff",
          bgcolor: "#A9D0FF"
        },
        {
          title: "待回款(元)",
          id: "2",
          backgroundcolor: "#80e313",
          bgcolor: "#D3F4AF"
        },
        {
          title: "客单价/合同(元)",
          id: "3",
          backgroundcolor: "#f2ae57",
          bgcolor: "#FFE8CC"
        }
      ], //圆形进度条数据
      activeindex: 0, //默认选中
      isDurationModel: true, // 是否打开持续缓动模式
      isShow: true,
      width: 60, //圆形进度条的宽度
      radius: 5,
      bgColor: "#DCE2E6",
      backgroundcolor: "#9FB2BD",
      duration: 1000,
      delay: 20,
      timeFunction: "cubic-bezier(0.99, 0.01, 0.22, 0.94)",
      intervalTimer: null, // 持续模式，循环计时器
      currentTime: 0, // 当前时间
      durationTime: 60 // 持续模式总时长
    };
  },
  watch: {
    isDurationModel() {
      clearInterval(this.intervalTimer);
      this.currentTime = 0;
    }
  },
  methods: {
    //tab切换动画效果
    Tabswich(index) {
      this.activeindex = index;
    },
    //拿mockjs模拟的进度条数据
    getData() {
      this.$axios
        .req("api/Roundprogress")
        .then(respons => {
          this.progressList = respons.data.data;
          //console.log(this.progressList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //拿随机生成城市
    getCityData() {
      this.$axios
        .req("api/cityData")
        .then(respons => {
          this.chartData.rows = respons.data.data;
          /* this.cityList = respons.data.data;
          console.log(this.cityList);*/
        })
        .catch(err => {
          console.log(err);
        });
    },
    //随机城市颜色
    getCityColor() {
      this.$axios
        .req("api/cityColor")
        .then(respons => {
          //console.log(respons);
          this.chartSettings.color = respons.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加动态
    AddDynamic() {
      this.dialogFormVisible = true;
    },
    //拿汇报人数据
    getReportData() {
      this.$axios
        .req("api/ReportData")
        .then(respons => {
          this.ReportList = respons.data.data;
          console.log(this.ReportList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //确定添加动态
    Modify() {
      /*if (this.form.region === "" || this.form.content === "") {
        this.$message({
          type: "warning",
          message: "请完善信息"
        });
      } else {
        this.$axios.req("api/addDynamic", {});
      }*/
      console.log(this.form.WorkReport);
    }
  },
  mounted() {
    this.getData();
    this.getCityData();
    this.getCityColor();
    this.value2 = new Date();
    this.getReportData();
  }
};
</script>

<style scoped lang="scss">
.Progress {
  width: 98%;
  background-color: white;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px 2px #dcdcdc;
}
.progress_Data {
  display: flex;
}
.progress_list {
  height: 100px;
  width: 33%;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 60px;
}
.active1 {
  border-top: 6px solid #409eff;
  height: 94px;
}
.active2 {
  border-top: 6px solid #80e313;
  height: 94px;
}
.active3 {
  border-top: 6px solid #f2ae57;
  height: 94px;
}
.progress_data {
  display: flex;
  flex-direction: column;
  margin-right: 100px;
}
.progress_title {
  font-size: 14px;
  color: #888888;
  margin-bottom: 5px;
}
.countTo {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin-top: 5px;
}
.Completion_rate {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #222222;
  justify-content: center;
  position: absolute;
  top: 32px;
  left: 251px;
}
.Completion_rates {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #222222;
  justify-content: center;
  position: absolute;
  top: 32px;
  left: 272px;
}
.comletion_scoal {
  text-align: center;
}
.Partitionline {
  width: 1px;
  height: 20px;
  background-color: #cccccc;
  position: absolute;
  right: 0;
}
.City_Dynamic {
  width: 98%;
  margin-left: 2%;
  margin-top: 40px;
  display: flex;
}
.City_data {
  background-color: white;
  width: 49%;
  height: 321px;
  box-shadow: 0px 0px 5px 2px #dcdcdc;
}
.profit {
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #ebeef5;
  padding-left: 20px;
}
.profit_text {
  font-size: 14px;
  color: #888888;
}
.add_Dynamic {
  background-color: white;
  width: 49%;
  height: 321px;
  margin-left: 2%;
  box-shadow: 0px 0px 5px 2px #dcdcdc;
}
.dynamic {
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #ebeef5;
  padding: 0 20px;
  justify-content: space-between;
}
.dynamic_text {
  font-size: 14px;
  color: #888888;
}
.Dynamic_time {
  padding: 20px;
}
.Dynamic_data {
  padding: 20px 0;
  font-size: 16px;
  color: #666666;
}
</style>
