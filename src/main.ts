import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'v-calendar/style.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import router from './router';
import { VMoney3 } from 'v-money3';
import VCalendar from 'v-calendar';
import * as globals from './utils/globals';

const pinia = createPinia();

let app = createApp(App)
.use(router)
.use(pinia)
.use(VCalendar,{})
.directive('money', VMoney3);

app.config.globalProperties.$globals = globals;

app.mount('#app')

