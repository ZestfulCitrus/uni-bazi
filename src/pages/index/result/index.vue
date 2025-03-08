<template>
    <view v-if="false" class="result-page">
        <!--uv-loading-icon text="正在排盘中..." textSize="30rpx"></!--uv-loading-icon-->

    </view>
    <view v-if="true">
        <view class="space">
            <view class="stars">
                <view class="star"></view>
                <view class="star pink"></view>
                <view class="star blue"></view>
                <view class="star yellow"></view>
                <view class="cw pl8">姓名：*</view>
                <view class="cw pl8">出生日期：2000年6月4日</view>
            </view>
        </view>
        <view class="table-title bg-light">
            <uv-text align="center" type="primary" text="日期"></uv-text>
            <uv-text align="center" type="error" text="流年"></uv-text>
            <uv-text class="mh24" align="center" type="success" text="大运"></uv-text>
            <uv-text align="center" type="warning" text="年柱"></uv-text>
            <uv-text align="center" type="info" text="月柱"></uv-text>
            <uv-text align="center" type="info" text="日柱"></uv-text>
            <uv-text align="center" type="info" text="时柱"></uv-text>
        </view>
        <view class="table-column">
            <uv-text align="center" type="primary" text="主星"></uv-text>
            <uv-text align="center" type="error" text="食神"></uv-text>
            <uv-text class="br1 mh32" align="center" type="success" text="食神"></uv-text>
            <uv-text align="center" type="warning" text="食神"></uv-text>
            <uv-text align="center" type="info" text="伤官"></uv-text>
            <uv-text align="center" type="info" text="日主"></uv-text>
            <uv-text align="center" type="info" text="七杀"></uv-text>
        </view>
        <view class="table-column">
            <uv-text align="center" type="primary" text="天干"></uv-text>
            <uv-text size="24" align="center" type="error" text="癸"></uv-text>
            <uv-text size="24" class="br1" align="center" type="success" text="壬"></uv-text>
            <uv-text size="24" align="center" type="warning" text="甲"></uv-text>
            <uv-text size="24" align="center" type="info" text="乙"></uv-text>
            <uv-text size="24" align="center" type="info" text="丙"></uv-text>
            <uv-text size="24" align="center" type="info" text="丁"></uv-text>
        </view>
        <view class="table-column">
            <uv-text align="center" type="primary" text="地支"></uv-text>
            <uv-text size="24" align="center" type="error" text="子"></uv-text>
            <uv-text size="24" class="br1" align="center" type="success" text="丑"></uv-text>
            <uv-text size="24" align="center" type="warning" text="寅"></uv-text>
            <uv-text size="24" align="center" type="info" text="卯"></uv-text>
            <uv-text size="24" align="center" type="info" text="辰"></uv-text>
            <uv-text size="24" align="center" type="info" text="巳"></uv-text>
        </view>
        <view class="table-title bg-light">
            <uv-text align="center" type="primary" text="副星"></uv-text>
            <uv-text align="center" type="error" text="*"></uv-text>
            <uv-text align="center" type="success" text="*"></uv-text>
            <uv-text align="center" type="warning" text="*"></uv-text>
            <uv-text align="center" type="info" text="*"></uv-text>
            <uv-text align="center" type="info" text="*"></uv-text>
            <uv-text align="center" type="info" text="*"></uv-text>
        </view>
    </view>
</template>

<script setup lang="ts">
import './index.scss'
import { onBackPress } from '@dcloudio/uni-app'
onBackPress((e) => {
    return true
})
</script>