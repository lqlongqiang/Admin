<template>
  <div id="Homepage">
    <div class="Progress">
      <div
        v-for="(item, index) in ProgressList"
        :key="item.title"
        class="progress_list"
        @click="Tabswich(index)"
        :class="{
          active1: activeindex === 0 && activeindex === index,
          active2: activeindex === 1 && activeindex === index,
          active3: activeindex === 2 && activeindex === index
        }"
      >
          <div class="progress_data">
              <span class="progress_title">{{ item.title }}</span>
          </div>
      </div>
    </div>
    <!--<section>
      <section class="p-switch btn" @click="isDurationModel = !isDurationModel">
        {{ isDurationModel ? "动画模式" : "持续模式" }}
      </section>
      <section class="p-test" v-if="!isDurationModel">
        <circle-progress
          v-if="isShow"
          ref="$circle"
          class="progress"
          key="animation-model"
          :isAnimation="true"
          :isRound="true"
          :width="width"
          :radius="radius"
          :progress="progress"
          :barColor="barColor"
          :duration="duration"
          :delay="delay"
          :timeFunction="timeFunction"
          :backgroundColor="backgroundColor"
        >
        </circle-progress>
      </section>
      <section class="p-test p-duration-model" v-else>
        <circle-progress
          v-if="isShow"
          ref="$circle"
          class="progress"
          key="duration-model"
          :isAnimation="false"
          :isRound="true"
          :width="width"
          :radius="radius"
          :progress="(currentTime / durationTime) * 100"
          :barColor="barColor"
          :duration="duration"
          :delay="delay"
          :timeFunction="timeFunction"
          :backgroundColor="backgroundColor"
        >
        </circle-progress>
      </section>
    </section>-->
  </div>
</template>

<script>
import CircleProgress from "../components/vue-circle-progress";
export default {
  components: {
    CircleProgress
  },
  data() {
    return {
      ProgressList: [
        { title: "本月营收(元)", id: "1" },
        {
          title: "待回款(元)",
          id: "2"
        },
        {
          title: "客单价/合同(元)",
          id: "3"
        }
      ], //圆形进度条数据
      activeindex: 0, //默认选中
      isDurationModel: true, // 是否打开持续缓动模式
      isShow: true,
      width: 50,
      radius: 5,
      progress: 70,
      duration: 1000,
      delay: 20,
      barColor: "#F2AE57",
      backgroundColor: "#FFE8CC",
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
    Tabswich(index) {
      this.activeindex = index;
    },
    // 重置动画
    reset() {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
    // 开始计时
    startTime() {
      let spaceTime = 10;
      clearInterval(this.intervalTimer);
      this.currentTime = 0;
      this.intervalTimer = setInterval(() => {
        this.currentTime += spaceTime / 1000;
        if (this.currentTime >= this.durationTime) {
          clearInterval(this.intervalTimer);
        }
      }, spaceTime);
    }
  }
};
</script>

<style scoped lang="scss">
.Progress {
  height: 100px;
  width: 98%;
  background-color: white;
  margin-left: 2%;
  display: flex;
}
.progress_list {
    height: 100px;
  width: 33%;
    display: flex;
    align-items: center;
}
.active1 {
  border-top: 6px solid #409eff;
}
.active2 {
  border-top: 6px solid #80e313;
}
.active3 {
  border-top: 6px solid #f2ae57;
}
.progress_data {
    display: flex;
    height: 60px;
}
.progress_title {
    font-size: 14px;
    color: #888888;
}
</style>
