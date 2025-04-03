import './assets/main.css'
import router from "@/router/index.js"
// 将自动注册所有组件为全局组件
import * as echarts from "echarts" // 引入echarts
import Tres from '@tresjs/core'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(router)
app.use(Tres)
app.use(ElementPlus)
app.config.globalProperties.$echarts = echarts
app.mount('#app')
