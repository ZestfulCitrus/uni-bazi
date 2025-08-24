<template>
    <view class="bazi-container">
        <!-- 大运选择栏 - 横向滚动 -->
        <view class="horizontal-scroll">
            <text style="font-size: 24rpx;margin-top: 8rpx;margin-bottom: 8rpx;">{{
                analysisResult.data.ret_Info.basic_analysis_1 }}</text>
        </view>
        <view class="horizontal-scroll">
            <view class="dayun-tab"
                style="display: flex; justify-content: center; align-items: center; min-width: 66rpx;">
                <text class="age">大</text>
                <text class="age">运</text>
            </view>
            <view class="horizontal-scroll">
                <view v-for="(dayun, index) in dayunArr" :key="index" class="dayun-tab"
                    :class="{ 'active': activeDayunIndex === index }" @click="() => {
                        activeDayunIndex = index;
                        analysisResult.data.ret_Info.currentYear.dayun[0] = dayun[1]
                        analysisResult.data.ret_Info.currentYear.dayun[1] = dayun[2]
                        analysisResult.data.ret_Info.currentYear.liunian[0] = dayun[5][activeLiunianIndex][1]
                        analysisResult.data.ret_Info.currentYear.liunian[1] = dayun[5][activeLiunianIndex][2]
                        analysisResult.data.ret_Info.currentYear.dayunganshen= dayun[3]
                        analysisResult.data.ret_Info.currentYear.dayunzhishen[0]= dayun[4][1]
                        analysisResult.data.ret_Info.currentYear.liunianganshen =  dayun[5][activeLiunianIndex][3]
                        analysisResult.data.ret_Info.currentYear.liunianzhishen[0] =  dayun[5][activeLiunianIndex][4][0]
                    }">
                    <text class="age">{{ dayun[5][0][0] }}</text>
                    <text class="age">{{ dayun[0] + "岁" }}</text>
                    <view style="font-size: 28rpx;"><text>{{ dayun[1] }} <text style="font-size: 24rpx;color: red;">{{
                        dayun[3] }}</text></text></view>
                    <view style="font-size: 28rpx;"><text>{{ dayun[2] }} <text style="font-size: 24rpx;color: red;">{{
                        dayun[4][1] }}</text></text></view>

                </view>
            </view>

        </view>
        <!-- 内容区域 - 两行结构 -->
        <view class="horizontal-scroll">
            <view class="dayun-tab"
                style="display: flex; justify-content: center; align-items: center;min-width: 66rpx;">
                <text class="age">流</text>
                <text class="age">年</text>
            </view>
            <view class="horizontal-scroll">
                <view v-for="(liunian, liuIndex) in currentDayun[5]" :key="liuIndex" class="dayun-tab"
                    :class="{ 'active': activeLiunianIndex === liuIndex }" @click="() => {
                        activeLiunianIndex = liuIndex;
                        analysisResult.data.ret_Info.currentYear.liunian[0] = liunian[1]
                        analysisResult.data.ret_Info.currentYear.liunian[1] = liunian[2]
                        analysisResult.data.ret_Info.currentYear.liunianganshen =  liunian[3]
                        analysisResult.data.ret_Info.currentYear.liunianzhishen[0] =  liunian[4][0]
                    }">
                    <text class="age">{{ liunian[0] }}</text>
                    <view style="font-size: 28rpx;"><text>{{ liunian[1] }} <text style="font-size: 24rpx;color: red;">{{
                        liunian[3] }}</text></text></view>
                    <view style="font-size: 28rpx;"><text>{{ liunian[2] }} <text style="font-size: 24rpx;color: red;">{{
                        liunian[4][0] }}</text></text></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';

const props = defineProps({
    analysisResult: {
        type: Object,
        default: () => { },
        required: true
    },
    // 大运流年数据
    dayunArr: {
        type: Array,
        default: () => [],
        required: true
    }
});

// 当前选中的大运数据
const currentDayun = computed(() => {
    // 确保数组有数据且索引有效
    if (props.dayunArr.length > 0 && activeDayunIndex.value < props.dayunArr.length) {
        return props.dayunArr[activeDayunIndex.value] || [];
    }
    return [];
});

// 当前激活的大运索引
const activeDayunIndex = ref(0);
const activeLiunianIndex = ref(0);


function getCurrentDayunIndex(dayunArr) {
    // 获取当前年份
    const currentYear = new Date().getFullYear();
    
    // 遍历每个大运阶段
    for (let stageIndex = 0; stageIndex < dayunArr.length; stageIndex++) {
        const stage = dayunArr[stageIndex];
        // 每个阶段中的年份数据在索引5的位置
        const yearDataArray = stage[5];
        
        // 遍历该阶段中的所有年份
        for (let yearIndex = 0; yearIndex < yearDataArray.length; yearIndex++) {
            const yearData = yearDataArray[yearIndex];
            // 年份数据的第一个元素是具体年份
            const year = yearData[0];
            
            // 如果找到匹配的年份，返回对应的索引
            if (year === currentYear) {
                return {
                    stageIndex: stageIndex,  // 大运阶段索引
                    yearIndex: yearIndex     // 该阶段内的年份索引
                };
            }
        }
    }
    
    // 如果没有找到匹配的年份，返回null
    return null;
}

onMounted(()=>{
    const obj1 = getCurrentDayunIndex(props.dayunArr)
    if(obj1){
        activeDayunIndex.value = obj1.stageIndex;
        activeLiunianIndex.value = obj1.yearIndex;
    }
})
</script>

<style scoped>
.bazi-container {
    padding: 8rpx;
    background-color: #f8f8f8;
}

.title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 30rpx;
    padding: 10rpx 0;
    border-bottom: 1px solid #eee;
}

/* 横向滚动容器 */
.horizontal-scroll {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    /* 隐藏滚动条 */
}

.horizontal-scroll::-webkit-scrollbar {
    display: none;
    /* 隐藏滚动条 */
}


.dayun-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.05);
    white-space: nowrap;
    cursor: pointer;
    min-width: 80rpx;
    transition: all 0.2s ease;
    padding-bottom: 16rpx;
}

.dayun-tab.active {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
}

.dayun-tab .age {
    font-size: 24rpx;
    color: #333;
    margin-bottom: 8rpx;
}

.dayun-tab .ganzhi {
    display: flex;
    gap: 6rpx;
}

/* 内容区域 */
.content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

/* 大运信息行 */
.current-dayun-row {
    background-color: #fff;
    border-radius: 12rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    padding: 16rpx;
    gap: 16rpx;
}

.dayun-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16rpx;
    background-color: #fafafa;
    border-radius: 8rpx;
    min-width: 120rpx;
    text-align: center;
    flex-shrink: 0;
}

.dayun-item .label {
    font-size: 22rpx;
    color: #999;
    margin-bottom: 12rpx;
}

.dayun-item .value {
    font-size: 26rpx;
    font-weight: 500;
    color: #333;
    padding: 8rpx 12rpx;
    border-radius: 4rpx;
}

.dayun-item.other-info {
    min-width: 180rpx;
}

.dayun-item.other-info .value {
    font-size: 24rpx;
    white-space: normal;
    line-height: 1.6;
}

/* 流年行 */
.liunian-row {
    background-color: #fff;
    border-radius: 12rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    padding: 16rpx;
    gap: 16rpx;
}

.liunian-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16rpx;
    background-color: #fafafa;
    border-radius: 8rpx;
    min-width: 120rpx;
    text-align: center;
    flex-shrink: 0;
    transition: transform 0.2s ease;
}

.liunian-item:hover {
    transform: translateY(-2rpx);
    box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.1);
}

.year {
    font-size: 24rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 12rpx;
    padding-bottom: 8rpx;
    border-bottom: 1px dashed #eee;
    width: 100%;
}

/* 纵向排列的干支 */
.ganzhi-vertical {
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    margin-bottom: 12rpx;
    width: 100%;
}

.shen {
    font-size: 22rpx;
    margin-bottom: 12rpx;
    padding: 6rpx 12rpx;
    border-radius: 4rpx;
    width: 80%;
}

/* 纵向排列的标签 */
.tags-vertical {
    display: flex;
    flex-direction: column;
    gap: 6rpx;
    width: 100%;
}

.tag {
    font-size: 20rpx;
    color: #666;
    background-color: #f0f0f0;
    padding: 3rpx 0;
    border-radius: 4rpx;
}

/* 样式颜色 */
.gan {
    background-color: #e6f7ff;
    color: #1890ff;
    border: 1px solid #bae7ff;
    padding: 6rpx 0;
    border-radius: 4rpx;
}

.zhi {
    background-color: #fff2e8;
    color: #fa8c16;
    border: 1px solid #ffe8cc;
    padding: 6rpx 0;
    border-radius: 4rpx;
}

.shen {
    background-color: #fff0f0;
    color: #f5222d;
    border: 1px solid #ffccc7;
}

/* 适配不同屏幕尺寸 */
@media (max-width: 375px) {
    .dayun-item {
        min-width: 100rpx;
        padding: 12rpx;
    }

    .liunian-item {
        min-width: 100rpx;
        padding: 12rpx;
    }
}
</style>
