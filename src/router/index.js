import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/view/HomeView.vue'
import FullScreen from '@/view/FullScreen.vue'
import ThreeBlock from '@/view/threeBlock/index.vue'
import Map from '@/view/map/index.vue'
import Screen from '@/view/screen.vue'
import Edit from "@/view/threeBlock/edit.vue"
const routes = [
    {
        path: '/home',
        component: HomeView
    },
    {
        path: '/fullscreen',
        component: FullScreen
    },
    {
        path: '/screen',
        component: Screen
    },
    {
        path: '/Edit',
        component: Edit
    },
    {
        path: '/three',
        component: ThreeBlock
    },
    {
        path: '/Map',
        component: Map
    },
    // 添加根路径重定向到 '/home'
    {
        path: '/',
        redirect: '/home'  // 自动跳转到 /home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router