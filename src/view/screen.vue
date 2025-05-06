<template>
  <div id="map-container" ref="mapContainer"></div>
  <img width="30" height="30" ref="maker" src="@/assets/bodong.gif" alt="">
  <div class="btns">
    <button @click="backProvince">
      四川省
    </button>
    <button @click="backCity">
      雅安市
    </button>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted, h } from 'vue'
import {
  Scene, GaodeMap, CityBuildingLayer,
  PolygonLayer,
  LineLayer,
  Marker as L7Marker
} from '@antv/l7'
import { Choropleth } from '@antv/l7plot';
const vehiclePosition = ref([120.19382669582967, 30.258134])
// 创建图片元素的虚拟节点
let maker = ref(null)


function getAllLayers() {
  const layers = sceneRef.value.getLayers();
  console.log('所有图层:', layers);
  return layers;
}
// 511824
const adminCode = ref('511824');
const mapContainer = ref(null)
const drillStepConfig = ref()
const sceneRef = ref(null)
const choropleth = ref(null)
const initialZoom = ref(17); // 保存初始zoom值
function resetMap() {
  sceneRef.value.setZoom(initialZoom.value);
  sceneRef.value.setCenter(vehiclePosition.value);
  choropleth.value.fillAreaLayer.show();
  showAdminLayer.value = true;
}
onMounted(async () => {
  try {
    // 初始化场景
    sceneRef.value = new Scene({
      id: 'map-container',
      map: new GaodeMap({
        style: 'amap://styles/darkblue',
        center: vehiclePosition.value,
        pitch: 45,
        zoom: 17,
        token: 'ea7c2039ab96589e72bf7c59c3dc0ab1',

      }),
    })

    // 创建L7 Marker实例
    const customMarker = new L7Marker({
      color: 'red', // 标记颜色
      element: maker.value  // 获取DOM元素
    }).setLnglat(vehiclePosition.value);

    // 加载行政区划数据
    const response = await fetch('https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.2/administrative-data/area-list.json')
    const list = await response.json()

    const data = list
      .filter(({ level, adcode }) => level === 'province')
      .map((item) => Object.assign({}, item, { value: Math.random() * 5000 }))

    const cityData = list
      .filter(({ level, adcode }) => level === 'city')
      .map((item) => Object.assign({}, item, { value: Math.random() * 2000 }))
    const districtData = list
      .filter(({ level, adcode }) => level === 'district')
      .map((item) => Object.assign({}, item, { value: Math.random() * 1000 }))
    drillStepConfig.value = {
      source: {
        data: cityData,
        joinBy: {
          sourceField: 'adcode',
          geoField: 'adcode',
        },
      },
      color: {
        field: 'value',
        value: ['#1051b3'],
        scale: { type: 'quantize' },
      },
      style: {
        opacity: 1,
        stroke: '#0392df',
        lineWidth: 3,
        lineOpacity: 1,
      },
      state: {
        active: { stroke: '#27aeed', lineWidth: 1, lineOpacity: 0.8, fill: "#2ac6ff", },
      },
    };
    choropleth.value = new Choropleth({
      map: {
        type: 'amap',
        // style: 'blank',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      }, ...drillStepConfig.value,
      // source: {
      //   data: cityData,
      //   joinBy: {
      //     sourceField: 'adcode',
      //     geoField: 'adcode',
      //   },
      // },
      // color: {
      //   field: 'value',
      //   // value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
      //   value: ['#1051b3'],
      //   scale: { type: 'quantize' },
      // },
      // style: {
      //   opacity: 1,
      //   stroke: '#0392df',
      //   lineWidth: 3,
      //   lineOpacity: 1,
      // },
      // state: {
      //   active: { stroke: '#27aeed', lineWidth: 1, lineOpacity: 0.8, fill: "#2ac6ff", },
      // },
      label: {
        visible: true,
        field: 'name',
        style: {
          fill: '#000',
          opacity: 0.8,
          fontSize: 10,
          stroke: '#fff',
          strokeWidth: 1.5,
          textAllowOverlap: false,
          padding: [5, 5],
        },
      },

      tooltip: {
        items: ['name', 'adcode', 'value'],
      },
      viewLevel: {
        level: 'province', // 行政级别设置为省级
        adcode: '510000', // 四川省的行政代码
        granularity: 'city', // 粒度设置为市级
      },
      autoFit: true,
      drill: {
        steps: ['city', 'district'],
        triggerUp: 'unclick',
        triggerDown: 'click',
        onDown: (from, to, callback) => {
          console.log(`output->`, to)
          const { adcode, level, granularity } = to;

          if (granularity === 'city') {
            callback({
              source: { data: cityData, joinBy: { sourceField: 'adcode' } },
            });
          } else if (granularity === 'district') {
            // hide()
            callback({
              source: { data: districtData, joinBy: { sourceField: 'adcode' } },
            });
          }
        },
        onUp: (from, to, callback) => {
          callback();
        },
      },



      zoom: {
        position: 'bottomright',
      },
      legend: {
        position: 'bottomleft',
      },
    });
    // 添加点击事件监听
    // 添加fillAreaLayer图层的点击事件监听
    sceneRef.value.addMarker(customMarker);
    choropleth.value.addToScene(sceneRef.value);
    // fillAreaLayer点击事件处理
    setTimeout(() => {

      choropleth.value.on('fillAreaLayer:click', (e) => {
        console.log(`output->`, "执行", e)
        if (e.feature.properties.level === "district") {
          // 放大zoom
          sceneRef.value.setZoom(sceneRef.value.getZoom() + 8);
          // 隐藏行政图层
          hide();
        }
      });
    }, 1000);
  } catch (error) {
    console.error('地图初始化失败:', error)
  }
})

// 在onUnmounted中移除标记
onUnmounted(() => {
  if (sceneRef.value) {
    sceneRef.value.removeMarker(customMarker);
    sceneRef.value.destroy()
  }
})
const showAdminLayer = ref(true); // 控制行政图层显示状态

function toggleAdminLayer() {
  showAdminLayer.value = !showAdminLayer.value;
  if (showAdminLayer.value) {
    console.log(`output->111`, 111)
    choropleth.value.fillAreaLayer.show()
  } else {
    console.log(`output->222`, choropleth.value.fillAreaLayer)
    choropleth.value.fillAreaLayer.hide()
    // hide()
  }
}
function hide() {
  choropleth.value.fillAreaLayer.hide()
}
async function fetchData(url) {
  const response = await fetch(url)
  return await response.json()
}
function backProvince() {
  // choropleth.value.drillDown({
  //   level: 'province', // 行政级别设置为省级
  //   adcode: '510000', // 四川省的行政代码
  //   granularity: 'city', // 粒度设置为市级
  // }, { ...drillStepConfig.value }); // 切换到省级视图
  choropleth.value.drillUp({}, { level: "province" });
  // sceneRef.value.setZoom(3); // 设置合适的缩放级别
  getAllLayers()
  sceneRef.value.setCenter([103.00, 30.00]); // 设置雅安市中心点
  choropleth.value.fillAreaLayer.show(); // 显示行政区域
}

function backCity() {
  choropleth.value.drillDown({
    level: 'city', // 行政级别设置为市级
    adcode: '511800', // 雅安市的行政代码
  }, { ...drillStepConfig.value }); // 切换到市级视图
  // sceneRef.value.setZoom(8); // 设置合适的缩放级别
  // choropleth.value.drillUp(null, { level: "city" });
  sceneRef.value.setCenter([103.00, 30.00]); // 设置雅安市中心点
  choropleth.value.fillAreaLayer.show(); // 显示行政区域
}
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.toggle-button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.btns {
  position: absolute;
  top: 10vh;
  left: 10vw;
}
</style>