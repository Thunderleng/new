import { createMemoryHistory, createRouter,createWebHistory } from 'vue-router'
import HomeView from '@/view/HomeView.vue'
import FullScreen from '@/view/FullScreen.vue'
import ThreeBlock from '@/view/threeBlock/index.vue'
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
        path: '/three', 
        component: ThreeBlock 
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