import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "amfe-flexible";
import "./assets/icon/iconfont.css";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const app = createApp(App);
app.config.globalProperties.$dayjs = dayjs;
app.use(router).mount("#app");
