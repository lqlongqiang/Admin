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
            height="302px"
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
              @change="Changedate"
            >
            </el-date-picker>
          </div>
          <div v-if="DynamicList.length === 0" class="Dynamic_data">
            暂无动态
          </div>
          <div v-else>
            <div
              v-for="(item, index) in DynamicList"
              :key="item._id"
              :class="{
                Dynamic_Data: true,
                bgcolor: index % 2 === 0,
                bgcolor1: index % 2 === 1
              }"
              v-show="item.dates === value"
            >
              <div class="Dynamic">
                <span>{{ item.classification }}</span>
                <span>{{ item.username }}</span>
              </div>
              <div v-if="item.reportUsers[0] !== ''">
                <div class="report">
                  汇报人:
                  <el-popover trigger="hover" placement="top-start">
                    <div class="display">
                      <p
                        v-for="(item2, index2) in item.reportUsers"
                        :key="index2"
                      >
                        {{ item2 }}
                      </p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      <span
                        v-for="(item1, index1) in item.reportUsers"
                        :key="index1"
                        class="personnel"
                        >{{ item1 }}</span
                      >
                    </div>
                  </el-popover>
                </div>
              </div>
              <div class="content_time">
                <span class="content">动态:{{ item.dynamic }}</span>
                <span class="time">发布于:{{ item.date }}</span>
              </div>
            </div>
            <div v-if="Flags.length === 0" class="Dynamic_data">
              暂无动态
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--添加动态弹出框-->
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
        <el-button @click="Cancel">取 消</el-button>
        <el-button type="primary" @click="Modify">确 定</el-button>
      </div>
    </el-dialog>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>网站问卷调查</span>
      </div>
      <el-table :data="questList" style="width: 100%" class="table_quest">
        <el-table-column prop="questionnaireTitle" label="问卷名称">
        </el-table-column>
        <el-table-column prop="questionnaireDescription" label="问卷描述">
        </el-table-column>
        <el-table-column prop="Creationtime" label="创建时间" sortable>
        </el-table-column>
        <el-table-column prop="Deadline" label="截止时间" sortable>
        </el-table-column>
        <el-table-column label="问卷主题">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.Questionnairetopics }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="website" label="网站名称">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              v-if="scope.row.website === '百度'"
              type="success"
              >{{ scope.row.website }}</el-tag
            >
            <el-tag
              size="medium"
              v-if="scope.row.website === '豆瓣'"
              type="danger"
              >{{ scope.row.website }}</el-tag
            >
            <el-tag
              size="medium"
              v-if="scope.row.website === '掘金'"
              type="warning"
              >{{ scope.row.website }}</el-tag
            >
            <el-tag
              size="medium"
              v-if="scope.row.website === 'Github'"
              type="info"
              >{{ scope.row.website }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="网站名称">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="Websitedetails(scope.$index, scope.row)"
              >查看网站详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 查看网站弹出框-->
    <el-dialog
      title="复制地址"
      :visible.sync="dialogFormVisibled"
      width="700px"
      @close ="closeDialog"
    >
      <div class="copy">
        <el-form>
          <el-input
            v-model="website"
            autocomplete="off"
            type="text"
            style="width: 580px; margin-right: 24px"
            size="small"
          ></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="danger"
            size="small"
            v-clipboard:copy="website"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制</el-button
          >
        </div>
      </div>
      <div class="copy_Tips">
        如无法使用上方复制按钮 , 请选择内容后 ,使用Ctrl + C
        复制。也可扫描下方二维码或右键保存二维码进行访问。
      </div>
      <div id="qrCode" ref="qrCodeDiv"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Canceled" size="small">取 消</el-button>
        <el-button type="primary" @click="Modifyed" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CircleProgress from "../components/vue-circle-progress";
import countTo from "vue-count-to";
import QRCode from "qrcodejs2";
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
      count: 0,
      progressList: [], //圆形进度条数据
      startVal: 0, //数字动画开始时间
      dialogFormVisible: false, //显示隐藏添加动态
      dialogFormVisibled: false, //显示隐藏查看网站
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
      value: "", //时间选择器转换的时间
      User: "", //用户的数据
      Flags: [], //判断日期里面有无数据
      questList: [], //问卷列表
      website: "", //点击网站绑定的值
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
          //console.log(this.ReportList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //确定添加动态
    Modify() {
      if (this.form.region === "" || this.form.content === "") {
        this.$message({
          type: "warning",
          message: "请完善信息"
        });
      } else {
        this.$axios
          .req("api/addDynamic", {
            username: this.User.username,
            classification: this.form.region,
            dynamic: this.form.content,
            reportUsers: this.form.WorkReport,
            date: this.value2
          })
          .then(respons => {
            //console.log(respons);
            if (respons.data.code === 200) {
              this.$message({
                message: respons.data.msg,
                type: "success"
              });
              this.getDynamicData();
              this.dialogFormVisible = false;
              this.form.region = "";
              this.form.content = "";
              this.form.WorkReport = "";
            } else {
              this.$message.error(respons.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //取消发布
    Cancel() {
      this.$message({
        type: "info",
        message: "取消发布成功"
      });
      this.dialogFormVisible = false;
      this.form.region = "";
      this.form.content = "";
      this.form.WorkReport = "";
    },
    //拿取发布的动态
    getDynamicData() {
      this.$axios
        .req("api/getDynamic")
        .then(respons => {
          //console.log(respons);
          if (respons.data.code === 200) {
            this.DynamicList = respons.data.data;
            //用day.js转换时间
            this.DynamicList.map(item => {
              if (item.date.indexOf("Z") !== -1) {
                item.dates = this.$dayjs(item.date).format("YYYY-MM-DD");
                item.date = this.$dayjs(item.date).format("YYYY年MM月DD日");
                //this.time1 = this.$dayjs(item.date).format("HH时mm分ss秒")
              }
            });
            this.Flags = this.DynamicList.filter(item => {
              return item.dates === this.value;
            });
          } else {
            this.DynamicList = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //change事件监测日期改变没有
    Changedate() {
      this.value = this.$dayjs(this.value2).format("YYYY-MM-DD");
      //console.log(this.value);
      //通过filter过滤有无数据
      this.Flags = this.DynamicList.filter(item => {
        return item.dates === this.value;
      });
    },
    //拿调查问卷数据
    getQuestData() {
      this.$axios
        .req("api/Investigation")
        .then(respons => {
          //console.log(respons);
          this.questList = respons.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看网站详情
    Websitedetails(index, row) {
      //console.log(index, row);
      this.dialogFormVisibled = true;
      if (row.website === "百度") {
        this.website = "https://baidu.com/";
      } else if (row.website === "豆瓣") {
        this.website = "https://www.douban.com//";
      } else if (row.website === "掘金") {
        this.website = "https://juejin.im";
      } else {
        this.website = "https://github.com";
      }
      this.$nextTick(function () {
        this.getQRcode();
      })
    },
    //复制成功
    onCopy() {
      this.$message({
        message: "复制成功",
        type: "success"
      });
    },
    onError() {
      this.$message.error("复制失败");
    },
    //生成二维码
    getQRcode() {
      new QRCode(this.$refs.qrCodeDiv, {
        text: this.website,
        width: 160,
        height: 160,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      });
    },
    //取消复制
    Canceled () {
      document.getElementById("qrCode").innerHTML = "";
      this.dialogFormVisibled =false
    },
    //确定复制
    Modifyed () {
      document.getElementById("qrCode").innerHTML = "";
      this.dialogFormVisibled =false
    },
    //关闭网址弹出框的情况时间
    closeDialog () {
      document.getElementById("qrCode").innerHTML = "";
    }
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("users"))) {
      this.User = JSON.parse(localStorage.getItem("users"));
      //console.log(this.User);
    }
    this.getQuestData();
    this.getData();
    this.getCityData();
    this.getCityColor();
    this.value2 = new Date();
    this.value = this.$dayjs(this.value2).format("YYYY-MM-DD");
    this.getDynamicData();
    //console.log(this.value);
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
  margin-top: 20px;
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
  height: 343px;
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
  height: 343px;
  margin-left: 2%;
  box-shadow: 0px 0px 5px 2px #dcdcdc;
  overflow: auto;
  overflow-x: hidden;
}
.add_Dynamic::-webkit-scrollbar {
  width: 10px; /*宽对应滚动条的尺寸*/
}
/*轨道*/
.add_Dynamic::-webkit-scrollbar-track {
  background: #c0c2c4;
  border-radius: 5px;
}
/*滑块*/
.add_Dynamic::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #909191;
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
  font-size: 14px;
  color: #666666;
}
.Dynamic_Data {
  margin-top: 10px;
  height: 70px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.Dynamic {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666666;
}
.bgcolor {
  background-color: #eeeeee;
}
.bgcolor1 {
  background-color: #fafafa;
}
.report {
  font-size: 14px;
  color: #666666;
  display: flex;
}
.display {
  display: flex;
  height: 20px;
  align-items: center;
}
.display p {
  padding: 0 3px;
}
.personnel {
  padding: 0 3px;
}
.content_time {
  display: flex;
  justify-content: space-between;
}
.content {
  font-size: 14px;
  color: #666666;
}
.time {
  font-size: 14px;
  color: #aaaaaa;
}
.box-card {
  width: 98%;
  margin-left: 2%;
  margin-top: 30px;
}
.copy {
  display: flex;
}
.copy_Tips {
  color: #666666;
  font-size: 13px;
  background-color: #ebf5ff;
  height: 40px;
  line-height: 40px;
  margin: 20px 0;
  border-radius: 4px;
  padding-left: 10px;
}
#qrCode {
  display: flex;
  justify-content: center;
}
</style>
