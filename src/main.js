import './assets/main.css'
// 将自动注册所有组件为全局组件
import * as echarts from "echarts" // 引入echarts
import { createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(ElementPlus)
app.config.globalProperties.$echarts = echarts
app.mount('#app')
