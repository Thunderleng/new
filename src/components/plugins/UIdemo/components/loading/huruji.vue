<!--
 * @Description:  参考 : https://github.com/huruji/loading/tree/master
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-12 19:56:21
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-08-12 11:11:20
-->
<template>
    <div v-if="!hasFinishLoading" class="absolute bg-grey-600 t-0 l-0 w-full h-full z-99999999 flex justify-center items-center text-black font-mono bg-black">
        <div class="text-white flex flex-items-center float-left huruji-loader">
            <div class="loader13" v-if="props.styleNum === 4">
                <div class="loader-13">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <template v-if="showProgress">载入中... {{ progress }} %</template>
            <div class="loader5" v-if="props.styleNum === 0">
                <div class="loader-five">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div class="loader6" v-else-if="props.styleNum === 1">
                <div class="loader-six">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div class="loader7" v-else-if="props.styleNum === 2">
                <div class="loader-seven">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div class="loader8" v-else-if="props.styleNum === 3">
                <div class="loader-eight">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div class="loader38" v-else-if="props.styleNum === 5">
                <div class="loader-38">
                    <div></div>
                </div>
            </div>
            <div class="loader33" v-else-if="props.styleNum === 6">
                <div class="loader-33">
                    <div></div>
                </div>
            </div>
            <div class="loader22" v-else-if="props.styleNum === 7">
                <div class="loader-22">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { hasPlugin } from '@/common/utils'
import { useProgress } from '@tresjs/cientos'
import { Resource } from 'PLS/resourceManager'

const props = withDefaults(
    defineProps<{
        styleNum?: number
        isDemo?: boolean
        showProgress?: boolean
        useResourceManager?: boolean
    }>(),
    {
        styleNum: 0,
        isDemo: false,
        showProgress: true,
        useResourceManager: false,
    },
)
let progress = null as any
let hasFinishLoading = null as any

if (props.useResourceManager) {
    if (hasPlugin('resourceManager', '资源管理器插件')) {
        // const modules = import.meta.glob('/src/plugins/resourceManager/index.js')
        // const { Resource } = await modules['/src/plugins/resourceManager/index.js']()
        progress = Resource.progress
        hasFinishLoading = Resource.hasAllFinished
    }
} else {
    const uP = await useProgress()
    progress = uP.progress
    hasFinishLoading = uP.hasFinishLoading
}

const animloop = () => {
    if (progress.value++ > 100) {
        progress.value = 0
    }
    // console.log(progress.value)
    requestAnimationFrame(animloop)
}
if (props.isDemo) {
    requestAnimationFrame(animloop)
}
</script>

<style scoped>
@import './huruji.less';
</style>
