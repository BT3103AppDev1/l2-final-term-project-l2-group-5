import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueChartkick from 'vue-chartkick'
import 'chart.js'

const app = createApp(App);
app.use(router);
app.use(VueChartkick);
app.mount('#app');