<template>
  <div class="container">
    <canvas ref="draw"></canvas>
  </div>
</template>

<script setup>

// 引入three
import * as THREE from "three";
import { onMounted, ref } from "vue";
import { MapControls } from "three-stdlib";
// 
let plane;
let pointer, raycaster, isShiftDown = false;

let rollOverMesh, rollOverMaterial;
let cubeGeo, cubeMaterial;

const objects = [];
// 获取canvas实例
let draw = ref(null)
// 声明初始化变量
// 场景
let scene
// 初始化场景
function initScene() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf1f2f7);
}

// 渲染器，
let renderer
// 初始化渲染器
function initRender() {
  renderer = new THREE.WebGLRenderer({
    canvas: draw.value
  })
  renderer.alpha = true;
  renderer.precision = 'mediump'  //着色器的精度。可以是"highp", "mediump" 或 "lowp". 默认为"highp"，如果设备支持的话
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);
}
// 相机
let camera
// 初始化相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(400, 200, 0);

}
// 控制器
let controls
function initControls() {
  controls = new MapControls(camera, renderer.domElement); //用户交互
}

//  !!实物初始化
// 光源
let light
function initLight() {
  light = new THREE.PointLight(0xffffff, 1.2);
}
// 物体
function initMesh() {
  cubeGeo = new THREE.BoxGeometry(50, 50, 50);
  cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff799 });
}
function initRollOverGeo() {
  const rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
  rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
  rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
  scene.add(rollOverMesh);
}
function initGridHelper() {
  const gridHelper = new THREE.GridHelper(1000, 20);
  scene.add(gridHelper);
}
// 平台
function initPlane() {
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();

  const geometry = new THREE.PlaneGeometry(1000, 1000);
  geometry.rotateX(- Math.PI / 2);

  plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
  scene.add(plane);

  objects.push(plane);
}



// 辅助线
let axesHelper
function initAxesHelper() {
  axesHelper = new THREE.AxesHelper(100);
}
// 添加实物
function addMesh() {
  scene.add(light)
  scene.add(camera)
  // scene.add(mesh)
  scene.add(axesHelper)
}

//   动画
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update()
}
onMounted(() => {
  init()
  // initSocket()
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('keyup', onDocumentKeyUp);

  //

  window.addEventListener('resize', onWindowResize);
})
// 初始化启动
function init() {
  initScene()
  initRender()
  initCamera()
  initControls()
  initLight()
  initRollOverGeo()
  initGridHelper()
  initPlane()
  initMesh()
  initAxesHelper()
  addMesh()
  animate()
  console.log(scene);
}


// 事件
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();

}

function onPointerMove(event) {

  pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(objects, false);

  if (intersects.length > 0) {

    const intersect = intersects[0];

    rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
    rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

    render();

  }

}

function onPointerDown(event) {

  pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(objects, false);

  if (intersects.length > 0) {

    const intersect = intersects[0];

    // delete cube

    if (isShiftDown) {

      if (intersect.object !== plane) {

        scene.remove(intersect.object);

        objects.splice(objects.indexOf(intersect.object), 1);

      }

      // create cube

    } else {

      const voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
      voxel.position.copy(intersect.point).add(intersect.face.normal);
      voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
      scene.add(voxel);

      objects.push(voxel);

    }

    render();

  }

}

function onDocumentKeyDown(event) {

  switch (event.keyCode) {

    case 16: isShiftDown = true; break;

  }

}

function onDocumentKeyUp(event) {

  switch (event.keyCode) {

    case 16: isShiftDown = false; break;

  }

}

function render() {

  renderer.render(scene, camera);

}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>