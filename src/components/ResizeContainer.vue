<template>

    <div class="Screen" ref="BigScreen">
      <template v-if="ready">
        <slot></slot>
      </template>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { debounce } from "../utils/index.js";
let BigScreen = ref(); //容器组件
let ready = ref(false);
let width = ref(0);
let height = ref(0);
let domObserver: any;

onMounted(async () => {
  await nextTick(); // 等待路由内容渲染
  // 初始化
  initApp();
  // 设置缩放
  setScale();
  // 基于窗口变化缩放
  window.addEventListener("resize", debounceInScale);
  // 基于自身大小变化缩放
  domObserver = new MutationObserver(debounceInScale);
  domObserver.observe(BigScreen.value, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: true,
  });
  //渲染内容
  console.log(`output`)
  ready.value = true;
});

onUnmounted(() => {
  window.removeEventListener("resize", debounceInScale);
  if (!domObserver) return;
  domObserver.disconnect();
  domObserver.takeRecords();
  domObserver = null;
});

const setScale = () => {
  const scaleX = document.body.clientWidth / width.value;
  const scaleY = document.body.clientHeight / height.value;
  // const scale = scaleY; 
  const scale = Math.min(scaleX, scaleY); // 取较小值保证完全可见

  BigScreen.value.style.transform = `scale(${scale})`;
};

const debounceInScale = debounce(setScale, 500);

const initApp = () => {
  width.value = screen.width;
  height.value = screen.height;

  BigScreen.value.style.width = `${width.value}px`;
  BigScreen.value.style.height = `${height.value}px`;
};
</script>

<style scoped lang="scss">
.container1{
width: 100vw;
height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.Screen {

  position: fixed;
  // top: 0px;
  // left: 0px;
  overflow: hidden;
  transform-origin: left top;
  transition: transform 0.2s;
  z-index: 999;
  margin: auto;
}
</style>
