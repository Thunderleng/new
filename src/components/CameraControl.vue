<template>
    <div>
        
        <div id="divPlugin" class="plugin" style="width: 500px; height: 500px;"></div>
        <div class="buttons">
            <button @click="login(userData)"> 登录 </button>
            <button>预览</button>
            <button @click="DestroyPlay">停止预览</button>
            <button @click="LogOut">登出设备</button>
            <button @click="DestroyPlugin">销毁设备</button>
            <button @click="initPlugin">初始化设备</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive, onUnmounted } from 'vue'
let userData = reactive({
    szIP: "10.14.99.24", //IP地址
    iPrototocol: 1, //端口
    iPort: 80, //端口
    szUserName: "admin", //用户名
    szPassword: "admin123456", //密码
})
const init = () => {
    // console.log(`output->`, WebVideoCtrl)
    WebVideoCtrl.I_InitPlugin({
        iWndowType: 1,//分屏类型
        bWndFull: true,//单窗口双击全屏
        bDebugMode: true,//控制台调试信息
        cbInitPluginComplete: () => { //插件初始化完成回调，必须要定义
            initPlugin()
        },

        // cbSelWnd: () => { //窗口选中事件回调函数，只包含一个字符串参数，里面的值是XML
        // },
        // cbEvent: () => { //插件事件回调函数，有三个参数，第一个参数是事件类型，第二参数是窗口号（无插件不支持该回调）
        // },		
        // cbDoubleClickWnd, //窗口双击回调函数，有两个参数，第一个参数是窗口号，第二个参数是是否全屏（无插件不支持该回调）
        // iTopHeight,     //插件窗口相对于浏览器可视区域的最高高度，防止网页滚动时插件窗口遮盖网页顶部元素。默认为 0
    })
}
const login = (userData) => {
    const { szIP, iPrototocol, iPort, szUserName, szPassword } = userData;
    console.log(`output->`, szIP, iPrototocol, iPort, szUserName, szPassword)
    WebVideoCtrl.I_Login(szIP, iPrototocol, iPort, szUserName, szPassword, {
        success: function (xmlDoc) { //成功的回调函数
            alert(szIP + "登录成功！");
        },
        error: function () { //失败的回调函数.
            alert(szIP + "登录失败！");
        }
    });
}
const Destroy = () => {

}
const szDeviceIdentify = ref('123123')
//停止预览
function DestroyPlay() {
    WebVideoCtrl.I_StopAllPlay()
}
// 登出设备
function LogOut() {
    WebVideoCtrl.I_Logout(szDeviceIdentify.value)
}
// 销毁插件
function DestroyPlugin() {
    WebVideoCtrl.I_DestroyPlugin()
}
// 初始化插件
function initPlugin() {
    WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin").then(() => {
        WebVideoCtrl.I_CheckPluginVersion().then((Bflag) => {
            console.log('成功初始化')
            if (Bflag) {
                alert('请升级')
            }
        })
    }, () => {
        alert("插件初始化失败")
    })
}

onMounted(() => {
    init()
})
onUnmounted(() => {
    Destroy()
})
</script>
<style scoped>
.buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>