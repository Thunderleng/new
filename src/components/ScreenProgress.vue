<template>
    <div class="progress-container">
        <div v-for="(item, index) in RangeCount" :key="index" class="progress-item" :style="{
            backgroundColor: index > currentCount ?'#95a5a6':  color 
        }">
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['color', 'progress'])
const RangeCount = ref(30)
const progress = computed(() => {
    console.log(`output->`,props.progress)
    return props.progress
})
const color = computed(() => {
    return props.color
})
const currentCount = computed(() => Math.floor((progress.value / 100) * RangeCount.value));
console.log(`output->currenCount`,currentCount.value)

</script>
<style lang="scss" scoped>
.progress-container {
    margin-top: 100px;
    margin-left: 300px;
    display: flex;
    width: 370px;
    height: 30px;
    overflow: hidden;

}

.progress-item {
    flex: 1;
    margin-right: 1px;
    /* 给每个格子增加一点间隔 */
    height: 100%;
}
</style>