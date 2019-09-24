<template>
  <div>
    <div class="tasks">
      <lunar-full-calendar
        ref="calendar"
        :events="events"
        :config="config"
      ></lunar-full-calendar>
      <el-dialog
        title="日程"
        :visible.sync="dialogFormVisible"
        width="700px"
        style="height: 500px"
        class="form"
      >
        <el-form :model="form">
          <el-form-item>
            <el-input
              v-model="form.content"
              autocomplete="off"
              type="textarea"
              placeholder="准备做什么..."
            ></el-input>
          </el-form-item>
          <template class="Data">
            <span class="data_Choice">
              时间:
            </span>
            <el-time-select
              placeholder="开始时间"
              v-model="startTime"
              :picker-options="{
                start: '08:00',
                step: '00:15',
                end: '18:30'
              }"
              class="startData"
            >
            </el-time-select>
            <i class="el-icon-minus"></i>
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
                start: '08:00',
                step: '00:15',
                end: '18:30',
                minTime: startTime
              }"
              class="endData"
            >
            </el-time-select>
          </template>
          <div class="Participant">
            <span class="Participant_title">参与人:</span>
            <div class="personnel">
              <span
                v-for="(item, index) in personnel"
                :key="index"
                class="people_list"
                >{{ item }}</span
              >
            </div>
            <el-popover placement="bottom" width="200" v-model="visible">
              <el-input
                v-model="input"
                placeholder="请输入参加人的姓名"
                size="small"
              ></el-input>
              <div style="text-align: right; margin-top: 10px">
                <el-button type="primary" size="mini" @click="addPeople"
                  >确定</el-button
                >
              </div>
              <el-button
                slot="reference"
                class="el-icon-circle-plus-outline"
                style="font-size: 18px; color:#409eff; border: 0;margin-top: 2px"
                size="mini"
                plain
              >
              </el-button>
            </el-popover>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Cancel">取 消</el-button>
          <el-button type="primary" @click="Modify">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogFormVisibled"
        width="400px"
        style="height: 400px"
      >
        <div class="delete">
          确定删除该日程安排么？
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Canceled">取 消</el-button>
          <el-button type="primary" @click="Modifyed">确 定</el-button>
        </div>
      </el-dialog>
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
      user: "", //用户的数据
      input: "", //添加人员的绑定数据
      visible: false, //添加人员弹出框显示隐藏
      CurrentlyData: "", //当前的选择日期
      personnel: [], //添加的人员名单
      personneled: [], //添加的人员名单
      peopleData: "", //点击的用户数据
      dialogFormVisible: false, //显示隐藏添加日程
      dialogFormVisibled: false, //显示隐藏删除日程
      startTime: "", //添加日程开始时间
      start: "", //开始时间
      end: "", //结束时间
      endTime: "", //添加日程结束时间
      form: {
        content: ""
      }, //添加日程输入框绑定的值
      events: [],
      //日历插件配置的里面的属性
      config: {
        buttonText: { today: "今天", month: "月", week: "周", day: "日" },
        locale: "zh-cn",
        editable: true, //是否允许修改事件
        selectable: false, //是否允许用户通过单击或拖动选择日历中的对象，包括天和时间。
        eventLimit: 4, //事件个数
        allDaySlot: true, //是否显示allDay
        allDayText: "all-day",
        defaultView: "month", //显示默认视图
        businessHours: true, //区分工作时间
        aspectRatio: 1.0, //月视图下日历格子宽度和高度的比例
        slotMinutes: 30, //agenda视图下两个相邻时间之间的间隔
        timeFormat: "HH:mm", //日程的时间显示格式
        eventRender: this.eventRender, //日程渲染事件
        eventClick: this.eventClick, //点击事件
        dayClick: this.dayClick //点击日程表上面某一天
      }
      /* config: {
        lunarCalendar: true, // 控制是否显示中国农历、显示的为true，隐藏为flase，默认为true(Control whether the Chinese calendar shows true, unrealistic flase, default true.)
        header: {},
        defaultView: "month", //默认显示月
        buttonText: {
          today: "今天",
          month: "月",
          week: "周",
          day: "日"
        },
        eventLimit: true, // 一天中显示多少条事件，多了隐藏
        eventRender: this.eventRender //日程渲染事件
      }*/
    };
  },
  methods: {
    //获取日程信息
    getTasksData() {
      this.$axios
        .req("api/calendar")
        .then(respons => {
          //console.log(respons.data.data);
          respons.data.data.forEach(item => {
            item.end = this.$dayjs(item.endTime).format("YYYY-MM-DD hh:mm:ss");
            item.start = this.$dayjs(item.startTime).format(
              "YYYY-MM-DD hh:mm:ss"
            );
            item.title = item.schedule;
            item.color = "#E0EFD5";
          });
          this.events = respons.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击当天的事件
    dayClick(date, jsEvent) {
      if (
        this.$dayjs(date._d).valueOf() <
        this.$dayjs(new Date()).valueOf() - 86400000
      ) {
        this.$message.error("不能安排今天之前的日程");
      } else {
        this.dialogFormVisible = true;
        this.CurrentlyData = this.$dayjs(date._d).format("YYYY-MM-DD");
      }
      //console.log("农历数据：" + JSON.stringify(window.lunar(date._d)));
      //console.log(this.$dayjs(date._d).valueOf());
    },
    //添加日程取消事件
    Cancel() {
      this.$message({
        message: "取消添加成功",
        type: "info"
      });
      this.dialogFormVisible = false;
      this.input = "";
      this.startTime = "";
      this.endTime = "";
      this.form.content = "";
    },
    //添加日程确定事件
    Modify() {
      //console.log(this.CurrentlyData);
      /* this.$dayjs(this.startTime).format("HH-mm");*/
      this.start = this.CurrentlyData + " " + this.startTime;
      //console.log(this.start);
      this.end = this.CurrentlyData + " " + this.endTime;
      //console.log(this.end);
      this.$axios
        .req("api/calendar", {
          users: this.personnel,
          startTime: this.start,
          endTime: this.end,
          schedule: this.form.content
        })
        .then(respons => {
          console.log(respons);
          if (respons.data.code === 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.getTasksData();
            this.input = "";
            this.startTime = "";
            this.endTime = "";
            this.form.content = "";
            this.personnel = this.personneled;
            this.dialogFormVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加人员成功
    addPeople() {
      this.personnel.push(this.input);
      this.visible = false;
      this.input = "";
    },

    //日程渲染事件
    eventRender(calEvent, element, view) {
      // console.log(element[0]);
      // console.log(calEvent);
      let start = this.$dayjs(calEvent.startTime).format("HH:mm");
      let end = this.$dayjs(calEvent.endTime).format("HH:mm");
      let content = calEvent.schedule;
      let people = calEvent.users.toString();
      let peopleNum = calEvent.users.length;
      element[0].innerHTML =
        "<div> " +
        start +
        " ~ " +
        end +
        "： " +
        content +
        "</div>" +
        "<div>参与人：" +
        people +
        "</div>" +
        "<div>参与人数：" +
        "<i class=\"el-icon-user-solid\" style='color: black'></i>×" +
        peopleNum +
        "</div>";
    },
    //删除日程事件
    eventClick(item) {
      //console.log(item._id);
      this.dialogFormVisibled = true;
      this.peopleData = item._id;
    },
    //取消删除
    Canceled() {
      this.dialogFormVisibled = false;
      this.$message({
        message: "取消删除成功",
        type: "info"
      });
    },
    //确定删除
    Modifyed() {
      this.$axios
        .req("api/delCalendar", {
          id: this.peopleData
        })
        .then(respons => {
          if (respons.data.code === 200) {
            this.getTasksData();
            this.dialogFormVisibled = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
          //console.log(respons);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getTasksData();
    //拿用户的信息
    this.user = JSON.parse(localStorage.getItem("users"));
    this.personnel.push(this.user.username);
    this.personneled.push(this.user.username);
    //console.log(this.user);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.tasks {
  width: 95%;
  background-color: white;
  margin-left: 2%;
  margin-top: 20px;
  padding: 20px;
}

.data_Choice {
  font-size: 16px;
  color: #666666;
}
.startData {
  margin-left: 50px;
  margin-right: 10px;
}
.endData {
  margin-left: 10px;
}
.Participant {
  padding: 20px 0;
  display: flex;
  align-items: center;
}
.Participant_title {
  font-size: 16px;
  color: #666666;
}
.people_list {
  padding: 0 5px;
}
.personnel {
  margin-left: 42px;
  font-size: 16px;
  color: #888888;
}
.icon {
  font-size: 18px;
  color: #409eff;
  padding-left: 10px;
  margin-top: 2px;
}
.delete {
  text-align: center;
  color: #666666;
  font-size: 18px;
}
</style>
