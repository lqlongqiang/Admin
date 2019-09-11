import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VCharts from "v-charts";
import dayjs from "dayjs";
import axios from "./http";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import JsonExcel from "vue-json-excel";
import "./mock";
import VueClipboard from "vue-clipboard2";
import QRCode from 'qrcodejs2';

Vue.prototype.$qrCode = QRCode;
Vue.prototype.$axios = axios;
Vue.prototype.$dayjs = dayjs;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.use(mavonEditor);
Vue.use(VueClipboard);
Vue.component("downloadExcel", JsonExcel);

new Vue({
  router,
  store,
  dayjs,
  render: h => h(App)
}).$mount("#app");
