import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/assets/base.css";
import "@progress/kendo-theme-default/dist/all.css";
// import "@progress/kendo-theme-default/dist/default-turquoise.scss";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
