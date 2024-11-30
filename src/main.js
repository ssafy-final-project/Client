// Import our custom CSS
import "./scss/styles.scss";
import "./assets/styles/global.css";
// import "./scss/variable.scss";
// Import all of Bootstrap's JS
// main.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { createApp } from "vue";

// Vuetify
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "./index.css";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";

const vuetify = createVuetify({
  components,
  directives,
  iconfont: "md",
  typography: {
    font: "Noto Sans KR, Noto Sans", // 폰트 변경
  },
});

// useKakao("240401c05ac8a45d829cc30f0926c211");
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");
