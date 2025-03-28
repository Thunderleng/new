<template>
  <div class="t-chart" v-bind="$attrs">
    <div v-show="!formatEmpty" class="t-chart-container" :id="id" ref="echartRef" />
    <slot v-if="formatEmpty" name="empty">
      <el-empty v-bind="$attrs" :description="description" />
    </slot>
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="TChart">
import {
  onMounted,
  getCurrentInstance,
  ref,
  watch,
  nextTick,
  onBeforeUnmount,
  markRaw,
  useAttrs,
} from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { debounce, toLine } from '@/utils/index.js'
import { computed } from 'vue'
import * as echarts from 'echarts';
const { proxy } = getCurrentInstance() as any
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  id: {
    type: String,
    default: () => Math.random().toString(36).substring(2, 8),
  },
  theme: {
    type: String,
    default: '',
  },
  isEmpty: {
    type: [Boolean, Function],
    default: false,
  },
  description: {
    type: String,
    default: '暂无数据',
  },
})

const echartRef = ref<HTMLDivElement>()
const chart = ref()
const emits = defineEmits()
const events = Object.entries(useAttrs())
const defaultOptions = {
  dataset: {
    source: [["日期", "人数"]],
  },
  color: ["#31FBFB"],
  grid: {
    left: 14,
    right: 46,
    bottom: 0,
    top: 20,
    containLabel: true,
  },
  xAxis: {
    type: "category",
    name: "日期",
    nameTextStyle: {
      fontSize: 10,
    },
    nameGap: 4,
    boundaryGap: false,
    axisLabel: {
      fontSize: 10,
    },
  },
  yAxis: {
    name: "人数",
    nameTextStyle: {
      fontSize: 10,
    },
    nameGap: 6,
    axisLine: {
      show: true,
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      fontSize: 10,
    },
  },
  dataZoom: [
    {
      type: "inside",
    },
  ],
  tooltip: {
    trigger: "axis",
    formatter: function (params) {
      let data = params[0].data;
      return `月份：${data[0] || "--"}<br />人数：${data[1] || "--"}`;
    },
    borderWidth: 2,
    borderColor: "#31FBFB",
    className: "big-score-tooltip",
    textStyle: {
      color: "fff",
    },
  },
  series: [
    {
      type: "line",
      smooth: true,
      label: {
        show: true,
        position: "top",
        fontSize: 10,
        color: "#E0E2E4",
      },
      areaStyle: {
        opacity: 0.6,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#31FBFB",
          },
          {
            offset: 1,
            color: "#0E1D36",
          },
        ]),
      },
    },
  ],
}
// 图表初始化
const renderChart = () => {
  chart.value = markRaw(proxy.$echarts.init(echartRef.value, props.theme))
  setOption(props.options)
  // 返回chart实例
  emits('chart', chart.value)

  // 监听图表事件
  events.forEach(([key, value]) => {
    if (key.startsWith('on') && !key.startsWith('onChart')) {
      const on = toLine(key).substring(3)
      chart.value.on(on, (...args) => emits(on, ...args))
    }
  })

  // 监听元素变化
  useResizeObserver(echartRef.value, resizeChart)
  // 如果不想用vueuse，可以使用下边的方法代替，但组件使用v-show时，不会触发resize事件
  // window.addEventListener('resize', resizeChart)
}

// 重绘图表函数
const resizeChart = debounce(
  () => {
    chart.value?.resize()
  },
  300,
  true
)

// 设置图表函数
const setOption = debounce(
  async (data) => {
    if (!chart.value) return
    const merged = Object.assign({}, defaultOptions, data);
    chart.value.setOption(merged, true, true)
    await nextTick()
    resizeChart()
  },
  300,
  true
)

const formatEmpty = computed(() => {
  if (typeof props.isEmpty === 'function') {
    return props.isEmpty(props.options)
  }
  return props.isEmpty
})

watch(
  () => props.options,
  async (nw) => {
    await nextTick()
    setOption(nw)
  },
  { deep: true }
)

watch(
  () => props.theme,
  async () => {
    chart.value.dispose()
    renderChart()
  }
)

onMounted(() => {
  renderChart()
})
onBeforeUnmount(() => {
  // 取消监听
  // window.removeEventListener('resize', resizeChart)
  // 销毁echarts实例
  chart.value.dispose()
  chart.value = null
})
</script>

<style lang="scss" scoped>
.t-chart {
  position: relative;
  width: 100%;
  height: 100%;

  &-container {
    width: 100%;
    height: 100%;
  }
}
</style>