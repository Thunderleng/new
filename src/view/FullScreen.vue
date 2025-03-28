<template>
    <!-- <TestSvg/> -->
    <ResizeContainer>
        <div style="height: 100vh;">
            <MapContainer />
        </div>
        <div class="container">
            <header class="screen-header">
                <div style="display: flex;justify-content: space-around;width: 100px;margin-top: -50px;align-items:center;"
                    @click="toggleScreen">
                    <div class="header-btn"></div>
                    {{ isFullscreen ? '退出全屏' : '进入全屏' }}
                </div>
                <span class="header-title"> 乡村坝坝宴智慧监管大平台</span>
                <div style="display: flex;justify-content: space-around;align-items:start;margin-top: -50px" @click="toggleScreen">
                    <div >
                        2025年3月28日
                    </div>

                </div>


            </header>
            <div class="content">
                <div class="left-boxs boxs">
                    <div class="box left-item1">
                        <div class="title">
                        </div>
                        <div class="item-select ">
                            <div class="select-box">

                                <span>近一周</span>
                            </div>
                            <div class="select-box">
                                <span>近一月</span>
                            </div>
                            <div class="select-box">
                                <span>近三月</span>
                            </div>
                            <div class="select-box">
                                <span>近一年</span>
                            </div>
                        </div>
                        <div class="left-item1-types">
                            <div class="left-item1-type">
                                <div class="left-item1-title">
                                    待举办
                                </div>
                                <div class="left-item1-agree">

                                    已同意
                                    <span>111</span>
                                </div>
                                <div class="left-item1-waitagree">
                                    待同意
                                    <span>111</span>
                                </div>
                            </div>
                            <div class="left-item1-type">
                                <div class="left-item1-title">
                                    已举办
                                </div>
                                <div class="left-item1-noerror">
                                    无异常
                                </div>
                                <div class="left-item1-error">
                                    有告警
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" box left-item2">
                        <div class="title">
                        </div>
                        <div class="item-select ">
                            <div class="select-box">

                                <span>近一周</span>
                            </div>
                            <div class="select-box">
                                <span>近一月</span>
                            </div>
                            <div class="select-box">
                                <span>近三月</span>
                            </div>
                            <div class="select-box">
                                <span>近一年</span>
                            </div>
                        </div>
                        <div class="left-item2-types">
                            <div class="left-item2-type1">
                                <div style="display: flex;flex-direction: column;">
                                    <span>已晨检人数</span>
                                    <span>12%</span>
                                </div>
                            </div>
                            <div class="left-item2-type2">
                                <div style="display: flex;flex-direction: column;">
                                    <span>晨检合格率</span>
                                    <span>12%</span>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div class="left-item2-progress">
                            <div>
                                <p>手指甲</p>
                                <el-progress :percentage="50" />
                            </div>

                        </div>
                    </div>
                    <div class="box left-item3">
                        <div class="title">
                        </div>
                        <div>
                            <div class="left-item3-main">
                                <div class="circularprogress">
                                    <CircularSvg />
                                    <span class="text">60%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-boxs boxs">
                    <div class="box bottom-item1">
                        <div class="title">

                        </div>
                        <div class="head-select">
                            <div class="date-box">年</div>
                            <div class="date-box">月</div>
                            <div class="date-box">日</div>
                        </div>
                        <div>
                            <EChart v-show="isShow" :options="options" style="width: 100%; height: 200px"
                                @chart="chart">
                            </EChart>
                        </div>
                    </div>
                    <div class="box bottom-item2">
                        <div class="title">
                        </div>
                        <div class="head-select">
                            <div class="date-box">年</div>
                            <div class="date-box">月</div>
                            <div class="date-box">日</div>
                        </div>
                        <EChart v-show="isShow" :options="options" style="width: 100%; height: 200px" @chart="chart">
                        </EChart>
                    </div>
                </div>
                <div class="right-boxs boxs">
                    <div class="box right-item1">
                        <div class="title">
                        </div>

                    </div>
                    <div class="box right-item2">
                        <div class="title">
                        </div>
                        <div>
                            <div>
                                <div class="right-item2-types">
                                    <div class="right-item2-type">
                                        <div class="right-item2-img1"></div>
                                        <div class="right-item2-text">
                                            <p>未带口罩</p>
                                            <p class="right-item2-textc">20%</p>
                                        </div>
                                    </div>
                                    <div class="right-item2-type">
                                        <div class="right-item2-img1"></div>
                                        <div class="right-item2-text">
                                            <p>未带口罩</p>
                                            <p class="right-item2-textc">20%</p>
                                        </div>
                                    </div>
                                    <div class="right-item2-type">
                                        <div class="right-item2-img1"></div>
                                        <div class="right-item2-text">
                                            <p>未带口罩</p>
                                            <p class="right-item2-textc">20%</p>
                                        </div>
                                    </div>
                                    <div class="right-item2-type">
                                        <div class="right-item2-img1"></div>
                                        <div class="right-item2-text">
                                            <p>未带口罩</p>
                                            <p class="right-item2-textc">20%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <el-carousel :interval="4000" type="card" height="170px" indicator-position="none">
                                <el-carousel-item v-for="item in 6" :key="item">
                                    <h3 text="2xl" justify="center">{{ item }}</h3>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <div class="box right-item3">
                        <div class="title">
                        </div>
                        <div class="right-item3-types">
                            <div class="right-item3-type">
                                <p>按时留样合格率</p>
                                <p>50%</p>
                            </div>
                            <div class="right-item3-type">
                                <p>按时留样合格率</p>
                                <p>50%</p>
                            </div>
                            <div class="right-item3-type">
                                <p>按时留样合格率</p>
                                <p>50%</p>
                            </div>
                            <div class="right-item3-type">
                                <p>按时留样合格率</p>
                                <p>50%</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </ResizeContainer>

</template>

<script setup>
import Line from "@/components/line.vue"
import CircularSvg from "@/components/CircularSvg.vue"
import TestSvg from "@/components/testSvg.vue"
/** 引入 useFullScreen 全屏hook函数 */
import { ref } from 'vue'
import { useFullscreen, useToggleFullscreen } from '@/utils/FullScreen'
import ResizeContainer from '@/components/ResizeContainer.vue'
import EChart from '@/components/Charts.vue'
import CameraControl from '@/components/CameraControl.vue'
import ScreenProgress from '@/components/ScreenProgress.vue'
import MapContainer from "@/components/MapContainer.vue";
defineOptions({
    name: 'FullScreen'
})

// 进度条
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)

/** 是否全屏状态 */
const isFullScreen = useFullscreen()
/** 全屏组件的点击事件 */
const toggleScreen = useToggleFullscreen(isFullScreen)



// echarts图标配置
const options = ref({

    dataset: {
        source: [
            ["日期", "数量"],  // 表头（必须）
            ["2023-01", 200],
            ["2023-02", 350],
            ["2023-03", 420],
            ["2023-04", 180],
            ["2023-05", 100]
        ],
    },
})
const isShow = ref(true)
const addData = () => {
    options.value.xAxis.data.push(
        'test' + Math.random().toString(36).substring(2, 8)
    )
    options.value.series[0].data.push(Math.random() * 200)
}


const chartRef = ref(null)
const chart = (dom) => {
    chartRef.value = dom
}
</script>
<style scoped lang="scss">
.container {
    pointer-events: none;
    z-index: 100;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0);
    position: absolute;
    top: 0;
}



.screen-header {
    color: white;
    pointer-events: auto;
    position: relative;
    width: 100%;
    height: 72px;
    // border: 1px solid black;
    background-image: url('@/assets/images/bg.png');
    background-size: cover;
    /* 图片等比例缩放以填充整个容器 */
    background-position: center;
    /* 图片居中对齐 */
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-title {
        text-align: center;
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: normal;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 41px;
        text-align: center;
        font-style: normal;
        text-transform: none
    }
}

.content {
    display: flex;
    justify-content: space-between;
    // align-items: flex-end;
    padding: 24px;
    padding-top: 0px;
}

.boxs {

    color: white;

    .box {
        // width: 300px;
        // height: 300px;
        // background-color: black;
        border-radius: 0px 0px 0px 0px;
        border: 1px solid #305682;
        background-color: #0a1220;
    }

}

.left-boxs {
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .left-item1-types {
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;

        .left-item1-type {
            width: 114px;
            height: 32px;

            >div {
                width: 150px;
                height: 72px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }

            .left-item1-title {
                width: 114px;
                height: 32px;
                background: linear-gradient(270deg, rgba(0, 190, 255, 0) 0%, rgba(0, 190, 255, 0.1) 30%, rgba(0, 190, 255, 0.1) 70%, rgba(0, 190, 255, 0) 100%);
                border-radius: 0px 0px 0px 0px;
                border: 1px solid;
                border-image: linear-gradient(270deg, rgba(0, 190, 255, 0), rgba(55, 172, 255, 1), rgba(54, 171, 255, 1), rgba(54, 204, 255, 0)) 1 1;
            }

            .left-item1-agree {
                background-image: url('@/assets/images/agree.png');
                background-size: cover;
                /* 让图片覆盖整个容器 */
            }

            .left-item1-waitagree {
                background-image: url('@/assets/images/waitagree.png');
                background-size: cover;
                /* 让图片覆盖整个容器 */
            }

            .left-item1-noerror {
                background-image: url('@/assets/images/noerror.png');
                background-size: cover;
                /* 让图片覆盖整个容器 */
            }

            .left-item1-error {
                background-image: url('@/assets/images/error.png');
                background-size: cover;
                /* 让图片覆盖整个容器 */
            }
        }
    }




    .left-item1 {
        width: 400px;
        height: 260px;

        .title {
            width: 100%;
            height: 40px;
            background-image: url('@/assets/images/smalltitle1.png')
        }
    }

    .left-item2 {
        width: 400px;
        height: 386px;

        .left-item2-types {
            display: flex;
            justify-content: space-around;
            align-items: center;

            >div {
                display: flex;
                justify-content: flex-end;
            }

            .left-item2-type1 {
                width: 144px;
                height: 52px;
                background-image: url('@/assets/images/ycjrs.png');
                background-repeat: no-repeat;
            }

            .left-item2-type2 {
                width: 144px;
                height: 52px;
                background-image: url('@/assets/images/cjjhgl.png');
                background-repeat: no-repeat;
            }
        }

        .left-item2-progress {
            padding: 0 30px;

            .el-progress--line {

                margin-bottom: 15px;
                max-width: 600px;
            }
        }

        .title {
            width: 100%;
            height: 40px;
            background-image: url('@/assets/images/smalltitle2.png')
        }
    }

    .left-item3 {
        width: 400px;
        height: 260px;

        .title {
            width: 400px;
            height: 80px;
            background-image: url('@/assets/images/smalltitle3.png');
            background-repeat: no-repeat;
        }

        .left-item3-main {
            width: 100%;
            height: 100%;
            display: flex;

            .circularprogress {
                position: relative;
                padding-left: 50px;

                .text {
                    position: absolute;
                    top: 35%;
                    left: 55%;
                    text-align: center;
                }
            }
        }

    }

}

.right-boxs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    pointer-events: auto;

    .right-item1 {
        width: 400px;
        height: 328px;

        .title {
            width: 100%;
            height: 40px;
            background-image: url('@/assets/images/smalltitle4.png')
        }
    }

    .right-item2 {
        width: 400px;
        height: 386px;

        .title {
            width: 100%;
            height: 40px;
            background-image: url('@/assets/images/smalltitle5.png')
        }

        .right-item2-types {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;

            .right-item2-type {


                display: flex;
                justify-content: space-around;
                // padding: 24px;
                padding-top: 16px;
                padding-bottom: 9px;
                gap: 10px;

                .right-item2-img1 {
                    width: 55px;
                    height: 55px;
                    background-size: cover;
                    background-image: url('@/assets/images/wdkz.png');
                    background-repeat: no-repeat;
                }

                .right-item2-text {
                    width: 88px;
                    height: 16px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    text-align: center;

                    .right-item2-textc {
                        background: linear-gradient(180deg, rgba(6, 126, 173, 0) 0%, rgba(70, 86, 120, 0.6) 100%);
                    }
                }

            }
        }

    }

    .right-item3 {
        width: 400px;
        height: 260px;

        .title {
            width: 100%;
            height: 40px;
            background-image: url('@/assets/images/smalltitle6.png')
        }

        .right-item3-types {
            width: 100%;
            height: 80%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            // row-gap: 10px;
            /* 行间距 */
            // column-gap: 5px;

            /* 列间距 */
            .right-item3-type {
                width: 180px;
                height: 72px;
                background-image: url('@/assets/images/Frame 29.png');
                background-repeat: no-repeat;
                background-size: cover;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-left: 35px;
            }
        }
    }
}

.bottom-boxs {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    flex-grow: 1;

    .head-select {
        pointer-events: auto;
        display: flex;
        justify-content: flex-end;


        .date-box {
            width: 48px;
            height: 24px;
            background: linear-gradient(180deg, rgba(65, 211, 255, 0) 0%, rgba(0, 195, 255, 0.6) 100%);
            border-radius: 4px 4px 4px 4px;
            text-align: center;
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            font-size: 14px;
            color: #FFFFFF;
            // line-height: 16px;
            font-style: normal;
            text-transform: none;
            margin-right: 10px;
            transform: skew(-10deg);
        }
    }


    .bottom-item1 {
        width: 500px;
        height: 260px;

        .title {
            width: 100%;
            height: 40px;
            background-image: url('@/assets/images/smalltitle7.png')
        }
    }

    .bottom-item2 {
        width: 500px;
        height: 260px;

        .title {
            width: 100%;
            height: 40px;
            background-image: url('@/assets/images/smalltitle8.png')
        }
    }

}

// 公共
.item-select {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .select-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        text-align: center;
        transform: skew(-10deg);
        width: 79px;
        height: 32px;
        background: linear-gradient(180deg, rgba(65, 211, 255, 0) 0%, rgba(65, 211, 255, 0) 50%, rgba(0, 195, 255, 0.6) 100%);

        span {
            transform: skew(10deg);
        }
    }
}

.el-carousel__item {
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 190, 255, 0.4);
    border: 3px solid #00BEFF;

    h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;

    }
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.svg {
    position: absolute;
    bottom: -30px;
}

.header-btn {
    width: 14px;
    height: 13px;
    background-image: url('@/assets/images/off.png');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>