<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import FullScreen from './view/FullScreen.vue'
</script>

<template>
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
<!-- <FullScreen/> -->

</template>

<style scoped>
#app{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
